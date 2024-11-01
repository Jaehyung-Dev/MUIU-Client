import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

const ScreenContainer = styled.div`
    height: 100vh;
    width: 100vw;
    max-width: 600px;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const VideoBox = styled.div`
    width: 130px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const signalingSocketRef = useRef(null);
    const [isCameraOn, setCameraOn] = useState(true);

    useEffect(() => {
        // WebSocket을 통한 Signaling 서버 연결
        signalingSocketRef.current = new WebSocket('ws://localhost:9090/ws-signaling');
        
        signalingSocketRef.current.onopen = () => {
            console.log('Connected to the signaling server');
        };

        signalingSocketRef.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            switch (data.type) {
                case 'offer':
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    const answer = await peerConnectionRef.current.createAnswer();
                    await peerConnectionRef.current.setLocalDescription(answer);
                    sendSignal('answer', answer);
                    break;
                case 'answer':
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    break;
                case 'candidate':
                    if (data.candidate) {
                        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                    }
                    break;
                default:
                    break;
            }
        };

        signalingSocketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        const startVideo = async () => {
            try {
                const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

                peerConnectionRef.current = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
                });

                localStream.getTracks().forEach((track) => {
                    peerConnectionRef.current.addTrack(track, localStream);
                });

                peerConnectionRef.current.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    }
                };

                peerConnectionRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        sendSignal('candidate', event.candidate);
                    }
                };

                const isCaller = true; // 실제 조건에 따라 설정
                if (isCaller) {
                    const offer = await peerConnectionRef.current.createOffer();
                    await peerConnectionRef.current.setLocalDescription(offer);
                    sendSignal('offer', offer);
                }
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };

        startVideo();

        return () => {
            if (localVideoRef.current?.srcObject) {
                localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (signalingSocketRef.current) {
                signalingSocketRef.current.close();
            }
        };
    }, []);

    const toggleCamera = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
                setCameraOn(track.enabled);
            });
        }
    };

    const sendSignal = (type, data) => {
        if (signalingSocketRef.current && signalingSocketRef.current.readyState === WebSocket.OPEN) {
            signalingSocketRef.current.send(JSON.stringify({
                type,
                sdp: data.sdp || null,
                candidate: data.candidate || null,
            }));
        }
    };

    return (
        <ScreenContainer>
            <StyledVideo ref={remoteVideoRef} autoPlay playsInline />
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
