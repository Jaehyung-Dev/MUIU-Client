import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Main = styled.main`
  a {
    text-decoration: none;
  }

  .card {
    // font-family: 'Pretendard-Regular';
    // margin: 0.5rem;
    border-radius: 0.6rem;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* 카드 안의 내용이 넘칠 때를 대비 */
  }

  .card-img {
    width: 100%;
    height: 200px; /* 카드 안에서 일정한 높이를 유지하도록 설정 */
    object-fit: cover; /* 이미지가 카드 영역을 꽉 채우게 */
    // margin-left: 10px; 
  }

  /* 첫 번째 카드에만 여백을 추가 */
  .card:first-child {
    margin-top: 6rem; /* 첫 번째 카드 상단에 추가 여백 */
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-text {
    font-size: 1.3rem;
    // font-family: 'Pretendard-Bold';
    margin-bottom: 1rem;
    color: #333;
  }

  .card-date {
    color: gray;
    font-size: 1em;
  }

  @media (min-width: 601px) {
    body {
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (max-width: 600px) {
  // 카드 이미지 안넘치게 조정
    .card-img {
      width: 100%;
      height: auto; 
      object-fit: cover; 
    }
  }
`;

const FundCard = ({ imageSrc, altText, title, date, link }) => {
  return (
    <Link to={link}>
      <div className="card">
        <img src={imageSrc} className="card-img" alt={altText} />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-date">{date}</p>
        </div>
      </div>
    </Link>
  );
};

const Fund = () => {
  return (
    <Main>
      <FundCard
        imageSrc="../svg/store-card1.svg"
        altText="호우피해 긴급모금 카드 이미지"
        title="호우피해 긴급모금"
        date="2024.6.16 ~ 2024.7.31"
        link="/fund-detail"
      />
      <FundCard
        imageSrc="../svg/store-card2.svg"
        altText="산불피해 긴급모금 카드 이미지"
        title="산불피해 긴급모금"
        date="2024.7.01 ~ 2024.8.01"
        link="/fund-detail"
      />
      <FundCard
        imageSrc="../svg/store-card3.svg"
        altText="산불피해 긴급모금 카드 이미지"
        title="전북 호우피해 구호키트 지원 캠페인"
        date="2024.7.16 ~ 2024.8.16"
        link="/fund-detail"
      />
    </Main>
  );
};

export default Fund;
