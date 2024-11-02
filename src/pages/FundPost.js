import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createFundPost, updateFundPost } from '../apis/fundApis';
import { resetImageUrl, clearError } from '../slices/fundSlice'; 

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
    index-z: 999;
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
    margin: 2.5rem 0 3rem 0;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  .react-quill-editor {
    height: 13rem;
    width: 100%;
    margin-bottom: 5rem;
    overflow: visible !important;
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

  .file-preview {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    margin-top: 0.8rem;
    border-radius: 0.35rem;
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

// 폰트 크기 옵션 추가
const fontSizeOptions = ['small', false, 'large', 'huge'];

const toolbarOptions = [
  [{ 'size': fontSizeOptions }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['link', 'image'],
  [{ 'align': [] }],
];

const FundPost = () => {
  const location = useLocation();
  const post = location.state?.post || {};
  const userId = useSelector((state) => state.memberSlice.id);
  const { imageUploadUrl = null, loading = false, error = null } = useSelector((state) => state.fund || {});
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post.title || '');
  const [team, setTeam] = useState(post.teamName || '');
  const [file, setFile] = useState(post.mainImage || null); 
  const [imagePreview, setImagePreview] = useState(post.mainImage || null);
  const [fundStart, setFundStart] = useState(post.fundStartDate ? new Date(post.fundStartDate) : null);
  const [fundEnd, setFundEnd] = useState(post.fundEndDate ? new Date(post.fundEndDate) : null);
  const [targetAmount, setTargetAmount] = useState(post.targetAmount || '');
  const [content, setContent] = useState(post.description || '');
  const [dateError, setDateError] = useState(''); 
  const quillRef = useRef(null);

  // Quill 편집기에서 폰트 크기 추가
  const modules = {
    toolbar: toolbarOptions,
  };

  // 파일 미리보기와 추가된 파일 배열 관리
  const [uploadFiles, setUploadFiles] = useState([]);
  const imageLoader = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      let img = document.createElement('img');
      img.src = e.target.result;
      setImagePreview(img.src);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => {
      imageLoader(file);
    });
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (imageUploadUrl) {
      setFile(imageUploadUrl);
    }
    return () => {
      dispatch(resetImageUrl());
      dispatch(clearError());
    };
  }, [imageUploadUrl, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 날짜 검증
    if (fundEnd && fundStart && fundEnd < fundStart) {
      setDateError("종료 날짜는 시작 날짜보다 나중이어야 합니다.");
      return;
    }

    const postData = {
      userId,
      title,
      description: content,
      teamName: team,
      fundStartDate: fundStart,
      fundEndDate: fundEnd,
      targetAmount,
      mainImage: file || post.mainImage,
    };

    const formData = new FormData();
    formData.append("fundPostDto", new Blob([JSON.stringify(postData)], { type: 'application/json' }));
    uploadFiles.forEach((file, index) => {
      formData.append('uploadFiles', file); // 다중 파일인 경우 key 변경
    });

    try {
      if (post.postId) {
         dispatch(updateFundPost({ postId: post.postId, postData }));
        console.log('게시글 수정 성공!');
        console.log('postData',postData);
      } else {
         dispatch(createFundPost(formData));
        console.log('게시글 등록 성공!');
        console.log('postData',postData);
      }

      // 새로고침하면서 Fund 페이지로 이동
      window.location.replace('/fund');
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

        {/* 이미지 업로드 */}
        <label className="file-label">
          {/* 이미지 미리보기와 선택 버튼 분기 */}
          {imagePreview ? (
            <img src={imagePreview} alt="미리보기" className="file-preview" />
          ) : (
            <span>대표 이미지를 선택하세요</span>
          )}
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
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="내용을 입력하세요"
            className="react-quill-editor"
            modules={modules}
            formats={['size','bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'align', 'image']}
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
          {/* 날짜 오류 메시지 표시 */}
          {dateError && <p style={{ color: 'red', marginTop: '0.5rem' }}>{dateError}</p>}
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
