import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { createFundPost } from '../apis/fundApis';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

  .date-field {
    display: flex;
    flex-direction: column;
    margin: 1rem 0 1rem 0;
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

  .react-quill-editor{
    height: 13rem;
    width: 100%;
    margin-bottom: 5rem;
  }

  .file-label {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    cursor: pointer;
    border: 1px solid #ccc; 
    padding: 0.8rem;
    margin-bottom: 1rem;
    border-radius: 0.35rem;
    font-size: 1rem;
    box-sizing: border-box;
    width: 100%; 
  }

  .file-input {
    display: none; /* 기본 input 파일 선택 버튼을 숨김 */
  }

  .file-label span {
    color: #888; 
  }

  .file-select-btn {
    background-color: #3A76E9; /* 버튼 배경색 */
    color: #fff !important;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.35rem;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
  }

  .file-select-btn:hover {
    background-color: #2f5bb5; /* 호버 시 색상 변경 */
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

// 툴바 옵션 설정 (이미지 버튼 추가)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // 텍스트 서식
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 리스트 서식
  ['link', 'image'],                                // 링크, 이미지 삽입 버튼
  [{ 'align': [] }],                                // 정렬
];

const FundPost = () => {
  const location = useLocation();  // 넘겨받은 데이터를 가져옴
  const post = location.state?.post || {};  // post 데이터가 있으면 사용, 없으면 빈 객체
  const userId = useSelector((state) => state.memberSlice.id); //세션저장소에 있는 id값 가져오기
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title || '');  // 제목 미리 채우기
  const [team, setTeam] = useState(post.teamName || '');  // 팀 이름 미리 채우기
  const [file, setFile] = useState(null);  // 이미지 파일, 기본적으로 비워둠 (사용자가 새로 업로드할 수 있음)
  const [imagePreview, setImagePreview] = useState(post.mainImage || null);  // 기존 이미지 미리 보기 설정
  const [fundStart, setFundStart] = useState(post.fundStartDate ? new Date(post.fundStartDate) : null);
  const [fundEnd, setFundEnd] = useState(post.fundEndDate ? new Date(post.fundEndDate) : null);
  const [targetAmount, setTargetAmount] = useState(post.targetAmount || '');  // 목표 금액 미리 채우기
  const [content, setContent] = useState(post.description || '');  // 에디터 내용 미리 채우기

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이미지 업로드 핸들러
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        // 여기에 이미지 업로드 API 호출
        const response = await fetch('이미지 업로드 API 경로', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        const imageUrl = data.url;  // 서버에서 반환된 이미지 URL을 받음

        // 에디터에 이미지 삽입
        const quill = this.quillRef.current.getEditor(); // Quill 인스턴스에 접근
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // 여기에 이미지 리사이즈 및 업로드 로직을 추가할 수 있습니다
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // 이미지 미리보기 설정
        };
        reader.readAsDataURL(file);
  
        // 서버에 이미지를 업로드하는 로직을 추가할 수 있습니다
        setFile(file); // 파일 상태 업데이트
      } catch (error) {
        console.error("이미지 처리 실패:", error);
      }
    }
  };
  

  // ReactQuill 모듈 설정 (이미지 업로드 핸들러 연결)
  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImageUpload,  // 이미지 핸들러 연결
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postId = post.postId;  // 수정 모드일 때 post에서 postId를 가져옴

    const postData = {
      userId,
      title,
      description: content,
      teamName: team,
      fundStartDate: fundStart,
      fundEndDate: fundEnd,
      targetAmount,
      mainImage: file || post.mainImage  // 새 이미지가 없으면 기존 이미지를 사용
    };

    console.log('작성된 글:', postData);

    try {
      let response;

      if (postId) {
        // 게시글 수정 (PUT 요청)
        response = await axios.put(`http://localhost:9090/api/fund/post/${postId}`, postData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            'Content-Type': 'application/json' // JSON 데이터로 전송
          }
        });
        console.log('게시글 수정 성공!', response);
      } else {
        // 새로운 게시글 등록 (POST 요청)
        response = await createFundPost(postData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            'Content-Type': 'application/json' // JSON 데이터로 전송
          }
        });
        console.log('게시글 등록 성공!', response);
      }

      // 게시글 등록 또는 수정 후 /fund로 리다이렉트
      setTimeout(() => {
        navigate('/fund', { state: postData });
      }, 0);

    } catch (error) {
      console.error('게시글 처리 실패:', error);
    }
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
        <label className="file-label">
          <span>대표 이미지를 선택하세요</span>
          <span className="file-select-btn">이미지 선택</span>
          <input
            type="file"
            accept="image/*"
            className="post-input file-input"
            onChange={handleImageChange}
          />
        </label>


        <div className="editor-container">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요"
            className="react-quill-editor"
            modules={modules}  // 툴바 모듈 연결
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
