import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Bar } from 'react-chartjs-2';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    width: 90%;
    max-width: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    `;

    const FilterButton = styled.button`
    background-color: ${(props) => (props.active ? '#fbb03b' : 'white')};
    border: 1px solid #fbb03b;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    color: ${(props) => (props.active ? 'white' : '#fbb03b')};
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
        background-color: #fbb03b;
        color: white;
    }
    `;

    // 그래프 섹션
    const GraphContainer = styled.div`
    width: 90%;
    max-width: 600px;
    padding: 1rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 4rem;
    `;

    const GraphTitle = styled.h2`
    font-size: 1rem;
    text-align: center;
    margin: 0;
    color: #333;
    margin-bottom: 1rem;
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
    // Chart 데이터 설정
    const data = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
        {
            label: '우울해요',
            data: [20, 30, 15, 40, 30, 50, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '화가 나요',
            data: [10, 15, 30, 25, 20, 15, 10],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
        {
            label: '보통이에요',
            data: [30, 25, 35, 30, 25, 30, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: '기분이 좋아요',
            data: [15, 20, 40, 30, 35, 40, 30],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
            label: '최고예요',
            data: [25, 35, 30, 35, 45, 30, 20],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        ],
    };

    // Chart 옵션 설정
    const options = {
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '이번주, 반재형님의 기분을 확인해봐요',
        },
        },
        responsive: true,
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    };

    return (
        <Container>
        {/* 필터 섹션 */}
        <FilterSection>
            <FilterButton active>반재형</FilterButton>
            <FilterButton active>주간</FilterButton>
            <FilterButton>월간</FilterButton>
            <FilterButton>연간</FilterButton>
        </FilterSection>

        {/* 그래프 섹션 */}
        <GraphContainer>
            <GraphTitle>이번주, 반재형님의 기분을 확인해봐요</GraphTitle>
            <Bar data={data} options={options} />
        </GraphContainer>

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
