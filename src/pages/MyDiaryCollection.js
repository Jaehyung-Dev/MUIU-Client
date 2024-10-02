import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const CoverDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #efefef;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SearchDiv = styled.div`
    width: 90%;
    min-height: 7vh;
    background-color: white;
    margin-top: 4rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
`

const MyDiaryCollection = () => {
  return (
    <>
        <CoverDiv>
            <SearchDiv>
                <SearchIcon style={{
                    margin: '0 1rem',
                }}/>
                <p>Search</p>
            </SearchDiv>
        </CoverDiv>
    </>
  );
};

export default MyDiaryCollection;