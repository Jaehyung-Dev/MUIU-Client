import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 130px); //header,footer길이 제외
  background-color: #f9fafc;
  text-align: center;
  line-height: 3rem;

  /* 반응형 쿼리 */
  @media (max-width: 600px) {
    height: calc(100vh - 100px); // 화면 크기 작을 때 헤더와 푸터 높이 줄일 수 있음
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #3A76E9;

  @media (max-width: 600px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const ThankYouMessage = styled.p`
  font-size: 1.5rem;
  color: #FFCC00;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;


const FundPaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 Fund.js 페이지로 이동
    setTimeout(() => {
      navigate('/fund');
    }, 4000);  // 4초 대기 후 이동
  }, [navigate]);

  return (
    <>
      <SuccessContainer>
        <Title>결제가 완료되었습니다!</Title>
        <ThankYouMessage>진심으로 감사드립니다! 💛</ThankYouMessage>
        <Message>
        <img 
          src={`${process.env.PUBLIC_URL}/images/꾸벅티콘.png`} 
          className='imty'
          alt="감사 이미지" 
          style={{ width: '100px', margin: '0 auto 1rem auto', display: 'block' }} 
        />
          기부자님의 기부가 큰 도움이 됩니다. 
          <br />잠시 후에 메인 페이지로 이동합니다...
          </Message>
      </SuccessContainer>
    </>
  );
};

export default FundPaymentSuccess;
