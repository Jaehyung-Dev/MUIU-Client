import React from 'react';
import styled from 'styled-components';

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

export const AICounseling = () => {
    return (
        <ConsultationSection>
            <ImageBanner>
                <img src={`${process.env.PUBLIC_URL}/images/AI_header_img.png`} alt='긴급상담 헤더 이미지' />
            </ImageBanner>
            <Title>긴급상담</Title>
            <ShortHr />
        </ConsultationSection>
    );
};

export default AICounseling;