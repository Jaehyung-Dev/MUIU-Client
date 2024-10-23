import React, { useEffect, useState } from 'react';
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
    border-bottom: 1px solid #666;
    position: relative;
`;

const SearchInput = styled.input`
    flex: 1;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
    spellCheck: false;
    height: 24px;

    &::placeholder {
        font-size: 12px;
        padding-left: 3px;
        color: black;
    }

    &:focus {
        outline: none;
        background: none;
    }
`;

const SuggestionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 210px;
    background-color: white;
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 140px;
    overflow-y: auto;
    border-radius: 5px;
`;

const SuggestionItem = styled.li`
    cursor: pointer;
    padding: 8px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const HS_SearchBar = ({ stations, onSearch, setSearchQuery  }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredStations, setFilteredStations] = useState([]);

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

    useEffect(() => {
        if (searchValue) {
            const filtered = stations.filter(station =>
                station && station.bldn_nm && station.bldn_nm.toLowerCase().startsWith(searchValue.toLowerCase())
            );
    
            const uniqueFiltered = Array.from(new Set(filtered.map(station => station.bldn_nm)))
                .map(bldn_nm => {
                    return filtered.find(station => station.bldn_nm === bldn_nm);
                });
            setFilteredStations(uniqueFiltered);
        } else {
            setFilteredStations([]);
        }
    }, [searchValue, stations]);
    

    const handleStationClick = (station) => {
        setSearchValue(station.bldn_nm); 
        setFilteredStations([]);
        setSearchQuery(station.bldn_nm);
        setSearchValue('');
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
                placeholder="인근 역을 검색하세요."
                spellCheck="false"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            {filteredStations.length > 0 && (
                <SuggestionsList>
                    {filteredStations.map((station, index) => (
                        <SuggestionItem 
                            key={index} 
                            onClick={() => handleStationClick(station)}
                        >
                            {station.bldn_nm}역
                        </SuggestionItem>
                    ))}
                </SuggestionsList>
            )}  
        </SearchBarContainer>
    );
};

export default HS_SearchBar;