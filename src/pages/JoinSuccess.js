import React from 'react';
import styled, { keyframes } from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    padding: 0;
    color: black;
  }
`;

const JoinComplete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;

  @media screen and (max-width: 600px) {
    margin-top: 9rem;
  }
`;

const CompleteImgCoverDiv = styled.div`
  width: 15rem;

  @media screen and (max-width: 600px) {
    width: 15rem;
  }

  &:before {

  }
`;

const JoinCompleteMsg1 = styled.p`
  font-size: 2rem;

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const JoinCompleteMsg2 = styled.p`
  color: #9a9a9a;

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const DefaultDiv = styled.div`
  margin: 1rem 0 3rem 0;
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

const SelectDiv = styled(DefaultDiv)`
  margin-top: 3rem;
`;

const SelectButton = styled.button`
  background-color: #ffd651;
  border-radius: 10px;
  width: 50%;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #f8cb37;
  }

  &.home-btn {
    margin-right: 0.5rem;
  }

  &.login-btn {
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 40vw;
    height: 12vw;
  }
`;

const drawCheckmark = keyframes`
  0% {
    stroke-dashoffset: 34;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkSVG = styled.svg`
  width: 100%;
  height: 100%;
  stroke: #f8cb37;
  stroke-width: 3;
  fill: none;
  stroke-linecap: butt;
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: ${drawCheckmark} 1s ease forwards;
`;

const JoinSuccess = () => {
  return (
    <Main>
      <JoinComplete>
      <CompleteImgCoverDiv>
        <CheckmarkSVG viewBox="0 0 50 50" preserveAspectRatio="none">
          <path d="M10 30 L20 40 L40 15" />
        </CheckmarkSVG>
      </CompleteImgCoverDiv>
        <JoinCompleteMsg1>
          회원가입이 <b>완료</b> 되었습니다.
        </JoinCompleteMsg1>
        <JoinCompleteMsg2>
          로그인하시면 더욱 다양한 서비스를 이용 가능합니다.
        </JoinCompleteMsg2>
      </JoinComplete>
      <SelectDiv>
        <SelectButton className="home-btn" onClick={() => (window.location.href='main')}>
          <p>홈으로</p>
        </SelectButton>
        <SelectButton className="login-btn" onClick={() => (window.location.href='login')}>
          <p>로그인</p>
        </SelectButton>
      </SelectDiv>
    </Main>
  );
};

export default JoinSuccess;