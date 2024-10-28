import React, { useEffect, useRef, useState } from 'react';

const AudioCall = () => {
  const [isConnected, setIsConnected] = useState(false);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnection = useRef(null);
  const webSocket = useRef(null);

  useEffect(() => {
    // Signaling 서버에 연결
    webSocket.current = new WebSocket('ws://localhost:9090/my-websocket');
    webSocket.current.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data); // JSON 파싱
            console.log('Received message:', data);
        } catch (error) {
            console.log('Parsing error:', error);
        }
    };        

    // Peer-to-Peer 연결 설정
    const setupPeerConnection = async () => {
      peerConnection.current = new RTCPeerConnection();

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          webSocket.current.send(JSON.stringify({ iceCandidate: event.candidate }));
        }
      };

      peerConnection.current.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localAudioRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
    };

    setupPeerConnection();
  }, []);

  const initiateCall = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    webSocket.current.send(JSON.stringify({ offer }));
    setIsConnected(true);
  };

  return (
    <div>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
      <button onClick={initiateCall} disabled={isConnected}>
        Start Call
      </button>
    </div>
  );
};

export default AudioCall;
