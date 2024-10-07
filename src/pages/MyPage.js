import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import userProfile from '../svg/user-de-profile.svg';

const Content = styled.div``;

const Profile = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 0 15px;

    .profile-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #e0e0e0;
        margin-right: 15px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .profile-type {
        font-size: 12px;
        color: #888;
    }

    .profile-name {
        font-size: 18px;
        font-weight: bold;
    }

    .change-profile-btn {
        width: 65px;
        height: 25px;
        border-radius: 5px;
        color: #888;
        font-size: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        margin-left: auto;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .menu-button {
        flex: 1;
        text-align: center;
        padding: 10px;
        background-color: #FFF5CF;
        color: #FF9900;
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer; /* Added cursor style */

        .menu-button-text {
            font-size: 12px;
        }
    }
`;

const MenuList = styled.div`
    .section {
        padding: 15px;

        .menu-item-arrow {
            color: #888;
            text-align: center;
            margin: auto 0;
            margin-right: 1.3rem;
        }
    }

    .flex-box {
        display: flex;
        justify-content: space-between;
    }

    .section-title {
        font-size: 23px;
        font-weight: bold;
        margin: 15px 0;
        padding-left: 15px;
    }

    .menu-item-counsel {
        display: flex;
        align-items: center;
        margin-top: 5px;
        padding-left: 20px;
        justify-content: space-between;

        .menu-item-text-counsel {
            color: #888;
            font-size: 13px;
        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 0 15px;

        :last-child {
            border-bottom: none;
        }

        .menu-item-icon {
            margin-right: 15px;
            font-size: 20px;
        }

        .menu-item-text {
            flex: 1;
            margin: 10px 0;
        }
    }
`;

export const MyPage = () => {
    const navigate = useNavigate();

    const handleConsultationHistoryClick = () => {
        navigate('/consultation-record');
    };

    return (
        <Content>
            <Profile>
                <div className="profile-image">
                    <img src={userProfile} alt=""/>
                </div>
                <div className="profile-user">
                    <div className="profile-type">내담자</div>
                    <div className="profile-name">김서연 님</div>
                </div>
                <div className="change-profile-btn">프로필 변경</div>
            </Profile>
            <Menu>
                <div className="menu-button">
                    <div className="menu-button-icon">
                        <StickyNote2Icon/>
                    </div>
                    <div className="menu-button-text">내 쿠폰</div>
                </div>
                <div className="menu-button" onClick={handleConsultationHistoryClick}>
                    <div className="menu-button-icon">
                        <PeopleIcon/>
                    </div>
                    <div className="menu-button-text">상담 내역</div>
                </div>
                <div className="menu-button">
                    <div className="menu-button-icon">
                        <AccountBalanceWalletIcon/>
                    </div>
                    <div className="menu-button-text">주문 내역</div>
                </div>
            </Menu>
            <MenuList>
                <div className='section flex-box'>
                    <div>
                        <div className="section-title">상담 예약 관리</div>
                        <div className="menu-item-counsel">
                            <span className="menu-item-text-counsel">화상, 전화, 채팅 상담</span>
                        </div>
                    </div>
                    <div className="menu-item-arrow">{'>'}</div>
                </div>
                
                <hr></hr>

                <div className='section'>
                    <div className="section-title">나의 관리</div>
                    <div className="menu-item">
                        <span className="menu-item-icon">
                            <FactCheckOutlinedIcon/>
                        </span>
                        <span className="menu-item-text">자가진단 기록</span>
                    </div>
                    <div className="menu-item">
                        <span className="menu-item-icon">
                            <ReceiptLongOutlinedIcon/>
                        </span>
                        <span className="menu-item-text">심리검사 기록지</span>
                    </div>
                    <div className="menu-item">
                        <span className="menu-item-icon">
                            <TagFacesOutlinedIcon/>
                        </span>
                        <span className="menu-item-text">감정 기록</span>
                    </div>
                </div>

                <hr></hr>

                <div className='section'>
                    <div className="section-title">고객센터</div>
                    <div className="menu-item">
                        <span className="menu-item-text">공지사항</span>
                    </div>
                    <div className="menu-item">
                        <span className="menu-item-text">문의하기</span>
                    </div>
                </div>
            </MenuList>
        </Content>
    );
};

export default MyPage;
