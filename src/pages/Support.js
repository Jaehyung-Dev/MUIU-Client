import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { sendSupportMessage } from '../apis/supportApi'; // API 함수 임포트
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    overflow: hidden;
`;

const BackButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

const FormSection = styled.div`
    width: 85%;
    max-width: 600px;
    background-color: white;
    padding: 1.5rem;
    margin-top: 80px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const FormTitle = styled.h2`
    font-size: 1.2rem;
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 90%;
    font-size: 1rem;
`;

const Textarea = styled.textarea`
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 90%;
    height: 100px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    background-color: #fbb03b;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 20px;
    margin-top: 1rem;
    cursor: pointer;
    font-size: 0.8rem;
    
    &:hover {
        background-color: #e69b27;
    }
`;

const TopNav = styled.div`
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

const TopNavTitle = styled.h2`
    font-weight: 700;
    color: black;
    font-size: 18px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const Support = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, message };
    
        try {
            await sendSupportMessage(formData);  // response 할당 제거
            alert('문의사항이 성공적으로 접수되었습니다. 곧 답변을 받으실 수 있습니다.');
        } catch (error) {
            console.error('이메일 전송 오류:', error.response ? error.response.data : error.message);
            alert('이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <Container>
            <TopNav>
                <BackButton onClick={()=>navigate(-1)}>
                    <ArrowBackIosIcon />
                </BackButton>
                <TopNavTitle>문의하기</TopNavTitle>
            </TopNav>

            <FormSection>
                <FormTitle>문의사항을 작성해주세요</FormTitle>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                        placeholder="문의사항"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <SubmitButton type="submit">문의하기</SubmitButton>
                </form>
            </FormSection>
        </Container>
    );
};

export default Support;
