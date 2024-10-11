import React, { useState } from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import angry from '../svg/angry.svg'
import depress from '../svg/depress.svg'
import normal from '../svg/normal.svg'
import good from '../svg/good.svg'
import happy from '../svg/happy.svg'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const DiaryBackground = styled.div`
    width: 100%;
    min-height: 90vh;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FeelContainer = styled.div`
    width: 85%;
    height: 50vh;
    margin: 2rem auto;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 600px) {
        height: 40vh;
    }

    &:hover {
        cursor: pointer;
    }
`
const CoverFeelDiv = styled.div`
    box-sizing: border-box;
    width: 85%;
    height: 100%;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 600px) {
        height: 15vh;
    }
`

const DiaryName = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
    color: gray;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 600px) {
    margin-top: 0;
        font-size: 1.2rem;
    }
`

const DiaryToday = styled.p`
    font-size: 1.7rem;
    color: black;
    font-weight: bold;
    text-align: center;
    margin: 1rem 0 2rem 0;
    @media screen and (max-width: 600px) {
        font-size: 1.8rem;
        margin: 0.5rem 0 2rem 0;
    }
`

const FeelDivCover = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const FeelDiv = styled.div`
    margin: 0.2rem;
    width: 25%;
    height: 15vh;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ mood }) => {
        switch (mood) {
            case 'dissatisfied':
                return '#FF3B30';
            case 'bad':
                return '#FF9500';
            case 'soso':
                return '#FFCC00';
            case 'good':
                return '#34C759';
            case 'happy':
                return '#00C7BE';
            default:
                return 'gray';
        }
    }};
    @media screen and (max-width: 600px) {
        width: 40%;
        height: 10vh;
    }

    img {
        width: 100%;
        height: 8vh;
        margin-top: 0.5rem;
    }
`
const DiaryTextCover = styled.div`
    width: 85%;
    height: 5vh;
    display: flex;
    align-items: end;
    justify-content: space-between;
    p {
        margin: 0 0.5rem 0 0.5rem;
    }
`

const DiaryViewAll = styled.a`
    text-decoration: none;
    fontSize: 0.8rem;
    color: gray;
    fontWeight: bold;
    margin: 0 0.5rem 0 0.5rem;
`

const DiaryContainer = styled.div`
    width: 85%;
    min-height: 50vh;
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

const MenuContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    width: 120px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 10px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const DiaryEntry = styled.div`
    width: 85%;
    margin: 1rem auto 3rem;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    position: relative;
    box-sizing: border-box;
`;

const EntryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
`;

const TimeBlock = styled.div`
    display: inline-flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
    background-color: #34C759;
    padding: 5px 10px;
    border-radius: 5px;
`;

const EntryDateText = styled.span`
    font-size: 14px;
    color: #555;
`;

const EntryTitle = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const EntryContent = styled.p`
    margin: 10px 0;
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
`;

export const MyDiary = () => {
    const navi = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <DiaryBackground>
            <FeelContainer onClick={() => navi('/my-diary-write')}>
                <CoverFeelDiv>
                    <DiaryName>
                        안녕하세요 서준님,
                    </DiaryName>
                    <DiaryToday>
                        오늘의 하루는<br /> 어떠셨나요?
                    </DiaryToday>
                    <FeelDivCover>
                        <FeelDiv mood='dissatisfied'>
                            <img src={angry} />
                        </FeelDiv>
                        <FeelDiv mood='bad'>
                            <img src={depress} />
                        </FeelDiv>
                        <FeelDiv mood='soso'>
                            <img src={normal} />
                        </FeelDiv>
                        <FeelDiv mood='good'>
                            <img src={good} />
                        </FeelDiv>
                        <FeelDiv mood='happy'>
                            <img src={happy} />
                        </FeelDiv>
                    </FeelDivCover>
                </CoverFeelDiv>
            </FeelContainer>
            <DiaryTextCover>
                <p style={{ fontSize: '1.4rem', color: 'gray', fontWeight: 'bold' }}>최근 일기</p>
                <DiaryViewAll href='my-diary-collection'>모두 보기</DiaryViewAll>
            </DiaryTextCover>
            <DiaryEntry>
                <EntryHeader>
                    <img src={good} alt="좋음" />
                    <MoreVertIcon onClick={toggleMenu} style={{ cursor: 'pointer' }} />
                    {menuVisible && (
                        <MenuContainer>
                            <MenuItem>
                                <EditIcon />
                                <span>Edit</span>
                            </MenuItem>
                            <MenuItem>
                                <DeleteIcon />
                                <span>Delete</span>
                            </MenuItem>
                        </MenuContainer>
                    )}
                </EntryHeader>
                <TimeBlock>
                    <AccessTimeFilledIcon style={{ width: '15px' }} />
                    <EntryDateText>28 May 21</EntryDateText>
                </TimeBlock>
                <EntryTitle>비트캠프에서의 첫 날</EntryTitle>
                <EntryContent>
                    오늘은 비트캠프에 처음 왔다.
                    <br />
                    처음에는 많이 긴장했지만, 새로운 분들이 친절하게 맞아주셔서 금방 긴장이 풀렸다.
                    <br /><br />
                    오늘은 HTML, CSS, JavaScript에 대해 간단하게 배웠다.
                    앞으로도 열심히 해야지.
                </EntryContent>
            </DiaryEntry>
            {/* <DiaryContainer>
                <DiaryDiv>
                    <DiarySpaceBetween>
                        <img src={angry} style={{
                            width: '3rem',
                            height: '3rem'
                        }} />
                        <DiaryButton>
                            <MoreVertIcon  onClick={toggleMenu} 
                                style={{ cursor: 'pointer', height: '2rem', width: '2rem'
                            }} />
                            {menuVisible && (
                                <MenuContainer>
                                    <MenuItem>
                                        <EditIcon />
                                        <span>Edit</span>
                                    </MenuItem>
                                    <MenuItem>
                                        <DeleteIcon />
                                        <span>Delete</span>
                                    </MenuItem>
                                </MenuContainer>
                    )}
                        </DiaryButton>
                    </DiarySpaceBetween>
                    <DiaryCalendar>
                        <ScheduleIcon style={{ marginRight: '0.1rem' }} />
                        <span>28 May 21</span>
                    </DiaryCalendar>
                    <DiaryTitle>비트캠프 데브옵스 첫 날</DiaryTitle>
                    <DiaryContent>인터넷이 끊켰다<br />나는 너무 슬프다.</DiaryContent>
                </DiaryDiv>
            </DiaryContainer> */}
        </DiaryBackground>
    );
};

export default MyDiary;