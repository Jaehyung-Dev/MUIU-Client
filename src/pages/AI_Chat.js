import React, { useEffect, useRef, useState } from 'react';
import { clovaApis } from '../apis/clovaApis';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chatBackground from '../images/Chat_Background.png';
import { useSelector } from 'react-redux';

const Background = styled.div`
  min-height: 80vh;
  background-image: url(${chatBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const EndBar = styled.div`
  height: 2.5rem;
  background-color: #F6F6F6;
  position: fixed;
  top: 62px;
  max-width: 600px;
  width: 100%;
  display: flex;
  z-index: 2;

  button {
    border-radius: 5px;
    font-size: 15px;
    border: none;
    background-color: #BCBCBC;
    color: white;
    font-weight: bold;
    padding: 0.25rem;
    margin: auto 1.5rem auto auto;
    &:hover {
      cursor: pointer;
    }
  }
`;

const InputBar = styled.div`
  height: 6rem;
  background-color: #FFF;
  position: fixed;
  bottom: 70px;
  max-width: 600px;
  width: 100%;

  input {
    padding: 10px;
    margin: 0.5rem;
    border-radius: 25px;
    border: 1px solid #ccc;
    font-size: 16px;
    z-index: 999;
    width: 80%
  }

  button {
    background-color: #fbbf24;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
`;

const Messages = styled.div`
  flex: 1;
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5rem 1rem 3.5rem;
`;

const Message = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 65%;
  margin: 10px;
  color: black;
  word-wrap: break-word;

  &.user-msg {
    background-color: white;
    align-self: flex-end;
    margin-right: 1.5rem;
  }

  &.ai-msg {
    background-color: #FFE79C;
    align-self: flex-start;
    margin-left: 1.5rem;
  }
`;

const AI_Chat = () => {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const navi = useNavigate();
  const messageEndRef = useRef(null);

  const {isLogin, role} = useSelector((state) => state.memberSlice);

  useEffect(() => {
    if(!isLogin){
      alert("로그인 후 이용 가능합니다.");
      navi("/login");
    } else if (role === "ROLE_COUNSELOR"){
      navi("/ai-counseling-list");
    }
  }, [isLogin, role, navi]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  useEffect(() => {
    const initialMessage = {
      sender: 'ai',
      text: '안녕하세요. 마음이음입니다. 무슨일로 찾아오셨나요?'
    };
    setMessage([initialMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessage([...message, { sender: 'user', text: input }]);

    try {
      const aiReply = await clovaApis(input);
      setInput('');
      setMessage(prevMessages => [...prevMessages, { sender: 'ai', text: aiReply }]);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Background>
        <EndBar>
          <button type='button' onClick={() => navi("/")}>상담종료</button>
        </EndBar>
        <Messages>
          {message.map((msg, index) => (
            <Message key={index} className={msg.sender === 'user' ? 'user-msg' : 'ai-msg'}>
              {msg.text}
            </Message>
          ))}
          <div ref={messageEndRef} />
        </Messages>
        <InputBar>
          <input
            type='text'
            placeholder='메세지를 입력하세요'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>전송</button>
        </InputBar>
      </Background>
    </>
  );
};

export default AI_Chat;
