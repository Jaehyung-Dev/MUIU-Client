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

const Content = styled.div`
    margin: 5vh 0;

    // @media (max-width: 393px) {
    //     font-size: 20px;
    // }

    p {
        color: #232323C4;
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
            <Content>
                <h1>긴급상담</h1>
                <p>급하게 대화가 필요하거나 도움이 필요할 때, <br></br>
                부담없이 이용해주세요</p>
            </Content>
            <ShortHr />
        </ConsultationSection>
    );
};

export default AICounseling;

// 일단 보류