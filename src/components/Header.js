import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuDropdown from './MenuDropdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: white;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
`;

const BackButton = styled.button`
    font-size: 20px;
    border: none;
    background: none;
    cursor: pointer;
`;

const DateText = styled.h1`
    font-size: 20px;
    margin: 0;
`;

const IconGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-right: 30px;

    @media (max-width: 393px) {
        margin-right: 10px;
    }
`;

const Title = styled.h1`
    font-family: 'TTLaundryGothicB', sans-serif;
    font-weight: 700;
    color: #fbbf24;
    font-size: 28px;
    margin: 0;
    transition: opacity 0.5s ease;
    @media (max-width: 393px) {
        opacity: ${({ searchOpen }) => (searchOpen ? 0 : 1)};
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: none;
    }
`;

const IconContainer = styled.div`
    display: flex;
    gap: 20px;
    position: absolute;
    right: 20px;
    z-index: 1001;
`;

const SearchIconWrapper = styled.div`
    transition: transform 0.5s ease;
    transform: ${({ searchOpen }) => (searchOpen ? 'translateX(-210px)' : 'translateX(0)')};
    position: relative;
`;

const SearchInputWrapper = styled.div`
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    left: calc(100% + 10px);
    width: ${({ searchOpen }) => (searchOpen ? '200px' : '0')};
    overflow: hidden;
    transition: width 0.5s ease;
    display: flex;
    flex-direction: column;
`;

const SearchInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    font-size: 16px;
    background-color: transparent;
`;

const BackIcon = styled(ArrowBackIcon)`
    margin-left: 30px;

    @media (max-width: 393px) {
        margin-left: 10px;
    }
`;

const SearchResultsContainer = styled.ul`
    list-style: none;
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 600px;
    background: white;
    border: 1px solid #ddd;
    z-index: 1000;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled.li`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); 
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    const menuItems = [
        { path: "/main", text: "홈" },
        { path: "/login", text: "로그인" },
        { path: "/join", text: "회원가입" },
        { path: "/mypage", text: "내 정보" },
        { path: "/mind-check", text: "내 마음 알아보기" },
        { path: "/human-counseling", text: "상담하기" },
        { path: "/ai-counseling", text: "긴급 AI 상담" },
        { path: "/my-diary", text: "나의 일기장" },
        { path: "/mind-column", text: "마음칼럼" },
        { path: "/disaster-mental-health-manual", text: "재난 정신건강 매뉴얼" },
        { path: "/disaster-guide", text: "재난 안내" },
        { path: "/fund", text: "마음 나누기" },
        { path: "/hospital-shelter-info", text: "병의원·대피소 정보" },
    ];

    const filteredMenuItems = menuItems.filter((item) =>
        item.text.replace(/\s+/g, '').toLowerCase().includes(searchTerm.replace(/\s+/g, '').toLowerCase())
    );

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setSearchOpen(false);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        setMenuOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim() !== "") {
            setRecentSearches((prev) => {
                const updatedSearches = [searchTerm, ...prev.filter((term) => term !== searchTerm)];
                return updatedSearches.slice(0, 5);
            });
        }
        setSearchTerm('');
    };

    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem);
        setMenuOpen(false);
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            {location.pathname !== '/existing-consultation' && (
                <HeaderContainer searchOpen={searchOpen}>
                    {(location.pathname === '/my-diary-check' || location.pathname === '/my-diary-write') ? (
                        <HeaderContainer style={{background:'#F3F3F3'}}>
                            <BackIcon onClick={goBack} />
                            <DateText>
                                { location.pathname === '/my-diary-check' && "2024년 8월 17일" }
                                { location.pathname === '/my-diary-write' && "일기를 추가해봐요" }
                            </DateText>
                            <IconGroup>
                                <ShareIcon/>
                                <StarIcon/>
                            </IconGroup>
                        </HeaderContainer>
                    ) : 
                    (
                        <>
                            <Title searchOpen={searchOpen}>
                                <StyledLink to="/main">마음이음</StyledLink>
                            </Title>
                            <IconContainer>
                                <SearchIconWrapper searchOpen={searchOpen}>
                                    <SearchIcon className="icon" onClick={toggleSearch} />
                                    {searchOpen && (
                                        <SearchInputWrapper searchOpen={searchOpen}>
                                            <SearchInput
                                                type="text"
                                                placeholder="검색어를 입력하세요"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                            />
                                        </SearchInputWrapper>
                                    )}
                                </SearchIconWrapper>
                                <MenuIcon className="icon" onClick={toggleMenu} />
                            </IconContainer>
                        </>
                    )}
                </HeaderContainer>
            )}
            {menuOpen && <MenuDropdown activeMenuItem={activeMenuItem} handleMenuClick={handleMenuClick} />}

            {searchOpen && searchTerm && (
                <SearchResultsContainer>
                    {filteredMenuItems.map((item) => (
                        <SearchResultItem key={item.path}>
                            <Link to={item.path}>{item.text}</Link>
                        </SearchResultItem>
                    ))}
                </SearchResultsContainer>
            )}
        </>
    );
};

export default Header;
