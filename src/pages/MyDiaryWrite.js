import React, { useState } from 'react';
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

const DiartTitle = styled.div`
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
    height: 90%;
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
    background-color: ${({ mood }) => {
    switch(mood) {
      case 'dissatisfied':
        return '#FF3B30';
      case 'bad':
        return '#FF9500';
      case 'soso':
        return '#FFCC00';
      case 'good':
        return '#34C759';
      case 'happy':
        return '#00C7BE';
      default:
        return 'gray';
        }
    }};
    transition: background-color 0.3s ease; 

    &:hover {
        background-color: ${({ mood }) => {
        switch(mood) {
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

  // // 유저 id를 가져오는 함수
  // const getUserId = () => {
  //   return sessionStorage.getItem('userId'); // 예시로 sessionStorage에서 가져옴
  // };

  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleSaveDiary = async () => {
    const diaryData = {
      id: '3',  // 임의로 설정한 id 값
      title,
      content,
      mood,
    };
  
    try {
      const response = await WriteDiaryAPI(diaryData); // 백엔드로 데이터 전송
      console.log('Diary saved successfully:', response); // 성공 시 결과 출력
    } catch (error) {
      console.error('Error saving diary:', error); // 오류 시 출력
    }
  };
  

  return (
    <Container>
      <DatePicker>
        <KeyboardArrowLeftIcon style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CalendarTodayIcon style={{ width: '18px' }} />
          <span>Today</span>
        </div>
        <KeyboardArrowRightIcon style={{ cursor: 'pointer' }} />
      </DatePicker>
      <DiaryEntry>
        <div>
          <DiartTitle>
            <input
              type='text'
              name='title'
              placeholder='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DiartTitle>
          <hr></hr>
          <DiaryContent>
            <textarea
              name='content'
              placeholder='내용'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </DiaryContent>
        </div>
      </DiaryEntry>
      <EmotionSection>
        <EmotionDiv style={{ cursor: 'pointer' }} mood='dissatisfied' onClick={() => handleMoodClick('dissatisfied')}>
          <img src={angry} alt='angry' />
        </EmotionDiv>
        <EmotionDiv style={{ cursor: 'pointer' }} mood='bad' onClick={() => handleMoodClick('bad')}>
          <img src={depress} alt='depress' />
        </EmotionDiv>
        <EmotionDiv style={{ cursor: 'pointer' }} mood='soso' onClick={() => handleMoodClick('soso')}>
          <img src={normal} alt='normal' />
        </EmotionDiv>
        <EmotionDiv style={{ cursor: 'pointer' }} mood='good' onClick={() => handleMoodClick('good')}>
          <img src={good} alt='good' />
        </EmotionDiv>
        <EmotionDiv style={{ cursor: 'pointer' }} mood='happy' onClick={() => handleMoodClick('happy')}>
          <img src={happy} alt='happy' />
        </EmotionDiv>
      </EmotionSection>
      <SaveBtn onClick={handleSaveDiary} style={{ cursor: 'pointer' }}>일기 저장</SaveBtn>
    </Container>
  );
};

export default MyDiaryWrite;
