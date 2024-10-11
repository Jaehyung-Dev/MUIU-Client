import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  z-index: 1000;
`;

const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-weight: 700;
  color: black;
  font-size: 18px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 68vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
  position: relative;
`;

const Message = styled.div`
  background-color: ${({ $isUser }) => ($isUser ? '#007bff' : '#e0e0e0')};
  color: ${({ $isUser }) => ($isUser ? 'white' : 'black')};
  padding: 10px;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  width: fit-content;
  min-width: 0px;
  margin-left: ${({ $isUser }) => ($isUser ? 'auto' : '0')};
  margin-right: ${({ $isUser }) => ($isUser ? '0' : 'auto')};
  white-space: pre-wrap;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  position: absolute;
  top: 100%;
  ${({ $isUser }) => ($isUser ? 'right: 10px;' : 'left: 0;')}
`;

const MessageInputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);  // 여기에 messages와 setMessages 선언 추가
    const [channelId, setChannelId] = useState('123');
    const [stompClient, setStompClient] = useState(null);
  
    const navigate = useNavigate();
  
    // 로그인된 사용자 ID 가져오기
    const userId = localStorage.getItem('userId');
  
    useEffect(() => {
        if (!userId) {
          console.error("User ID is not available. Please log in first.");
          return;
        }
      
        const socket = new SockJS('http://localhost:9090/ws-chat');
        const client = new Client({
          webSocketFactory: () => socket,
          debug: (str) => {
            console.log(str);
          },
          reconnectDelay: 5000,
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      
        client.onConnect = () => {
          console.log('Connected to WebSocket');
          client.subscribe(`/topic/messages/${channelId}`, (msg) => {
            if (msg.body) {
              const newMessage = JSON.parse(msg.body);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          });
      
          // stompClient가 연결된 후에야 메시지를 전송할 수 있도록 설정
          setStompClient(client);
        };
      
        client.onStompError = (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        };
      
        client.activate();
      
        return () => {
          if (client) {
            client.deactivate(() => {
              console.log('Disconnected from WebSocket');
            });
          }
        };
      }, [channelId, userId]);
      
  
    const handleSendMessage = async () => {
        if (message.trim() !== '' && userId) {
          const newMessage = {
            channelId: channelId,
            content: message,
            sender: userId,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
      
          try {
            const token = localStorage.getItem('token');
            // stompClient가 초기화되었고, 연결이 완료되었는지 확인
            if (stompClient && stompClient.connected) {
              console.log('Sending message via WebSocket:', newMessage);
              stompClient.publish({
                destination: `/app/chat/${channelId}`,
                body: JSON.stringify(newMessage),
              });
      
              // 메시지를 DB에 저장하기 위해 서버로 요청 전송
              await axios.post('http://localhost:9090/api/chat/send', newMessage, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });
            } else {
              throw new Error('WebSocket is not connected or token is missing');
            }
          } catch (error) {
            console.error('Error sending message:', error);
            alert('메시지를 전송하는 중 문제가 발생했습니다.');
          }
        } else {
          console.error('User ID is not available or message is empty');
        }
      };
      
  
    const handleBackClick = () => {
      navigate(-1);
    };
  
    return (
      <>
        <HeaderContainer>
          <BackButton onClick={handleBackClick}>
            <ArrowBackIosIcon />
          </BackButton>
          <Title>정다은 상담사</Title>
        </HeaderContainer>
        <ChatContainer>
          <MessagesContainer>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <MessageWrapper key={index} $isUser={msg.sender === userId}>
                  {msg.sender === userId ? (
                    <>
                      <Message $isUser={msg.sender === userId}>{msg.content}</Message>
                      <Timestamp $isUser={msg.sender === userId}>{msg.timestamp}</Timestamp>
                    </>
                  ) : (
                    <>
                      <Timestamp $isUser={msg.sender !== userId}>{msg.timestamp}</Timestamp>
                      <Message $isUser={msg.sender !== userId}>{msg.content}</Message>
                    </>
                  )}
                </MessageWrapper>
              ))
            ) : (
              <p></p>
            )}
          </MessagesContainer>
          <MessageInputContainer>
            <MessageInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </MessageInputContainer>
        </ChatContainer>
      </>
    );
  };
  
  export default ChatComponent;
  