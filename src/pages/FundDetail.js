import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DonationDetails from '../components/DonationDetails';
import ShareIcon from '@mui/icons-material/Share';

// Styled components
const Main = styled.main`
  position: relative;

  .fund-btn {
    height: 2.5rem;
    width: 9rem;
    border: none;
    border-radius: 0.35rem;
    display: block;
    margin: 5rem auto;
    margin-bottom: 2rem;
    background-color: #3A76E9;
    color: #fff;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .separator {
    border-top: 0.5rem solid #dfdfdf;
    margin: 0.4rem 0;
  }

  .separator-thin {
    border-top: 0.15rem solid #dfdfdf;
    margin: 0.4rem 0;
  }

  .post-detail {
    padding: 1.2rem;
  }

  .post-detail-title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .post-detail-content {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
  }

  .detail-info-box .detail-info {
    font-weight: 600;
    margin: 1rem;
  }
  
  .detail-content {
    margin: 0.65rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;
  }

  .detail-info-description {
    color: #9e9e9e;
    font-size: 0.85rem;
    margin: 0.7rem 0 4rem 0.7rem;
  }

  .share-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .share-icon:hover {
    transform: scale(1.1);
    color: #FFCC00;
  }

  .copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    font-size: 0.9rem;
    opacity: 0.9;
    z-index: 1000;
  }

  @media (max-width: 600px) {
    .post-img {
      width: 100%;
      height: auto;
    }
  }

  @media (min-width: 601px) {
    body {
      max-width: 600px;
      margin: 0 auto;
    }

    .post-img {
      width: 100%;
      height: auto;
    }
  }
`;

const FundDetail = () => {
  const [percentage, setPercentage] = useState(0);
  const [targetAmount] = useState(1000000);
  const [currentAmount] = useState(400000);
  const [copyMessage, setCopyMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const calculatedPercentage = (currentAmount / targetAmount) * 100;
    setPercentage(calculatedPercentage);
  }, [currentAmount, targetAmount]);

  const handleShareClick = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopyMessage('링크가 복사되었습니다.');
        setTimeout(() => setCopyMessage(''), 2000);
      })
      .catch(() => {
        setCopyMessage('링크 복사에 실패했습니다.');
        setTimeout(() => setCopyMessage(''), 2000);
      });
  };

  return (
    <Main>
      <ShareIcon className="share-icon" onClick={handleShareClick} />
      
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
      
      <DonationDetails percentage={percentage} targetAmount={targetAmount} />
      
      <button className="fund-btn" onClick={() => navigate('/fund-payment')}>
        기부하기
      </button>
  
      <div className="separator"></div>
  
      <div className="post-detail">
        <p className="post-detail-title">장마철 비처럼 계속 되풀이 되는 악몽이 될 뻔한 밤</p>
        <p className="post-detail-content">
          아직 날이 밝지 않은 새벽, 끝없이 내리는 빗줄기에 한치 앞도 보이지 않습니다.
          둘러보니 누런 흙탕물이 마을 어귀까지 차올랐고 긴급 사이렌에 전화 벨소리까지 요란스럽습니다.
          모든 걸 삼켜버릴 것 같은 물살 속에서 마을 사람들은 다행히 안전히 구조되었습니다.
        </p>
      </div>
  
      <div className="post-detail">
        <p className="post-detail-title">
          계속되는 극한 호우에 위태로운 일상, 오늘도 불안에 밤잠을 설칩니다.
        </p>
        <p className="post-detail-content">
          하지만 너무 안타깝게도 일부 지역에서는 인명피해가 발생했습니다. 충청, 전북, 경북 등 전국 곳곳에 시간당 100~150ml 이상의 폭우가 쏟아져 사망자 5명, 실종자 1명이 발생하였습니다.
          또한 축구장 1만 5000개의 넓이(경작지 10,756ha)의 농작물이 침수되고, 가축 76만 마리(축사 12만6천 제곱미터)도 폐사했다고 합니다.
        </p>
      </div>
  
      <div className="separator"></div>
  
      <div className='detail-info-box'>
        <div className="detail-info">모금함 상세정보</div>
        <div className="separator-thin"></div>
        <div className="detail-content">
          <span>프로젝트팀</span>
          <span>강동종합사회복지관</span>
        </div>
        <div className="detail-content">
          <span>모금기간</span>
          <span>2024.07.26 - 2024.10.26</span>
        </div>
        <div className="detail-content">
          <span>사업기간</span>
          <span>2024.11.07 - 2024.11.28</span>
        </div>
        <div className="detail-content">
          <span>영수증 발급기간</span>
          <span>한국사회복지관협회</span>
        </div>
        <div className="separator-thin"></div>
        <div className="detail-info-description">
          본 모금은 한국사회복지관협회에서 가업 검토 및 기부금 집행, 사후관리를 담당하고 있습니다.
        </div>
      </div>
    </Main>
  );
};

export default FundDetail;
