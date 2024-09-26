import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Main = styled.div`
    margin-top: 77px;
    width: 100%;
    max-width: calc(600px - 30px);
    height: calc(100vh - 77px - 60px);
    min-height: calc(100vh - 77px - 80px);
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
`;

const SearchBar = styled.div`
    width: 80%;
    max-width: calc(600px - 30px);
    height: 35px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border: 1px solid #666;
    border-radius: 20px;
    margin: 0 auto;
`;

const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const SearchInput = styled.input`
    flex: 1;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
    spellCheck: false;

    &::placeholder {
        color: gray;
    }
`;

const Map = styled.div`
    flex: 1;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('${process.env.PUBLIC_URL}/HS_images/map-test.png');
`;

// 모달 스타일 컴포넌트
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

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
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
`;

const MainImageImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    padding-top: ${(props) => (props.isSecond ? '5px' : '0')}; // 두 번째 이미지에만 padding-top 추가
`;

const SmallImagesEleImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const Tabs = styled.div`
    display: flex;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
`;

const TabImage = styled.img`
    transition: opacity 0.3s;
`;

const TabsInfoPicture = styled.div`
    display: flex;
`;

const ActiveTab = styled(Tab)`
    color: #FFD700;
    border-bottom: 5px solid #FFD700;
`;

const TabsTab = styled(Tab)`
    border-bottom: 2px solid #A1A1A1;

    &:hover {
        color: #FFD700;
    }
`;

// 정보 스타일 컴포넌트
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

// 메인 컴포넌트
const HS_Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openInfoPopUp = () => setIsOpen(true);
    const closeInfoPopUp = () => setIsOpen(false);

    const handleModalClick = (e) => {
        // 모달의 내용 영역을 클릭했을 때는 닫지 않음
        if (e.target === e.currentTarget) {
            closeInfoPopUp();
        }
    };

    return (
        <Main>
            <SearchBar>
                <SearchIcon src={`${process.env.PUBLIC_URL}/HS_images/search-icon.svg`} alt="search-icon" />
                <SearchInput name="search-location" id="search-location" placeholder="인근 역 검색" />
            </SearchBar>

            <Map>
                <MapDisplay>
                    <button onClick={openInfoPopUp}>정보 보기</button>
                </MapDisplay>
            </Map>

            <Modal isOpen={isOpen} onClick={handleModalClick}>
                <ModalContent>
                    <ImagesContainer>
                        <MainImage>
                            <MainImageImg src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 1.jpg`} alt="병원 예시 이미지 1" />
                        </MainImage>
                        <SmallImages>
                            <SmallImagesEle>
                                <SmallImagesEleImg src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 2.jpg`} alt="병원 예시 이미지 2" />
                            </SmallImagesEle>
                            <SmallImagesEle isSecond>
                                <SmallImagesEleImg src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 3.jpg`} alt="병원 예시 이미지 3" />
                            </SmallImagesEle>
                        </SmallImages>
                    </ImagesContainer>

                    <HospitalName>
                        A 종합병원
                        <HospitalSort>종합병원</HospitalSort>
                    </HospitalName>

                    <Tabs>
                        <Tab id="depart-icon">
                            <TabImage src={`${process.env.PUBLIC_URL}/HS_images/출발.svg`} alt="출발" />
                        </Tab>
                        <Tab id="arrive-icon">
                            <TabImage src={`${process.env.PUBLIC_URL}/HS_images/도착.svg`} alt="도착" />
                        </Tab>
                        <Tab id="share-icon">
                            <TabImage src={`${process.env.PUBLIC_URL}/HS_images/공유.svg`} alt="공유" />
                        </Tab>
                    </Tabs>

                    <TabsInfoPicture>
                        <ActiveTab>정보</ActiveTab>
                        <TabsTab>사진</TabsTab>
                    </TabsInfoPicture>

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
        </Main>
    );
};

export default HS_Main;