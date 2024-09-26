import React from 'react';
import { Outlet } from 'react-router-dom';
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
    padding: 0 20px 180px;
    box-sizing: border-box;

    @media (max-width: 600px) {
        padding: 0 15px 100px;
    }

    @media (max-width: 393px) {
        padding: 5px 10px 100px;
    }
`;

function Layout() {
  return (
    <Container>
      <Header />
      <Outlet />
      <BottomNav />
    </Container>
  );
}

export default Layout;
