import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const Input = styled.input`
    width: 300px;
    padding: 15px;
    margin-bottom: 15px;
    border: 0px;
    border-radius: 10px;
    background-color: #f0f0f0;
    font-size: 16px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin: 5px 0 10px 0;
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

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    const validateNewPassword = (password) => {
        if (!password) return false;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
        return passwordRegex.test(password);
    };

    useEffect(() => {
        if (currentPassword && currentPasswordError) {
            setCurrentPasswordError('기존 비밀번호와 일치하지 않습니다.');
        } else {
            setCurrentPasswordError('');
        }
    }, [currentPassword]);

    useEffect(() => {
        if (newPassword && !validateNewPassword(newPassword)) {
            setNewPasswordError('비밀번호는 특수문자, 숫자, 영문자를 포함하여 9글자 이상이어야 합니다.');
        } else {
            setNewPasswordError('');
        }
    }, [newPassword]);

    useEffect(() => {
        if (confirmPassword && newPassword !== confirmPassword) {
            setConfirmPasswordError('새 비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    }, [confirmPassword, newPassword]);

    const handleChangePassword = async () => {
        if (currentPasswordError || newPasswordError || confirmPasswordError) {
            alert('입력한 내용을 확인해주세요.');
            return;
        }
    
        try {
            const persistRoot = sessionStorage.getItem('persist:root');
            if (!persistRoot) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return;
            }
    
            const parsedRoot = JSON.parse(persistRoot);
            const memberSlice = JSON.parse(parsedRoot.memberSlice);
            // const token = localStorage.getItem('token');
            // const userId = memberSlice?.id;
    
            if (!memberSlice.isLogin || !memberSlice.id) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return;
            }
    
            const response = await axios.post(
                `http://localhost:9090/members/${memberSlice.id}/change-password`,
                { currentPassword, newPassword },
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` } }
            );
    
            if (response.status === 200) {
                alert('비밀번호가 변경되었습니다.');
                navigate('/mypage');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.statusMessage);
            } else {
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
    };
    

    return (
        <Container>
            <Title>비밀번호 변경</Title>
            <Input 
                type="password" 
                placeholder="현재 비밀번호" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {currentPasswordError && <ErrorMessage>{currentPasswordError}</ErrorMessage>}
            <hr/>
            <Input 
                type="password" 
                placeholder="새 비밀번호" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPasswordError && <ErrorMessage>{newPasswordError}</ErrorMessage>}
            
            <Input 
                type="password" 
                placeholder="새 비밀번호 확인" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
            
            <Button onClick={handleChangePassword}>변경하기</Button>
        </Container>
    );
};

export default ChangePassword;
