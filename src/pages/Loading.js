import React, { useEffect } from 'react';
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

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingContainer>
      <Emoji src={`${process.env.PUBLIC_URL}/images/Emoji/하늘마음티콘.png`} alt="Loading icon" />
      <LoadingText>로딩 중</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
