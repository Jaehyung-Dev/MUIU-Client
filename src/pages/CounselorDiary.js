import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // 드롭다운 화살표 아이콘 추가
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
    justify-content: space-between; // 아이템 간격을 조정
`;

// 드롭다운 텍스트 스타일
const FilterText = styled.div`
    font-size: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

// 드롭다운 스타일
const Dropdown = styled.select`
    font-size: 1rem;
    color: #333;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    margin-left: 10px; // 드롭다운과 텍스트 간의 간격
    cursor: pointer;
    &:hover {
        border-color: #fbb03b;
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
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0; // hover 효과
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

// 메인 컴포넌트
const DiaryApp = () => {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('name'); // 기본 정렬 기준: 이름순

    const MyDiaryCollection = () => {
        navigate('/my-diary-collection'); 
    };

    const MyDiary = () => {
        navigate('/my-diary'); 
    };

    // 정렬 기능
    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        // 정렬 로직 추가 (예: API 호출, 상태 업데이트 등)
        console.log(`Selected sort order: ${value}`);
    };

    return (
        <Container>
            {/* 필터 섹션 */}
            <FilterSection>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown value={sortOrder} onChange={handleSortChange}>
                        <option value="name">이름순</option>
                        <option value="time">시간순</option>
                    </Dropdown>
                </div>
                <FilterButton onClick={MyDiaryCollection}>모두 보기</FilterButton>
            </FilterSection>

            {/* 카드 그리드 */}
            <CardGrid>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} onClick={MyDiary}>반재형</Card>
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
