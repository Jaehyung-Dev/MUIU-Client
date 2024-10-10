import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import userProfile from '../svg/user-de-profile.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Content = styled.div`
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 0 15px;

    .profile-image {
        width: 80px;
        height: 80px;
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
        font-size: 17px;
        color: #888;
        margin-bottom: 5px;
    }

    .profile-name {
        font-size: 25px;
        font-weight: bold;
    }

    .change-profile-btn {
        width: 80px;
        height: 25px;
        margin-right: 15px;
        border-radius: 5px;
        color: #888;
        font-size: 13px;
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
    margin-left: 15px;
    margin-right: 15px;

    .menu-button {
        flex: 1;
        text-align: center;
        padding: 10px;
        background-color: #FFF5CF;
        color: #FF9900;
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer;

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
        font-weight: bold;
        font-size: 20px;
        color: #444;

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

        .menu-item-text2 {
            padding-top: 10px;
            font-size: 12px;
            color: #888;
            font-weight: normal;
        }
    }
`;

const DividerBox = styled.div`
    width: 93%;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 15px;
    margin: 15px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 16px;

    @media (max-width: 393px) {
        width: 90%;
    }
`;

const DividerButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: left; 
    align-items: center;
    padding: 15px;
    margin-left: 30px;
    font-weight: bold;
    &:focus {
        outline: none;
    }
`;


export const MyPage = () => {
    const navigate = useNavigate();

    const handleStarredPlaceClick = () => {
        navigate('/starred-place');
    }

    const handleConsultationHistoryClick = () => {
        navigate('/consultation-record');
    };

    const handleDonationRecordClick = () => {
        navigate('/donation-record');
    };

    const handleProfilehangeClick = () => {
        alert('프로필 변경 모달 이동');
    };

    const handlePasswordChangeClick = () => {
        alert('비밀번호 변경');
    };

    const handleSocialLinkClick = () => {
        alert('소셜 연동');
    };

    const handleAccountDeleteClick = () => {
        alert('로그아웃?');
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
                <div className="menu-button" onClick={handleStarredPlaceClick}>
                    <div className="menu-button-icon">
                        <StarIcon/>
                    </div>
                    <div className="menu-button-text">즐겨찾기 장소</div>
                </div>
                <div className="menu-button" onClick={handleConsultationHistoryClick}>
                    <div className="menu-button-icon">
                        <PeopleIcon/>
                    </div>
                    <div className="menu-button-text">상담 내역</div>
                </div>
                <div className="menu-button" onClick={handleDonationRecordClick}>
                    <div className="menu-button-icon">
                        <AccountBalanceWalletIcon/>
                    </div>
                    <div className="menu-button-text">기부 내역</div>
                </div>
            </Menu>
            <DividerBox>
                <DividerButton onClick={handlePasswordChangeClick}>비밀번호 변경</DividerButton>
                <DividerButton onClick={handleSocialLinkClick}>소셜 연동</DividerButton>
                <DividerButton onClick={handleAccountDeleteClick}>로그아웃</DividerButton>
            </DividerBox>
            <MenuList>
                <div className='section'>
                    <div className="menu-item">
                        <span className="menu-item-text">지원</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className="menu-item">
                        <span className="menu-item-text">개발자 정보</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className="menu-item">
                        <span className="menu-item-text">탈퇴하기</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <div className="menu-item">
                        <span className="menu-item-text2">© 마음이음. 모든 권리 보유.</span>
                    </div>
                </div>
            </MenuList>
        </Content>
    );
};

export default MyPage;
