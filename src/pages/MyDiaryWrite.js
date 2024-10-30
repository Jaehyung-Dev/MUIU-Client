import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import angry from '../svg/angry.svg';
import depress from '../svg/depress.svg';
import normal from '../svg/normal.svg';
import good from '../svg/good.svg';
import happy from '../svg/happy.svg';
import { WriteDiaryAPI } from '../apis/diaryWriteApis'; 
import { jwtDecode } from 'jwt-decode'; // 잘못된 import 해결
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin-top: -10px;
  height: 100vh;
  width: 100vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 393px) {
    height: 92vh;
  }
`;

const DatePicker = styled.div`
  margin-top: 20px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const DiaryEntry = styled.div`
  width: 80%;
  min-height: 230px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const DiaryTitle = styled.div`
  width: 100%;
  height: 15%;
  padding-bottom: 5px;

  input {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 1.3rem;
    padding: 0 8px;
    font-family: inherit;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
  }
`;

const DiaryContent = styled.div`
  width: 100%;
  height: 80%;
  padding-top: 8px;

  textarea {
    width: 100%;
    height: 28vh;
    border: 0;
    font-size: 1rem;
    padding: 0 8px;
    font-family: inherit;
    box-sizing: border-box;
    resize: none;
  }

  textarea:focus {
    outline: none;
  }
`;

const EmotionSection = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
`;

const EmotionDiv = styled.div`
  margin: 0.2rem;
  width: 25%;
  height: 15vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ mood, selectedMood }) => (mood === selectedMood ? 
    (mood === 'dissatisfied' ? '#e32d26' :
    mood === 'bad' ? '#e68400' :
    mood === 'soso' ? '#e6b800' :
    mood === 'good' ? '#2ea448' :
    mood === 'happy' ? '#00a39e' : 'gray')
    :
    (mood === 'dissatisfied' ? '#FF3B30' :
    mood === 'bad' ? '#FF9500' :
    mood === 'soso' ? '#FFCC00' :
    mood === 'good' ? '#34C759' :
    mood === 'happy' ? '#00C7BE' : 'gray'))};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ mood }) => {
    switch (mood) {
      case 'dissatisfied':
        return '#e32d26';
      case 'bad':
        return '#e68400';
      case 'soso':
        return '#e6b800';
      case 'good':
        return '#2ea448';
      case 'happy':
        return '#00a39e';
      default:
        return 'gray';
    }
    }};
  }

  @media screen and (max-width: 600px) {
    width: 40%;
    height: 10vh;
  }

  img {
    width: 100%;
    height: 8vh;
    margin-top: 0.5rem;
  }
`;

const SaveBtn = styled.button`
  margin-top: 20px;
  width: 85%;
  height: 5rem;
  padding: 20px;
  border-radius: 8px;
  background-color: black;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border: 0;
  font-weight: bold;
  font-size: large;
`;

const MyDiaryWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
     // 페이지 진입 시 스크롤을 맨 위로 설정
     window.scrollTo(0, 0);
     
    const token = sessionStorage.getItem('ACCESS_TOKEN'); // 세션 스토리지에서 JWT 토큰 가져오기
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
    setSelectedMood(selectedMood);
  };

  const handleSaveDiary = async () => {
    // 유효성 검사
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!mood) {
      alert('기분을 선택해주세요.');
      return;
    }

    const diaryData = {
      id: userId,
      title,
      content,
      mood,
    };

    try {
      const response = await WriteDiaryAPI(diaryData);
      console.log('서버 응답:', response);
      alert('일기가 저장되었습니다.');
      navigate('/my-diary-collection'); // 저장 후 페이지 이동

      if (response.status === 201) {
        alert('일기가 저장되었습니다.');
        navigate('/my-diary-collection'); // 저장 후 페이지 이동
      }
    } catch (error) {
      console.error('일기 저장 중 오류:', error);
    }
  };

  return (
    <Container>
      <DatePicker>
        <KeyboardArrowLeftIcon style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <CalendarTodayIcon style={{ width: '18px' }} />
          <span>Today</span>
        </div>
        <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />
      </DatePicker>
      <DiaryEntry>
        <div>
          <DiaryTitle>
            <input
              type='text'
              name='title'
              placeholder='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DiaryTitle>
          <hr />
          <DiaryContent>
            <textarea
              name='content'
              placeholder='내용'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck="false"
            ></textarea>
          </DiaryContent>
        </div>
      </DiaryEntry>
      <EmotionSection>
        <EmotionDiv
          style={{ cursor: 'pointer' }}
          mood='dissatisfied'
          selectedMood={selectedMood}
          onClick={() => handleMoodClick('dissatisfied')}
        >
          <img src={angry} alt='angry' />
        </EmotionDiv>
        <EmotionDiv
          style={{ cursor: 'pointer' }}
          mood='bad'
          selectedMood={selectedMood}
          onClick={() => handleMoodClick('bad')}
        >
          <img src={depress} alt='depress' />
        </EmotionDiv>
        <EmotionDiv
          style={{ cursor: 'pointer' }}
          mood='soso'
          selectedMood={selectedMood}
          onClick={() => handleMoodClick('soso')}
        >
          <img src={normal} alt='normal' />
        </EmotionDiv>
        <EmotionDiv
          style={{ cursor: 'pointer' }}
          mood='good'
          selectedMood={selectedMood}
          onClick={() => handleMoodClick('good')}
        >
          <img src={good} alt='good' />
        </EmotionDiv>
        <EmotionDiv
          style={{ cursor: 'pointer' }}
          mood='happy'
          selectedMood={selectedMood}
          onClick={() => handleMoodClick('happy')}
        >
          <img src={happy} alt='happy' />
        </EmotionDiv>
      </EmotionSection>
      <SaveBtn onClick={handleSaveDiary} style={{ cursor: 'pointer' }}>일기 저장</SaveBtn>
    </Container>
  );
};

export default MyDiaryWrite;
