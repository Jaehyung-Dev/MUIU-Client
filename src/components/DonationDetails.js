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
  font-family: 'Pretendard-Bold';
  margin-bottom: 0.3rem;
`;

const FundRecipient = styled.p`
  font-size: 0.7rem;
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
  font-size: 0.8rem;
  font-family: 'Pretendard-SemiBold';
  color: #FFCC00;
  margin: 0.22rem 0 0 0.3rem;
`;

const TargetText = styled.p`
  font-size: 0.8rem;
  color: #333;
  float: right;
  margin-right: 0.3rem;
  margin-top: -0.8rem;
`;

// DonationDetails component
const DonationDetails = ({ percentage, targetAmount }) => {
  return (
    <>
      <PostImg src={fundPostImg} alt="호우피해 이미지" />
      <PostBox>
        <PostTitle>폭우가 덮친 밤, 호우피해 주민들의 악몽을 깨워주세요</PostTitle>
        <FundRecipient>사랑의열매 사회복지공동모금회</FundRecipient>

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

