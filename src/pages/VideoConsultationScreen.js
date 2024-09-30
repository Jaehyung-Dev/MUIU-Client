import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

const ScreenContainer = styled.div`
    height: 80vh;
    width: 100vw;
    max-width: 600px;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 393px) {
        transform: translateX(-3.33%);
        height: 92vh;
    }
`;

const VideoBox = styled.div`
    width: 100px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    margin-top: 80px;
    margin-right: -65vw;
    @media (min-width: 393px) {
        margin-right: -40vw;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    margin-top: auto;
    margin-bottom: 50px;
`;

const Button = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${({ color }) => color || 'gray'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        font-size: 30px;
        color: ${({ iconColor }) => iconColor || 'black'};  
    }
`;

const VideoConsultationScreen = () => {
    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <VideoBox />
            <ButtonGroup>
                <Button color="white" iconColor="black">
                    <CallIcon />
                </Button>
                <Button color="red" iconColor="white" onClick={() => { navigate(-1);}}>
                    <CloseIcon />
                </Button>
                <Button color="darkgray" iconColor="white">
                    <CameraswitchIcon />
                </Button>
            </ButtonGroup>
        </ScreenContainer>
    );
};

export default VideoConsultationScreen;
