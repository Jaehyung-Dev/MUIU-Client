import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import MD_Block from '../components/MD_Block';
import axios from 'axios';

// 기분에 따른 SVG 파일 불러오기
import angry from '../svg/angry.svg';
import depress from '../svg/depress.svg';
import normal from '../svg/normal.svg';
import good from '../svg/good.svg';
import happy from '../svg/happy.svg';

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
`;

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

    b:hover {
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
    cursor: pointer;
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

// 기분별 아이콘과 색상 설정
const moodIcons = {
    1: angry,
    2: depress,
    3: normal,
    4: good,
    5: happy,
};

const moodMapping = {
    "happy": 5,
    "good": 4,
    "soso": 3,
    "bad": 2,
    "dissatisfied": 1
};

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

// 달력 컴포넌트
const WeekCalendar = ({ diaryData, onSelectDate }) => {
    const [showFullCalendar, setShowFullCalendar] = useState(false);

    const handleDropdownClick = () => {
        setShowFullCalendar((prev) => !prev);
    };

    const handleDateClick = (day) => {
        if (day) onSelectDate(day);
    };

    const weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const fullMonthDays = [
        ...Array(2).fill(null),
        ...Array.from({ length: 31 }, (_, i) => `2024-10-${String(i + 1).padStart(2, '0')}`)
    ];

    const secondWeek = fullMonthDays.slice(7, 14);

    return (
        <>
            <CalendarHeader>
                <HeaderTitle>
                    <CalendarTodayIcon style={{ marginRight: '0.5rem' }} />
                    <b>2024년 10월</b>
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
                {(showFullCalendar ? fullMonthDays : secondWeek).map((day, index) => (
                    <DayBox
                        key={index}
                        emotion={day ? diaryData[day]?.mood : undefined}
                        onClick={() => handleDateClick(day)}
                    >
                        {day ? new Date(day).getDate() : ''}
                    </DayBox>
                ))}
            </CalendarWrapper>
        </>
    );
};

// 메인 컴포넌트
const MyDiaryCollection = () => {
    const navi = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDiaries, setFilteredDiaries] = useState([]);
    const [diaryData, setDiaryData] = useState({});
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleWriteClick = () => {
        navi('/my-diary-write');
    };

    const handleChartClick = () => {
        navi('/emotion-graph');
    };

    const handleSelectDate = (date) => {
        const diary = diaryData[date];
        setSelectedDiary(diary ? diary : null);
    };

    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const token = sessionStorage.getItem('ACCESS_TOKEN');
                const response = await axios.get('http://localhost:9090/diaries/user', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                const data = response.data.items || response.data.item || [];
                const moodData = {};
                let latestDiary = null;

                data.forEach(diary => {
                    const date = new Date(diary.regdate).toISOString().split('T')[0];
                    const mood = diary.mood;

                    if (date && mood && moodMapping[mood] !== undefined) {
                        moodData[date] = { ...diary, mood: moodMapping[mood] };
                    }

                    if (!latestDiary || new Date(diary.regdate) > new Date(latestDiary.regdate)) {
                        latestDiary = diary;
                    }
                });

                setDiaryData(moodData);
                setSelectedDiary(latestDiary);
            } catch (error) {
                console.error('Error fetching diary data:', error);
            }
        };

        fetchDiaryData();
    }, []);

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
                <SearchIcon style={{ margin: '0 1rem' }} />
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
                        <WeekCalendar diaryData={diaryData} onSelectDate={handleSelectDate} />
                    </CalendarDiv>
                    <ButtonBar>
                        <div onClick={handleChartClick} className="click">분석보기</div>
                        <div onClick={handleWriteClick} className="click">일기쓰기</div>
                    </ButtonBar>
                    {selectedDiary && (
                        <MD_Block diaryData={selectedDiary} />
                    )}
                </>
            )}
        </CoverDiv>
    );
};

export default MyDiaryCollection;
