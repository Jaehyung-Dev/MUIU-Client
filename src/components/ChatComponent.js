// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ncloudchat from 'ncloudchat';


// const HeaderContainer = styled.header`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 15px;
//   background-color: white;
//   position: fixed;
//   top: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 100%;
//   max-width: 600px;
//   box-sizing: border-box;
//   z-index: 1000;
// `;

// const BackButton = styled.div`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
// `;

// const Title = styled.h1`
//   font-weight: 700;
//   color: black;
//   font-size: 18px;
//   margin: 0 auto;
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
// `;

// const ChatContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   height: 100vh;
//   width: 100%;
//   box-sizing: border-box;
//   overflow: hidden;
// `;

// const MessagesContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
//   height: 68vh;
//   background-color: #ffffff;
//   border-radius: 10px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const MessageWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
//   margin-bottom: 20px;
//   position: relative;
// `;

// const Message = styled.div`
//   background-color: ${({ $isUser }) => ($isUser ? '#007bff' : '#e0e0e0')};
//   color: ${({ $isUser }) => ($isUser ? 'white' : 'black')};
//   padding: 10px;
//   border-radius: 20px;
//   max-width: 80%;
//   word-wrap: break-word;
//   width: fit-content;
//   min-width: 0px;
//   margin-left: ${({ $isUser }) => ($isUser ? 'auto' : '0')};
//   margin-right: ${({ $isUser }) => ($isUser ? '0' : 'auto')};
//   white-space: pre-wrap;
// `;

// const Timestamp = styled.span`
//   font-size: 12px;
//   color: #888;
//   margin-top: 5px;
//   position: absolute;
//   top: 100%;
//   ${({ $isUser }) => ($isUser ? 'right: 10px;' : 'left: 0;')}
// `;

// const MessageInputContainer = styled.div`
//   display: flex;
//   width: 100%;
//   max-width: 600px;
//   padding: 10px;
//   background-color: #ffffff;
//   border-top: 1px solid #e0e0e0;
//   box-sizing: border-box;
// `;

// const MessageInput = styled.input`
//   flex: 1;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   font-size: 16px;
//   margin-right: 10px;
// `;

// const SendButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ChatComponent = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [ncChat, setNcChat] = useState(null);
//   const navigate = useNavigate();
//   const [nc, setNc] = useState(null);

//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         const userName = localStorage.getItem('userName'); // 이름을 저장한 경우 사용
//         const token = localStorage.getItem('token');

//         if (!userId || !token) {
//           console.error("로그인 정보가 없습니다. 다시 로그인하세요.");
//           return;
//         }

//         const ncInstance = new ncloudchat.Chat();
//         setNc(ncInstance);

//         await ncInstance.initialize('YOUR_PROJECT_ID'); // 프로젝트 ID를 입력

//         await ncInstance.connect({
//           id: userId, // 유저 ID
//           name: userName || 'Guest', // 유저 이름이 없을 경우 기본값
//           profile: '', // 프로필 이미지 URL을 넣을 수 있음, 없으면 빈 값으로 유지
//           language: 'ko', // 한국어로 설정
//           customField: {}, // 필요시 사용자 정의 필드를 추가 가능
//           token: token // JWT 토큰 사용
//         });

//         console.log('Ncloud Chat 연결 성공');
//       } catch (error) {
//         console.error('Ncloud Chat 연결 중 오류 발생:', error);
//       }
//     };

//     initializeChat();
//   }, []);

//   const handleSendMessage = () => {
//     if (message.trim() !== '' && ncChat) {
//       const newMessage = {
//         content: message,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         sender: userId,
//       };

//       // 메시지 보내기
//       ncChat.sendMessage('채널_ID', newMessage);
//       setMessages((prev) => [...prev, newMessage]);
//       setMessage('');
//     }
//   };

//   return (
//     <>
//       <HeaderContainer>
//         <BackButton onClick={() => navigate(-1)}>
//           <ArrowBackIosIcon />
//         </BackButton>
//         <Title>정다은 상담사</Title>
//       </HeaderContainer>
//       <ChatContainer>
//         <MessagesContainer>
//           {messages.map((msg, index) => (
//             <MessageWrapper key={index} $isUser={msg.sender === userId}>
//               <Message $isUser={msg.sender === userId}>{msg.content}</Message>
//               <Timestamp $isUser={msg.sender === userId}>{msg.timestamp}</Timestamp>
//             </MessageWrapper>
//           ))}
//         </MessagesContainer>
//         <MessageInputContainer>
//           <MessageInput
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="메시지를 입력하세요"
//           />
//           <SendButton onClick={handleSendMessage}>Send</SendButton>
//         </MessageInputContainer>
//       </ChatContainer>
//     </>
//   );
// };

// export default ChatComponent;

import React from 'react'

const ChatComponent = () => {
    return (
        <div>ChatComponent</div>
    );
};

export default ChatComponent;
