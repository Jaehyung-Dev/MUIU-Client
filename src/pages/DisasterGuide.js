import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 12px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 24px;
    color: #333;
`;

const Dropdown = styled.select`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
`;

const MessagesContainer = styled.div`
    margin-top: 20px;
`;

const MessageBox = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }
`;

const MessageHeader = styled.div`
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
`;

const MessageContent = styled.p`
    color: #555;
    line-height: 1.4;
`;

const DisasterMessages = () => {
    const [messages, setMessages] = useState([]);
    const [region, setRegion] = useState('서울특별시');

    const regions = [
        '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
        '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도'
    ];


    useEffect(() => {
        if (region) {
            axios.get(`https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/api/disaster-messages/category?category=${region}`)
                .then(response => {
                    console.log("Fetched Messages:", response.data);

                    const sortedMessages = response.data.sort((a, b) => {
                        const dateA = dayjs(a.readStatus, 'YYYY/MM/DD HH:mm:ss');
                        const dateB = dayjs(b.readStatus, 'YYYY/MM/DD HH:mm:ss');
                        return dateB - dateA;
                    });

                    setMessages(sortedMessages);
                })
                .catch(error => {
                    console.error('Error fetching disaster messages:', error);
                });
        }
    }, [region]);

    
    
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const renderMessages = () => {
        return messages.map((message) => (
            <MessageBox key={message.id}>
                <MessageHeader>
                    {message.alertLevel} ({message.occurrenceTime}) - {message.readStatus}
                </MessageHeader>
                <MessageContent>{message.messageContent}</MessageContent>
            </MessageBox>
        ));
    };

    return (
        <Container>
            <Header>
                <Title>{region} 재난문자</Title>
                <Dropdown value={region} onChange={handleRegionChange}>
                    {regions.map((regionOption) => (
                        <option key={regionOption} value={regionOption}>
                            {regionOption}
                        </option>
                    ))}
                </Dropdown>
            </Header>
            <MessagesContainer>
                {renderMessages()}
            </MessagesContainer>
        </Container>
    );
};

export default DisasterMessages;
