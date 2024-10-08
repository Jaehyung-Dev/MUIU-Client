import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import angry from '../svg/angry.svg'
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

const MiniCalendar = styled.div`
    position: absolute;
    top: 15rem;
    right: 16rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;

    @media (max-width: 393px) {
        top: 35%;
        right: 12%;
    }
`;

const MiniCalendarHeader = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const MiniCalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    text-align: center;
`;

const MiniCalendarDay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ emotion }) => getEmotionColor(emotion)};
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
    const [showMiniCalendar, setShowMiniCalendar] = useState(false);

    const handleChartClick = () => {
        navi('/emotion-graph');
    };

    const handleDropdownClick = () => {
        setShowMiniCalendar((prev) => !prev); // Toggle 달력
    };

    const weekDays = [
        '2024-10-01', '2024-10-02', '2024-10-03',
        '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'
    ];

    const weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getMiniCalendarDays = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate(); 
        
        const daysArray = [];
        
        for (let i = 0; i < firstDay; i++) {
            daysArray.push('');
        }

        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(day);
        }

        return daysArray;
    };

    const year = 2024; 
    const month = 9;
    const miniCalendarDays = getMiniCalendarDays(year, month);

    return (
        <>
            <CalendarHeader>
                <HeaderTitle>
                    <CalendarTodayIcon style={{ marginRight: '0.5rem' }} />
                    <b onClick={handleChartClick}>2024년 10월</b>
                </HeaderTitle>
                <ArrowDropDownIcon 
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
                {weekDays.map((day) => (
                    <DayBox key={day} emotion={diaryData[day]}>
                        {new Date(day).getDate()}
                    </DayBox>
                ))}
            </CalendarWrapper>

            {showMiniCalendar && (
                <MiniCalendar>
                    <MiniCalendarHeader>2024년 10월</MiniCalendarHeader>
                    <MiniCalendarGrid>
                        {weekDayNames.map((day) => (
                            <div key={day} style={{ color: 'gray' }}>{day}</div>
                        ))}
                        {miniCalendarDays.map((day, index) => (
                            <MiniCalendarDay key={index} emotion={day ? diaryData[`2024-10-${String(day).padStart(2, '0')}`] : null}>
                                {day}
                            </MiniCalendarDay>
                        ))}
                    </MiniCalendarGrid>
                </MiniCalendar>
            )}
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