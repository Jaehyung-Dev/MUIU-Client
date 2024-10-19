import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { createFundPost } from '../apis/fundApis';

const Main = styled.main`
  width: 100%;  
  box-sizing: border-box; 
  padding: 0; 
  
  .post-form {
    padding: 1.2rem;
  }

  .post-input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.35rem;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .editor-container {
    margin-bottom: 2.5rem;
  }

  .date-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .date-label {
    font-weight: bold;
    font-size: 1.15rem;
    color: #333;
    margin: 1rem 0 0.5rem 0.3rem;
  }

  .date-picker-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    position: relative;
  }

  .calendar-input {
    display: flex;
    align-items: center;
    position: relative;
  }

  .calendar-input input {
    flex-grow: 1;
    padding-right: 2rem;
  }

  .calendar-icon {
    position: absolute;
    right: 1rem;
    top: 0.9rem;
    cursor: pointer;
    color: #888;
  }

  .tilde {
    font-size: 1.5rem;
    color: #333;
    margin-top: 0.5rem;
  }

  .target-money {
    font-weight: 600;
    margin-top: 1rem;
  }

  .submit-btn {
    height: 3.5rem;
    width: 100%;
    border: none;
    border-radius: 0.35rem;
    background-color: #3A76E9;
    color: #fff;
    font-weight: 600;
    font-size: 1.25rem;
    margin-top: 2.5rem;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .date-picker-container {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }

    .calendar-input input {
      width: 100%;
      padding-right: 2rem;
    }

    .tilde {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .date-label {
      font-size: 1rem;
    }
  }
`;

const CustomInput = ({ value, onClick }) => (
  <div className="calendar-input">
    <input type="text" value={value} onClick={onClick} readOnly className="post-input" placeholder="날짜 선택" />
    <FaCalendarAlt className="calendar-icon" onClick={onClick} />
  </div>
);

const FundPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [team, setTeam] = useState('');
  const [file, setFile] = useState(null); // 파일 상태 정의 추가
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);  // 이미지 미리보기 설정
  const [fundStart, setFundStart] = useState(null);
  const [fundEnd, setFundEnd] = useState(null);
  //const [businessStart, setBusinessStart] = useState(null);
  //const [businessEnd, setBusinessEnd] = useState(null);
  const [targetAmount, setTargetAmount] = useState('');
  const editorRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이미지 리사이즈 함수
const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        // 이미지가 maxWidth, maxHeight보다 크면 비율 유지하여 리사이즈
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.floor((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.floor((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // canvas 데이터를 base64로 변환
        const resizedImage = canvas.toDataURL('image/jpeg', 0.2); // 이미지 품질 조정 (0.7)
        resolve(resizedImage);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const handleImageChange = (e) => {
  setFile(e.target.files[0]); // 파일을 상태에 저장
};


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       setImageUrl(reader.result); // 서버에 업로드하고 나서 URL로 대체
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editorRef.current?.getInstance().getHTML();

    const postData = {
      // username: 'bitcamp10',  // 임시로 설정할 username 값
      title,
      description: content,
      teamName: team, 
      fundStartDate: fundStart,
      fundEndDate: fundEnd,
      targetAmount,
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('post', JSON.stringify(postData)); // JSON으로 변환하여 문자열로 전송

    console.log('작성된 글:', postData);

    try {
      const response = await createFundPost(formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      console.log('게시글 등록 성공!', response);
      navigate('/fund');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
    }

    setTimeout(() => {
      navigate('/fund', { state: postData });
    }, 0);
  };

  return (
    <Main>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="post-input"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 대표 이미지 URL 입력 필드 */}
        <input
          type="file"
          accept="image/*"
          className="post-input"
          onChange={handleImageChange}
        />

        <div className="editor-container">
          <Editor
            ref={editorRef}
            initialValue=""
            previewStyle="vertical"
            height="300px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            placeholder="내용을 입력하세요"
            plugins={[color]}
          />
        </div>

        <input
          type="text"
          className="post-input"
          placeholder="프로젝트팀을 입력하세요"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />

        <div className="date-field">
          <p className="date-label">모금 기간</p>
          <div className="date-picker-container">
            <DatePicker
              selected={fundStart}
              onChange={(date) => setFundStart(date)}
              customInput={<CustomInput />}
              dateFormat="yyyy.MM.dd"
              placeholderText="시작일 선택"
              required
            />
            <span className="tilde">~</span>
            <DatePicker
              selected={fundEnd}
              onChange={(date) => setFundEnd(date)}
              customInput={<CustomInput />}
              dateFormat="yyyy.MM.dd"
              placeholderText="종료일 선택"
              required
            />
          </div>
        </div>

        {/* <div className="date-field">
                  <p className="date-label">사업 기간</p>
                  <div className="date-picker-container">
                    <DatePicker 
                      selected={businessStart} 
                      onChange={(date) => setBusinessStart(date)} 
                      customInput={<CustomInput />}
                      dateFormat="yyyy.MM.dd"
                      placeholderText="시작일 선택" 
                      required
                    />
                    <span className="tilde">~</span>
                    <DatePicker 
                      selected={businessEnd} 
                      onChange={(date) => setBusinessEnd(date)} 
                      customInput={<CustomInput />}
                      dateFormat="yyyy.MM.dd"
                      placeholderText="종료일 선택" 
                      required
                    />
                  </div>
                </div> */}

        <input
          type="number"
          className="post-input target-money"
          placeholder="목표 금액을 입력하세요"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          작성 완료
        </button>
      </form>
    </Main>
  );
};

export default FundPost;
