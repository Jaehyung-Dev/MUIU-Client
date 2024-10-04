import React, { useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
    margin-top: -10px;
    height: 100vh;
    width: 100vw;
    max-width: 600px;
    background-color: #f3f3f3;
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
    font-family: inherit; /* 추가 */
    box-sizing: border-box; /* 추가 */
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

const EntryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
`;

const TimeBlock = styled.div`
    display: inline-flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
    background-color: #34C759;
    padding: 5px 10px;
    border-radius: 5px;
`;

const EntryDateText = styled.span`
    font-size: 14px;
    color: #555;
`;

const EntryTitle = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
`;

const EntryContent = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
`;

const EmotionSection = styled.div`
    width: 80%; 
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const CommentTitle = styled.h3`
    margin: 0 0 10px 0;
    font-size: 16px;
`;

const CommentWriter = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: #555;
`;

const CommentContent = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: #333;
`;

const CommentInputSection = styled.div`
    width: 100%;
    display: flex;
    background-color: #EEEEEE;
    padding: 0;
    margin-top: 25px;
    margin-bottom: 10px;
    box-sizing: border-box;
    overflow: hidden;
`;

const CommentInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background-color: #EEEEEE;
    padding: 15px;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    width: 80px;
    background-color: #D9D9D9;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;

    &:hover {
        background-color: #a0a0a0;
        color: black;
    }
`;

const MenuContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    width: 120px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 10px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const SaveBtn = styled.button``;

const MyDiaryWrite = () => {
  const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
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

      </EmotionSection>
      <SaveBtn></SaveBtn>
    </Container>
  );
};

export default MyDiaryWrite