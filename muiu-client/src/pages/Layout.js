import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <Header />
      <Outlet />

      <ul>
            <li><Link to="/main">Main Screen</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/join">Join</Link></li>
            <li><Link to="/mypage">My Page</Link></li>
            <li><Link to="/mind-check">Mind Check</Link></li>
            <li><Link to="/human-counseling">Human Counseling</Link></li>
            <li><Link to="/ai-counseling">AI Counseling</Link></li>
            <li><Link to="/my-diary">My Diary</Link></li>
            <li><Link to="/mind-column">Mind Column</Link></li>
            <li><Link to="/disaster-mental-health-manual">Disaster Mental Health Manual</Link></li>
            <li><Link to="/disaster-guide">Disaster Guide</Link></li>
            <li><Link to="/disaster-safety-store">Disaster Safety Store</Link></li>
            <li><Link to="/hospital-shelter-info">Hospital-Shelter Info</Link></li>
          </ul>

      <BottomNav />
    </div>
  );
}

export default Layout;
