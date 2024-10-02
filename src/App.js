import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AICounseling from './pages/AICounseling';
import Agree from './pages/Agree';
import CounselorChart from './pages/CounselorChart';
import CounselorDiary from './pages/CounselorDiary';
import CounselorDiaryCheck from './pages/CounselorDiaryCheck';
import DMHMDefinition from './pages/DMHMDefinition';
import DMHMDefinition2 from './pages/DMHMDefinition2';
import DisasterGuide from './pages/DisasterGuide';
import DisasterMentalHealthManual from './pages/DisasterMentalHealthManual';
import DisasterSafetyStore from './pages/DisasterSafetyStore';
import ExistingConsultation from './pages/ExistingConsultation';
import HospitalShelterInfo from './pages/HospitalShelterInfo';
import HumanCounseling from './pages/HumanCounseling';
import Join from './pages/Join';
import JoinSuccess from './pages/JoinSuccess';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Main from './pages/Main';
import MindCheck from './pages/MindCheck';
import MindColumn from './pages/MindColumn';
import MyDiary from './pages/MyDiary';
import MyDiaryCheck from './pages/MyDiaryCheck';
import MyPage from './pages/MyPage';
import NewConsultation from './pages/NewConsultation';
import React from 'react';
import VideoConsultationScreen from './pages/VideoConsultationScreen';
import MyDiaryWrite from './pages/MyDiaryWrite';
import C_HumanCounseling from './pages/C_HumanCounseling';
import C_NewConsultation from './pages/C_NewConsultation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="agree" element={<Agree/>} />
          <Route path="join-success" element={<JoinSuccess/>} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mind-check" element={<MindCheck />} />
          <Route path="human-counseling" element={<HumanCounseling />} />
          <Route path="ai-counseling" element={<AICounseling />} />
          <Route path="my-diary" element={<MyDiary />} />
          <Route path="mind-column" element={<MindColumn />} />
          <Route path="disaster-mental-health-manual" element={<DisasterMentalHealthManual />} />
          <Route path="DMHMDefinition" element={<DMHMDefinition/>} />
          <Route path="DMHMDefinition2" element={<DMHMDefinition2/>} />
          <Route path="disaster-guide" element={<DisasterGuide />} />
          <Route path="disaster-safety-store" element={<DisasterSafetyStore />} />
          <Route path="hospital-shelter-info" element={<HospitalShelterInfo />} />
          <Route path="/new-consultation" element={<NewConsultation />} />
          <Route path="/existing-consultation" element={<ExistingConsultation />} />
          <Route path="/video-consultation" element={<VideoConsultationScreen />} />
          <Route path="/my-diary-check" element={<MyDiaryCheck />} />
          <Route path="/counselor-diary-check" element={<CounselorDiaryCheck />} />
          <Route path="/counselor-diary" element={<CounselorDiary />} />
          <Route path="/counselor-chart" element={<CounselorChart />} />
          <Route path="new-consultation" element={<NewConsultation />} />
          <Route path="existing-consultation" element={<ExistingConsultation />} />
          <Route path="video-consultation" element={<VideoConsultationScreen />} />
          <Route path="my-diary-check" element={<MyDiaryCheck />}/>
          <Route path="my-diary-write" element={<MyDiaryWrite/>}/>
          <Route path="c-human-counseling" element={<C_HumanCounseling />} />
          <Route path="c-new-consultation" element={<C_NewConsultation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
