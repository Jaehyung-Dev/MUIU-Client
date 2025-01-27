import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleIcon from '@mui/icons-material/People';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userProfile from '../svg/user-de-profile.svg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../apis/memberApis';
import HomeIcon from '@mui/icons-material/Home';

const Content = styled.div``;

const ProfileImageInput = styled.input`
    display: none;
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
        width: 70px;
        height: 40px;
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
        border: none;
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

const RotatingArrow = styled(ArrowForwardIosIcon)`
    transform: ${({ rotate }) => (rotate ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s;
`;

const DeveloperInfo = styled.div`
    padding: 15px;
    font-size: 14px;
    color: #666;
    background-color: #f0f0f0;
    border-radius: 15px;
    margin: 10px 0;
`;

const DividerBox = styled.div`
    width: 93%;
    height: 150px;
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
    const [userData, setUserData] = useState(null); 
    const [profileImage, setProfileImage] = useState(null);
    const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get('http://localhost:9090/apis/profile/me', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    },
                    withCredentials: true,
                });
                setProfileImage(`${response.data.profileImageUrl}?t=${new Date().getTime()}`);
            } catch (error) {
                if(error.response) {
                    if (error.response.status === 404) {
                        console.log("프로필이미지가 없습니다.");
                        setProfileImage(userProfile); // 기본 프로필 이미지 설정
                    } else if(error.response.status === 401) {
                        navigate('/login');
                    }
                } else {
                    console.log("네트워크 또는 서버 오류 발생:", error);
                }
            }
        };
        fetchProfileImage();
    }, [navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const persistRoot = sessionStorage.getItem('persist:root');
                if (!persistRoot) {
                    navigate('/login');
                    return;
                }
    
                const parsedRoot = JSON.parse(persistRoot);
                const memberSlice = JSON.parse(parsedRoot.memberSlice);
    
                if (!memberSlice.isLogin || !memberSlice.id) {
                    navigate('/login');
                    return;
                }
    
                // Fetch the user's name instead of username
                const response = await axios.get(`http://localhost:9090/members/${memberSlice.id}/name-role`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                    withCredentials: true,
                });
                
                setUserData({
                    name: response.data.item.name,
                    role: response.data.item.role
                });

            } catch (error) {
                console.error('오류:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchUserData();
    }, [navigate]);
    

    const handleProfileChangeClick = () => {
        document.getElementById('profile-image-input').click();
    };

    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && userData) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const token = sessionStorage.getItem('ACCESS_TOKEN');
                const response = await axios.post(
                    'http://localhost:9090/apis/profile/upload',
                    formData,
                    {
                        headers: { 
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}` 
                        },
                        withCredentials: true,
                    }
                );
            
                if (response.status === 200) {
                    const imageUrl = response.data.profileImageUrl;
                    setProfileImage(`${imageUrl}?t=${new Date().getTime()}`); // 캐시 방지
                    console.log(imageUrl);
                }
            } catch (error) {
                console.error('프로필 이미지 업로드 오류:', error);
            }
        }
    };
    

    const handleLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleHomeAddressClick = () => {
        navigate('/home-address');
    };

    const handleConsultationHistoryClick = () => {
        navigate('/consultation-record');
    };

    const handleDonationRecordClick = () => {
        navigate('/donation-record');
    };

    const handlePasswordChangeClick = () => {
        navigate('/change-password');
    };

    const handleSupportClick = () => {
        navigate('/support');
    };

    const handleDeveloperInfoClick = () => {
        setShowDeveloperInfo((prev) => !prev);
    };

    const handleAccountDeleteClick = async () => {
        if (window.confirm('정말 탈퇴하시겠습니까?')) {
            try {
                const persistRoot = sessionStorage.getItem('persist:root');
                if (!persistRoot) {
                    console.warn('persist:root가 없습니다.');
                    alert('로그인이 필요합니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                    return;
                }
    
                const parsedRoot = JSON.parse(persistRoot);
                const memberSlice = JSON.parse(parsedRoot.memberSlice);
                const userId = memberSlice.id;
                const token = localStorage.getItem('token');
    
                if (!userId || !token) {
                    console.warn('유효하지 않은 userId 또는 token');
                    alert('로그인이 필요합니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                    return;
                }
    
                const response = await axios.delete(`http://localhost:9090/members/${userId}/delete`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
    
                if (response.status === 200) {
                    alert('계정이 삭제되었습니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                } else {
                    alert('계정 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('오류:', error);
                if (error.response) {
                    alert(error.response.data.statusMessage || '계정 삭제 중 서버 오류가 발생했습니다.');
                } else {
                    alert('계정 삭제 중 네트워크 오류가 발생했습니다.');
                }
            }
        }
    };

    return (
        <Content>
            <Profile>
                <div className="profile-image">
                    <img src={profileImage || userProfile} alt="프로필" />
                </div>
                <div className="profile-user">
                    <div className="profile-type">{userData?.role === 'ROLE_COUNSELOR' ? '상담사' : '내담자'}</div>
                    <div className="profile-name">{userData?.name}님</div>
                </div>
                <button className="change-profile-btn" onClick={handleProfileChangeClick}>
                    프로필 <br /> 변경
                </button>
                <ProfileImageInput
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                />
            </Profile>
            <Menu>
                <div className="menu-button" onClick={handleHomeAddressClick}>
                    <div className="menu-button-icon">
                        <HomeIcon/>
                    </div>
                    <div className="menu-button-text">내 주소</div>
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
                <DividerButton onClick={handleLogoutClick}>로그아웃</DividerButton>
            </DividerBox>
            <MenuList>
                <div className='section'>
                    <div className="menu-item">
                        <span className="menu-item-text" onClick={handleSupportClick}>지원</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className='section'>
                    <div className="menu-item" onClick={handleDeveloperInfoClick}>
                        <span className="menu-item-text" style={{marginLeft:"-20px"}}>개발자 정보</span>
                        <RotatingArrow style={{ color: "#999", marginRight: "-15px" }} rotate={showDeveloperInfo ? "true" : undefined} />
                        </div>
                    {showDeveloperInfo && (
                        <DeveloperInfo>
                            <p>민수정 (Frontend) - soojeongmin@soongsil.ac.kr</p>
                            <p>김대휘 (Frontend) - whee990731@naver.com</p>
                            <p>김서연 (Full stack) - kimseoyeon0332@gmail.com</p>
                            <p>반재형 (Frontend) - publicdev2024@gmail.com</p>
                            <p>송민교 (Full stack) - alsrysong@gmail.com</p>
                            <p>정다은 (Full stack) - dechung1004@naver.com</p>
                            <p>한서준 (Full stack) - watashijxxnsuka@gmail.com</p>
                        </DeveloperInfo>
                        )}
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className="menu-item">
                        <span className="menu-item-text" onClick={handleAccountDeleteClick}>탈퇴하기</span>
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