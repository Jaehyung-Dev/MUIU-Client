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
        background-color: #3A76E9;
        color: #fff;
        font-weight: 600;
        font-size: 1.2rem;
        margin: 1rem;
        cursor: pointer;
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
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const FundRecipient = styled.p`
  font-size: 0.7rem;
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
  font-size: 0.9rem;
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

      <input 
        type="button" 
        id="naverPayBtn" 
        className="fund-btn" 
        value={`네이버페이로 ${totalAmount.toLocaleString()}원 결제하기`}
      />
      <input 
        type="button" 
        id="tossPayBtn" 
        className="fund-btn" 
        value={`토스페이로 ${totalAmount.toLocaleString()}원 결제하기`}
      />
    </Main>
  );
};

export default FundPaymentSystem;
