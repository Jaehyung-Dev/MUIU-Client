import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled.div`
    text-align: center;
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
    margin-bottom: 5vh;

    @media (max-width: 393px) {
        font-size: 20px;
        margin-bottom: 2vh;
    }
`;

const ShortHr = styled.hr`
    width: 200px;
    border: 0.5px solid #878787;
    margin: 10px auto 5vh auto;

    @media (max-width: 393px) {
        width: 150px;
        margin: 10px auto 3vh auto;
    }
`;

const ConsultationSubText = styled.p`
    font-size: 14px;
    color: #555;
    margin-bottom: 5vh;
    @media (max-width: 393px) {    
        margin-bottom: 2vh;
    }
`;

const OptionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-items: center;
    padding: 0 140px;
    margin-left: -20px;
    @media (max-width: 393px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        justify-items: center;
        padding: 0 50px;
        margin-left: 0px;
    }
`;

const Option = styled.div`
    background-color: ${({ bgColor }) => bgColor || '#f5f5f5'};
    border-radius: 15px;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media (max-width: 393px) {
        width: 120px;
        height: 120px;
    }
`;

const OptionText = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-top: 10px;
`;

const OptionSubText = styled.div`
    font-size: 13px;
`;

const NewConsultation = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <ImageBanner>
                <img src={`${process.env.PUBLIC_URL}/images/AI-header-img.png`} alt="Room Image" />
            </ImageBanner>
            <Title>비대면 상담 진행</Title>
            <ConsultationSubText>내담자 요구는 성실하게 상담에 임할 것을 약속합니다.</ConsultationSubText>
            <ShortHr />

            <OptionsContainer>
                <Option bgColor="#FFE5D8" onClick={() => { navigate('/video-consultation');}} >                    <VideoCallIcon style={{ fontSize: '40px', color: '#FF3D3B' }} />
                    <OptionText style={{color: '#FF3D3B'}}>영상 상담</OptionText>
                    <OptionSubText style={{color: '#FF3D3B'}}>대기 혼잡</OptionSubText>
                </Option>

                <Option bgColor="#FFEFCC">
                    <CallIcon style={{ fontSize: '40px', color: '#FF8800' }} />
                    <OptionText style={{color: '#FF8800'}}>전화 상담</OptionText>
                    <OptionSubText style={{color: '#FF8800'}}>대기 보통</OptionSubText>
                </Option>

                <Option bgColor="#DEF6DE">
                    <ChatIcon style={{ fontSize: '40px', color: '#19A03C' }} />
                    <OptionText style={{color: '#19A03C'}}>채팅 상담</OptionText>
                    <OptionSubText style={{color: '#19A03C'}}>대기 양호</OptionSubText>
                </Option>

                <Option bgColor="#FFF">
                    <EditIcon style={{ fontSize: '40px', color: '#4B4B4B' }} />
                    <OptionText style={{color: '#4B4B4B'}}>비대면 상담</OptionText>
                    <OptionSubText style={{color: '#4B4B4B'}}>나의 마음을 알려주세요</OptionSubText>
                </Option>
            </OptionsContainer>
        </Container>
    );
};

export default NewConsultation;
