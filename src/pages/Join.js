import React, { useState } from 'react';
import styled from 'styled-components';

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
`;

const CoverSelectDiv = styled.div`
  width: 80%;
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

const SelectDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    margin-top: 0;
    height: 3rem;
  }
`;

const SelectButton = styled.button`
  background-color: ${(props) => (props.active ? '#f8cb37' : '#f0f0f0')};
  border-radius: 10px;
  width: 50%;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8cb37;
  }

  & + & {
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 40vw;
    height: 12vw;
  }
`;

const CoverTextGuide = styled.div`
  width: 80%;
  margin-bottom: 0.5rem;
`;

const TextGuide = styled.p`
  align-self: flex-start;
  width: 100%;
  font-weight: 500;
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding-left: 1.5rem;
  width: 100%;
  background: none;
  border: none;
  outline: none;

  &::placeholder {
    color: #a1a1a1;
  }

  @media screen and (max-width: 600px) {
    padding-left: 1rem;
  }
`;

const DefaultDiv = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 3rem;

  @media screen and (max-width: 600px) {
    height: 3rem;
    margin-bottom: 2rem;
  }
`;

const AuthDiv = styled(DefaultDiv)`
  margin-top: 2rem;
  background-color: #ffd651;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #f8cb37;
  }

  @media screen and (max-width: 600px) {
    height: 3rem;
    margin-bottom: 2rem;
  }
`;

const HiddenDiv = styled.div`
  width: 80%;
  height: 4rem;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-bottom: 3rem;
`;

const CounselorDiv = styled.div`
    width: 100%;
    height: 4rem;
    background-color: #f0f0f0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    @media screen and (max-width: 600px) {
    height: 3rem;
    margin-bottom: 2rem;
  }
`
export const Join = () => {
  const [isGeneral, setIsGeneral] = useState(true);
  const [isCounselor, setIsCounselor] = useState(false);

  const generalClicked = () => {
    setIsGeneral(true);
    setIsCounselor(false);
  };

  const counselorClicked = () => {
    setIsGeneral(false);
    setIsCounselor(true);
  };

  return (
    <Main>
      <CoverSelectDiv>
        <SelectDiv>
          <p>회원 유형을 선택하세요</p>
        </SelectDiv>
        <SelectDiv>
          <SelectButton active={isGeneral} onClick={generalClicked}>
            <p>일반회원</p>
          </SelectButton>
          <SelectButton active={isCounselor} onClick={counselorClicked}>
            <p>상담사</p>
          </SelectButton>
        </SelectDiv>
      </CoverSelectDiv>

      <CoverTextGuide>
        <TextGuide>아이디</TextGuide>
      </CoverTextGuide>
      <DefaultDiv>
        <Input type="text" placeholder="아이디를 입력하세요" />
      </DefaultDiv>

      <CoverTextGuide>
        <TextGuide>비밀번호</TextGuide>
      </CoverTextGuide>
      <DefaultDiv>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
      </DefaultDiv>

      <CoverTextGuide>
        <TextGuide>비밀번호 확인</TextGuide>
      </CoverTextGuide>
      <DefaultDiv>
        <Input type="password" placeholder="비밀번호를 다시 입력하세요" />
      </DefaultDiv>

      <CoverTextGuide>
        <TextGuide>이메일</TextGuide>
      </CoverTextGuide>
      <DefaultDiv>
        <Input type="email" placeholder="이메일주소를 입력하세요" />
      </DefaultDiv>

      <HiddenDiv visible={isCounselor}>
        <CoverTextGuide>
          <TextGuide>상담사 인증번호</TextGuide>
        </CoverTextGuide>
        <CounselorDiv>
          <Input type="password" placeholder="인증번호를 입력하세요" />
        </CounselorDiv>
      </HiddenDiv>

      <AuthDiv onClick={() => (window.location.href = 'join-success')}>
        <p>본인인증</p>
      </AuthDiv>
    </Main>
  );
};

export default Join;