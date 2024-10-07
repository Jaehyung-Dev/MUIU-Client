import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Button from './HC_Button';

const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        overflow: auto; 
        height: auto; 
    }
`;

const ConsultationSection = styled.section`
    text-align: center;
    padding: 0;
    flex: 1;
`;

const ImageBanner = styled.div`
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;

        @media (min-width: 600px) {
            max-width: 600px;
            margin: 0 auto;
        }
    }
`;

const Title = styled.h1`
    margin-top: 5vh;
    margin-bottom: 8vh;

    @media (max-width: 393px) {
        font-size: 20px;
    }
`;

const ShortHr = styled.hr`
    width: 200px;
    border: 0.5px solid #878787;
    margin: 10px auto 7vh auto;

    @media (max-width: 393px) {
        width: 150px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 0 20px;

    @media (max-width: 600px) {
        gap: 20px;
    }

    @media (max-width: 393px) {
        gap: 20px;
    }
`;

const ConsultationType = () => {
    const navigate = useNavigate();

    const handleNewConsultationClick = () => {
        navigate('/new-consultation');
    };

    const handleExistingConsultationClick = () => {
        navigate('/existing-consultation');
    };

    return (
        <>
            <GlobalStyle />
            <ConsultationSection>
                <ImageBanner>
                    <img src={`${process.env.PUBLIC_URL}/images/background.png`} alt="Room Image" />
                </ImageBanner>
                <Title>상담 유형 선택</Title>
                <ShortHr />
                <ButtonContainer>
                    <Button text="신규 상담" subtext="시작하기" onClick={handleNewConsultationClick} />
                    <Button text="기존 상담" subtext="이어하기" onClick={handleExistingConsultationClick} />
                </ButtonContainer>
            </ConsultationSection>
        </>
    );
};

export default ConsultationType;
