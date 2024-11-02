import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
`;

const Title = styled.h2`
    font-size: 24px;
    color: black;
    margin-bottom: 100px;
`;

const Input = styled.textarea`
    width: 300px;
    height: 100px;
    padding: 15px;
    margin-bottom: 15px;
    border: 0px;
    border-radius: 10px;
    background-color: #f0f0f0;
    font-size: 16px;
    text-align: left;
    vertical-align: top;
    resize: none;
`;


const Button = styled.button`
    background-color: #ffd651;
    width: 330px;
    padding: 15px;
    margin-bottom: 15px;
    border: 0px;
    border-radius: 10px;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
`;

const HomeAddress = () => {
    const [address, setAddress] = useState('');

    const persistRoot = sessionStorage.getItem('persist:root');
    const parsedRoot = JSON.parse(persistRoot);
    const memberSlice = JSON.parse(parsedRoot.memberSlice);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(`https://www.마음이음api.site/members/${memberSlice.id}/address`);
                setAddress(response.data.item);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchAddress();
    }, []);

    const handleSaveAddress = async () => {
        try {
            await axios.post(`https://www.마음이음api.site/members/${memberSlice.id}/address`, { address }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` 
                }
            });
            alert('주소가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('Error updating address:', error);
            alert('주소 업데이트 중 오류가 발생했습니다.');
        }
    };    

    return (
        <Container>
            <Title>내 주소 변경</Title>
            <Input
                type="text"
                placeholder="주소 입력"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button onClick={handleSaveAddress}>저장</Button>
        </Container>
    );
};

export default HomeAddress;
