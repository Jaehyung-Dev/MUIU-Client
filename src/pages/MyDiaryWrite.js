import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

const DiartContent = styled.div`
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
    width: 80%; 
    padding: 20px;
    border-radius: 8px;
    background-color: black;
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const MyDiaryWrite = () => {

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
        <form method='' action='' name='diary'>
          <DiartTitle>
            <input type='text' name='title' placeholder='제목'></input>
          </DiartTitle>
          <hr></hr>
          <DiartContent>
            <textarea name='content' placeholder='내용'></textarea>
          </DiartContent>
        </form>
      </DiaryEntry>
      <EmotionSection>
        <EmotionDiv mood='dissatisfied'>
          <img src='../svg/angry.svg'/>
        </EmotionDiv>
        <EmotionDiv mood='bad'>
          <img src='../svg/depress.svg'/>
        </EmotionDiv>
        <EmotionDiv mood='soso'>
          <img src='../svg/normal.svg'/>
        </EmotionDiv>
        <EmotionDiv mood='good'>
          <img src='../svg/good.svg'/>
        </EmotionDiv>
        <EmotionDiv mood='happy'>
          <img src='../svg/happy.svg'/>
        </EmotionDiv>
      </EmotionSection>
      <SaveBtn></SaveBtn>
    </Container>
  );
};

export default MyDiaryWrite