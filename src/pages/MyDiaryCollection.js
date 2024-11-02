import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';
import MD_Block from '../components/MD_Block';
import axios from 'axios';

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
    margin-top: 1rem;
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
    margin-bottom: 1rem;
    font-size: 1rem;
    margin-top: 0.3rem;
    width: 100%;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    b:hover{
        cursor: pointer;
    }
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
    // font-size: 0.95rem;

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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDiaries, setFilteredDiaries] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleWriteClick = () => {
        navi('/my-diary-write');
    };

    const handleChartClick = () => {
        navi('/emotion-graph');
    };
    
     // 검색어가 변경될 때마다 API 호출
     useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                setIsSearching(true);
                try {
                    const token = sessionStorage.getItem('ACCESS_TOKEN');
                    const response = await axios.get(`http://localhost:9090/diaries/search?query=${searchTerm}`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    setFilteredDiaries(response.data.item || []);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setFilteredDiaries([]);
            }
        };
        fetchSearchResults();
    }, [searchTerm]);
    
    return (
            <CoverDiv>
                <SearchDiv>
                    <SearchIcon style={{
                        margin: '0 1rem',
                    }} />
                    <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </SearchDiv>
                {searchTerm ? (
                filteredDiaries.length > 0 ? (
                    filteredDiaries.map((diary) => (
                        <MD_Block key={diary.diary_id} diaryData={diary} />
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )
            ) : (
                <>
                    <CalendarDiv>
                        <WeekCalendar />
                    </CalendarDiv>
                    <ButtonBar>
                        {/* <TimelineIcon onClick={handleChartClick} className='click'/> */}
                    {/* <CreateIcon onClick={handleWriteClick} className='click'/> */}
                    <div onClick={handleChartClick} className='click'>분석보기</div>
                    <div onClick={handleWriteClick} className='click'>일기쓰기</div>
                    </ButtonBar>
                    <MD_Block /> {/* 기본 최신 일기 */}
                </>
            )}
        </CoverDiv>
    );
};

export default MyDiaryCollection;