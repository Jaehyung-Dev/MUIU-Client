import React, { useState } from 'react'
import { clovaApis } from '../apis/clovaApis';

const AI_Chat = () => {

    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if(input.trim() === '')
            return;

        // 내담자 메세지 추가
        setMessage([...message, {sender: 'user', text: input}]);

        try{
            // 내담자 메세지 전송
            const aiReply = await clovaApis(input);

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

        // 입력창 초기화
        setInput('');
    }
  return (
    <div>
      <div className="chat-window">
        {message.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'ai-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  )
}

export default AI_Chat