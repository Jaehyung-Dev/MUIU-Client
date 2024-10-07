import React from 'react';
import styled from 'styled-components';
import JH_NaverLogin from '../components/JH_NaverLogin';
import logo from '../svg/logo.svg';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    background: none;
    border: none;
    outline: none;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
  }

  input::placeholder {
    color: #A1A1A1;
  } 

  button {
    border: none;
    padding: 0;
    color: black;
  }
`;

const DefaultDiv = styled.div`
  margin: 1rem 0;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;

  @media screen and (max-width: 600px) {
    margin-top: 0;
    margin-bottom: 1rem;
    height: 3rem;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  
  p {
    margin-top: 1rem;
    font-weight: bold;
    color: #fbbf24;
    font-size: 1.3rem;
    text-align: center;
  }

  img {
    margin-left: 1rem;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 2rem;
  }
`;

const InputDiv = styled(DefaultDiv)`
  background-color: #f0f0f0;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const InputDefault = styled.input`
  font-size: 1.2rem;
  padding-left: 1.5rem;
  width: 100%;

  &::placeholder {
    color: #a1a1a1;
  }

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const LoginDiv = styled(DefaultDiv)`
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const LoginButton = styled.button`
  background-color: #ffd651;
  border-radius: 10px;
  width: 100%;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #f8cb37;
  }

  @media screen and (max-width: 600px) {
    width: 80vw;
    height: 12vw;
  }
`;

const TextHover = styled.button`
  font-size: 0.9rem;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.5s ease;
  &:hover {
    color: rgb(105, 104, 104);
  }
  
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const SnsBar = styled(DefaultDiv)`
  display: flex;
  align-items: center;
`;

const SnsLine = styled.hr`
  width: 8rem;
  background-color: #757575;
  border: none;
  height: 1px;

  @media screen and (max-width: 600px) {
    width: 6rem;
  }
`
const DivLine = styled.hr`
  padding: 0 0.5rem;
  height: 0.1rem;
  background-color: #D3D3D3;
  border: none;
  transform: rotate(90deg);
  margin: 0.2rem;
`

const SnsBarText = styled.span`
  margin: 0.5rem;
  font-size: 0.8rem;

  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

export const Login = () => {
  return (
    <Main>
      <LogoDiv>
        <img src={logo} alt='logo'/>
        <p>안녕하세요<br/>마음이음입니다.</p>
      </LogoDiv>
      <InputDiv>
        <InputDefault type="text" placeholder="아이디를 입력하세요" />
      </InputDiv>
      <InputDiv>
        <InputDefault type="password" placeholder="비밀번호를 입력하세요" />
      </InputDiv>
      <LoginDiv>
        <LoginButton>
          <p>로그인</p>
        </LoginButton>
      </LoginDiv>
      <DefaultDiv>
        <TextHover>아이디 찾기</TextHover>
        <DivLine></DivLine>
        <TextHover>비밀번호 찾기</TextHover>
        <DivLine></DivLine>
        <TextHover onClick={() => window.location.href = 'join-agree'}>회원가입</TextHover>
      </DefaultDiv>
      <SnsBar>
        <SnsLine></SnsLine>
        <SnsBarText>sns 계정으로 로그인</SnsBarText>
        <SnsLine></SnsLine>
      </SnsBar>
      <JH_NaverLogin/>
    </Main>
  );
};

export default Login;