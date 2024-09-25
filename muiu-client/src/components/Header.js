import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ManualOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: ${({ searchOpen }) => (searchOpen ? 'flex-start' : 'space-between')};
    align-items: center;
    padding: 15px 15px;
    background-color: white;
    z-index: 1000;
    position: relative;

    h1 {
        font-family: 'TTLaundryGothicB', sans-serif;
        font-weight: 700;
        color: #fbbf24;
        font-size: 28px;
        margin: 0;
        display: ${({ searchOpen }) => (searchOpen ? 'none' : 'block')}; /* Search open 상태에 따라 표시 여부 */
    }

    .icon-container {
        display: flex;
        gap: 20px;
        width: ${({ searchOpen }) => (searchOpen ? '100%' : 'auto')}; /* 검색 시 검색창이 넓어지도록 */
        justify-content: ${({ searchOpen }) => (searchOpen ? 'flex-start' : 'flex-end')};

        .icon {
            cursor: pointer;
            color: #333;
            transition: color 0.3s ease;
            width: 40px !important;
            height: 40px !important;

            &:hover {
                color: #fbbf24;
            }

            @media (max-width: 393px) {
                width: 28px !important;
                height: 28px !important;
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

const DropdownMenu = styled.div`
    position: fixed;
    top: 30px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 999;
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            display: flex;
            align-items: center;
            margin: 20px 0;

            a {
                text-decoration: none;
                color: ${({ isActive }) => (isActive ? '#fbbf24' : '#333')};
                transition: color 0.3s ease;
                display: flex;
                align-items: center;

                &:hover {
                    color: #fbbf24;
                }

                svg {
                    margin-right: 10px;
                    color: ${({ isActive }) => (isActive ? '#fbbf24' : '#666')};
                }
            }
        }
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #fbbf24;
    outline: none;
    margin-bottom: 10px;
`;

const RecentKeywords = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;

    li {
        margin-bottom: 5px;
        font-size: 14px;
        color: #333;
    }
`;

const SearchResult = styled.div`
    padding: 10px 0;
    font-size: 16px;
    color: #666;
`;

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // 검색 창 상태 추가
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [recentKeywords, setRecentKeywords] = useState([]);
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setSearchOpen(false); // 메뉴가 열리면 검색 창은 닫기
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        setMenuOpen(false); // 검색 창이 열리면 메뉴는 닫기
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // 검색 기능에 따라 검색 결과 업데이트
        setSearchResults([`검색 결과 for "${e.target.value}"`]); // 예시 결과
    };

    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem);
        setMenuOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm && !recentKeywords.includes(searchTerm)) {
            setRecentKeywords([searchTerm, ...recentKeywords.slice(0, 9)]); // 최근 검색어 10개만 유지
        }
        setSearchResults([`검색 결과 for "${searchTerm}"`]); // 실제 검색 로직으로 교체
    };

    return (
        <>
            <HeaderContainer searchOpen={searchOpen}>
                <h1>마음이음</h1>
                <div className="icon-container" searchOpen={searchOpen}>
                    <div onClick={toggleSearch}>
                        <SearchIcon className="icon" />
                    </div>
                    <div onClick={toggleMenu}>
                        <MenuIcon className="icon" />
                    </div>
                </div>
            </HeaderContainer>

            {searchOpen && (
                <SearchContainer>
                    <form onSubmit={handleSearchSubmit}>
                        <SearchInput
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </form>

                    <RecentKeywords>
                        {recentKeywords.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                        ))}
                    </RecentKeywords>

                    <SearchResult>
                        {searchResults.map((result, index) => (
                            <div key={index}>{result}</div>
                        ))}
                    </SearchResult>
                </SearchContainer>
            )}

            {/* 드롭다운 메뉴 */}
            {menuOpen && (
                <DropdownMenu>
                    <ul>
                        <li><Link to="/main" isActive={activeMenuItem === 'main'} onClick={() => handleMenuClick('main')}><HomeOutlinedIcon />홈</Link></li>
                        <li><Link to="/login" isActive={activeMenuItem === 'login'} onClick={() => handleMenuClick('login')}><LoginOutlinedIcon />로그인</Link></li>
                        <li><Link to="/join" isActive={activeMenuItem === 'join'} onClick={() => handleMenuClick('join')}><PersonAddOutlinedIcon />회원가입</Link></li>
                        <li><Link to="/mypage" isActive={activeMenuItem === 'mypage'} onClick={() => handleMenuClick('mypage')}><AccountCircleOutlinedIcon />내 정보</Link></li>
                        <li><Link to="/mind-check" isActive={activeMenuItem === 'mind-check'} onClick={() => handleMenuClick('mind-check')}><CheckCircleOutlinedIcon />내 마음 알아보기</Link></li>
                        <li><Link to="/human-counseling" isActive={activeMenuItem === 'human-counseling'} onClick={() => handleMenuClick('human-counseling')}><PeopleOutlinedIcon />상담하기</Link></li>
                        <li><Link to="/ai-counseling" isActive={activeMenuItem === 'ai-counseling'} onClick={() => handleMenuClick('ai-counseling')}><PsychologyOutlinedIcon />긴급 AI 상담</Link></li>
                        <li><Link to="/my-diary" isActive={activeMenuItem === 'my-diary'} onClick={() => handleMenuClick('my-diary')}><BookOutlinedIcon />나의 일기장</Link></li>
                        <li><Link to="/mind-column" isActive={activeMenuItem === 'mind-column'} onClick={() => handleMenuClick('mind-column')}><ArticleOutlinedIcon />마음칼럼</Link></li>
                        <li><Link to="/disaster-mental-health-manual" isActive={activeMenuItem === 'disaster-mental-health-manual'} onClick={() => handleMenuClick('disaster-mental-health-manual')}><ManualOutlinedIcon />재난 정신건강 매뉴얼</Link></li>
                        <li><Link to="/disaster-guide" isActive={activeMenuItem === 'disaster-guide'} onClick={() => handleMenuClick('disaster-guide')}><ArticleOutlinedIcon />재난 안내</Link></li>
                        <li><Link to="/disaster-safety-store" isActive={activeMenuItem === 'disaster-safety-store'} onClick={() => handleMenuClick('disaster-safety-store')}><StoreOutlinedIcon />마음 나누기</Link></li>
                        <li><Link to="/hospital-shelter-info" isActive={activeMenuItem === 'hospital-shelter-info'} onClick={() => handleMenuClick('hospital-shelter-info')}><LocalHospitalOutlinedIcon />병의원·대피소 정보</Link></li>
                    </ul>
                </DropdownMenu>
            )}
        </>
    );
};

export default Header;
