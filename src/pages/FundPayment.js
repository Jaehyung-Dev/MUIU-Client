import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components'; 
import DonationDetails from '../components/DonationDetails';
import { styled as muiStyled } from '@mui/material/styles'; // MUI의 styled
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckBeforeIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckAfterIcon from '@mui/icons-material/CheckCircleRounded';


// Styled components
const Main = styled.main`

  // width: calc(100% - 2rem);
  // 가장 바깥 요소에 width 100%를 주면 너비가 넘침. 몇으로 줘야 됨?

  .payment-box{
    margin: 0 1rem;
  }
  .payment-input-box {
    margin-top: 3.5rem;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  .fund-txt {
    color: #888888;
    font-family: 'Pretendard-SemiBold';
    margin: 0.3rem;
  }

  #total-amount {
    text-align: right; /* 오른쪽 정렬 */
    margin-right: 0.4rem;
  }

  /* 크롬, 사파리 등 웹킷 브라우저에서 화살표 제거 */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  /* 파이어폭스에서 화살표 제거 */
  input[type="number"] {
      -moz-appearance: textfield;
  }

  .won-box{
    display: flex;
    align-items: center; 
    padding-bottom: 0.3rem;

    .won {
      color: #333;
      font-family: 'Pretendard-SemiBold';
      margin-right: 1rem;
      font-weight:600;
    }

    input{
      border: none;
      font-size: 1rem;
    }
  }


  .remove-icon {
    cursor: pointer;
    height: 1.7rem;
    width: 1.7rem;
    color: #333;
    background-color: #7A7A7A;
    border-radius: 7rem;
  }

  .fund-underbar {
    border-top: 1.5px solid #333;
  }

  .plus-money-box {
    font-family: 'Pretendard-Regular';
    display: flex;
    flex-wrap: wrap;

    .plus-money {
      color: #7A7A7A;
      background-color: #fff;
      border: 1.3px solid #7A7A7A;
      border-radius: 5px;
      height: 2.2rem;
      width: 6rem;
      text-align: center;
      margin: 1rem 0.2rem;
    }
  }

  .message-container {
    font-family: 'Pretendard-Regular';
    position: relative;
    margin-top: 2rem;
    margin-right: 1rem;

    .message-box {
      width: 100%;
      padding: 1rem;
      padding-right: 0;
      height: 10rem;
      border: 1.3px solid #333;
      border-radius: 5px;
      font-family: 'Pretendard-Regular';
      font-size: 1rem;
    }

    // 글자수 계산
    .char-count {
      position: absolute;
      right: 0;
      bottom: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  }

  .name-input-box {
    font-family: 'Pretendard-Regular';
    color: #7A7A7A;
    width: 100%;
    margin-top: 2rem;

    .name-input {
      width: 100%;
      border: none;
      border-bottom: 1.5px solid #333;
      padding: 0.5rem;
      font-size: 1rem;
      font-weight:600;
    }

    .name-input:focus {
      outline: none;
      border-bottom: 1.5px solid #FFCC00;
    }


    .anonymous-fund{
      display: flex;
      align-items: center; 
      margin-top: 0.5rem;
    }
    .anonymous-check{
      margin: 0 0.3rem;
      cursor: pointer;
    }
    .anonymous-txt {
      font-size: 0.8rem;
      display: inline-block;
    }
  }

  .fund-btn {
    width: 100%;
    height: 4rem;
    border: none;
    border-radius: 0.35rem;
    background-color: #3A76E9;
    color: #fff;
    font-family: 'Pretendard-SemiBold';
    font-size: 1.3rem;
    letter-spacing: 0.15rem;
    margin: 3rem 0 2rem 0;
    cursor: pointer;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    
  }
`;


