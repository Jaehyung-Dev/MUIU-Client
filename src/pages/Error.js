import React from 'react';
import styled from 'styled-components';

// 에러 페이지 스타일
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 130px); //header,footer길이 제외
  text-align: center;
  background-color: #f7f8fa;
`;

// 이모지 스타일
const ErrorEmoji = styled.img`
  width: 10rem;
  height: auto;
  margin-bottom: 2rem;
`;

// 에러 텍스트 스타일
const ErrorText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

// 상세 메시지 스타일
const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.8rem;
`;

const Error = () => {
  return (
    <ErrorContainer>
      <ErrorEmoji src={`${process.env.PUBLIC_URL}/images/Emoji/놀람티콘.png`} alt="Error icon" />
      <ErrorText>에러가 발생했습니다!</ErrorText>
      <ErrorMessage>페이지를 로드하는 중 문제가 발생했습니다.<br />잠시 후 다시 시도해주세요.</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;
