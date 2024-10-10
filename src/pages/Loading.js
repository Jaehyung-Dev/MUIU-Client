import React from 'react';
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
  color: #333;
`;

// 로딩 이모지 스타일
const Emoji = styled.img`
  width: 15rem;
  height: auto;
  margin-bottom: 8rem;
  animation: ${spin} 3s linear infinite;
`;

// 로딩 메시지 스타일
const LoadingMessage = styled.div`
  font-size: 1.7rem; /* 폰트 크기 키움 */
  font-weight: 600;
  margin-bottom: 1rem; /* 문구 사이 간격 */
`;

// 로딩 텍스트 스타일
const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;

  &::after {
    content: '';
    animation: ${dots} 2.5s steps(3, end) infinite;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Emoji src={`${process.env.PUBLIC_URL}/images/Emoji/하늘마음티콘.png`} alt="Loading icon" />
      <LoadingMessage>잠시만 기다려주세요</LoadingMessage>
      <LoadingText>로딩 중입니다</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
