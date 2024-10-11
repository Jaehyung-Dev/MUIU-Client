import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { join } from '../apis/memberApis';
import { useLocation } from 'react-router-dom';
import { verifySms } from '../apis/memberApis';

const Main = styled.main`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important; /* 배경을 투명하게 */
    -webkit-text-fill-color: #000 !important; /* 텍스트 색상 */
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border: none;
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
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    margin-top: 3rem;
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
  margin-top: 3rem;
  width: 80%;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 600px) {
    margin-top: 2rem;
  }
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

const UsernameDiv = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 10px;
  input {
    width: 77%;
  }
  @media screen and (max-width: 600px) {
    height: 3rem;
  }
`

const DefaultDiv = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 10px;
  input {
    width: 90%;
  }
  @media screen and (max-width: 600px) {
    height: 3rem;
  }
`;

const AuthDiv = styled(DefaultDiv)`
  background-color: #ffd651;
  transition: background-color 0.5s ease;
  margin-top: 4rem;
  margin-bottom: 2rem;
  &:hover {
    background-color: #f8cb37;
  }

  @media screen and (max-width: 600px) {
    height: 3rem;
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
  height: auto;
  display: ${(props) => (props.visible ? 'block' : 'none')};
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
`;

const DuplicationBtn = styled.button`
  background-color: #ffd651;
  border-radius: 5px;
  padding: 0.6rem;
  transition: transform 0.3s ease;  
  &:hover {
    transform: scale(1.1); 
  }
`;

const PopupDiv = styled.div`
  width: 80%;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 20rem;
  height: 20rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalInput = styled.input`
  width: 10rem;
  height: 2rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  border: none;
  outline: none;
  background: none;

  &:placeholder {
    color: #A1A1A1;
  }
`;

const SmsButton = styled.button`
  background-color: #ffd651;
  border-radius: 5px;
  width: 6rem;
  height: 2rem;
  transition: background-color 0.5s ease;
  border: none;
  color: black;
  margin-right: 0.5rem;
  &:hover {
    background-color: #f8cb37;
  }
`
const PhoneNumberDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #f0f0f0;
  border-radius: 5px;
`

export const Join = () => {
  const location = useLocation();
  const { locationAgree, recordConsent } = location.state || {};
  const [isGeneral, setIsGeneral] = useState(true);
  const [isCounselor, setIsCounselor] = useState(false);

  const generalClicked = () => {
    setIsGeneral(true);
    setIsCounselor(false);
    // 폼 입력 값 초기화
    setJoinForm({
      username: '',
      password: '',
      passwordCheck: ''
    });
    // 유효성 상태 초기화
    setUsernameChk(false);
    setPasswordChk(false);
    setPasswordValidate(false);
    // 모든 메시지 숨기기
    document.querySelector("#password-check-success").style.display = 'none';
    document.querySelector("#password-check-fail").style.display = 'none';
    document.querySelector("#password-validation").style.display = 'none';
  };

  const counselorClicked = () => {
    setIsGeneral(false);
    setIsCounselor(true);
    // 폼 입력 값 초기화
    setJoinForm({
      username: '',
      password: '',
      passwordCheck: ''
    });
    // 유효성 상태 초기화
    setUsernameChk(false);
    setPasswordChk(false);
    setPasswordValidate(false);
    // 모든 메시지 숨기기
    document.querySelector("#password-check-success").style.display = 'none';
    document.querySelector("#password-check-fail").style.display = 'none';
    document.querySelector("#password-validation").style.display = 'none';
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
    if (e.target.name === 'password') {
      if (e.target.value === joinForm.passwordCheck && e.target.value !== '') {
        setPasswordChk(true);
        document.querySelector("#password-check-success").style.display = 'block';
        document.querySelector("#password-check-fail").style.display = 'none';
      } else if (e.target.value !== joinForm.passwordCheck && e.target.value !== '' && joinForm.passwordCheck !== '') {
        setPasswordChk(false);
        document.querySelector("#password-check-success").style.display = 'none';
        document.querySelector("#password-check-fail").style.display = 'block';
      } else {
        // 비밀번호가 비어 있으면 메시지 숨김
        document.querySelector("#password-check-success").style.display = 'none';
        document.querySelector("#password-check-fail").style.display = 'none';
        document.querySelector("#password-validation").style.display = 'none';
      }
    }

    // 입력 필드가 passwordCheck일 경우 비밀번호와 일치하는지 확인
    if (e.target.name === 'passwordCheck') {
      if (e.target.value && e.target.value === joinForm.password) {
        setPasswordChk(true);
        document.querySelector("#password-check-success").style.display = 'block';
        document.querySelector("#password-check-fail").style.display = 'none';
      } else if (e.target.value) {
        setPasswordChk(false);
        document.querySelector("#password-check-success").style.display = 'none';
        document.querySelector("#password-check-fail").style.display = 'block';
      } else {
        document.querySelector("#password-check-success").style.display = 'none';
        document.querySelector("#password-check-fail").style.display = 'none';
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

    const memberData = {
      ...joinForm,
      locationAgree,
      recordConsent
    };

     // 모든 조건을 만족하면 Redux의 join 액션 호출
     dispatch(join(memberData));
  }, [joinForm, usernameChk, passwordChk, passwordValidate, locationAgree, recordConsent, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [phoneNumber, setPhoneNumber] = useState(''); // 휴대전화번호 입력 상태
  const [verificationCode, setVerificationCode] = useState(''); // 인증번호 입력 상태
  const [receivedCode, setReceivedCode] = useState(''); // 서버로부터 받은 인증번호 상태

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value); // 전화번호 입력 상태 업데이트
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value); // 인증번호 입력 상태 업데이트
  };

  const handleSendSms = () => {
    dispatch(verifySms(phoneNumber))
      .then((response) => {
        if (response.type.endsWith('fulfilled')) {
          const receivedCode = response.payload.verificationCode; // 서버에서 받은 인증번호를 변수에 저장
          setReceivedCode(receivedCode); // 필요에 따라 상태로도 저장 가능
          alert(`인증번호: ${receivedCode}`); // 인증번호 출력
        }
      });
  };

  return (
    <Main>
      <form onSubmit={handleJoin}>
        <MainContainer>
          <CoverSelectDiv>
            <SelectDiv>
              <p>회원 유형을 선택하세요</p>
            </SelectDiv>
            <SelectDiv>
              <SelectButton active={isGeneral} onClick={generalClicked} type='button'>
                <p>일반회원</p>
              </SelectButton>
              <SelectButton active={isCounselor} onClick={counselorClicked} type='button'>
                <p>상담사</p>
              </SelectButton>
            </SelectDiv>
          </CoverSelectDiv>
          <CoverTextGuide>
            <TextGuide>아이디</TextGuide>
          </CoverTextGuide>
          <UsernameDiv>
            <JoinInput 
                name='username' 
                id='username' 
                autoFocus value={joinForm.username} 
                onChange={changeTextField} 
                type="text" 
                placeholder="아이디를 입력하세요" />
            <DuplicationBtn name='username-check-btn' id='username-check-btn'
                type='button'
                onClick={usernameCheck}>
            중복확인
            </DuplicationBtn>
          </UsernameDiv>

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
          <PopupDiv>
            <p
            name='password-validation'
            id='password-validation'
            style={{display: 'none', color: 'red', fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '0.5rem'}}> {/* 비밀번호 유효성 검사 메시지 */}
            비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 지정하세요.
            </p>
          </PopupDiv>

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
          <PopupDiv>
            <p
              name='password-check-success'
              id='password-check-success'
              style={{display: 'none', color: 'green', fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '0.5rem'}}>
                비밀번호가 일치합니다.
            </p>
            <p
              name='password-check-fail'
              id='password-check-fail'
              style={{display: 'none', color: 'red', fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '0.5rem'}}>
                비밀번호가 일치하지 않습니다.
            </p>
          </PopupDiv>

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
            <SubmitBtn onClick={(e) => { e.preventDefault(); openModal(); }}>
              <p>본인인증</p>
            </SubmitBtn>
          </AuthDiv>
        </MainContainer>
        <ModalContainer visible={isModalOpen}>
            <ModalContent>
              <CloseButton onClick={closeModal} type='button'>×</CloseButton>
              <h2 style={{
                marginBottom: '3rem'
              }}>휴대전화 인증</h2>
              <PhoneNumberDiv>
                <ModalInput
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="휴대전화번호 입력"
                  // 휴대전화번호 입력 필드 상태 관리
                />
                <SmsButton type='button' onClick={handleSendSms}>
                  인증번호 전송
                </SmsButton>
              </PhoneNumberDiv>
              <PhoneNumberDiv>
                <ModalInput
                  type="text"
                  placeholder="인증번호 입력"
                  // 인증번호 입력 필드 상태 관리
                />
                <SmsButton type='button' onClick={(handleVerifySms) => {
                  // 인증번호 확인 로직 추가
                }}>입력완료</SmsButton>
              </PhoneNumberDiv>
            </ModalContent>
          </ModalContainer>
      </form>
    </Main>
  );
};

export default Join;