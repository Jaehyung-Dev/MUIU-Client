import React from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';

const DiaryBackground = styled.div`
    width: 100%;
    min-height: 90vh;
    background-color: #efefef;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FeelContainer = styled.div`
    width: 85%;
    height: 60vh;
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
`
const CoverFeelDiv = styled.div`
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
    font-size: 1.4rem;
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
    font-size: 2rem;
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
    switch(mood) {
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

export const MyDiary = () => {
    return (
        <DiaryBackground>
            <FeelContainer>
                <CoverFeelDiv>
                    <DiaryName>
                        안녕하세요 서준님,
                    </DiaryName>
                    <DiaryToday>
                        오늘의 하루는<br/> 어떠셨나요?
                    </DiaryToday>
                    <FeelDivCover>
                        <FeelDiv mood='dissatisfied'>
                            <img src='../svg/angry.svg'/>
                        </FeelDiv>
                        <FeelDiv mood='bad'>
                            <img src='../svg/depress.svg'/>
                        </FeelDiv>
                        <FeelDiv mood='soso'>
                            <img src='../svg/normal.svg'/>
                        </FeelDiv>
                        <FeelDiv mood='good'>
                            <img src='../svg/good.svg'/>
                        </FeelDiv>
                        <FeelDiv mood='happy'>
                            <img src='../svg/happy.svg'/>
                        </FeelDiv>
                    </FeelDivCover>
                </CoverFeelDiv>
            </FeelContainer>
            <DiaryTextCover>
                <p style={{fontSize: '1.4rem', color: 'gray', fontWeight: 'bold'}}>최근 일기</p>
                <DiaryViewAll href='my-diary-collection'>모두 보기</DiaryViewAll>
            </DiaryTextCover>
            <DiaryContainer>
                <DiaryDiv>
                    <DiarySpaceBetween>
                    <img src='../svg/angry.svg' style={{
                        width: '3rem',
                        height: '3rem'
                    }}/>
                        <DiaryButton>
                            <MoreVertIcon style={{
                                height: '2rem', width: '2rem'
                            }}/>
                        </DiaryButton>
                    </DiarySpaceBetween>
                    <DiaryCalendar>
                        <ScheduleIcon style={{marginRight: '0.1rem'}}/>
                        <span>28 May 21</span>
                    </DiaryCalendar>
                    <DiaryTitle>비트캠프 데브옵스 첫 날</DiaryTitle>
                    <DiaryContent>인터넷이 끊켰다<br/>나는 너무 슬프다.</DiaryContent>
                </DiaryDiv>
            </DiaryContainer>
        </DiaryBackground>
    );
};

export default MyDiary;