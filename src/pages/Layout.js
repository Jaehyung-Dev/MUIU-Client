import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 600px;
    margin: 0 auto;
    // padding: 0 20px 180px;
    padding-top: 63px;
    padding-bottom: 100px;
    box-sizing: border-box;
    box-sizing: content-box;
    background-color: ${(props) => props.bgColor};

    // @media (max-width: 600px) {
    //     padding: 0 15px 100px;
    // }

    // @media (max-width: 393px) {
    //     padding: 5px 10px 100px;
    // }
`;

function Layout() {
  const currentLocation = useLocation();

  const getBackgroundColor = () => {
    switch(currentLocation.pathname) {
      case '/my-diary': case '/my-diary-check': 
      case '/my-diary-write': case '/my-diary-collection':
        return '#efefef';
      default:
        return 'white';
    }
  };

  const bgColor = getBackgroundColor();

  return (
    <Container bgColor={bgColor}>
      <Header />
      <Outlet />
      <BottomNav />
    </Container>
  );
}

export default Layout;
