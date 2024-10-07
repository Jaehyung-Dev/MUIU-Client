import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import angry from '../svg/angry.svg'

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
    width: 85%;
    min-height: 7vh;
    background-color: white;
    margin-top: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;

    input {
        padding: 0;
        font-size: 1.1rem;
        width: 80%;
        border: none;
        outline: none;
    }

    ::placeholder {
        color: black;
        font-size: 1.1rem;
    }
`

const CalendarDiv = styled.div`
    width: 85%;
    min-height: 25vh;
    background-color: white;
    margin-top: 1rem;    
    border-radius: 10px;

    @media screen and (max-width: 600px) {
        min-height: 20vh;
    }
`

const DiaryContainer = styled.div`
    width: 85%;
    min-height: 40vh;
    margin: 1rem 2rem 4rem 2rem ;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
        min-height: 35vh;
    }
`

const DiaryDiv = styled.div`
    width: 85%;
    height: 35vh;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`

const DiarySpaceBetween = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const DiaryButton = styled.button`
    border: none;
    background: none;
    color: black;
    display: flex;
    align-items: center;
`
const DiaryCalendar = styled.div`
    width: 30%;
    min-height: 2rem;
    background-color: #34C759;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;   
    border-radius: 5px;
    @media screen and (max-width: 600px) {
        width: 43%;
    }
`
const DiaryTitle = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 600px) {
        font-size: 1.3rem;
    }
`
const DiaryContent = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1rem;
    @media screen and (max-width: 600px) {
        font-size: 1rem;
    }
`

const MyDiaryCollection = () => {
    return (
        <>
            <CoverDiv>
                <SearchDiv>
                    <SearchIcon style={{
                        margin: '0 1rem',
                    }} />
                    <input type='text' placeholder='Search'></input>
                </SearchDiv>
                <CalendarDiv>

                </CalendarDiv>
                <DiaryContainer>
                    <DiaryDiv>
                        <DiarySpaceBetween>
                            <img src={angry} style={{
                                width: '3rem',
                                height: '3rem'
                            }} />
                            <DiaryButton>
                                <MoreVertIcon style={{
                                    height: '2rem', width: '2rem'
                                }} />
                            </DiaryButton>
                        </DiarySpaceBetween>
                        <DiaryCalendar>
                            <ScheduleIcon style={{ marginRight: '0.1rem' }} />
                            <span>28 May 21</span>
                        </DiaryCalendar>
                        <DiaryTitle>비트캠프 데브옵스 첫 날</DiaryTitle>
                        <DiaryContent>인터넷이 끊켰다<br />나는 너무 슬프다.</DiaryContent>
                    </DiaryDiv>
                </DiaryContainer>
                <button onClick={() => window.location.href = 'emotion-graph'}>임시</button>
            </CoverDiv>
        </>
    );
};

export default MyDiaryCollection;