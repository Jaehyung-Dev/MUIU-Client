import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatMessages = ({ channelId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://www.마음이음api.site/api/chat/messages?channelId=${channelId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('메시지 불러오기 실패:', error);
            }
        };

        // 정기적으로 메시지 불러오기 (예: 5초마다)
        const intervalId = setInterval(fetchMessages, 5000);

        // 컴포넌트 언마운트 시 interval 해제
        return () => clearInterval(intervalId);
    }, [channelId]);

    return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', borderBottom: '1px solid #ddd' }}>
            {messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{msg.senderId === 'loggedInUserId' ? '나' : '상대방'}:</strong> {msg.content}
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
