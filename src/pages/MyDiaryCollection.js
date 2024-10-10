import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import angry from '../svg/angry.svg';
import { useNavigate } from 'react-router-dom';

const CoverDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #efefef;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchDiv = styled.div`
    width: 85%;
    min-height: 7vh;
    background-color: white;
    margin-top: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;

    input {
        padding: 0;
        font-size: 1.1rem;
        width: 80%;
        border: none;
        outline: none;
    }

    ::placeholder {
        color: black;
        font-size: 1.1rem;
    }
`;

const CalendarDiv = styled.div`
    width: 80%;
    min-height: 17vh;
    background-color: white;
    margin-top: 1rem;    
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 600px) {
        min-height: 20vh;
    }
`;

const DiaryContainer = styled.div`
    width: 85%;
    min-height: 40vh;
    margin: 1rem 2rem 4rem 2rem ;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
        min-height: 35vh;
    }
`;

const DiaryDiv = styled.div`
    width: 85%;
    height: 35vh;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

const DiarySpaceBetween = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DiaryButton = styled.button`
    border: none;
    background: none;
    color: black;
    display: flex;
    align-items: center;
`;

const DiaryCalendar = styled.div`
    width: 30%;
    min-height: 2rem;
    background-color: #FF3B30;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;   
    border-radius: 5px;
    @media screen and (max-width: 600px) {
        width: 43%;
    }
`;

const DiaryTitle = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

const DiaryContent = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1rem;
    @media screen and (max-width: 600px) {
        font-size: 1rem;
    }
`;

const diaryData = {
    '2024-10-02': 1,
    '2024-10-03': 3,
    '2024-10-05': 5,
    '2024-10-06': 4,
    '2024-10-07': 2,
    '2024-10-08': 1,
    '2024-10-11': 4,
    '2024-10-13': 1,
    '2024-10-15': 5,
    '2024-10-16': 4,
    '2024-10-18': 1,
    '2024-10-19': 3,
    '2024-10-20': 5,
    '2024-10-21': 4,
    '2024-10-22': 2,
    '2024-10-24': 3,
    '2024-10-25': 5,
    '2024-10-26': 4,
    '2024-10-28': 1,
    '2024-10-29': 3,
    '2024-10-30': 5,
    '2024-10-31': 4
};

const CalendarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.3rem;
    font-size: 1.3rem;
    margin-top: 1rem;
    width: 100%;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const CalendarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2rem;
    text-align: center;
    margin-top: 10px;

    @media (max-width: 600px) {
        gap: 0.2rem; 
    }
`;

const DayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 5px;
    background-color: ${({ emotion }) => getEmotionColor(emotion)};
`;

const WeekDaysHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3.6rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    color: gray;

    @media (max-width: 600px) {
        gap: 1.8rem;
    }
`;

const RotatingArrow = styled(ArrowDropDownIcon)`
    transition: transform 0.3s ease;
    transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const getEmotionColor = (emotion) => {
    switch (emotion) {
        case 5:
            return "#00C7BE";
        case 4:
            return "#34C759";
        case 3:
            return "#FFCC00";
        case 2:
            return "#FF9500";
        case 1:
            return "#FF3B30";
        default:
            return "transparent";
    }
};

const WeekCalendar = () => {
    const navi = useNavigate();
    const [showFullCalendar, setShowFullCalendar] = useState(false); // 전체 달력 표시 여부

    const handleChartClick = () => {
        navi('/emotion-graph');
    };

    const handleDropdownClick = () => {
        setShowFullCalendar((prev) => !prev); // 전체 달력 토글
    };

    // 둘째 주 날짜 (2024년 10월 8일 ~ 10월 14일)
    const secondWeek = [
        '2024-10-08', '2024-10-09', '2024-10-10',
        '2024-10-11', '2024-10-12', '2024-10-13', '2024-10-14'
    ];

    const weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // 10월 전체 날짜 (2024-10-01부터 2024-10-31까지)
    const fullMonthDays = Array.from({ length: 31 }, (_, i) => `2024-10-${String(i + 1).padStart(2, '0')}`);

    return (
        <>
            <CalendarHeader>
                <HeaderTitle>
                    <CalendarTodayIcon style={{ marginRight: '0.5rem' }} />
                    <b onClick={handleChartClick}>2024년 10월</b>
                </HeaderTitle>
                <RotatingArrow
                    open={showFullCalendar}
                    style={{ marginLeft: 'auto', marginRight: '15px', cursor: 'pointer' }} 
                    onClick={handleDropdownClick} 
                />
            </CalendarHeader>
            <WeekDaysHeader>
                {weekDayNames.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </WeekDaysHeader>
            <CalendarWrapper>
                {(showFullCalendar ? fullMonthDays : secondWeek).map((day) => (
                    <DayBox key={day} emotion={diaryData[day]}>
                        {new Date(day).getDate()}
                    </DayBox>
                ))}
            </CalendarWrapper>
        </>
    );
};

const MyDiaryCollection = () => {
    const navi = useNavigate();

    const handleWriteClick = () => {
        navi('/my-diary-write');
    };

    return (
        <>
            <CoverDiv>
                <SearchDiv>
                    <SearchIcon style={{
                        margin: '0 1rem',
                    }} />
                    <input type='text' placeholder='Search'></input>
                    <CreateIcon onClick={handleWriteClick}/>
                </SearchDiv>
                <CalendarDiv>
                    <WeekCalendar />
                </CalendarDiv>
                <DiaryContainer>
                    <DiaryDiv>
                        <DiarySpaceBetween>
                            <img src={angry} style={{
                                width: '3rem', height: '3rem'
                            }} />
                            <DiaryButton>
                                <MoreVertIcon style={{
                                    height: '2rem', width: '2rem'
                                }} />
                            </DiaryButton>
                        </DiarySpaceBetween>
                        <DiaryCalendar>
                            <ScheduleIcon style={{ marginRight: '0.1rem' }} />
                            <span>28 May 21</span>
                        </DiaryCalendar>
                        <DiaryTitle>비트캠프 데브옵스 첫 날</DiaryTitle>
                        <DiaryContent>인터넷이 끊켰다<br />나는 너무 슬프다.</DiaryContent>
                    </DiaryDiv>
                </DiaryContainer>
            </CoverDiv>
        </>
    );
};

export default MyDiaryCollection;
