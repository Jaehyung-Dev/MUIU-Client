import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import axios from 'axios';
import styled from 'styled-components';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSelector } from 'react-redux';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #ffffff;
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

const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  position: relative;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const Message = styled.div`
  background-color: ${({ $isUser, $isEmoji }) => ($isEmoji ? 'transparent' : $isUser ? '#fbbf24' : '#ffffff')};
  color: ${({ $isUser, $isEmoji }) => ($isEmoji ? 'transparent' : $isUser ? 'white' : 'black')};
  padding: ${({ $isEmoji }) => ($isEmoji ? '0' : '10px')};
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  width: fit-content;
  white-space: pre-wrap;
  margin-left: ${({ $isUser }) => ($isUser ? 'auto' : '15px')};
  margin-right: ${({ $isUser }) => ($isUser ? '15px' : 'auto')};
  margin-top: 5px;
  margin-bottom: 5px;
`;

const EmojiImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  position: relative;
  height: calc(100vh);
  background-color: #f2f2f2;
  padding-top: 170px;
  padding-bottom: 100px;
  box-sizing: border-box;
  overflow-y: auto;
`;


const EmojiOverlay = styled.div`
  position: fixed;
  bottom: 190px;
  width: 580px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 1000;
  @media (max-width: 393px) {
    width: 370px;
    bottom: 135px;
  }
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 70px);
  gap: 10px;
  justify-content: center;
  @media (max-width: 393px) {
    grid-template-columns: repeat(6, 50px);
    gap: 10px;
  }
`;

const EmojiButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

const MessageInputContainerWrapper = styled.div`
  position: fixed;
  bottom: 75px;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding-bottom: 60px;
  @media (max-width: 393px) {
    bottom: 15px;
  }
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #fbbf24;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: #F1B10D;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ImageButton = styled.button`
  background-color: #fbbf24;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #F1B10D;
  }
`;

const SystemMessage = styled.div`
  text-align: center;
  font-size: 15px;
  color: #888;
  margin: 10px 0;
