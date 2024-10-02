import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styled from 'styled-components';

const DiaryBackground = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    `;

    const DiarySection = styled.div`
    width: 90%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    padding: 1rem;
    `;

    const DiaryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;

    const DiaryTitle = styled.h2`
    font-size: 1.2rem;
    color: #333;
    `;

    const DiaryDate = styled.div`
    display: flex;
    align-items: center;
    color: #666;
    `;

    const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    `;

    const DiaryContent = styled.p`
    font-size: 1rem;
    color: #333;
    margin-top: 1rem;
    line-height: 1.5;
    `;

    const FeelIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.color || "#ff3b30"};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    `;

    const FeelText = styled.p`
    font-size: 1rem;
    color: #333;
    `;

    const FeelItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.background || "#f5f5f5"};
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    `;

    const FeelStatusContainer = styled.div`
    width: 90%;
    max-width: 500px;
    margin-bottom: 2rem;
    `;

    const FeelTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    `;

    const FeelStatus = () => (
    <FeelStatusContainer>
        <FeelTitle>최근 일기</FeelTitle>
        <FeelItem background="#ffe4e1">
        <FeelIcon color="#ff3b30">
            <SentimentVeryDissatisfiedIcon style={{ color: "#fff" }} />
        </FeelIcon>
        <FeelText>반재형 - 나는 방구</FeelText>
        </FeelItem>
        <FeelItem background="#fff3cd">
        <FeelIcon color="#ffc107">
            <SentimentVeryDissatisfiedIcon style={{ color: "#fff" }} />
        </FeelIcon>
        <FeelText>반재형 - 나는 방구</FeelText>
        </FeelItem>
    </FeelStatusContainer>
    );

    const CounselorDiaryCheck = () => {
    return (
        <DiaryBackground>
        <FeelStatus />
        <DiarySection>
            <DiaryHeader>
            <DiaryDate>
                <ScheduleIcon style={{ marginRight: '0.5rem' }} />
                2022-01-08
            </DiaryDate>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </DiaryHeader>
            <DiaryTitle>반재형</DiaryTitle>
            <DiaryContent>나는 방구</DiaryContent>
        </DiarySection>
        </DiaryBackground>
    );
    };

export default CounselorDiaryCheck;
    