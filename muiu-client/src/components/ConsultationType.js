import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ConsultationSection = styled.section`
    text-align: center;
    padding: 0;
    flex: 1;
`;

const ImageBanner = styled.div`
    width: 100%;
    margin: 0;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
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
    gap: 10px;
    justify-content: space-between;
    padding: 0 20px;

    @media (max-width: 600px) {
        gap: 15px;
    }

    @media (max-width: 393px) {
        gap: 10px;
    }
`;

const ConsultationType = () => {
    return (
        <ConsultationSection>
            <ImageBanner>
                <img src={`${process.env.PUBLIC_URL}/background.png`} alt="Room Image" />
            </ImageBanner>
            <Title>상담 유형 선택</Title>
            <ShortHr />
            <ButtonContainer>
                <Button text="신규 상담" subtext="시작하기" />
                <Button text="기존 상담" subtext="이어하기" />
            </ButtonContainer>
        </ConsultationSection>
    );
};

export default ConsultationType;
