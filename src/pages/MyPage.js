import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    margin-top: 62px;
`;

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
        margin-left: 150px;
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

        .menu-button-text {
            font-size: 12px;
        }
    }
`;

const MenuList = styled.div`
    .section-title {
        font-size: 23px;
        font-weight: bold;
        margin-top: 20px;
        padding-left: 15px;
        margin-bottom: 10px;
    }

    .menu-item-counsel {
        display: flex;
        align-items: center;
        padding: 0 20px 10px;
        justify-content: space-between;

        .menu-item-text-counsel {
            color: #888;
            font-size: 13px;
        }
            
        .menu-item-arrow {
            color: #888;
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
    return (
        <Content>
            <Profile>
                <div class="profile-image">
                    <img src="images/MyPage/user-de-profile.svg" alt=""/>
                </div>
                <div class="profile-user">
                    <div class="profile-type">내담자</div>
                    <div class="profile-name">김서연 님</div>
                </div>
                <div class="change-profile-btn">프로필 변경</div>
            </Profile>
            <Menu>
                <div class="menu-button">
                    <div class="menu-button-icon">
                        <img src="images/MyPage/coupon.svg" alt="coupon"/>
                    </div>
                    <div class="menu-button-text">내 쿠폰</div>
                </div>
                <div class="menu-button">
                    <div class="menu-button-icon">
                        <img src="images/MyPage/counsel-history.svg" alt="counsel-history"/>
                    </div>
                    <div class="menu-button-text">상담 내역</div>
                </div>
                <div class="menu-button">
                    <div class="menu-button-icon">
                        <img src="images/MyPage/order-history.svg" alt="order-history"/>
                    </div>
                    <div class="menu-button-text">주문 내역</div>
                </div>
            </Menu>
            <MenuList>
                <div class="section-title">상담 예약 관리</div>
                <div class="menu-item-counsel">
                    <span class="menu-item-text-counsel">화상, 전화, 채팅 상담</span>
                    <span class="menu-item-arrow">{'>'}</span>
                </div>
                
                <hr></hr>
                <div class="section-title">나의 관리</div>
                <div class="menu-item">
                    <span class="menu-item-icon">
                        <img src="images/MyPage/self-check.svg" alt="self-check"/>
                    </span>
                    <span class="menu-item-text">자가진단 기록</span>
                </div>
                <div class="menu-item">
                    <span class="menu-item-icon">
                        <img src="images/MyPage/counsel-check.svg" alt="counsel-check"/>
                    </span>
                    <span class="menu-item-text">심리검사 기록지</span>
                </div>
                <div class="menu-item">
                    <span class="menu-item-icon">
                        <img src="images/MyPage/emotion-check.svg" alt="emotion-check"/>
                    </span>
                    <span class="menu-item-text">감정 기록</span>
                </div>
                <hr></hr>

                <div class="section-title">고객센터</div>
                <div class="menu-item">
                    <span class="menu-item-text">공지사항</span>
                </div>
                <div class="menu-item">
                    <span class="menu-item-text">문의하기</span>
                </div>
            </MenuList>
        </Content>
    );
};

export default MyPage;