import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuDropdown from '../components/MenuDropdown';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
    z-index: 1000;
`;

const BackButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

const Title = styled.h1`
    font-weight: 700;
    color: black;
    font-size: 18px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const IconContainer = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    margin-right: 10px;
`;

const Container = styled.div`
    text-align: center;
    min-height: 100vh;
    display: flex;
    width: 100vw;
    max-width: 600px;
    flex-direction: column;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    position: relative;
    z-index: 1;
`;

const Underline = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #fbbf24;
    width: 25%;
    transform: translateX(${({ activeTab }) => (
        activeTab === 'video' ? '0%' :
        activeTab === 'call' ? '100%' :
        activeTab === 'chat' ? '200%' :
        '300%'
    )});
    transition: transform 0.3s ease;
`;


const ConsultationListWrapper = styled.div`
    background-color: #F3F3F3;
    width: 100%;
    padding: 15px 0;
    flex: 1;
`;

const InnerContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ConsultationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
`;

const ConsultationCard = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    line-height: 0.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardContent = styled.div`
    flex: 1;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    width: 100px;
`;

const ConnectButton = styled(Button)`
    background-color: #F3F3F3;
    color: black;

    &:hover {
        background-color: #E4E4E4;
    }
`;

const CancelButton = styled(Button)`
    background-color: #F3F3F3;
    color: #FF2B2B;

    &:hover {
        background-color: #E4E4E4;
    }
`;

const ConsultationRecord = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('video');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <HeaderContainer>
                <BackButton onClick={handleBackClick}>
                    <ArrowBackIosIcon />
                </BackButton>
                <Title>상담 내역</Title>
                <IconContainer>
                    <MenuIcon onClick={toggleMenu} />
                </IconContainer>
            </HeaderContainer>

            {menuOpen && (
                <MenuDropdown activeMenuItem="" handleMenuClick={() => setMenuOpen(false)} />
            )}

            <Container>
                <Tabs>
                    <Tab active={activeTab === 'video'} onClick={() => setActiveTab('video')}>
                        화상 상담
                    </Tab>
                    <Tab active={activeTab === 'call'} onClick={() => setActiveTab('call')}>
                        전화 상담
                    </Tab>
                    <Tab active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
                        채팅 상담
                    </Tab>
                    <Tab active={activeTab === 'emergency'} onClick={() => setActiveTab('emergency')}>
                        긴급 상담
                    </Tab>
                    <Underline activeTab={activeTab} />
                </Tabs>

                <ConsultationListWrapper>
                    <InnerContainer>
                        <ConsultationList>
                            {activeTab === 'video' && (
                                <>
                                    <ConsultationCard>
                                        <CardContent>
                                            <strong>차수: 2회기</strong>
                                            <p>일시: 2024년 8월 13일 일요일</p>
                                            <p>시간: 21:30 ~ 22:00</p>
                                            <p>상담사: 김대휘</p>
                                        </CardContent>
                                        <ButtonGroup>
                                            <ConnectButton onClick={() => { navigate('/video-consultation');}}>연결 대기</ConnectButton>
                                            <CancelButton>예약 취소</CancelButton>
                                        </ButtonGroup>
                                    </ConsultationCard>

                                    <ConsultationCard>
                                        <CardContent>
                                            <strong>차수: 1회기</strong>
                                            <p>일시: 2024년 8월 12일 일요일</p>
                                            <p>시간: 13:44 ~ 13:59</p>
                                            <p>상담사: 김대휘</p>
                                        </CardContent>
                                    </ConsultationCard>
                                </>
                            )}
                            {activeTab === 'call' && (
                                <p>전화 상담 내역이 없습니다.</p>
                            )}
                            {activeTab === 'chat' && (
                                <p>채팅 상담 내역이 없습니다.</p>
                            )}
                            {activeTab === 'emergency' && (
                                <p>긴급 상담 내역이 없습니다.</p>
                            )}
                        </ConsultationList>
                    </InnerContainer>
                </ConsultationListWrapper>
            </Container>
        </div>
    );
};

export default ConsultationRecord;
