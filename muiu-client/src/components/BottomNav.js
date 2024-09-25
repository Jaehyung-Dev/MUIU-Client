import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Nav = styled.nav`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('${process.env.PUBLIC_URL}/svg/bottom-nav.svg');
    background-size: cover;
    background-position: center;
    height: 150px;
    z-index: 10;
    box-sizing: border-box;
    padding: 0 20px;

    @media (max-width: 600px) {
        height: 100px;
        padding: 0 15px;
        bottom: 15px;
    }

    @media (max-width: 393px) {
        height: 80px;
        padding: 0 10px;
        bottom: 10px;
    }
`;

const NavItem = styled(Link)`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${({ active }) => (active ? '#fbbf24' : '#333')};
    font-size: 14px;
    flex: 1;

    img {
        width: 28px;
        height: 28px;
        margin-bottom: 5px;
        margin-top: 40px;

        @media (max-width: 600px) {
            width: 24px;
            height: 24px;
        }

        @media (max-width: 393px) {
            width: 30px;
            height: 30px;
        }
    }

    .icon {
        cursor: pointer;
        color: ${({ active }) => (active ? '#fbbf24' : '#A1A1A1')};
        transition: color 0.3s ease;
        width: 30px;
        height: 30px;
        margin-top: 40px;

        &:hover {
            color: #fbbf24;
        }

        @media (max-width: 393px) {
            width: 18px !important;
            height: 18px !important;
        }
    }

    &.nav-center img {
        width: 60px !important;
        height: 60px !important;
        top: 13px;

        @media (max-width: 393px) {
            width: 50px !important;
            height: 50px !important;
        }
    }
`;

const CenterNavItem = styled(NavItem)`
    img {
        transition: transform 0.3s ease;
        ${({ isActive }) => isActive && `
            transform: translateY(-40px);
        `}
    }
`;

const BottomNav = () => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    const handleCircleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <Nav>
            <NavItem to="/main" active={location.pathname === '/main'}>
                <HomeOutlinedIcon className="icon" />
                <span>홈</span>
            </NavItem>
            <NavItem to="/human-counseling" active={location.pathname === '/human-counseling'}>
                <QuestionAnswerOutlinedIcon className="icon" />
                <span>비대면 상담</span>
            </NavItem>
            <CenterNavItem to="/ai-counseling" className="nav-center" isActive={isActive} active={location.pathname === '/ai-counseling'} onClick={handleCircleClick}>
                <img src={`${process.env.PUBLIC_URL}/svg/circle-chat.svg`} alt="중앙 아이콘" />
            </CenterNavItem>
            <NavItem to="/my-diary" active={location.pathname === '/my-diary'}>
                <AutoStoriesOutlinedIcon className="icon" />
                <span>일기</span>
            </NavItem>
            <NavItem to="/mypage" active={location.pathname === '/mypage'}>
                <PersonOutlinedIcon className="icon" />
                <span>내 정보</span>
            </NavItem>
        </Nav>
    );
};

export default BottomNav;
