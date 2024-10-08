import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import styled from 'styled-components';
import bottomNav from '../svg/bottom-nav.svg';
import redCall from '../svg/red-call.svg';

const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 600px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url(${bottomNav});
    background-size: cover;
    background-position: center;
    height: 150px;
    z-index: 10;
    box-sizing: border-box;
    padding: 0 20px;
    @media (max-width: 600px) {
        height: 100px;
        padding: 0 15px;
    }
    @media (max-width: 393px) {
        height: 80px;
        padding: 0 10px;
    }
`;

const NavItem = styled(Link)`
    position: relative;
    z-index: 12;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${({ active }) => (active ? '#FBBF24' : '#333')};
    font-size: 14px;
    flex: 1;
    .icon {
        cursor: pointer;
        color: ${({ active }) => (active ? '#FBBF24' : '#A1A1A1')};
        transition: color 0.3s ease;
        width: 30px;
        height: 30px;
        margin-top: 40px;
        &:hover {
            color: #FBBF24;
        }
        @media (max-width: 393px) {
            width: 18px !important;
            height: 18px !important;
        }
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 5;
    pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;

const CenterNavItem = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    transition: transform 0.3s ease;
    ${({ isActive }) => isActive && `
        transform: translateY(-30px);
    `}
    z-index: 12;
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 393px) {
        width: 60px;
        height: 60px;
    }
`;

const MenuContainer = styled.div`
    position: fixed; /* Nav와 동일하게 fixed로 설정 */
    bottom: 280px; /* Nav 위에 정확한 위치 설정 */
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 30px;
    scale: 0.4;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    display: ${({ show }) => (show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 10;

    @media (max-width: 393px) {
        bottom: 190px;
        scale: 0.3;
    }
`;

const BottomNav = () => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    const handleCircleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            {/* MenuContainer를 Nav 밖에 두고, z-index는 Nav 내용물보다 뒤로 */}
            <MenuContainer show={isActive}>
                <img src={`${process.env.PUBLIC_URL}/images/round_back.png`} alt="클릭 아이콘"/>
            </MenuContainer>

            {/* Overlay는 MenuContainer보다 뒤로 */}
            <Overlay show={isActive} onClick={handleCircleClick} />
            
            <Nav>
                <NavItem to="/main" active={location.pathname === '/main'}>
                    <HomeOutlinedIcon className="icon" />
                    <span>홈</span>
                </NavItem>
                <NavItem to="/human-counseling" active={location.pathname === '/human-counseling'}>
                    <QuestionAnswerOutlinedIcon className="icon" />
                    <span>비대면 상담</span>
                </NavItem>
                {/* 중앙 원형 버튼 */}
                <CenterNavItem className="nav-center" isActive={isActive} onClick={handleCircleClick}>
                    <img src={redCall} alt="중앙 아이콘" />
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
        </>
    );
};

export default BottomNav;

