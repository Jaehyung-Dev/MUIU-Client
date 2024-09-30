import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
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
    overflow: hidden;s
`;

const BackBtn = styled.button`
    width: 100%;
    height: 30px;
    text-align: left;
    background: white;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #A1A1A1;
    cursor: pointer;
    padding-left: 15px;
`;

const SelectVehicle = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    background: white;
    align-items: center;
`;

const VehicleTab = styled.div`
    flex: 1;
    text-align: center;
    cursor: pointer;

    &:hover .tab-image {
        opacity: 0.8;
    }
`;

const TabImage = styled.img`
    width: 40px;
    height: 40px;
    transition: opacity 0.3s;
`;

const SearchingBox = styled.div`
    width: 100%;
    height: 17vh;
    background-color: #F3F3F3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchingDepart = styled.div`
    width: 90%;
    height: 5vh;
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: center;
    border: 1px solid #888;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const SearchingArrive = styled.div`
    width: 90%;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #888;
    background-color: white;
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const SearchingImage = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const SearchingInput = styled.input`
    width: 75%;
    max-width: 
    height: 35px;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;

    &::placeholder {
        color: gray;
    }
`;

const ChangeIcon = styled.img`
    position: absolute;
    display: flex;
    top: 16vh;
    right: 3vw;
`;

const Finding = styled.div`
    width: 100%;
    height: 4.5vh;
    display: flex;
    justify-content: flex-end;
`;

const FindingImage = styled.img`
    width: 60px;
    margin-right: 20px;
`;

const FindingResultItems = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: calc(80vh - (3vh + 8vh + 17vh));
    background-color: #F3F3F3;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh;
`;

const FindingResultItem = styled.div`
    width: 90%;
    height: 15vh;
    border: 1px solid #888;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 10px;
`;

const FindingResultImage = styled.img`
    width: 50px;
    display: block;
`;

const TakingTime = styled.div`
    width: 100%;
    height: 3vh;
    display: flex;
`;

const GoH = styled.div`
    width: 100px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 20px;
    font-weight: bold;
`;

const GoM = styled.div`
    width: 20px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 20px;
    font-weight: bold;
`;

const TimeText = styled.p`
    margin-left: 3px;
    font-size: 15px;
`;
const HS_FindRoadModal = ({ isOpen, onClose }) => {
    const [hoveredTab, setHoveredTab] = useState(null);

    const images = {
        traffic: {
            default: `${process.env.PUBLIC_URL}/HS_images/대중교통.svg`,
            hover: `${process.env.PUBLIC_URL}/HS_images/대중교통-hover.svg`
        },
        car: {
            default: `${process.env.PUBLIC_URL}/HS_images/자동차.svg`,
            hover: `${process.env.PUBLIC_URL}/HS_images/자동차-hover.svg`
        },
        walk: {
            default: `${process.env.PUBLIC_URL}/HS_images/도보.svg`,
            hover: `${process.env.PUBLIC_URL}/HS_images/도보-hover.svg`
        },
        bike: {
            default: `${process.env.PUBLIC_URL}/HS_images/자전거.svg`,
            hover: `${process.env.PUBLIC_URL}/HS_images/자전거-hover.svg`
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClick={onClose}>
            <ModalContent  style={{backgroundColor: '#F3F3F3'}}>
                <BackBtn onClick={onClose}>&lt; </BackBtn>
                
                <SelectVehicle>
                    <VehicleTab 
                        id="traffic" 
                        onMouseEnter={() => setHoveredTab('traffic')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'traffic' ? images.traffic.hover : images.traffic.default} 
                            alt="대중교통" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                    <VehicleTab 
                        id="car" 
                        onMouseEnter={() => setHoveredTab('car')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'car' ? images.car.hover : images.car.default} 
                            alt="자동차" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                    <VehicleTab 
                        id="walk" 
                        onMouseEnter={() => setHoveredTab('walk')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'walk' ? images.walk.hover : images.walk.default} 
                            alt="도보" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                    <VehicleTab 
                        id="bike" 
                        onMouseEnter={() => setHoveredTab('bike')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'bike' ? images.bike.hover : images.bike.default} 
                            alt="자전거" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                </SelectVehicle>

                <SearchingBox>
                    <SearchingDepart>
                        <SearchingImage src={`${process.env.PUBLIC_URL}/HS_images/출발-icon.svg`} alt="출발" />
                        <SearchingInput
                            type="text"
                            id="depart-input"
                            name="depart-input"
                            placeholder="출발지"
                            spellCheck="false"
                        />
                    </SearchingDepart>
                    <ChangeIcon src={`${process.env.PUBLIC_URL}/HS_images/변경.svg`} alt="변경" id="changeDeAr" />
                    <SearchingArrive>
                        <SearchingImage src={`${process.env.PUBLIC_URL}/HS_images/도착-icon.svg`} alt="도착" />
                        <SearchingInput
                            type="text"
                            id="arrive-input"
                            name="arrive-input"
                            placeholder="도착지"
                            spellCheck="false"
                        />
                    </SearchingArrive>
                    <Finding>
                        <FindingImage src={`${process.env.PUBLIC_URL}/HS_images/길찾기-hover.svg`} alt="길찾기" id="find-btn" />
                    </Finding>
                </SearchingBox>

                <FindingResultItems>
                    <FindingResultItem id="finding-result-item1">
                        <FindingResultImage id="shortCut" src={`${process.env.PUBLIC_URL}/HS_images/최적.svg`} alt="최적" />
                        <TakingTime>
                            <GoH>
                                11<TimeText>시간</TimeText>
                            </GoH>
                            <GoM>
                                11<TimeText>분</TimeText>
                            </GoM>
                        </TakingTime>
                    </FindingResultItem>
                </FindingResultItems>
            </ModalContent>
        </Modal>
    );
};

export default HS_FindRoadModal;
