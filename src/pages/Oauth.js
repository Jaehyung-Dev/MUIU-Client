import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserInfo } from '../slices/memberSlice';
import styled, { keyframes } from 'styled-components';

// 360도 회전 애니메이션 정의
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 점이 순차적으로 나타나는 애니메이션
const dots = keyframes`
  0%, 20% {
    content: '';
  }
  40% {
    content: '.';
  }
  60% {
    content: '..';
  }
  80%, 100% {
    content: '...';
  }
`;

// 로딩 컨테이너 스타일
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 130px); //header,footer길이 제외
  text-align: center;
  background-color: #f7f8fa;
`;

// 로딩 이모지 스타일
const Emoji = styled.img`
  width: 15rem;
  height: auto;
  margin-bottom: 10rem;
  animation: ${spin} 3s linear infinite;
`;

// 로딩 텍스트 스타일
const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;

  &::after {
    content: '';
    animation: ${dots} 1.5s steps(3, end) infinite;
  }
`;

const Oauth = () => {
    const location = useLocation(); // 현재 URL 정보 가져오기
    const searchParams = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const navigate = useNavigate();
    const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (code && state) {
      // 백엔드로 code와 state를 전송하여 네이버 로그인 처리
      axios
        .get('http://localhost:9090/members/naver-callback', {
          params: {
            code: code,
            state: state,
          },
        })
        .then((response) => {
          // 네이버에서 받아온 유저 정보를 처리
          console.log('Naver User Info:', response.data);

        // 사용자의 정보가 있는 경우 저장
          const userInfo = {
            isLogin: true,
            id: response.data.id || 0,
            username: response.data.username || '',
            role: response.data.role || '',
            token: response.data.token || '',
          };

          // Redux에 사용자 정보 저장
          dispatch(setUserInfo(userInfo));
            
          // isNewMember가 false이면 메인 페이지로 리다이렉트
          if (response.data.isNewMember === 'false') {
            navigate('/main'); // 메인 페이지로 이동
          } else {
            // isNewMember가 true이면 회원가입 성공 페이지로 리다이렉트
            navigate('/join-success');
          }
        })
        .catch((error) => {
          console.error('Error during Naver login:', error);
        });
    }
  }, []);

  return (
    <LoadingContainer>
      <Emoji src={`${process.env.PUBLIC_URL}/images/Emoji/flying-emoji.png`} alt="Loading icon" />
      <LoadingText>로딩 중</LoadingText>
    </LoadingContainer>
  );
};

export default Oauth;