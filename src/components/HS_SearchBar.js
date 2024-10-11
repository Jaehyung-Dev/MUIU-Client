import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarContainer = styled.div`
    width: 80%;
    max-width: calc(600px - 30px);
    height: 35px;
    display: flex;
    padding: 0 10px;
    background-color: white;
    align-items: center;
    margin: 10px auto 0;
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

    &:focus {
        outline: none;
    }
`;

const HS_SearchBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            onSearch(searchValue);
            setSearchValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <SearchBarContainer>
            <SearchIcon 
                onClick={handleSearch} 
                style={{ cursor: 'pointer' }} 
            />
            <SearchInput
                name="search-location"
                id="search-location"
                placeholder="SEARCH"
                spellCheck="false"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </SearchBarContainer>
    );
};

export default HS_SearchBar;