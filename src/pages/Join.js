import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { join } from '../apis/memberApis';
import { useLocation } from 'react-router-dom';
import { verifySms, verifyCounselNum } from '../apis/memberApis';

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
  padding: 0 1.5rem;
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
  border-radius: 10px;
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
    }
`;

const DuplicationBtn = styled.button`
  width: 10rem;
  height: 100%;
  background-color: ${(props) => (props.disabled ? 'gray' : '#ffd651')};
  border-radius: 5px;
  padding: 0.6rem;
  transition: background-color 0.5s ease;  
  font-size: 1.1rem;
  &:hover {
    background-color: ${(props) => (props.disabled ? 'gray' : '#f8cb37')};
  }

  @media screen and (max-width: 600px) {
    width: 8rem;
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
  width: 25rem;
  height: 29rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    width: 20rem;
    height: 27rem;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
`;

const ModalInput = styled.input`
  width: 10rem;
  height: 2rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  background: none;
  font-size: 1.1rem;
  line-height: 2rem;

  &:placeholder {
    color: #A1A1A1;
  }
`;

const SmsButton = styled.button`
  background-color: #ffd651;
  border-radius: 5px;
  width: 6rem;
  height: 100%;
  transition: background-color 0.5s ease;
  border: none;
  color: black;
  font-size: 1rem;
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
  border-radius: 10px;
`

const ModalNameDiv = styled.div`
  width: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  p {
    margin: 0 0 0.3rem 0;
  }
`
const InputName = styled.input`
  width: 100%;
  height: 2rem;
  background-color: #f0f0f0;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1.1rem;
  line-height: 2rem;
` 
const RegistNumCover = styled.div`
  width: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  p {
    margin: 0 0 0.3rem 0;
  }
`

const RegistNumDiv = styled.div`
  width: 17.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const RegistNum = styled.input`
  width: 40%;
  height: 2rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
  line-height: 2rem;
`

export const Join = () => {
  const location = useLocation();
  const { locationAgree, recordConsent } = location.state || {};
  const [isGeneral, setIsGeneral] = useState(true);
  const [isCounselor, setIsCounselor] = useState(false);
  
  // 중복 확인 및 비밀번호 유효성 상태 관리
  const [usernameChk, setUsernameChk] = useState(false); // 아이디 중복 확인 상태
  const [isChecking, setIsChecking] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false); // 비밀번호 유효성 검사 상태
  const [passwordChk, setPasswordChk] = useState(false); // 비밀번호 일치 여부 상태
  const [tel, setTel] = useState(''); // 휴대전화번호 입력 상태
  const [receivedCode, setReceivedCode] = useState(''); // 서버로부터 받은 인증번호 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationInput, setVerificationInput] = useState(''); // 사용자 입력 인증번호
  const [role, setRole] = useState('ROLE_USER');
  const [frontRegistNum, setFrontRegistNum] = useState(''); // 주민등록번호 앞자리
  const [birth, setBirth] = useState(null); // 변환된 생년월일 (Date 타입)
  const [gender, setGender] = useState(''); // 성별
  const [backRegistNum, setBackRegistNum] = useState(''); // 주민등록번호 뒷자리 첫 숫자
  const [name, setName] = useState('');
  const [counselNum, setCounselNum] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태
  const [timeLeft, setTimeLeft] = useState(0); // 타이머 초기값
  const [isVerified, setIsVerified] = useState(false); // 상담사 인증 상태

  // Date 객체 생성 함수
  const createBirthDate = useCallback(() => {
    if (frontRegistNum.length === 6 && backRegistNum.length === 1) {
      const yearPrefix = (backRegistNum === '1' || backRegistNum === '2') ? '19' : '20';
      const fullYear = yearPrefix + frontRegistNum.substring(0, 2);
      const month = parseInt(frontRegistNum.substring(2, 4), 10) - 1; // 월은 0부터 시작
      const day = parseInt(frontRegistNum.substring(4, 6), 10);
      
      if(parseInt(fullYear) > 2023) {
        alert("유효하지 않은 날짜입니다. 다시 입력해주세요.");
        setFrontRegistNum('');
        setBackRegistNum('');
        setBirth(null);
      }

      // 날짜 유효성 확인
      const date = new Date(fullYear, month, day);
      if (
        !isNaN(date.getTime()) &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        setBirth(date);
      } else {
        alert("유효하지 않은 날짜입니다. 다시 입력해주세요.");
        setFrontRegistNum('');
        setBackRegistNum('');
        setBirth(null);
      }
    }
  }, [frontRegistNum, backRegistNum]);

  // 앞자리 입력 변경 함수
  const handleFrontRegistNumChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setFrontRegistNum(value); 
    }
  };

  // 뒷자리 입력 변경 함수
  const handleBackRegistNumChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      if (/^[5-9]$/.test(value) || value === '0') {
        alert("잘못된 값을 입력하였습니다.");
        return;
      }

      if (value === '1' || value === '3') {
        setGender('남');
      } else if (value === '2' || value === '4') {
        setGender('여');
      }
      
      setBackRegistNum(value); // 값 설정만
    }
  };

  // Blur 이벤트 핸들러 - 앞자리에서 포커스가 벗어날 때
  const handleFrontRegistNumBlur = () => {
    if (frontRegistNum.length === 6 && backRegistNum.length === 1) {
      createBirthDate();
    }
  };

  // Blur 이벤트 핸들러 - 뒷자리에서 포커스가 벗어날 때
  const handleBackRegistNumBlur = () => {
    if (frontRegistNum.length === 6 && backRegistNum.length === 1) {
      createBirthDate();
    }
  };

  const generalClicked = () => {
    setIsGeneral(true);
    setIsCounselor(false);
    // 폼 입력 값 초기화
    setJoinForm({
      username: '',
      password: '',
      passwordCheck: '',
      email: '',

    });
    // 유효성 상태 초기화
    setUsernameChk(false);
    setPasswordChk(false);
    setPasswordValidate(false);
    // 모든 메시지 숨기기
    document.querySelector("#password-check-success").style.display = 'none';
    document.querySelector("#password-check-fail").style.display = 'none';
    document.querySelector("#password-validation").style.display = 'none';
    setCounselNum('');
    setRole('ROLE_USER');
  };

  const counselorClicked = () => {
    setIsGeneral(false);
    setIsCounselor(true);
    // 폼 입력 값 초기화
    setJoinForm({
      username: '',
      password: '',
      passwordCheck: '',
      email: ''
    });
    // 유효성 상태 초기화
    setUsernameChk(false);
    setPasswordChk(false);
    setPasswordValidate(false);
    // 모든 메시지 숨기기
    document.querySelector("#password-check-success").style.display = 'none';
    document.querySelector("#password-check-fail").style.display = 'none';
    document.querySelector("#password-validation").style.display = 'none';

    setRole('ROLE_COUNSELOR');
  };

  // 회원가입 폼 상태 관리 (초기값 설정)
  const [joinForm, setJoinForm] = useState({
    username: '', // 아이디
    password: '', // 비밀번호
    passwordCheck: '', // 비밀번호 확인
  });

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
    if (isChecking) return; // 요청이 보내진 상태이면 아래 로직이 실행되지 않게
    setIsChecking(true);

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
              setUsernameChk(true); // 아이디 중복 확인 성공 상태로 변경
              return;
          }
      }
  } catch(e) {
      console.log(e);
      alert("에러가 발생했습니다."); // 에러 처리
  } finally {
      setIsChecking(false); // 요청 응답이 완료될 때 까지 버튼을 disable 
  }
}, [joinForm.username, isChecking]);

  // 비밀번호 유효성 검사 함수 (특수문자, 숫자, 영문자 조합 8자리 이상)
  const validatePassword = useCallback(() => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{8,}$/.test(joinForm.password);
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

  const openModal = () => {
    // 조건 확인
    if (!usernameChk) {
      alert('아이디 중복 확인을 진행하세요.');
      return;
    }
    if (!passwordValidate) {
      alert('비밀번호를 확인하세요.');
      return;
    }
    if (!passwordChk) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!joinForm.email) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (isCounselor && !counselNum) {
      alert('상담사 인증번호를 입력하세요.');
      return;
    }

    // 상담사일 경우 인증이 완료되어야 가입 가능
    if (isCounselor && !isVerified) {
      alert('상담사 인증을 완료해야 회원가입이 가능합니다.');
      return;
    }

    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);

    // 모달 창 내의 input 상태 초기화
    setName('');
    setFrontRegistNum('');
    setBackRegistNum('');
    setTel('');
    setVerificationInput('');
  };

  const handlePhoneNumberChange = (e) => {
    setTel(e.target.value); // 전화번호 입력 상태 업데이트
  };

  // 2분 타이머를 관리
  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const handleSendSms = () => {
    if (isButtonDisabled) return; // 버튼이 이미 비활성화되어 있으면 동작하지 않음
  
    setIsButtonDisabled(true);
    setTimeLeft(120);

    // 인증 번호 전송 요청
    dispatch(verifySms(tel)).then((response) => {
      if (response.type.endsWith('fulfilled')) {
        const receivedCode = response.payload.verificationCode;
        setReceivedCode(receivedCode);
      }
    });
  };

  // 입력한 인증번호 상태 업데이트 함수
  const handleVerificationInputChange = (e) => {
    setVerificationInput(e.target.value);
  };

  const handleVerifySms = () => {
    if (verificationInput === receivedCode) {
      handleJoin();
    } else {
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleCounselNumChange = (e) => {
    setCounselNum(e.target.value);
  }

  const handleCounselNumChk = useCallback((e) => {
    e.preventDefault();

    if(!counselNum) {
      alert('인증번호를 입력하세요.');
      return;
    }

    // 이미 인증된 상태라면 더 이상 요청을 보내지 않음
    if (isVerified) return;

    dispatch(verifyCounselNum(counselNum))
      .then((action) => {
        if (action.type === 'member/counselNum/fulfilled') {
          if (action.payload) {
            setIsVerified(true); // 인증이 완료되면 상태 업데이트
          } else {
            alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
          }
        } else if (action.type === 'member/counselNum/rejected') {
          // 요청이 실패한 경우
          alert('상담사 인증에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((error) => {
        // 에러 발생 시 처리
        console.error('Counselor verification error:', error);
        alert('인증 중 문제가 발생했습니다. 다시 시도해 주세요.');
      });
  }, [counselNum, dispatch, isVerified])

  const handleJoin = useCallback((e) => {
    if(e) {
        e.preventDefault();
    }
    
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
      recordConsent,
      role,
      tel,
      gender,
      name,
      birth
    };

    // 모든 조건을 만족하면 Redux의 join 액션 호출
    dispatch(join(memberData));
  }, [joinForm, usernameChk, passwordChk, passwordValidate, locationAgree, recordConsent, role, tel, gender, name, birth, dispatch]);


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
              placeholder="아이디를 입력하세요" 
            />
            <DuplicationBtn 
              name='username-check-btn' 
              id='username-check-btn'
              type='button'
              onClick={usernameCheck}
              disabled={isChecking} // isChecking이 true면 버튼을 disable
            >
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
              placeholder="비밀번호를 입력하세요" 
            />
          </DefaultDiv>
          <PopupDiv>
            <p
            name='password-validation'
            id='password-validation'
            style={{display: 'none', color: 'red', fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '0.5rem'}}> {/* 비밀번호 유효성 검사 메시지 */}
            비밀번호는 특수문자, 영문자, 숫자 조합의 8자리 이상으로 지정하세요.
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
              placeholder="비밀번호를 다시 입력하세요" 
            />
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
              placeholder="이메일주소를 입력하세요" 
            />
          </DefaultDiv>

          <HiddenDiv visible={isCounselor}>
            <CoverTextGuide>
              <TextGuide>상담사 인증번호</TextGuide>
            </CoverTextGuide>
            <CounselorDiv>
              <JoinInput 
                name='counselNum'
                id='counselNum'
                value={counselNum}
                onChange={handleCounselNumChange} 
                type="text" 
                placeholder="인증번호를 입력하세요" 
              />
              <DuplicationBtn 
                name='counseler-num-btn' 
                id='counseler-num-btn'
                type='button'
                onClick={handleCounselNumChk}
                disabled={isVerified} // 인증 완료 시 버튼 비활성화
              >
                {isVerified ? '인증완료' : '인증하기'}
              </DuplicationBtn>
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
                margin: '0 0 1rem 0'
              }}>본인인증</h2>
              <ModalNameDiv>
                <TextGuide>이름</TextGuide>
                <InputName
                    type="text"
                    placeholder="이름 입력"
                    value={name}
                    onChange={handleNameChange} 
                  />
              </ModalNameDiv>

              
              <RegistNumCover>
                <TextGuide>주민등록번호</TextGuide>
                <RegistNumDiv>
                  <RegistNum 
                    type="text" 
                    value={frontRegistNum} 
                    onChange={handleFrontRegistNumChange}
                    onBlur={handleFrontRegistNumBlur} 
                    placeholder="앞 6자리"
                  />
                  <p style={{
                    margin: '0'
                  }}>-</p>
                  <RegistNum 
                    type="text" 
                    value={backRegistNum} 
                    onChange={handleBackRegistNumChange}
                    onBlur={handleBackRegistNumBlur}
                    placeholder='뒷 1자리' 
                  />
                </RegistNumDiv>
              </RegistNumCover>

              <PhoneNumberDiv>
                <ModalInput
                  type="text"
                  value={tel}
                  onChange={handlePhoneNumberChange}
                  placeholder="휴대전화번호 입력"
                />
                <SmsButton 
                  type='button' 
                  onClick={handleSendSms}
                  disabled={isButtonDisabled} 
                  style={{ backgroundColor: isButtonDisabled ? 'gray' : '#ffd651' }}
                >
                  {isButtonDisabled ? `${timeLeft}초 후 다시 시도` : "인증번호 전송"}
                </SmsButton>
              </PhoneNumberDiv>
              <PhoneNumberDiv>
                <ModalInput
                  type="text"
                  value={verificationInput}
                  onChange={handleVerificationInputChange}
                  placeholder="인증번호 입력"
                />
                <SmsButton type='button' onClick={handleVerifySms}>
                  입력완료
                </SmsButton>
              </PhoneNumberDiv>
            </ModalContent>
          </ModalContainer>
      </form>
    </Main>
  );
};

export default Join;