const FundPayment = () => {
    const [percentage, setPercentage] = useState('');
    const [targetAmount] = useState(1000000);
    const [currentAmount] = useState(400000);
    const [totalAmount, setTotalAmount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [name, setName] = useState('');

    const totalAmountRef = useRef(null); // useRef를 통해 input 요소에 접근
    const nameInputRef = useRef(null); // 기부자 성함 input을 참조하는 useRef
    const navigate = useNavigate(); // useNavigate를 사용해 페이지 이동
  
    useEffect(() => {
      window.scrollTo(0, 0);
      
      const calculatedPercentage = (currentAmount / targetAmount) * 100;
      setPercentage(calculatedPercentage);
    }, [currentAmount, targetAmount]);

    // 금액 추가
    const handleAmountChange = (amount) => {
        setTotalAmount(totalAmount + amount);
    };

    // 금액 입력 시 호출되는 함수
    const handleCustomAmountChange = (e) => {
        setTotalAmount(parseInt(e.target.value || '', 10));
    };

    // MUI 스타일을 사용하여 반전된 아이콘을 적용
    const DeleteIcon = muiStyled(ClearRoundedIcon)`
      filter: invert(100%);
      color: #fff;
      height: 2rem;
      weight: 2rem;
    `;

    // 메세지 길이 계산
    const handleMessageChange = (e) => {
        setCharCount(e.target.value.length);
    };

    const handleResetAmount = () => {
        setTotalAmount(0);
    };

    // 익명 기부자 상태 관리
    const [isAnonymous, setIsAnonymous] = useState(false); 

    // 익명 상태 토글 함수
    const handleAnonymousToggle = () => {
      setIsAnonymous(!isAnonymous); // true <-> false로 토글
    };

    
    const handleSubmit = () => {
      
      if (!totalAmount) {
        alert("기부 금액을 입력해주세요");
        totalAmountRef.current.focus(); // 기부 금액 input에 포커스
        return;
      }
    
      if (!name && !isAnonymous) { // 익명이 아니면서 이름이 비어있을 때
        alert("기부자 성함을 입력해주세요");
        nameInputRef.current.focus(); // 기부자 성함 input에 포커스
        return;
      }
    
      // 기부 로직 처리
      console.log("기부 완료");
      navigate('/fund-payment-system', {
        state: {
          name: isAnonymous ? '익명 기부자' : name,
          totalAmount: totalAmount,
          targetAmount: targetAmount,
          percentage: percentage,
        }
      });
    };
    

    return (
      <Main>
        {/* DonationDetails 컴포넌트를 재사용하여 동일한 부분을 표시 */}
        <DonationDetails percentage={percentage} targetAmount={targetAmount} />

        <div className="payment-box">
          <div className="payment-input-box">
            <span className="fund-txt">기부금액</span>
            <div className="won-box">
              <input
                ref={totalAmountRef}
                type="number"
                id="total-amount"
                className="won"
                value={totalAmount}
                onChange={handleCustomAmountChange}
                placeholder="금액 입력"
              />
              <span className="won">원</span>
              <span onClick={handleResetAmount}>
                <DeleteIcon className="remove-icon"/>
              </span>
            </div>
          </div>
          <div className="fund-underbar"></div>
          <div className="plus-money-box">
            <button className="plus-money" onClick={() => handleAmountChange(5000)}>+5천원</button>
            <button className="plus-money" onClick={() => handleAmountChange(10000)}>+1만원</button>
            <button className="plus-money" onClick={() => handleAmountChange(30000)}>+3만원</button>
            <button className="plus-money" onClick={() => handleAmountChange(50000)}>+5만원</button>
            <button className="plus-money" onClick={() => handleAmountChange(100000)}>+10만원</button>
            <button className="plus-money" onClick={() => handleAmountChange(500000)}>+50만원</button>
            <button className="plus-money" onClick={() => handleAmountChange(1000000)}>+100만원</button>
            <button className="plus-money" onClick={handleCustomAmountChange}>직접입력</button>
          </div>

          <div className="message-container">
            <textarea
              id="encouragement-message"
              className="message-box"
              placeholder="응원의 한마디를 자유롭게 남겨주세요."
              maxLength="300"
              onChange={handleMessageChange}
            ></textarea>
            <div className="char-count">
              <span id="char-count">{charCount}</span>/300
            </div>
          </div>

          <div className="name-input-box">
            <input 
              ref={nameInputRef} 
              type="text" 
              className="name-input" 
              placeholder={isAnonymous ? "익명 기부자" : "기부자 성함"}
              disabled={isAnonymous} // 익명이면 수정 불가능
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <div className='anonymous-fund' onClick={handleAnonymousToggle}>
              {/* 익명 상태에 따라 아이콘 변경 */}
              {isAnonymous ? (
                <CheckAfterIcon className='anonymous-check' />
              ) : (
                <CheckBeforeIcon className='anonymous-check' />
              )}
              <span className="anonymous-txt">익명으로 기부할게요</span>
            </div>
          </div>
          <button className="fund-btn" id="fund-btn" onClick={handleSubmit}>
            기부하기
          </button>
        </div>
      </Main>
    );
};

export default FundPayment;
