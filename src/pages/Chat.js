import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import styled from 'styled-components';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
  position: relative;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const Message = styled.div`
  background-color: ${({ $isUser, $isEmoji }) => ($isEmoji ? 'transparent' : $isUser ? '#fbbf24' : '#e0e0e0')};
  color: ${({ $isUser, $isEmoji }) => ($isEmoji ? 'transparent' : $isUser ? 'white' : 'black')};
  padding: ${({ $isEmoji }) => ($isEmoji ? '0' : '10px')};
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  width: fit-content;
  white-space: pre-wrap;
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
  margin: 0 auto;
  padding: 10px;
  position: relative;
`;

const EmojiOverlay = styled.div`
  position: absolute;
  bottom: 70px;
  width: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 1000;
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 70px);
  gap: 10px;
  justify-content: center;
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

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  useEffect(() => {
    const socket = new SockJS('http://localhost:9090/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log('STOMP 클라이언트가 성공적으로 연결되었습니다.');

      client.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });

      setStompClient(client);
      setIsConnected(true);
    }, (error) => {
      console.error('STOMP 연결 오류:', error);
      setIsConnected(false);
    });

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('STOMP 클라이언트가 연결 해제되었습니다.');
          setIsConnected(false);
        });
      }
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const persistRoot = sessionStorage.getItem('persist:root');
        const parsedRoot = JSON.parse(persistRoot);
        const memberSlice = JSON.parse(parsedRoot.memberSlice);

        const response = await axios.get(`http://localhost:9090/members/${memberSlice.id}/name`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
          withCredentials: true,
        });

        setUserData({
          name: response.data.item.name.slice(1),
        });
      } catch (error) {
        console.error('오류:', error);
      }
    };
    fetchUserData();
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim() !== '') {
      const chatMessage = {
        sender: `${userData.name}`,
        content: message,
        type: 'CHAT',
      };
  
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setMessage('');
    } else {
      console.error("STOMP 연결이 설정되지 않았습니다. 메시지를 보낼 수 없습니다.");
    }
  };
  

  const handleEmojiSelect = (emoji) => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        sender: `${userData.name}`,
        content: emoji,
        type: 'EMOJI',
      };
  
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setShowEmojiPicker(false);
    } else {
      console.error("STOMP 연결이 설정되지 않았습니다. 메시지를 보낼 수 없습니다.");
    }
  };

  return (
    <ChatContainer>
      {messages.map((msg, index) => (
        <MessageWrapper key={index} $isUser={msg.sender === `${userData.name}`}>
          <Message $isUser={msg.sender === `${userData.name}`} $isEmoji={msg.type === 'EMOJI'}>
            {msg.type === 'EMOJI' ? (
              <EmojiImage src={`/images/Emoji/${msg.content}`} alt="emoji" />
            ) : (
              msg.content
            )}
          </Message>
        </MessageWrapper>
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
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={sendMessage} disabled={!isConnected}>
          전송
        </SendButton>
        <ImageButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <InsertEmoticonIcon />
        </ImageButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
