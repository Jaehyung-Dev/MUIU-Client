// 수정 필요
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import trafficIcon from '../svg/대중교통.svg';
import trafficHoverIcon from '../svg/대중교통-hover.svg';
import carIcon from '../svg/자동차.svg';
import carHoverIcon from '../svg/자동차-hover.svg';
import walkIcon from '../svg/도보.svg';
import walkHoverIcon from '../svg/도보-hover.svg';
import bikeIcon from '../svg/자전거.svg';
import bikeHoverIcon from '../svg/자전거-hover.svg';
import departIcon from '../svg/출발-icon.svg';
import arriveIcon from '../svg/도착-icon.svg';
import changeIcon from '../svg/변경.svg';
import findIcon from '../svg/길찾기-hover.svg';
import optimalIcon from '../svg/최적.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
    padding: 10px 15px 0;
    align-items: center;
    margin: 0;
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
    height: 35px;
    resize: none;
    outline: none;
    border: none;

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

// 자동 완성 목록 스타일
const SuggestionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 5px; // 여백 조정
    background-color: white;
    position: absolute;
    top: 220px;
    z-index: 1000;
    width: 90%;
    max-height: 100px; // 최대 높이 설정
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #888; // 테두리 추가
`;

const SuggestionItem = styled.li`
    cursor: pointer;
    padding: 8px;

    &:hover {
        background-color: #e0e0e0; // 호버 시 색상 변경
    }
`;

const HS_FindRoadModal = ({ isOpen, onClose, hospitalName, mode, stations }) => {
    const [hoveredTab, setHoveredTab] = useState(null);
    const [departValue, setDepartValue] = useState('');
    const [arriveValue, setArriveValue] = useState('');
    const [filteredDepartStations, setFilteredDepartStations] = useState([]); // 출발지 필터링
    const [filteredArriveStations, setFilteredArriveStations] = useState([]); // 도착지 필터링

    useEffect(() => {
        if (mode === 'depart') {
            setDepartValue(hospitalName); // 출발지에 병원 이름 설정
            setArriveValue(''); // 도착지는 초기화
        } else if (mode === 'arrive') {
            setArriveValue(hospitalName); // 도착지에 병원 이름 설정
            setDepartValue(''); // 출발지는 초기화
        }
    }, [hospitalName, mode]);

    // 출발지 입력 핸들러
    const handleDepartInputChange = (event) => {
        const value = event.target.value;
        setDepartValue(value);
    
        const filtered = stations.filter(station => 
            station.bldn_nm.includes(value)
        );
    
        // 중복된 역 이름 제거
        const uniqueStations = Array.from(new Set(filtered.map(station => station.bldn_nm)))
                                    .map(name => filtered.find(station => station.bldn_nm === name));
    
        setFilteredDepartStations(uniqueStations);
    };
    
    const handleDepartInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFilteredDepartStations([]); // 추천 목록 숨기기
        }
    };    

    // 도착지 입력 핸들러
    const handleArriveInputChange = (event) => {
        const value = event.target.value;
        setArriveValue(value);
    
        const filtered = stations.filter(station => 
            station.bldn_nm.includes(value)
        );
    
        // 중복된 역 이름 제거
        const uniqueStations = Array.from(new Set(filtered.map(station => station.bldn_nm)))
                                    .map(name => filtered.find(station => station.bldn_nm === name));
    
        setFilteredArriveStations(uniqueStations);
    };
    
    const handleArriveInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFilteredArriveStations([]); // 추천 목록 숨기기
        }
    };
    
    const handleStationSelect = (station, type) => {
        if (type === 'depart') {
            setDepartValue(station.bldn_nm);
        } else {
            setArriveValue(station.bldn_nm);
        }
        // 선택 후 목록 초기화
        if (type === 'depart') {
            setFilteredDepartStations([]);
        } else {
            setFilteredArriveStations([]);
        }
    };

    const swapValues = () => {
        const temp = departValue;
        setDepartValue(arriveValue);
        setArriveValue(temp);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClick={onClose}>
            <ModalContent style={{ backgroundColor: '#F3F3F3' }} onClick={(e) => { e.stopPropagation(); }}>
                <BackBtn onClick={onClose}><ArrowBackIosIcon style={{fontSize: '1rem'}} /></BackBtn>
                
                <SelectVehicle>
                    <VehicleTab 
                        id="traffic" 
                        onMouseEnter={() => setHoveredTab('traffic')} 
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        <TabImage 
                            src={hoveredTab === 'traffic' ? trafficHoverIcon : trafficIcon} 
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
                            src={hoveredTab === 'car' ? carHoverIcon : carIcon} 
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
                            src={hoveredTab === 'walk' ? walkHoverIcon : walkIcon} 
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
                            src={hoveredTab === 'bike' ? bikeHoverIcon : bikeIcon} 
                            alt="자전거" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                </SelectVehicle>

                <SearchingBox>
                    <SearchingDepart>
                        <SearchingImage src={departIcon} alt="출발" />
                        <SearchingInput
                            type="text"
                            id="depart-input"
                            name="depart-input"
                            placeholder="출발지"
                            spellCheck="false"
                            value={departValue || ""}
                            onChange={handleDepartInputChange} // 출발지 입력 핸들러 호출
                            onKeyDown={handleDepartInputKeyDown} // Enter 키 핸들러 추가
                        />
                        {filteredDepartStations.length > 0 && (
                            <SuggestionsList>
                                {filteredDepartStations.map((station, index) => (
                                    <SuggestionItem key={index} onClick={() => handleStationSelect(station, 'depart')}>
                                        {station.bldn_nm} {/* 역 이름 표시 */}
                                    </SuggestionItem>
                                ))}
                            </SuggestionsList>
                        )}
                    </SearchingDepart>
                    <ChangeIcon 
                        src={changeIcon} 
                        alt="변경" 
                        id="changeDeAr" 
                        onClick={swapValues} // 클릭 시 값 교환 
                    />
                    <SearchingArrive>
                        <SearchingImage src={arriveIcon} alt="도착" />
                        <SearchingInput
                            type="text"
                            id="arrive-input"
                            name="arrive-input"
                            placeholder="도착지"
                            spellCheck="false"
                            value={arriveValue || ""}
                            onChange={handleArriveInputChange} // 도착지 입력 핸들러 호출
                            onKeyDown={handleArriveInputKeyDown} // Enter 키 핸들러 추가
                        />
                        {filteredArriveStations.length > 0 && (
                            <SuggestionsList>
                                {filteredArriveStations.map((station, index) => (
                                    <SuggestionItem key={index} onClick={() => handleStationSelect(station, 'arrive')}>
                                        {station.bldn_nm}역 {/* 역 이름 표시 */}
                                    </SuggestionItem>
                                ))}
                            </SuggestionsList>
                        )}
                    </SearchingArrive>
                    <Finding>
                        <FindingImage src={findIcon} alt="길찾기" id="find-btn" />
                    </Finding>
                </SearchingBox>

                <FindingResultItems>
                    <FindingResultItem id="finding-result-item1">
                        <FindingResultImage id="shortCut" src={optimalIcon} alt="최적" />
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