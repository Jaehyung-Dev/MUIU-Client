import React, { useRef, useEffect, useState } from 'react';
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
        height: 100vh;
    }
`;

const VideoBox = styled.div`
    width: 130px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    margin-top: 80px;
    margin-right: -65vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (min-width: 393px) {
        margin-right: -28vw;
        margin-top: 30px;
    }
`;

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    margin-top: auto;
    margin-bottom: 50px;
    @media (min-width: 393px) {
        margin-bottom: 200px;
    }
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
    const localVideoRef = useRef(null);
    const [isCameraOn, setCameraOn] = useState(true);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };
        startVideo();

        return () => {
            if (localVideoRef.current && localVideoRef.current.srcObject) {
                const tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const toggleCamera = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
                setCameraOn(track.enabled);
            });
        }
    };

    return (
        <ScreenContainer>
            <VideoBox>
                <StyledVideo ref={localVideoRef} autoPlay playsInline muted />
            </VideoBox>
            <ButtonGroup>
                <Button color="white" iconColor="black">
                    <CallIcon />
                </Button>
                <Button color="red" iconColor="white" onClick={() => navigate(-1)}>
                    <CloseIcon />
                </Button>
                <Button color="darkgray" iconColor="white" onClick={toggleCamera}>
                    <CameraswitchIcon />
                </Button>
            </ButtonGroup>
        </ScreenContainer>
    );
};

export default VideoConsultationScreen;
