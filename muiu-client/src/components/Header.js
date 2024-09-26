// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'; // 필요에 따라 임포트

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;

    h1 {
        font-family: 'TTLaundryGothicB', sans-serif;
        font-weight: 700;
        color: #fbbf24;
        font-size: 28px;
        margin: 0;
    }

    .icon-container {
        display: flex;
        gap: 20px;

        .icon {
            cursor: pointer;
            color: #333;
            transition: color 0.3s ease;
            width: 30px;
            height: 30px;

            &:hover {
                color: #fbbf24;
            }

            @media (max-width: 393px) {
                width: 18px !important;
                height: 18px !important;
            }
        }
    }

    @media (max-width: 393px) {
        padding: 5px 8px;

        h1 {
            font-size: 20px;
        }
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>마음이음</h1>
            <div className="icon-container">
                <Link to="/search">
                    <SearchIcon className="icon" />
                </Link>
                <Link to="/menu">
                    <MenuIcon className="icon" />
                </Link>
            </div>
        </HeaderContainer>
    );
};

export default Header;
