// Frontend: React Component for 1:1 Audio Call Based on Role
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
  background: linear-gradient(to bottom, #272727, #4b4b4b); 
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Header = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 0.5;
`;

const AcceptCall = styled.div`
  width: 100px;
  height: 100px;
  background-color: #4CD964;
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  position: fixed;
  bottom: 150px;
  left: 60px;
`;

const Call = styled(CallIcon)`
  color: #fff;
  scale: 2.5;
`;

const EndCall = styled.div`
  width: 100px;
  height: 100px;
  background-color: #E02D2D;
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  position: fixed;
  bottom: 150px;
  right: 60px; 
`;

const End = styled(CloseIcon)`
  color: #fff;
  scale: 2.5;
`;

const AudioCall = () => {
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const [callPartner, setCallPartner] = useState({ role: '', name: '' });
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const userRole = useSelector((state) => state?.user?.role || '');
  const userName = useSelector((state) => state?.user?.name || '');
  const [roomId, setRoomId] = useState(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    // Fetch call partner data when component mounts
    const fetchCallPartner = async () => {
      try {
        const response = await axios.get(`/api/call/partner?role1=${userRole}&role2=${userRole === 'ROLE_USER' ? 'ROLE_COUNSELOR' : 'ROLE_USER'}`);
        setCallPartner(response.data);
        setRoomId(response.data.id);
      } catch (error) {
        console.error('Failed to fetch call partner', error);
      }
    };
    fetchCallPartner();
  }, [userRole]);

  useEffect(() => {
    let timer;
    if (isConnected) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  const initiateCall = async () => {
    // Logic to start the call
    try {
      await axios.post('/api/call/update-status', {
        roomId,
        status: 'BUSY',
      });
      setIsConnected(true);
      // WebRTC logic to initiate the call
      peerConnection.current = new RTCPeerConnection();

      // Add local audio stream to the peer connection
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        localAudioRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      });

      peerConnection.current.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the candidate to the remote peer
          // TODO: Implement signaling server logic to exchange ICE candidates
        }
      };

      // Create an offer and set local description
      peerConnection.current.createOffer().then((offer) => {
        return peerConnection.current.setLocalDescription(offer);
      }).then(() => {
        // TODO: Send the offer to the remote peer using the signaling server
      });
    } catch (error) {
      console.error('Failed to initiate call', error);
    }
  };

  const endCall = async () => {
    // Logic to end the call
    try {
      await axios.post('/api/call/update-status', {
        roomId,
        status: 'IDLE',
      });
      setIsConnected(false);
      // WebRTC logic to close the connection
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      if (localAudioRef.current && localAudioRef.current.srcObject) {
        localAudioRef.current.srcObject.getTracks().forEach((track) => track.stop());
        localAudioRef.current.srcObject = null;
      }
      remoteAudioRef.current.srcObject = null;
    } catch (error) {
      console.error('Failed to end call', error);
    }
  };

  const formatCallDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <Container>
        <Header>
          <h4>{callPartner.role}</h4>
          <h2>{callPartner.name}</h2>
          <h5>{formatCallDuration(callDuration)}</h5>
        </Header>
        <audio ref={localAudioRef} autoPlay muted playsInline />
        <audio ref={remoteAudioRef} autoPlay playsInline />
        <AcceptCall onClick={initiateCall} disabled={isConnected}>
          <Call />
        </AcceptCall>
        <EndCall onClick={endCall} disabled={!isConnected}>
          <End />
        </EndCall>
      </Container>
    </>
  );
};

export default AudioCall;