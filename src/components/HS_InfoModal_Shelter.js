import React, { useState } from 'react';
import styled from 'styled-components';
import shelterData from '../JSON/shelterData.json';

import departIcon from '../svg/출발.svg';
import arriveIcon from '../svg/도착.svg';
import shareIcon from '../svg/공유.svg';
import departHoverIcon from '../svg/출발-hover.svg';
import arriveHoverIcon from '../svg/도착-hover.svg';
import shareHoverIcon from '../svg/공유-hover.svg';
import mainImage1 from '../HS_images/병원 예시 이미지 1.jpg';
import mainImage2 from '../HS_images/병원 예시 이미지 2.jpg';
import mainImage3 from '../HS_images/병원 예시 이미지 3.jpg';
import locationIcon from '../svg/장소위치.svg';
import distanceIcon from '../svg/인근역.svg';
import phoneIcon from '../svg/전화번호.svg';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';

const Modal = styled.div`
    display: ${(props) => (props.isShelterOpen ? 'block' : 'none')};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    position: relative;
    margin: 5vh auto;
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    height: 85%;
    overflow-y: auto;
`;

const HospitalName = styled.div`
    display: flex;
    padding: 10px;
    font-size: 25px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
`;

const Info = styled.div`
    padding: 30px;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`;

const InfoItemImg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const ImagesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 35vh;
`;

const MainImage = styled.div`
    width: 50%;
    height: 100%;
    padding-right: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const SmallImages = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    overflow: hidden;
`;

const SmallImagesEle = styled.div`
    width: 100%;
    height: 50%;
    overflow: hidden;
    padding-top: ${(props) => (props.isSecond ? '5px' : '0')};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Tabs = styled.div`
    margin-top: 10px;
    display: flex;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;

    &.active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    &:hover {
        color: #FFD700;
    }
`;

const TabImage = styled.img`
    width: 45px;
    height: 45px;
    transition: transform 0.3s;
    
    ${Tab}:hover & {
        transform: scale(1.15);
    }
`;

const TabsInfoPicture = styled.div`
    display: flex;

    .tab {
        border-bottom: 2px solid #A1A1A1;
        transition: border-bottom 0.2s; /* 부드러운 전환 효과 추가 */
    }

    .active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    .tab:hover {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }
`;

const HS_InfoModal_Shelter = ({ isShelterOpen, onShelterClose, openShelterPhoto, openShelterFind, shelterData, nearestStation, nearestDistance }) => {
    
    const [hoveredTab, setHoveredTab] = useState(null);

    const defaultImages = {
        depart: departIcon,
        arrive: arriveIcon,
        share: shareIcon,
    };

    const hoverImages = {
        depart: departHoverIcon,
        arrive: arriveHoverIcon,
        share: shareHoverIcon,
    };

    /* 네이버지도 검색창에 해당 링크 보내주기 */
    const copyToClipboard = () => {
        const textToCopy = `https://map.naver.com/p/search/${shelterData.equp_nm}`;
        
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("클립보드 복사 성공:");
                alert("해당 병원 주소를 클립보드에 복사했습니다.");
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
                alert("해당 병원 주소를 클립보드에 복사하지 못했습니다.");
            });
    };


    if (!isShelterOpen) return null;

    return (
        <Modal isShelterOpen={isShelterOpen} onClick={onShelterClose}>
            <ModalContent onClick={(e) => { e.stopPropagation(); }}>
                <ImagesContainer onClick={(e) => { e.stopPropagation(); openShelterPhoto(); }}>
                    <MainImage>
                        <img src={mainImage1} alt="병원 예시 이미지 1" />
                    </MainImage>
                    <SmallImages>
                        <SmallImagesEle>
                            <img src={mainImage1} alt="병원 예시 이미지 2" />
                        </SmallImagesEle>
                        <SmallImagesEle isSecond>
                            <img src={mainImage1} alt="병원 예시 이미지 3" />
                        </SmallImagesEle>
                    </SmallImages>
                </ImagesContainer>

                <Tabs>
                    <Tab 
                        id="depart-icon" 
                        onMouseEnter={() => setHoveredTab('depart')} 
                        onMouseLeave={() => setHoveredTab(null)}
                        onClick={(e) => { e.stopPropagation(); openShelterFind(shelterData.equp_nm, 'depart'); }}
                    >
                        <TabImage 
                            src={hoveredTab === 'depart' ? departHoverIcon : departIcon} 
                            alt="출발" 
                        />
                    </Tab>
                    <Tab 
                        id="arrive-icon" 
                        onMouseEnter={() => setHoveredTab('arrive')} 
                        onMouseLeave={() => setHoveredTab(null)}
                        onClick={(e) => { e.stopPropagation(); openShelterFind(shelterData.equp_nm, 'arrive'); }}
                    >
                        <TabImage 
                            src={hoveredTab === 'arrive' ? arriveHoverIcon : arriveIcon} 
                            alt="도착" 
                        />
                    </Tab>
                    <Tab 
                        id="share-icon" 
                        onMouseEnter={() => setHoveredTab('share')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'share' ? shareHoverIcon : shareIcon} 
                            alt="공유"
                            onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard();
                            }}
                        />
                    </Tab>
                </Tabs>

                <TabsInfoPicture>
                    <Tab className="active">정보</Tab>
                    <Tab className="tab" onClick={(e) => { e.stopPropagation(); openShelterPhoto(); }}>사진</Tab>
                </TabsInfoPicture>

                <HospitalName>
                    {shelterData.equp_nm}  
                </HospitalName>
                <Info>
                    <InfoItem>
                        <InfoItemImg src={locationIcon} alt="Location icon" />
                        <span>{shelterData.loc_sfpr_a}</span>
                    </InfoItem>
                    <InfoItem>
                        <InfoItemImg src={distanceIcon} alt="Distance icon" />
                        <span>
                            {nearestStation 
                                ? `${nearestStation}역 약 ${nearestDistance.toFixed(1)}m` 
                                : '가까운 역이 없습니다.'}
                        </span>
                    </InfoItem>
                </Info>
            </ModalContent>
        </Modal>
    );
};

export default HS_InfoModal_Shelter;
