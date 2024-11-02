import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
    p, span, h1, h2, h3, h4, h5, h6 {
      margin: 0; /* 모든 기본 여백 제거 */
    }

    letter-spacing: 0.02em; 

    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }

    .date {
        font-size: 0.9rem;
        color: #888;
    }

    .amount {
        font-size: 1rem;
        color: #3A76E9;
        font-weight: bold;
    }

    .message {
        font-size: 0.9rem;
        color: #666;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 5px;
    }
`;


const DonationRecord = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [donationRecords, setDonationRecords] = useState([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // 기부 내역 데이터를 백엔드에서 가져오기
        const fetchDonationRecords = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/fund/records', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    }
                });
                setDonationRecords(response.data);
            } catch (error) {
                console.error("기부 내역을 가져오는 중 오류 발생:", error);
            }
        };

        fetchDonationRecords();
    }, []);

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
                            {donationRecords.map((record) => (
                                <ConsultationCard key={record.fundId}>
                                    <div className="header">
                                        <div className="title">{record.title}</div>
                                        <p className="date">{new Date(record.fundDate).toLocaleDateString()}</p>
                                    </div>
                                    <p className="amount">금액: {record.amount.toLocaleString()}원</p>
                                    <p>후원자명: {record.fundName}</p>
                                    {record.message && <p className="message">메시지: {record.message}</p>}
                                </ConsultationCard>
                            ))}
                        </ConsultationList>
                    </InnerContainer>
                </ConsultationListWrapper>
            </Container>
        </div>
    );
};

export default DonationRecord;
