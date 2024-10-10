import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './store/store';

import CounselorChart from './pages/CounselorChart';
import CounselorDiary from './pages/CounselorDiary';
import CounselorDiaryCheck from './pages/CounselorDiaryCheck';
import DMHMDefinition from './pages/DMHMDefinition';
import DMHMDefinition2 from './pages/DMHMDefinition2';
import DMHMDefinition3 from './pages/DMHMDefinition3';
import DMHMDefinition4 from './pages/DMHMDefinition4';
import DisasterGuide from './pages/DisasterGuide';
import DisasterMentalHealthManual from './pages/DisasterMentalHealthManual';
import Error from './pages/Error';
import ExistingConsultation from './pages/ExistingConsultation';
import Fund from './pages/Fund';
import FundDetail from './pages/FundDetail';
import FundPayment from './pages/FundPayment';
import FundPaymentSystem from './pages/FundPaymentSystem';
import FundPaymentSuccess from './pages/FundPaymentSuccess';
import FundPost from './pages/FundPost';
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
import MyDiaryCollection from './pages/MyDiaryCollection';
import MyPage from './pages/MyPage';
import NewConsultation from './pages/NewConsultation';
import React, { useState } from 'react';
import VideoConsultationScreen from './pages/VideoConsultationScreen';
import MyDiaryWrite from './pages/MyDiaryWrite';
import C_HumanCounseling from './pages/C_HumanCounseling';
import C_NewConsultation from './pages/C_NewConsultation';
import EmotionGraph from './pages/EmotionGraph';
import JoinAgree from './pages/JoinAgree';
import ConsultationRecord from './pages/ConsultationRecord';
import StarredPlace from './pages/StarredPlace';
import DonationRecord from './pages/DonationRecord';
import Loading from './pages/Loading';
import MindCheck_Stress_Process from './pages/MindCheck_Stress_Process';
import MindCheck_Anxiety_Process from './pages/MindCheck_Anxiety_Process';
import MindCheck_Depression_Process from './pages/MindCheck_Depression_Process';
import MindCheck_Physical_Process from './pages/MindCheck_Physical_Process';
import MindCheck_Suicide_Process from './pages/MindCheck_Suicide_Process';
import MindCheck_Stress_Result from './pages/MindCheck_Stress_Result';
import MindCheck_Anxiety_Result from './pages/MindCheck_Anxiety_Result';
import MindCheck_Depression_Result from './pages/MindCheck_Depression_Result';
import MindCheck_Physical_Result from './pages/MindCheck_Physical_Result';
import MindCheck_Suicide_Result from './pages/MindCheck_Suicide_Result';

function App() {
  const persiststore = persistStore(store);

  /*
    ⚠️ 내 마음 알아보기(일일자가진단, MindCheck.js)
      - 점수 반영을 위한 code
      - topic : 'anxiety', 'depression', 'physical', 'stress', 'suicide', 
  */
  const [scores, setScores] = useState({
    stress: 0,
    anxiety: 0,
    depression: 0,
    physical: 0,
    suicide: 0,
  });
  const updateScore = (topic, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [topic]: score,
    }));
  };
  const [suicideStatus, setSuicideStatus] = useState(null);
  const handleSuicideResult = (score, status) => {
    updateScore('suicide', score);
    setSuicideStatus(status);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/main" />} />
              <Route path="main" element={<Main />} />
              <Route path="login" element={<Login />} />
              <Route path="join" element={<Join />} />
              <Route path="join-agree" element={<JoinAgree/>} />
              <Route path="join-success" element={<JoinSuccess/>} />
              <Route path="mypage" element={<MyPage />} />
              <Route path="mind-check" element={<MindCheck />} />
              <Route path="/mind-check/anxiety" element={<MindCheck_Anxiety_Process updateScore={(score) => updateScore('anxiety', score)}/>} />
              <Route path="/mind-check/depression" element={<MindCheck_Depression_Process updateScore={(score) => updateScore('depression', score)}/>} />
              <Route path="/mind-check/physical" element={<MindCheck_Physical_Process updateScore={(score) => updateScore('physical', score)}/>} />
              <Route path="/mind-check/stress" element={<MindCheck_Stress_Process updateScore={(score) => updateScore('stress', score)} />} />
              <Route path="/mind-check/suicide" element={<MindCheck_Suicide_Process updateScore={handleSuicideResult} />} />
              <Route path="/mind-check/anxiety/result" element={<MindCheck_Anxiety_Result score={scores.anxiety} />} />
              <Route path="/mind-check/depression/result" element={<MindCheck_Depression_Result score={scores.depression} />} />
              <Route path="/mind-check/physical/result" element={<MindCheck_Physical_Result score={scores.physical} />} />
              <Route path="/mind-check/stress/result" element={<MindCheck_Stress_Result score={scores.stress} />} />
              <Route path="/mind-check/suicide/result" element={<MindCheck_Suicide_Result score={scores.suicide} status={suicideStatus} />} />
              <Route path="human-counseling" element={<HumanCounseling />} />
              <Route path="my-diary" element={<MyDiary />} />
              <Route path="mind-column" element={<MindColumn />} />
              <Route path="disaster-mental-health-manual" element={<DisasterMentalHealthManual />} />
              <Route path="DMHMDefinition" element={<DMHMDefinition/>} />
              <Route path="DMHMDefinition2" element={<DMHMDefinition2/>} />
              <Route path="DMHMDefinition3" element={<DMHMDefinition3/>} />
              <Route path="DMHMDefinition4" element={<DMHMDefinition4/>} />
              <Route path="disaster-guide" element={<DisasterGuide />} />
              <Route path="error" element={<Error />} />
              <Route path="fund" element={<Fund />} />
              <Route path="fund-detail" element={<FundDetail />} />
              <Route path="fund-payment" element={<FundPayment />} />
              <Route path="fund-payment-system" element={<FundPaymentSystem />} />
              <Route path="fund-payment-success" element={<FundPaymentSuccess />} />
              <Route path="fund-post" element={<FundPost />} />
              <Route path="hospital-shelter-info" element={<HospitalShelterInfo />} />
              <Route path="new-consultation" element={<NewConsultation />} />
              <Route path="existing-consultation" element={<ExistingConsultation />} />
              <Route path="video-consultation" element={<VideoConsultationScreen />} />
              <Route path="my-diary-check" element={<MyDiaryCheck />} />
              <Route path='my-diary-collection' element={<MyDiaryCollection/>}/>
              <Route path="counselor-diary-check" element={<CounselorDiaryCheck />} />
              <Route path="counselor-diary" element={<CounselorDiary />} />
              <Route path="counselor-chart" element={<CounselorChart />} />
              <Route path="new-consultation" element={<NewConsultation />} />
              <Route path="existing-consultation" element={<ExistingConsultation />} />
              <Route path="video-consultation" element={<VideoConsultationScreen />} />
              <Route path="my-diary-check" element={<MyDiaryCheck />}/>
              <Route path="my-diary-write" element={<MyDiaryWrite />}/>
              <Route path="c-human-counseling" element={<C_HumanCounseling />} />
              <Route path="c-new-consultation" element={<C_NewConsultation />} />
              <Route path="emotion-graph" element={<EmotionGraph />} />
              <Route path="consultation-record" element={<ConsultationRecord />} />
              <Route path="starred-place" element={<StarredPlace />} />
              <Route path="donation-record" element={<DonationRecord />} />
              <Route path="loading" element={<Loading />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
