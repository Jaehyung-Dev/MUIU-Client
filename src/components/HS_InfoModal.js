import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
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
    overflow: hidden;
`;

const HospitalName = styled.div`
    display: flex;
    padding: 10px;
    font-size: 25px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
`;

const HospitalSort = styled.div`
    margin-left: 10%;
    font-size: 18px;
    font-weight: bold;
    color: #A1A1A1;
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
    transition: opacity 0.3s;
`;

const TabsInfoPicture = styled.div`
    display: flex;

    .tab {
        border-bottom: 2px solid #A1A1A1;
    }

    .active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    .tab:hover {
        color: #FFD700;
    }
`;
const HS_InfoModal = ({ isOpen, onClose }) => {
    
    const [hoveredTab, setHoveredTab] = useState(null);

    const defaultImages = {
        depart: `${process.env.PUBLIC_URL}/HS_images/출발.svg`,
        arrive: `${process.env.PUBLIC_URL}/HS_images/도착.svg`,
        share: `${process.env.PUBLIC_URL}/HS_images/공유.svg`,
    };

    const hoverImages = {
        depart: `${process.env.PUBLIC_URL}/HS_images/출발-hover.svg`,
        arrive: `${process.env.PUBLIC_URL}/HS_images/도착-hover.svg`,
        share: `${process.env.PUBLIC_URL}/HS_images/공유-hover.svg`,
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClick={onClose}>
            <ModalContent>

                <ImagesContainer>
                    <MainImage>
                        <img src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 1.jpg`} alt="병원 예시 이미지 1" />
                    </MainImage>
                    <SmallImages>
                        <SmallImagesEle>
                            <img src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 2.jpg`} alt="병원 예시 이미지 2" />
                        </SmallImagesEle>
                        <SmallImagesEle isSecond>
                            <img src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 3.jpg`} alt="병원 예시 이미지 3" />
                        </SmallImagesEle>
                    </SmallImages>
                </ImagesContainer>

                <Tabs>
                    <Tab 
                        id="depart-icon" 
                        onMouseEnter={() => setHoveredTab('depart')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'depart' ? hoverImages.depart : defaultImages.depart} 
                            alt="출발" 
                            className="tab-image" 
                        />
                    </Tab>
                    <Tab 
                        id="arrive-icon" 
                        onMouseEnter={() => setHoveredTab('arrive')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'arrive' ? hoverImages.arrive : defaultImages.arrive} 
                            alt="도착" 
                            className="tab-image" 
                        />
                    </Tab>
                    <Tab 
                        id="share-icon" 
                        onMouseEnter={() => setHoveredTab('share')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'share' ? hoverImages.share : defaultImages.share} 
                            alt="공유" 
                            className="tab-image" 
                        />
                    </Tab>
                </Tabs>

                <TabsInfoPicture>
                    <Tab className="active">정보</Tab>
                    <Tab style={{borderBottom: '2px solid #A1A1A1'}}>사진</Tab>
                </TabsInfoPicture>

                <HospitalName>
                    A 종합병원
                    <HospitalSort>종합병원</HospitalSort>
                </HospitalName>
                <Info>
                    <InfoItem>
                        <InfoItemImg src={`${process.env.PUBLIC_URL}/HS_images/장소위치.svg`} alt="Location icon" />
                        <span>경기 수원시 영통구 법조로 25 광교SK뷰파크 A 종합병원</span>
                    </InfoItem>
                    <InfoItem>
                        <InfoItemImg src={`${process.env.PUBLIC_URL}/HS_images/인근역.svg`} alt="Distance icon" />
                        <span>광교중앙역 5번 출구에서 311m</span>
                    </InfoItem>
                    <InfoItem>
                        <InfoItemImg src={`${process.env.PUBLIC_URL}/HS_images/전화번호.svg`} alt="Phone icon" />
                        <span>0000-1234-1234</span>
                    </InfoItem>
                    <InfoItem>
                        <InfoItemImg src={`${process.env.PUBLIC_URL}/HS_images/웹사이트.svg`} alt="Website icon" />
                        <span>www.naver.com</span>
                    </InfoItem>
                </Info>
            </ModalContent>
        </Modal>
    );
};

export default HS_InfoModal;