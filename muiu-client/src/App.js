import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import MyPage from './pages/MyPage';
import MindCheck from './pages/MindCheck';
import MyDiary from './pages/MyDiary';
import MindColumn from './pages/MindColumn';
import DisasterMentalHealthManual from './pages/DisasterMentalHealthManual';
import DMHM_Definition from './pages/DMHM_Definition';
import DMHM_Definition2 from './pages/DMHM_Definition2';
import DisasterGuide from './pages/DisasterGuide';
import DisasterSafetyStore from './pages/DisasterSafetyStore';
import HospitalShelterInfo from './pages/HospitalShelterInfo';
import HumanCounseling from './pages/HumanCounseling';
import AICounseling from './pages/AICounseling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mind-check" element={<MindCheck />} />
          <Route path="human-counseling" element={<HumanCounseling />} />
          <Route path="ai-counseling" element={<AICounseling />} />
          <Route path="my-diary" element={<MyDiary />} />
          <Route path="mind-column" element={<MindColumn />} />
          <Route path="disaster-mental-health-manual" element={<DisasterMentalHealthManual />} />
          <Route path="DMHM_Definition" element={<DMHM_Definition/>} />
          <Route path="DMHM_Definition2" element={<DMHM_Definition2/>} />
          <Route path="disaster-guide" element={<DisasterGuide />} />
          <Route path="disaster-safety-store" element={<DisasterSafetyStore />} />
          <Route path="hospital-shelter-info" element={<HospitalShelterInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
