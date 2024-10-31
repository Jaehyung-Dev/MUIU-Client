import React, { useEffect, useState } from 'react'
import { clovaApis } from '../apis/clovaApis';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chatBackground from '../images/Chat_Background.png';

const Background = styled.div`
  min-height: 95vh;
  background-image: url(${chatBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
`;

const EndBar = styled.div`
  height: 2.5rem;
  background-color: #F6F6F6;
  position: fixed;
  top: 62px;
  max-width: 600px;
  width: 100%;
  display: flex;

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
    margin-right: 10px;

    &:hover {
      background-color: #F1B10D;
    }

  }
`;

const Messages = styled.div`

`;

const Message = styled.div`
  boarder-radius: 8px;
  max-width: 65%;
  color: black;
  .user-msg{
    background-color: white;
    margin: 0.5rem 2rem 0.5rem auto;
  }

  .ai-msg{
    background-color: #FFE79C;
    margin: 0.5rem auto 0.5rem 2rem;
  }
`;

const AI_Chat = () => {

    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');

    const navi = useNavigate();

    useEffect(() => {
      const initialMessage = {
        sender: 'ai',
        text: '안녕하세요. 마음이음입니다. 무슨일로 찾아오셨나요?'
      };
      setMessage([initialMessage]);
    }, []);

    const handleSendMessage = async () => {
        if(input.trim() === '')
            return;

        // 내담자 메세지 추가
        setMessage([...message, {sender: 'user', text: input}]);

        try{
            // 내담자 메세지 전송
            const aiReply = await clovaApis(input);

            // 입력창 초기화
            setInput('');

            // AI 답장
            setMessage(prevMessages => [...prevMessages, {sender: 'ai', text: aiReply}]);

        } catch (e) {
            alert(`알 수 없는 문제 발생`);
            if (e.response) {
                // 서버 응답이 2xx 범위 밖일 때 실행
                console.log('응답 에러:', e.response.data);
                console.log('응답 상태:', e.response.status);
                console.log('응답 헤더:', e.response.headers);
              } else if (e.request) {
                // 요청이 전송되었으나 응답을 받지 못했을 때 실행
                console.log('요청이 이루어졌으나 응답이 없음:', e.request);
              } else {
                // 요청 설정 중에 문제가 발생했을 때 실행
                console.log('요청 설정 에러:', e.message);
              }
              console.log('전체 에러 정보:', e.config);
        }

    }
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
        </Messages>
        <InputBar>
          <input type='text' placeholder='메세지를 입력하세요'
            value={input} onChange={(e) => setInput(e.target.value)}/>
          <button onClick={handleSendMessage}>전송</button>
        </InputBar>
      </Background>
    </>
  )
}

export default AI_Chat