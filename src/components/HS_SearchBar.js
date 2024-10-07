import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

// 이미지 임포트
import searchIcon from '../HS_images/search-icon.svg'; // 상대 경로로 이미지 임포트

const SearchBarContainer = styled.div`
    width: 80%;
    max-width: calc(600px - 30px);
    height: 35px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border: 1px solid #666;
    border-radius: 20px;
    margin: 0 auto;
`;

const SearchInput = styled.input`
    flex: 1;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
    spellCheck: false;

    &::placeholder {
        color: gray;
    }
`;

const HS_SearchBar = () => {
    return (
        <SearchBarContainer>
<<<<<<< HEAD
            <SearchIcon src={searchIcon} alt="search-icon" /> {/* 임포트한 이미지 사용 */}
=======
            <SearchIcon/>
>>>>>>> 9f39b60a2d6cf8c5f255b41ba32dc95b38e6c823
            <SearchInput name="search-location" id="search-location" placeholder="인근 역 검색" />
        </SearchBarContainer>
    );
};

export default HS_SearchBar;