import React from 'react';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  margin-top: 70px;
`;

const MenuListContainer = styled.div`
  flex: 1;
  padding: 0rem 1rem;
  background-color: white;
  overflow-y: auto;
  height: 100vh;
`;

const ManualImage = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 50%;
    height: auto;
  }
`;

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const ListButton = styled.button`
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  background-color: #d3d3d3;
  color: #656565;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #FFD651;
    color: #1E1D1D;
  }
`;

// MenuList 컴포넌트
const MenuList = () => {
  const navigate = useNavigate(); // useNavigate를 사용해 navigate 함수 가져오기

  const navigateTo = (page) => {
    if (page === 'ch1') {
      navigate('/DMHMDefinition'); // 페이지 이동
    } else if (page === 'ch2') {
      navigate('/DMHMDefinition2'); // 페이지 이동
    }
  };

  return (
    <MenuListContainer>
      <ManualImage>
        <img src="/DMHM-images/manual_img.jpg" alt="Manual" />
      </ManualImage>
      <MenuButtons>
        <ListButton onClick={() => navigateTo('ch1')}>정의</ListButton>
        <ListButton onClick={() => navigateTo('ch2')}>심리적 반응 및 대처방법</ListButton>
        <ListButton onClick={() => navigateTo('ch3')}>재난 유형별 반응 및 대처방법</ListButton>
        <ListButton onClick={() => navigateTo('ch4')}>재난 정신건강 질환</ListButton>
      </MenuButtons>
    </MenuListContainer>
  );
};

// 전체 페이지 컴포넌트
const DisasterMentalHealthManual = () => {
  return (
    <AppContainer>
      {/* <Header /> */}
      <MenuList />
      <BottomNav />
    </AppContainer>
  );
};

export default DisasterMentalHealthManual;
