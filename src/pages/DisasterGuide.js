import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisasterMessages = () => {
    const [messages, setMessages] = useState([]);
    const [region, setRegion] = useState(''); // 사용자의 지역 정보를 저장

    useEffect(() => {
        if (region) {
            axios.get(`http://localhost:9090/api/disaster-messages/by-region?region=${region}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching disaster messages:', error);
                });
        }
    }, [region]);

    // 사용자 위치 정보를 가져오는 함수를 만들거나 사용자가 직접 지역을 입력하게 할 수 있음
    const fetchUserRegion = () => {
        // 사용자의 지역 정보를 가져오는 로직 작성
        setRegion('서울특별시'); // 예시로 서울특별시 설정
    };

    useEffect(() => {
        fetchUserRegion();
    }, []);

    return (
        <div>
            <h2>Disaster Messages</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.category}</strong> - {message.occurrenceTime}
                        <p>{message.eventContent}</p>
                        <p>{message.messageContent}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisasterMessages;
