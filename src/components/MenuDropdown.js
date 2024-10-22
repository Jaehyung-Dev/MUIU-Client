import React from 'react';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ManualOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useSelector } from 'react-redux';

const DropdownMenu = styled.div`
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: 560px;
    height: calc(100vh - 60px);
    background-color: rgba(255, 255, 255, 1);
    z-index: 999;
    padding: 20px;
    overflow-y: auto;

    ul {
        list-style: none;
        padding: 0;
        margin: 20px;

        li {
            display: flex;
            align-items: center;
            margin: 20px 0;

            a {
                text-decoration: none;
                color: ${({ $isActive }) => ($isActive ? '#fbbf24' : '#333')};
                transition: color 0.3s ease;
                display: flex;
                align-items: center;

                &:hover {
                    color: #fbbf24;
                }

                svg {
                    margin-right: 10px;
                    color: ${({ $isActive }) => ($isActive ? '#fbbf24' : '#666')};
                }
            }
        }
    }
`;

const StyledLink = styled(Link)`
    color: ${({ $isActive }) => ($isActive ? '#fbbf24' : '#333')};
    transition: color 0.3s ease;

    &:hover {
        color: #fbbf24;
    }

    svg {
        margin-right: 10px;
        color: ${({ $isActive }) => ($isActive ? '#fbbf24' : '#666')};
    }
`;

const MenuDropdown = ({ activeMenuItem, handleMenuClick }) => {
    const isLoginChk = useSelector((state) => state.memberSlice.isLogin);

    return (
        <DropdownMenu>
            <ul>
                <li>
                    <StyledLink 
                        to="/main" 
                        $isActive={activeMenuItem === 'main'} 
                        onClick={() => handleMenuClick('main')}
                    >
                        <HomeOutlinedIcon />홈
                    </StyledLink>
                </li>
                {!isLoginChk && (
                    <li>
                        <StyledLink 
                            to="/login" 
                            $isActive={activeMenuItem === 'login'} 
                            onClick={() => handleMenuClick('login')}
                        >
                            <LoginOutlinedIcon />로그인
                        </StyledLink>
                    </li>
                )}
                <li>
                    <StyledLink 
                        to="/join-agree" 
                        $isActive={activeMenuItem === 'join'} 
                        onClick={() => handleMenuClick('join')}
                    >
                        <PersonAddOutlinedIcon />회원가입
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/mypage" 
                        $isActive={activeMenuItem === 'mypage'} 
                        onClick={() => handleMenuClick('mypage')}
                    >
                        <AccountCircleOutlinedIcon />내 정보
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/mind-check" 
                        $isActive={activeMenuItem === 'mind-check'} 
                        onClick={() => handleMenuClick('mind-check')}
                    >
                        <CheckCircleOutlinedIcon />내 마음 알아보기
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/human-counseling" 
                        $isActive={activeMenuItem === 'human-counseling'} 
                        onClick={() => handleMenuClick('human-counseling')}
                    >
                        <PeopleOutlinedIcon />상담하기
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/my-diary" 
                        $isActive={activeMenuItem === 'my-diary'} 
                        onClick={() => handleMenuClick('my-diary')}
                    >
                        <BookOutlinedIcon />나의 일기장
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/mind-column" 
                        $isActive={activeMenuItem === 'mind-column'} 
                        onClick={() => handleMenuClick('mind-column')}
                    >
                        <ArticleOutlinedIcon />마음칼럼
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/disaster-mental-health-manual" 
                        $isActive={activeMenuItem === 'disaster-mental-health-manual'} 
                        onClick={() => handleMenuClick('disaster-mental-health-manual')}
                    >
                        <ManualOutlinedIcon />재난 정신건강 매뉴얼
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/disaster-guide" 
                        $isActive={activeMenuItem === 'disaster-guide'} 
                        onClick={() => handleMenuClick('disaster-guide')}
                    >
                        <ArticleOutlinedIcon />재난 안내
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/fund" 
                        $isActive={activeMenuItem === 'fund'} 
                        onClick={() => handleMenuClick('fund')}
                    >
                        <StoreOutlinedIcon />마음 나누기
                    </StyledLink>
                </li>
                <li>
                    <StyledLink 
                        to="/hospital-shelter-info" 
                        $isActive={activeMenuItem === 'hospital-shelter-info'} 
                        onClick={() => handleMenuClick('hospital-shelter-info')}
                    >
                        <LocalHospitalOutlinedIcon />병의원·대피소 정보
                    </StyledLink>
                </li>
            </ul>
        </DropdownMenu>
    );
};

export default MenuDropdown;