import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { join } from '../apis/memberApis';

const Main = styled.main`

`;

const MainContainer = styled.div`
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

const JoinInput = styled.input`
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

const SubmitBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
`

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

  // 회원가입 폼 상태 관리 (초기값 설정)
  const [joinForm, setJoinForm] = useState({
    username: '', // 아이디
    password: '', // 비밀번호
    passwordCheck: '', // 비밀번호 확인
  });

  // 중복 확인 및 비밀번호 유효성 상태 관리
  const [usernameChk, setUsernameChk] = useState(false); // 아이디 중복 확인 상태
  const [passwordValidate, setPasswordValidate] = useState(false); // 비밀번호 유효성 검사 상태
  const [passwordChk, setPasswordChk] = useState(false); // 비밀번호 일치 여부 상태

  // Redux의 dispatch 함수 가져오기
  const dispatch = useDispatch();

  // 입력 필드가 변경되었을 때 호출되는 함수
  const changeTextField = useCallback((e) => {
    // 현재 입력한 값을 joinForm 상태에 업데이트
    setJoinForm({
        ...joinForm, // 기존 값 복사
        [e.target.name]: e.target.value // 입력한 필드의 name을 기준으로 해당 값 업데이트
    });

    // 입력 필드가 username일 경우
    if(e.target.name === 'username') {
        setUsernameChk(false); // 아이디 중복 체크를 초기화
        document.querySelector("#username-check-btn").removeAttribute('disabled'); // 중복 확인 버튼을 활성화
        return;
    }

    // 입력 필드가 password일 경우 비밀번호 일치 여부 확인
    if(e.target.name === 'password') {
        if(e.target.value === joinForm.passwordCheck) { // 비밀번호 확인 값과 동일하면
            setPasswordChk(true); // 비밀번호 일치로 설정
            document.querySelector("#password-check-success").style.display = 'block'; // 성공 메시지 표시
            document.querySelector("#password-check-fail").style.display = 'none'; // 실패 메시지 숨기기
        } else {
            setPasswordChk(false); // 비밀번호 불일치로 설정
            document.querySelector("#password-check-success").style.display = 'none'; // 성공 메시지 숨기기
            document.querySelector("#password-check-fail").style.display = 'block'; // 실패 메시지 표시
        }
    }

    // 입력 필드가 passwordCheck일 경우 비밀번호와 일치하는지 확인
    if(e.target.name === 'passwordCheck') {
        if(e.target.value === joinForm.password) { // 입력된 비밀번호와 일치하는지 확인
            setPasswordChk(true); // 일치할 경우 true
            document.querySelector("#password-check-success").style.display = 'block'; // 성공 메시지 표시
            document.querySelector("#password-check-fail").style.display = 'none'; // 실패 메시지 숨기기
        } else {
            setPasswordChk(false); // 불일치할 경우 false
            document.querySelector("#password-check-success").style.display = 'none'; // 성공 메시지 숨기기
            document.querySelector("#password-check-fail").style.display = 'block'; // 실패 메시지 표시
        }
    }
  }, [joinForm]);

   // 아이디 중복 체크 함수
   const usernameCheck = useCallback(async () => {
    try {
        if(joinForm.username === '') { // 아이디가 빈 값이면
            alert('아이디를 입력하세요.'); // 경고 메시지
            document.querySelector('#username').focus(); // 아이디 입력 필드로 포커스 이동
            return;
        }

        // 서버에 아이디 중복 여부 요청
        const response = await axios.post('http://localhost:9090/members/username-check', {
            username: joinForm.username
        });

        if(response.data.item.usernameCheckMsg === 'invalid username') { // 중복된 아이디일 경우
            alert('중복된 아이디입니다. 다른 아이디로 변경해주세요.');
            document.querySelector('#username').focus(); // 포커스 이동
            return;
        } else {
            if(window.confirm(`${joinForm.username}은 사용가능한 아이디입니다. 사용하시겠습니까?`)) {
                document.querySelector('#username-check-btn').setAttribute('disabled', true); // 중복 확인 버튼 비활성화
                setUsernameChk(true); // 아이디 중복 확인 성공 상태로 변경
                return;
            }
        }
    } catch(e) {
        console.log(e);
        alert("에러가 발생했습니다."); // 에러 처리
    }
  }, [joinForm.username]);

  // 비밀번호 유효성 검사 함수 (특수문자, 숫자, 영문자 조합 9자리 이상)
  const validatePassword = useCallback(() => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(joinForm.password);
  }, [joinForm.password]);

  // 비밀번호 입력 후 블러 처리 시 유효성 검사
  const passwordBlur = useCallback(() => {
      if(validatePassword()) { // 비밀번호가 유효하면
          setPasswordValidate(true); // 비밀번호 유효성 상태 true로 변경
          document.querySelector('#password-validation').style.display = 'none'; // 유효성 경고 메시지 숨김
          return;
      }

      setPasswordValidate(false); // 비밀번호 유효하지 않으면 false로 변경
      document.querySelector('#password-validation').style.display = 'block'; // 경고 메시지 표시
      return;
  }, [validatePassword]);

  const handleJoin = useCallback((e) => {
    e.preventDefault();

    // 각 조건을 만족하지 않으면 경고 메시지 표시
    if(!usernameChk) {
      alert('아이디 중복확인을 진행하세요.');
      return;
    }

    if(!passwordValidate) {
        alert('비밀번호는 특수문자, 숫자, 영문자 조합의 9자리 이상으로 지정하세요.');
        return;
    }

    if(!passwordChk) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

     // 모든 조건을 만족하면 Redux의 join 액션 호출
     dispatch(join(joinForm));
  }, [joinForm, usernameChk, passwordChk, passwordValidate, dispatch]);

  return (
    <Main>
      <form onSubmit={handleJoin}>
        <MainContainer>
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
            <JoinInput 
                name='username' 
                id='username' 
                autoFocus value={joinForm.username} 
                onChange={changeTextField} 
                type="text" 
                placeholder="아이디를 입력하세요" />
          </DefaultDiv>
          <button name='username-check-btn' id='username-check-btn' color='primary'
                  type='button'
                  onClick={usernameCheck}>
              중복확인
          </button>

          <CoverTextGuide>
            <TextGuide>비밀번호</TextGuide>
          </CoverTextGuide>
          <DefaultDiv>
            <JoinInput
                name='password'
                id='password' 
                type="password" 
                value={joinForm.password}
                onChange={changeTextField}
                onBlur={passwordBlur}
                placeholder="비밀번호를 입력하세요" />
          </DefaultDiv>
          <p
          name='password-validation'
          id='password-validation'
          style={{display: 'none', color: 'red'}}> {/* 비밀번호 유효성 검사 메시지 */}
          비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 지정하세요.
          </p>

          <CoverTextGuide>
            <TextGuide>비밀번호 확인</TextGuide>
          </CoverTextGuide>
          <DefaultDiv>
            <JoinInput 
                name='passwordCheck'
                id='passwordCheck'
                type="password"
                value={joinForm.passwordCheck}
                onChange={changeTextField}
                placeholder="비밀번호를 다시 입력하세요" />
          </DefaultDiv>
          <p
            name='password-check-success'
            id='password-check-success'
            style={{display: 'none', color: 'green'}}>
              비밀번호가 일치합니다.
          </p>
          <p
            name='password-check-fail'
            id='password-check-fail'
            style={{display: 'none', color: 'red'}}>
              비밀번호가 일치합니다.
          </p>

          <CoverTextGuide>
            <TextGuide>이메일</TextGuide>
          </CoverTextGuide>
          <DefaultDiv>
            <JoinInput
                name='email'
                id='email'
                value={joinForm.email}
                onChange={changeTextField} 
                type="email" 
                placeholder="이메일주소를 입력하세요" />
          </DefaultDiv>

          <HiddenDiv visible={isCounselor}>
            <CoverTextGuide>
              <TextGuide>상담사 인증번호</TextGuide>
            </CoverTextGuide>
            <CounselorDiv>
              <JoinInput type="password" placeholder="인증번호를 입력하세요" />
            </CounselorDiv>
          </HiddenDiv>

          <AuthDiv>
            <SubmitBtn>
              <p>본인인증</p>
            </SubmitBtn>  
          </AuthDiv>
        </MainContainer>
      </form>
    </Main>
  );
};

export default Join;