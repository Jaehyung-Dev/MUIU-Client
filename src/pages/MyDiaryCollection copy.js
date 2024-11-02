import React, { useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import MD_Block from '../components/MD_Block';

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
    min-height: 5vh;
    background-color: white;
    margin: 1rem 0;
    border-radius: 10px;
    display: flex;
    align-items: center;

    input {
        padding: 0;
        font-size: 1rem;
        width: 80%;
        border: none;
        outline: none;
    }

    ::placeholder {
        color: black;
        font-size: 1rem;
    }
`;

const WeekContainer = styled.div`
    width: 85%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    text-align: center;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
`;

const MonthText = styled.div`
    font-size: 1.3rem;
    font-weight: bold;
`;

const TodayButton = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #FFCC00;
    font-weight: bold;
    cursor: pointer;
`;

const CalendarIcon = styled(CalendarTodayIcon)`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #888;
`;

const DaysRow = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
`;

const DayBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    color: ${({ isSunday }) => (isSunday ? 'red' : '#333')};
`;

const DateText = styled.div`
    margin-top: 0.3rem;
    font-size: 1rem;
    color: ${({ isCurrentDay }) => (isCurrentDay ? 'white' : '#333')};
    background-color: ${({ isCurrentDay }) => (isCurrentDay ? '#FFCC00' : 'transparent')};
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonBar = styled.div`
    width: 85%;
    box-sizing: border-box;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;

    .click:hover {
        cursor: pointer;
    }

    div {
        width: 45%;
        background-color: white;
        border-radius: 5px;
        color: black;
        text-align: center;
        padding: 0.3rem;
    }
`;

const StyledCalendar = styled(FullCalendar)`
    width: 100%;
    .fc-toolbar {
        display: none; /* 기본 헤더 숨김 */
    }
    .fc-daygrid-day {
        text-align: center;
        font-size: 1rem;
    }
    .fc-daygrid-event {
        background-color: #00c7be !important;
        color: white !important;
        border-radius: 5px;
        padding: 2px;
    }
`;

const MyDiaryCollection = () => {
    const navi = useNavigate();
    const [calendarView, setCalendarView] = useState('timeGridWeek'); // 주간 뷰를 기본으로
    const [currentDate, setCurrentDate] = useState(new Date());

    const toggleCalendarView = () => {
        setCalendarView(prevView => (prevView === 'timeGridWeek' ? 'dayGridMonth' : 'timeGridWeek'));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const getWeekDays = (date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay()); // 주의 첫날(일요일)
        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            return day;
        });
    };

    const formatMonthYear = (date) => `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;

    const weekDays = getWeekDays(currentDate);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <CoverDiv>
            <SearchDiv>
                <SearchIcon style={{ margin: '0 1rem' }} />
                <input type="text" placeholder="Search" />
            </SearchDiv>
            {calendarView === 'timeGridWeek' ? (
                <WeekContainer>
                    <Header>
                        <TodayButton onClick={goToToday}>Today</TodayButton>
                        <ArrowBackIosIcon onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))} style={{ cursor: 'pointer' }} />
                        <MonthText>{formatMonthYear(currentDate)}</MonthText>
                        <ArrowForwardIosIcon onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))} style={{ cursor: 'pointer' }} />
                        <CalendarIcon onClick={toggleCalendarView} />
                    </Header>
                    <DaysRow>
                        {weekDays.map((day, index) => (
                            <DayBox key={index} isSunday={index === 0}>
                                <div>{dayNames[index]}</div>
                                <DateText isCurrentDay={day.toDateString() === new Date().toDateString()}>
                                    {day.getDate()}
                                </DateText>
                            </DayBox>
                        ))}
                    </DaysRow>
                </WeekContainer>
            ) : (
                <WeekContainer>
                    <Header>
                        <TodayButton onClick={goToToday}>Today</TodayButton>
                        <ArrowBackIosIcon onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} style={{ cursor: 'pointer' }} />
                        <MonthText>{formatMonthYear(currentDate)}</MonthText>
                        <ArrowForwardIosIcon onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} style={{ cursor: 'pointer' }} />
                        <CalendarIcon onClick={toggleCalendarView} />
                    </Header>
                    <StyledCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={false}
                        locale="ko" // Set locale to Korean for weekday names
                        dayHeaderContent={(arg) => arg.text.replace("일", "")} // 요일의 '일' 제거
                        dayCellContent={(arg) => arg.date.getDate()} // 날짜에서 숫자만 표시
                        events={[]} // 필요한 경우 이벤트 추가
                        height="auto"
                    />
                </WeekContainer>
            )}
            <ButtonBar>
                <div onClick={() => navi('/my-diary-write')} className="click">일기쓰기</div>
                <div onClick={() => navi('/emotion-graph')} className="click">분석보기</div>
            </ButtonBar>
            <MD_Block />
        </CoverDiv>
    );
};

export default MyDiaryCollection;
