import React, { useState } from 'react';

// import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import axios from 'axios'; // axios 추가
import { sendSupportMessage } from '../apis/supportApi'; // API 함수 임포트
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 전체 페이지 레이아웃 및 스타일
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
`;

// 입력 폼 섹션 스타일
const FormSection = styled.div`
    width: 90%;
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
    width: 100%;
`;

const Textarea = styled.textarea`
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    height: 100px;
`;

const SubmitButton = styled.button`
    background-color: #fbb03b;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 20px;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #e69b27;
    }
`;

// 하단 네비게이션 바 스타일
const BottomNav = styled.div`
    width: 100%;
    max-width: 600px;
    height: 60px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;
    color: ${(props) => (props.$active ? '#fbb03b' : '#999')};
`;

const TopNav = styled.div`
    width: 100%;
    max-width: 600px;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    z-index: 1000;
`;

const TopNavTitle = styled.h2`
    font-size: 1.5rem;
    margin: 0;
    color: #333;
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
            {/* 상단 네비게이션 */}
            <TopNav>
                <TopNavTitle>문의하기</TopNavTitle>
            </TopNav>

            {/* 지원 폼 섹션 */}
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

            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavItem>
                    <HomeIcon style={{ fontSize: '1.5rem' }} onClick={() => navigate('/')} />
                    홈
                </NavItem>
                <NavItem>
                    <VideoCallIcon style={{ fontSize: '1.5rem' }} />
                    비대면 상담
                </NavItem>
                <NavItem active>
                    {/* <AddCircleIcon style={{ fontSize: '2rem', color: '#fbb03b' }} /> */}
                </NavItem>
                <NavItem>
                    <BookIcon style={{ fontSize: '1.5rem' }} />
                    일기
                </NavItem>
                <NavItem>
                    <LocationOnIcon style={{ fontSize: '1.5rem' }} />
                    내 정보
                </NavItem>
            </BottomNav>
        </Container>
    );
};

export default Support;
