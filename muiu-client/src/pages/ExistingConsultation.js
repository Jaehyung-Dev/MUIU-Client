import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    max-width: 600px;
    margin-top: 50px;
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
    width: 33.33%;
    transform: translateX(${({ activeTab }) => (activeTab === 'video' ? '0%' : activeTab === 'call' ? '100%' : '200%')});
    transition: transform 0.3s ease;
`;

const ConsultationListWrapper = styled.div`
    background-color: #EBEBEB;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 15px 0;
    flex: 1;

    @media (min-width: 600px) {
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
    }
`;

const InnerContainer = styled.div`
    max-width: 600px;
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
    gap: 10px; /* 버튼 사이의 간격 */
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    width: 100px; /* 가로 길이를 지정 */
`;

const ConnectButton = styled(Button)`
    background-color: #EEEEEE;
    color: black;

    &:hover {
        background-color: #E4E4E4;
    }
`;

const CancelButton = styled(Button)`
    background-color: #EEEEEE;
    color: #FF2B2B;

    &:hover {
        background-color: #E4E4E4;
    }
`;

const ExistingConsultation = () => {
    const [activeTab, setActiveTab] = useState('video');

    return (
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
                                        <p>시간: 21:32 ~ 22:02</p>
                                        <p>상담사: 김대휘</p>
                                    </CardContent>
                                    <ButtonGroup>
                                        <ConnectButton>연결</ConnectButton>
                                        <CancelButton>취소</CancelButton>
                                    </ButtonGroup>
                                </ConsultationCard>

                                <ConsultationCard>
                                    <CardContent>
                                        <strong>차수: 1회기</strong>
                                        <p>일시: 2024년 8월 12일 일요일</p>
                                        <p>시간: 13:44 ~ 13:59</p>
                                        <p>내담자: 민수정</p>
                                    </CardContent>
                                    <ButtonGroup>
                                        <ConnectButton>연결</ConnectButton>
                                        <CancelButton>취소</CancelButton>
                                    </ButtonGroup>
                                </ConsultationCard>
                            </>
                        )}
                        {activeTab === 'call' && (
                            <p>전화 상담 내역이 없습니다.</p>
                        )}
                        {activeTab === 'chat' && (
                            <p>채팅 상담 내역이 없습니다.</p>
                        )}
                    </ConsultationList>
                </InnerContainer>
            </ConsultationListWrapper>
        </Container>
    );
};

export default ExistingConsultation;
