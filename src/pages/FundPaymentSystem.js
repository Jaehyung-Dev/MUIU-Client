import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import styled, { keyframes } from 'styled-components'; 
import fundPostImg from '../DMHM-images/fund-post-img.png'; 

// Styled components
const Main = styled.main`
    .fund-btn {
        width: calc(100% - 2rem); /* 양쪽 margin 값을 빼서 계산 */
        height: 4rem;
        border: none;
        border-radius: 0.35rem;
        color: #fff;
        font-weight: 600;
        font-size: 1.2rem;
        margin: 1rem;
        padding: 0 5rem 0 3rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #naverPayBtn{
      background-color: #03C75A; /* 네이버페이 고유 색상 */
        &:hover {
            background-color: #02B15A; /* 호버 색상 */
        }
    }

    #tossPayBtn{
      background-color: #0075FF; /* 토스페이 고유 색상 */
        &:hover {
            background-color: #005BBB; /* 호버 색상 */
        }

        img {
            width: 10rem; /* 이미지 크기 설정 */
            height: auto;
            padding: 0;
        }
    }
`;

const PostBox = styled.div`
  padding: 1.2rem;
  margin-bottom: 5rem;
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
`;

const PostTitle = styled.p`
font-size: 1.22rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const FundRecipient = styled.p`
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;
`;

// 이미지 애니메이션 정의
const sway = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const FlyImage = styled.img`
  width: 140px;
  margin: 1.5rem 0 0 0;
  display: block;
  animation: ${sway} 2s ease-in-out infinite;  // 천천히 흔들리는 애니메이션 효과
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #ECECEC;
  border-radius: 25px;
  height: 0.7rem; 
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #FFCC00;
  border-radius: 25px;
  transition: width 0.5s ease;
`;

const ProgressText = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  color: #FFCC00;
  margin: 0.3rem 0 0 0.3rem;
`;

const TargetText = styled.p`
  font-size: 0.9rem;
  color: #333;
  float: right;
  margin-right: 0.3rem;
  margin-top: -1.7rem;
`;

