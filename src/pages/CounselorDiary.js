import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 전체 배경 및 레이아웃
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
`;

// 필터 섹션
const FilterSection = styled.div`
    margin-top: 50px;
    width: 90%;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: space-between; 
`;

// 드롭다운을 버튼처럼 보이도록 스타일
const StyledDropdownButton = styled.div`
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: #fbb03b;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    &:hover {
        background-color: #e99a2b;
    }
`;

// 드롭다운 옵션 리스트 스타일
const DropdownOptions = styled.div`
    position: absolute;
    top: 2.5rem;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 100;
`;

const DropdownOption = styled.div`
    padding: 0.5rem;
    cursor: pointer;
    color: #333;
    &:hover {
        background-color: #f0f0f0;
    }
`;

// 필터 버튼 스타일
const FilterButton = styled.button`
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #999;
    cursor: pointer;
`;

// 카드 그리드 레이아웃
const CardGrid = styled.div`
    width: 90%;
    max-width: 600px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 20px;
    margin-bottom: 4rem;
`;

const Card = styled.div`
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

// 하단 네비게이션 바
const BottomNav = styled.div`
    width: 100%;
    max-width: 600px;
    height: 60px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;
    color: ${(props) => (props.active ? '#fbb03b' : '#999')};
`;

const DiaryApp = () => {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('name');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const MyDiaryCollection = () => {
        navigate('/my-diary-collection'); 
    };

    const MyDiary = () => {
        navigate('/my-diary'); 
    };

    const CounselorChart = () => {
        navigate('/counselor-chart'); 
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setIsDropdownOpen(false);
        console.log(`Selected sort order: ${order}`);
    };

    // 각 이름과 고정된 날짜 설정
    const namesWithDates = [
        { name: '송민교', date: new Date(2023, 10, 1) },  // 2023년 11월 1일
        { name: '김서연', date: new Date(2023, 10, 2) },  // 2023년 11월 2일
        { name: '민수정', date: new Date(2023, 10, 3) },  // 2023년 11월 3일
        { name: '정다은', date: new Date(2023, 10, 4) },  // 2023년 11월 4일
        { name: '김대휘', date: new Date(2023, 10, 5) },  // 2023년 11월 5일
        { name: '한서준', date: new Date(2023, 10, 6) },  // 2023년 11월 6일
        { name: '반재형', date: new Date(2023, 10, 7) },  // 2023년 11월 7일
    ];

    // 정렬 로직
    const sortedData = [...namesWithDates].sort((a, b) => {
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        if (sortOrder === 'time') return b.date - a.date;
    });

    return (
        <Container>
            {/* 필터 섹션 */}
            <FilterSection>
                <StyledDropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {sortOrder === 'name' ? '이름순' : '시간순'} <ArrowDropDownIcon />
                    {isDropdownOpen && (
                        <DropdownOptions>
                            <DropdownOption onClick={() => handleSortChange('name')}>이름순</DropdownOption>
                            <DropdownOption onClick={() => handleSortChange('time')}>시간순</DropdownOption>
                        </DropdownOptions>
                    )}
                </StyledDropdownButton>
                <FilterButton onClick={MyDiaryCollection}>모두 보기</FilterButton>
                <FilterButton onClick={CounselorChart}>상담사 차트 보기</FilterButton>
            </FilterSection>

            {/* 카드 그리드 */}
            <CardGrid>
                {sortedData.map((entry, index) => (
                    <Card key={index} onClick={MyDiaryCollection}>
                        <div>{entry.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#999' }}>{entry.date.toLocaleDateString()}</div>
                    </Card>
                ))}
            </CardGrid>

            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavItem>
                    <HomeIcon style={{ fontSize: '1.5rem' }} />
                    홈
                </NavItem>
                <NavItem>
                    <VideoCallIcon style={{ fontSize: '1.5rem' }} />
                    비대면 상담
                </NavItem>
                <NavItem active>
                    <AddCircleIcon style={{ fontSize: '2rem', color: '#fbb03b' }} />
                </NavItem>
                <NavItem>
                    <BookIcon style={{ fontSize: '1.5rem' }} />
                    일기
                </NavItem>
                <NavItem>
                    <LocationOnIcon style={{ fontSize: '1.5rem' }} />
                    내 정보
                </NavItem>
            </BottomNav>
        </Container>
    );
};

export default DiaryApp;
