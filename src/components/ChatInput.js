import axios from 'axios';
import React, { useState } from 'react';

const ChatInput = ({ channelId }) => {
    const [message, setMessage] = useState('');

    const apiUrl = 'http://localhost:9090/api/chat/send';

    const handleSendMessage = async () => {
        console.log('Send button clicked'); // 버튼 클릭 여부 확인
        if (message.trim() !== '') {
            try {
                console.log('Sending message...'); // API 호출 전 로그 추가
                const response = await axios.post(apiUrl, {
                    channelId: channelId,
                    content: message
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Message sent successfully', response.data); // 성공 여부 확인
            } catch (error) {
                console.error('Error sending message:', error.response ? error.response.data : error.message);
            }
        }
    };
    
    // JSX에서 버튼에 이벤트 핸들러를 연결
    <button onClick={handleSendMessage}>Send Message</button>
    
    


    return (
        <form onSubmit={handleSendMessage}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
            />
            <button type="submit">보내기</button>
        </form>
    );
};

export default ChatInput;
