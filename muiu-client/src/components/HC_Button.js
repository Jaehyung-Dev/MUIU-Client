import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 15px;
    background-color: #F3F3F3;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    height: 130px;
    width: 100px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #DDDDDD;
    }

    @media (max-width: 600px) {
        height: 100px;
        width: 80px;
    }

    @media (max-width: 383px) {
        height: 90px;
        width: 70px;
    }
`;

const ButtonText = styled.div`
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 18px;
    }

    @media (max-width: 383px) {
        font-size: 14px;
    }
`;

const ButtonSubtext = styled.div`
    font-size: 15px;
    color: #666;

    @media (max-width: 600px) {
        font-size: 14px;
    }

    @media (max-width: 383px) {
        font-size: 12px;
    }
`;

const Button = ({ text, subtext, onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <ButtonText>{text}</ButtonText>
            <ButtonSubtext>{subtext}</ButtonSubtext>
        </StyledButton>
    );
};

export default Button;
