import React from 'react';
import styled from 'styled-components';
import fundPostImg from '../DMHM-images/fund-post-img.png'; 


const PostBox = styled.div`
  padding: 1.2rem;
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
`;

const PostTitle = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
`;

const FundRecipient = styled.p`
  font-size: 0.85rem;
  margin-bottom: 0;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #ECECEC;
  border-radius: 25px;
  height: 0.7rem;
  margin-top: 1.5rem;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #FFCC00;
  border-radius: 25px;
  transition: width 0.5s ease;
`;

const ProgressText = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  color: #FFCC00;
  margin: 0.4rem 0 0 0.3rem;
`;

const TargetText = styled.p`
  font-size: 0.9rem;
  color: #333;
  float: right;
  margin-right: 0.3rem;
  margin-top: -1.3rem;
`;

// DonationDetails component
const DonationDetails = ({ imageSrc, title, recipient, percentage, targetAmount }) => {
  return (
    <>
      <PostImg src={imageSrc} alt="기부 메인 이미지" />
      <PostBox>
        <PostTitle>{title}</PostTitle>
        <FundRecipient>{recipient}</FundRecipient>

        <ProgressContainer>
          <ProgressBar style={{ width: `${percentage}%` }} />
          <ProgressText>{Math.floor(percentage)}% 달성</ProgressText>
          <TargetText>목표 금액: {targetAmount.toLocaleString()}원</TargetText>
        </ProgressContainer>
      </PostBox>
    </>
  );
};

export default DonationDetails;