// 네이버페이 SVG Component
const NaverPayIcon = () => (
  <svg width="90" height="60" viewBox="0 0 168 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3699_5886)">
      <path d="M164.581 10.3415L147.863 47.9115H140.121L145.471 36.0035L132.62 10.3415H140.596L149.137 27.8915L156.859 10.3415H164.581ZM128.831 39.2015H121.421V37.128C119.035 38.9369 116.114 39.8957 113.12 39.8515C104.95 39.8515 98.5407 33.2215 98.5407 24.7715C98.5407 16.3215 104.95 9.69152 113.12 9.69152C116.114 9.64738 119.035 10.6061 121.421 12.415V10.3415H128.831V39.2015ZM114.147 15.9315C109.48 15.9315 105.957 19.734 105.957 24.7715C105.957 29.809 109.48 33.6115 114.147 33.6115C118.814 33.6115 122.337 29.809 122.337 24.7715C122.337 19.734 118.814 15.9315 114.147 15.9315ZM64.2207 10.3415H71.6307V12.415C74.0189 10.607 76.9426 9.64843 79.9377 9.69152C88.1082 9.69152 94.5108 16.315 94.5108 24.7715C94.5108 33.228 88.1082 39.8515 79.9377 39.8515C77.0525 39.8948 74.2302 39.0057 71.8907 37.3165V47.9115H64.2207V10.3415ZM70.7207 24.7715C70.7207 29.809 74.2438 33.6115 78.9108 33.6115C83.5778 33.6115 87.1007 29.809 87.1007 24.7715C87.1007 19.734 83.5778 15.9315 78.9108 15.9315C74.2438 15.9315 70.7207 19.734 70.7207 24.7715Z" fill="#fff"/>
      <path d="M52 26C52 31.1423 50.4752 36.1692 47.6182 40.4448C44.7613 44.7205 40.7007 48.053 35.9498 50.0209C31.1989 51.9888 25.9712 52.5037 20.9277 51.5004C15.8842 50.4972 11.2514 48.021 7.61524 44.3848C3.97907 40.7486 1.50281 36.1159 0.499592 31.0724C-0.503624 26.0289 0.0112727 20.8011 1.97915 16.0502C3.94703 11.2994 7.27955 7.23871 11.5552 4.38179C15.8309 1.52487 20.8577 0 26 0C32.8957 0 39.5089 2.73928 44.3848 7.61523C49.2608 12.4912 52 19.1044 52 26ZM31.434 12.61V27.729L20.8195 12.61H12.61V39.39H20.5725V24.2645L31.187 39.39H39.39V12.61H31.434Z" fill="#fff"/>
    </g>
    <defs>
      <clipPath id="clip0_3699_5886">
        <rect width="168" height="52" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const FundPaymentSystem = () => {
  const location = useLocation();
  const { totalAmount, name } = location.state || { totalAmount: 0, name: '익명' }; // state에서 totalAmount 받기, 없을 경우 기본값 0
  const [percentage, setPercentage] = useState(0);
  const [targetAmount] = useState(1000000);
  const [currentAmount] = useState(400000);
  const [newPercentage, setNewPercentage] = useState(0);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    // 현재 달성 퍼센트 계산
    const calculatedPercentage = (currentAmount / targetAmount) * 100;
    setPercentage(calculatedPercentage);

    // 새로운 후원 금액을 포함한 달성 퍼센트 계산
    const newCalculatedPercentage = ((currentAmount + totalAmount) / targetAmount) * 100;
    setNewPercentage(newCalculatedPercentage);

    
  }, [currentAmount, targetAmount, totalAmount]);
  
  //네이버페이가 제공한 JavaScript SDK를 리액트 컴포넌트에 통합
  useEffect(() => {

    // 네이버페이 SDK 로드
    const script = document.createElement('script');
    script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.Naver && window.Naver.Pay) {
        const oPay = window.Naver.Pay.create({
          mode: "production", // development 또는 production
          clientId: "u86j4ripEt8LRfPGzQ8", // 실제 클라이언트 ID로 변경
        });
        
        // 결제 버튼 클릭 이벤트 등록
        const naverPayBtn = document.getElementById('naverPayBtn');
        naverPayBtn.addEventListener('click', () => {
          oPay.open({
              merchantUserKey: "test-user-1234", // 테스트 사용자 식별 키
              merchantPayKey: "test-order-5678", // 테스트 주문 번호
              productName: "기부", // 상품 이름
              totalPayAmount: totalAmount, // 결제 금액
              taxScopeAmount: totalAmount, // 과세 대상 금액
              taxExScopeAmount: 0, // 면세 대상 금액
              returnUrl: "http://localhost:3000/fund-payment-success" 
            });
          });
        }
      };

      // 토스페이 SDK 로드
      const scriptTossPay = document.createElement('script');
      scriptTossPay.src = 'https://js.tosspayments.com/v1';
      scriptTossPay.async = true;
      document.body.appendChild(scriptTossPay);

      scriptTossPay.onload = () => {
        if (window.TossPayments) {
          const tossPayments = window.TossPayments('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'); // 테스트용 API 키
          const tossPayBtn = document.getElementById('tossPayBtn');
          const orderId = `order_${new Date().getTime()}`; // 고유한 주문 ID

          tossPayBtn.addEventListener('click', () => {
            try {
              tossPayments.requestPayment('카드', {
                amount: totalAmount,
                orderId: orderId,
                orderName: '기부',
                customerName: name || '테스트 사용자',
                successUrl: 'http://localhost:3000/fund-payment-success',
                failUrl: 'http://localhost:3000/fund-payment',
              });
            } catch (error) {
              console.error("결제 요청 중 오류 발생:", error); 
              alert('결제 요청에 문제가 있습니다. 콘솔 로그를 확인해 주세요.');
            }
          });
        }
      };
  }, [totalAmount, name]);

  return (
    <Main>
      <PostImg src={fundPostImg} alt="호우피해 이미지" />
      <PostBox>
        <PostTitle>폭우가 덮친 밤, 호우피해 주민들의 악몽을 깨워주세요</PostTitle>
        <FundRecipient>사랑의열매 사회복지공동모금회</FundRecipient>
        <FlyImage 
          src={`${process.env.PUBLIC_URL}/images/하늘마음티콘.png`} 
          alt="감사 이미지" 
        />

        <ProgressContainer>
          <ProgressBar style={{ width: `${newPercentage}%` }} />
          <ProgressText>
            {name}님의 후원으로 인해 <br/>
            {Math.floor(newPercentage)}% 달성 예정!
          </ProgressText>
          <TargetText>목표 금액: {targetAmount.toLocaleString()}원</TargetText>
        </ProgressContainer>
      </PostBox>

      <button 
        id="naverPayBtn" 
        className="fund-btn">
        <NaverPayIcon />
        네이버페이로 {totalAmount.toLocaleString()}원 결제하기
      </button>

      <button  
        id="tossPayBtn" 
        className="fund-btn">
        <img src={`${process.env.PUBLIC_URL}/images/Toss_Logo_White.png`}  alt="Toss Logo" />
        토스페이로 {totalAmount.toLocaleString()}원 결제하기
      </button>
      
    </Main>
  );
};

export default FundPaymentSystem;