`;

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [clientName, setClientName] = useState('');
  const [counselorName, setCounselorName] = useState('');

  // Emoji 이미지 경로
  const emojiImages = [
    'bboong-emoji.png',
    'cheer-up-emoji.png',
    'cold-emoji.png',
    'connect-emoji.png',
    'engg-emoji.png',
    'fighting-emoji.png',
    'flying-emoji.png',
    'hi-emoji.png',
    'love-emoji.png',
    'nervous-emoji.png',
    'punch-emoji.png',
    'quiet-emoji.png',
    'sad-emoji.png',
    'shy-emoji.png',
    'sick-emoji.png',
    'sleepy-emoji.png',
    'support-emoji.png',
    'surprise-emoji.png',
  ];

  const userId = (() => {
    const persistRoot = sessionStorage.getItem('persist:root');
    if (persistRoot) {
      const parsedRoot = JSON.parse(persistRoot);
      const memberSlice = JSON.parse(parsedRoot.memberSlice);
      return memberSlice?.id || null;
    }
    return null;
  })();

  const userRole = useSelector((state) => state.memberSlice.role);

  const handleBackClick = () => {
    leaveChatRoom();
    navigate(-1);
  };

  useEffect(() => {
    if(chatRoomId) {
    const socket = new SockJS('http://localhost:9090/ws');
    const client = Stomp.over(socket);
  
    client.reconnectDelay = 5000;
  
    client.connect({}, () => {
      console.log('STOMP 클라이언트가 성공적으로 연결되었습니다.');
      setStompClient(client);
      setIsConnected(true);
  
      client.subscribe(`/topic/${chatRoomId}/messages`, (message) => {
        console.log('메시지 수신:', message);
        console.log(message);
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage);
        if (!clientName && receivedMessage.clientName) {
          setClientName(receivedMessage.clientName);
      }
      if (!counselorName && receivedMessage.counselorName) {
          setCounselorName(receivedMessage.counselorName);
      }
        setMessages((prev) => [...prev, receivedMessage]);
      });
      
    }, (error) => {
      console.error('STOMP 연결 오류:', error);
      setIsConnected(false);
    });
  
    return () => {
      if (client && client.connected) {
        console.log("Sending idle status update for memberId:", userId);
        client.send('/app/chat/exit', {}, JSON.stringify({ memberId: userId }));
        client.disconnect(() => console.log('STOMP 클라이언트가 연결 해제되었습니다.'));
      } else {
        console.warn("STOMP 연결이 설정되지 않아 'idle' 상태 전송을 건너뜁니다.");
      }
    };}
  }, [userId, chatRoomId]);
  
  const createOrEnterChatRoom = async () => {
    try {
        const apiUrl = userRole === 'ROLE_COUNSELOR' ? 'http://localhost:9090/chat/create' : 'http://localhost:9090/chat/enter';
        const response = await axios.post(apiUrl, { id: userId });

        setChatRoomId(response.data.id);
        if(response.data.enter) {
          setConnected(true);
        }
    } catch (error) {
        console.log("채팅방 생성 또는 입장 중 오류:", error);
    }
};

  useEffect(() => {
    if(connected && stompClient) {
      stompClient.send(`/app/chat.connect/${chatRoomId}`, {});
    }
  }, [connected, stompClient, chatRoomId]);

  useEffect(() => {
      createOrEnterChatRoom(); 
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("userId가 없습니다. 사용자 정보를 불러올 수 없습니다.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:9090/members/${userId}/name`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
          withCredentials: true,
        });
        setUserData({
          name: response.data.item.name,
          role: response.data.item.role,
        });
      } catch (error) {
        console.error("오류:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) {
        console.error("STOMP 연결이 설정되지 않았습니다.");
        return;
    }

    if (message.trim() !== '') {
        const chatMessage = {
            sender: `${userData.name}`,
            content: message,
            type: 'CHAT', 
            chatRoomId: chatRoomId
        };
        stompClient.send(`/app/chat.sendMessage/${chatRoomId}`, {}, JSON.stringify(chatMessage));
        setMessage('');
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    if (stompClient && stompClient.connected && userData && userData.name) {
      const chatMessage = {
        sender: `${userData.name}`,
        content: emoji,
        type: 'EMOJI',
      };
    
      stompClient.send(`/app/chat.sendMessage/${chatRoomId}`, {}, JSON.stringify(chatMessage));
      setShowEmojiPicker(false);
    } 
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const leaveChatRoom = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/chat/exit', {}, JSON.stringify({ memberId: userId }));
      console.log('사용자가 채팅방을 떠났습니다. 상태가 IDLE로 전환되었습니다.');
      stompClient.disconnect();
      
      axios.post(`http://localhost:9090/chat/exit/${chatRoomId}`)
        .then(() => console.log('Chat room status updated to exit'))
        .catch((error) => console.error('Failed to update chat room status:', error));
    } else {
      console.warn("STOMP 연결이 설정되지 않아 채팅방 나가기를 건너뜁니다.");
    }
  };
  
  
  useEffect(() => {
    const handleUnload = () => leaveChatRoom();
      window.addEventListener('beforeunload', handleUnload);
      document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        leaveChatRoom();
      }
    });
  
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleUnload);
    };
  }, [stompClient, userId]);
  

  return (
    <>
      <HeaderContainer>
        <BackButton onClick={handleBackClick}>
          <ArrowBackIosIcon />
        </BackButton>
        <Title>
            {userRole && userRole === 'ROLE_COUNSELOR' ? `${clientName} 내담자` : `${counselorName} 상담사`}
          </Title>
      </HeaderContainer>
      <ChatContainer ref={chatContainerRef}>
      {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.type === 'LEAVE' || msg.type === 'JOIN' ? (
              <SystemMessage>{msg.content}</SystemMessage>
            ) : (
              <MessageWrapper $isUser={msg.sender === `${userData?.name}`}>
                <Message $isUser={msg.sender === `${userData?.name}`} $isEmoji={msg.type === 'EMOJI'}>
                  {msg.type === 'EMOJI' ? (
                    <EmojiImage src={`/images/Emoji/${msg.content}`} alt="emoji" />
                  ) : (
                    msg.content
                  )}
                </Message>
              </MessageWrapper>
            )}
          </React.Fragment>
        ))}
        {showEmojiPicker && (
          <EmojiOverlay>
            <EmojiPicker>
              {emojiImages.map((emoji, index) => (
                <EmojiButton
                  key={index}
                  src={`/images/Emoji/${emoji}`}
                  alt={`emoji-${index}`}
                  onClick={() => handleEmojiSelect(emoji)}
                />
              ))}
            </EmojiPicker>
          </EmojiOverlay>
        )}
        <div ref={bottomRef} />
      </ChatContainer>
      <MessageInputContainerWrapper>
        <MessageInputContainer>
          <MessageInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <SendButton 
              onClick={sendMessage} 
              disabled={message.trim() === ''}
          >
              전송
          </SendButton>
          <ImageButton onClick={toggleEmojiPicker}>
            <InsertEmoticonIcon />
          </ImageButton>
        </MessageInputContainer>
      </MessageInputContainerWrapper>
    </>
  );
};

export default Chat;