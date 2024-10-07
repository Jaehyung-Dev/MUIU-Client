import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import styled from 'styled-components'; 
import DonationDetails from '../components/DonationDetails';

// Styled components
const Main = styled.main`
    .fund-btn {
        width: 100%;
        height: 4rem;
        border: none;
        border-radius: 0.35rem;
        background-color: #3A76E9;
        color: #fff;
        font-family: 'Pretendard-SemiBold';
        font-size: 1.2rem;
        margin: 5rem 0 2rem 0;
        cursor: pointer;
    }

`;



const FundPaymentSystem = () => {

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
                totalPayAmount: 5000, // 결제 금액
                taxScopeAmount: 5000, // 과세 대상 금액
                taxExScopeAmount: 0, // 면세 대상 금액
                returnUrl: "https://your-website.com/payment-success" // 결제 완료 후 리다이렉트될 URL
              });
            });
          }
        };
    }, []);

    const [percentage, setPercentage] = useState(0);
    const [targetAmount] = useState(1000000);
    const [currentAmount] = useState(400000);

    const navigate = useNavigate(); // useNavigate를 사용해 페이지 이동
  
    useEffect(() => {
      const calculatedPercentage = (currentAmount / targetAmount) * 100;
      setPercentage(calculatedPercentage);
    }, [currentAmount, targetAmount]);

    return (
        <Main>
        {/* DonationDetails 컴포넌트를 재사용하여 동일한 부분을 표시 */}
        <DonationDetails percentage={percentage} targetAmount={targetAmount} />
        <input type="button" id="naverPayBtn" className="fund-btn" value="5,000원 결제하기" />
        </Main>
    );
};

export default FundPaymentSystem;
