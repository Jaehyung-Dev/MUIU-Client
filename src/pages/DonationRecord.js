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

const DonationRecord = () => {
    const navigate = useNavigate();
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
                <Title>기부 내역</Title>
                <IconContainer>
                    <MenuIcon onClick={toggleMenu} />
                </IconContainer>
            </HeaderContainer>

            {menuOpen && (
                <MenuDropdown activeMenuItem="" handleMenuClick={() => setMenuOpen(false)} />
            )}

            <Container>
                <ConsultationListWrapper>
                    <InnerContainer>
                        <ConsultationList>
                                <>
                                    <ConsultationCard>
                                        <CardContent>
                                            <strong>호우피해 긴급모금</strong>
                                            <p>일시: 2024년 9월 21일</p>
                                            <p>금액: 10000₩</p>
                                            <p>후원자명: 익명</p>
                                        </CardContent>
                                    </ConsultationCard>

                                    <ConsultationCard>
                                        <CardContent>
                                            <strong>산불피해 긴급모금</strong>
                                            <p>일시: 2024년 10월 1일</p>
                                            <p>금액: 100000₩</p>
                                            <p>후원자명: 폼폼</p>
                                        </CardContent>
                                    </ConsultationCard>
                                </>
                        </ConsultationList>
                    </InnerContainer>
                </ConsultationListWrapper>
            </Container>
        </div>
    );
};

export default DonationRecord;
