import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import angry from '../svg/angry.svg';
import depress from '../svg/depress.svg';
import normal from '../svg/normal.svg';
import good from '../svg/good.svg';
import happy from '../svg/happy.svg';
import { useNavigate } from 'react-router-dom';
import MD_Block from '../components/MD_Block';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
    height: 40vh;
    margin: 2rem auto;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 600px) {
        height: 30vh;
    }

    &:hover {
        cursor: pointer;
    }
`;

const CoverFeelDiv = styled.div`
    box-sizing: border-box;
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 600px) {
        margin: 1rem;
    }
`;

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
`;

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
`;

const FeelDivCover = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`;

const FeelDiv = styled.div`
    margin: 0.2rem;
    width: 25%;
    height: 13vh;
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
        width: 80%;
        height: 8vh;
        margin-top: 0.5rem;
    }
`;

const DiaryTextCover = styled.div`
    width: 85%;
    height: 5vh;
    display: flex;
    align-items: end;
    justify-content: space-between;
    p {
        margin: 0 0.5rem 0 0.5rem;
    }
`;

const DiaryViewAll = styled.a`
    text-decoration: none;
    font-size: 0.8rem;
    color: gray;
    font-weight: bold;
    margin: 0 0.5rem 0 0.5rem;
`

export const MyDiary = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null); 
    const navi = useNavigate();
    const isLoginChk = useSelector((state) => state.memberSlice.isLogin);

    useEffect(() => {
        if(!isLoginChk) {
          navi('/');
        }
      }, [isLoginChk, navi]);

    useEffect(() => {
         // 페이지 진입 시 스크롤을 맨 위로 설정
        window.scrollTo(0, 0);

        const fetchUserData = async () => {
            try {
                const persistRoot = sessionStorage.getItem('persist:root');
                const parsedRoot = JSON.parse(persistRoot);
                const memberSlice = JSON.parse(parsedRoot.memberSlice);

                const response = await axios.get(`http://localhost:9090/members/${memberSlice.id}/name`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                    withCredentials: true,
                });
                
                setUserData({
                    name: response.data.item.name.slice(1)
                });
            } catch (error) {
                console.error('오류:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <DiaryBackground>
            <FeelContainer onClick={() => navigate('/my-diary-write')}>
                <CoverFeelDiv>
                    <DiaryName>
                        안녕하세요 {userData?.name || '이용자'}님,
                    </DiaryName>
                    <DiaryToday>
                        오늘의 하루는<br /> 어떠셨나요?
                    </DiaryToday>
                    <FeelDivCover>
                        <FeelDiv mood="dissatisfied">
                            <img src={angry} alt="angry" />
                        </FeelDiv>
                        <FeelDiv mood="bad">
                            <img src={depress} alt="depress" />
                        </FeelDiv>
                        <FeelDiv mood="soso">
                            <img src={normal} alt="normal" />
                        </FeelDiv>
                        <FeelDiv mood="good">
                            <img src={good} alt="good" />
                        </FeelDiv>
                        <FeelDiv mood="happy">
                            <img src={happy} alt="happy" />
                        </FeelDiv>
                    </FeelDivCover>
                </CoverFeelDiv>
            </FeelContainer>
            <DiaryTextCover>
                <p style={{ fontSize: '1.4rem', color: 'gray', fontWeight: 'bold' }}>최근 일기</p>
                <DiaryViewAll href="my-diary-collection">모두 보기</DiaryViewAll>
            </DiaryTextCover>
            <MD_Block />
        </DiaryBackground>
    );
};

export default MyDiary;
