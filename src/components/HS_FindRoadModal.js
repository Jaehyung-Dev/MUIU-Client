import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import trafficIcon from '../svg/대중교통.svg';
import trafficHoverIcon from '../svg/대중교통-hover.svg';
import carIcon from '../svg/자동차.svg';
import carHoverIcon from '../svg/자동차-hover.svg';
import walkIcon from '../svg/도보.svg';
import walkHoverIcon from '../svg/도보-hover.svg';
import departIcon from '../svg/출발-icon.svg';
import arriveIcon from '../svg/도착-icon.svg';
import changeIcon from '../svg/변경.svg';
import findIcon from '../svg/길찾기-hover.svg';
import optimalIcon from '../svg/최적.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import hospitalData from '../JSON/hospitalData.json';

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
    cursor: pointer;
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

/* 검색어 추천 기능 스타일 */
const SuggestionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 5px;
    background-color: white;
    position: absolute;
    top: 220px;
    z-index: 1000;
    width: 90%;
    max-height: 100px;
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #888;
`;

const SuggestionItem = styled.li`
    cursor: pointer;
    padding: 8px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const HS_FindRoadModal = ({ isOpen, onClose, hospitalName, mode, stations }) => {
    const [hoveredTab, setHoveredTab] = useState(null);

    /* 출발, 도착지 설정을 위한 부분 */
    const [departValue, setDepartValue] = useState('');
    const [arriveValue, setArriveValue] = useState('');
    const [filteredDepartStations, setFilteredDepartStations] = useState([]);
    const [filteredArriveStations, setFilteredArriveStations] = useState([]);
    const [hospitalCoordinates, setHospitalCoordinates] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [rotation, setRotation] = useState(0);

    // 병원 이름
    useEffect(() => {
        if (hospitalName) {
            const coordinates = getHospitalCoordinates(hospitalName);
            setHospitalCoordinates(coordinates);
        }
    }, [hospitalName]);

    const getHospitalCoordinates = (hospitalName) => {
        const hospital = hospitalData.DATA.find(hospital => hospital.dutyname.trim() === hospitalName.trim());
        if (hospital) {
            return { lat: parseFloat(hospital.wgs84lat), lng: parseFloat(hospital.wgs84lon) };
        }
        return null; 
    };

    const getDepartCoordinates = () => {
        if (departValue) {
            // 병원 이름이 출발지일 경우
            if (departValue === hospitalName) {
                return getHospitalCoordinates(hospitalName); // 병원 좌표 반환
            }
    
            const station = stations.find(station => station.bldn_nm === departValue);
            if (station) {
                return { lat: parseFloat(station.lat), lng: parseFloat(station.lot) }; // 역 좌표
            }
        }
    
        // departValue가 null일 경우 현재 위치 반환
        if (userLocation) {
            return { lat: userLocation.latitude, lng: userLocation.longitude }; // 현재 위치 좌표 반환
        }
    
        return null; // 좌표가 없을 경우
    };
    
    const getArriveCoordinates = () => {
        if (arriveValue) {
            // 병원 이름이 도착지일 경우
            if (arriveValue === hospitalName) {
                return getHospitalCoordinates(hospitalName); // 병원 좌표 반환
            }
    
            const station = stations.find(station => station.bldn_nm === arriveValue);
            if (station) {
                return { lat: parseFloat(station.lat), lng: parseFloat(station.lot) }; // 역 좌표
            }
        }
    
        // arriveValue가 null일 경우 현재 위치 반환
        if (userLocation) {
            return { lat: userLocation.latitude, lng: userLocation.longitude }; // 현재 위치 좌표 반환
        }
    
        return null; // 좌표가 없을 경우
    };
    

    useEffect(() => {
        if (mode === 'depart') {
            setDepartValue(hospitalName); // 출발지에 병원 이름 설정
            setArriveValue('');
        } else if (mode === 'arrive') {
            setArriveValue(hospitalName);
            setDepartValue('');
        }
    }, [hospitalName, mode]);
    

    // 출발지 입력 핸들러
    const handleDepartInputChange = (event) => {
        const value = event.target.value;
        setDepartValue(value);
    
        const filtered = stations.filter(station => 
            station.bldn_nm.includes(value)
        );
    
        const uniqueStations = Array.from(new Set(filtered.map(station => station.bldn_nm)))
                                    .map(name => filtered.find(station => station.bldn_nm === name));
    
        setFilteredDepartStations(uniqueStations);
    };
    
    const handleDepartInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFilteredDepartStations([]);
        }
    };    

    // 도착지 입력 핸들러
    const handleArriveInputChange = (event) => {
        const value = event.target.value;
        setArriveValue(value);
    
        const filtered = stations.filter(station => 
            station.bldn_nm.includes(value)
        );
    
        const uniqueStations = Array.from(new Set(filtered.map(station => station.bldn_nm)))
                                    .map(name => filtered.find(station => station.bldn_nm === name));
    
        setFilteredArriveStations(uniqueStations);
    };
    
    const handleArriveInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFilteredArriveStations([]);
        }
    };
    
    const handleStationSelect = (station, type) => {
        if (type === 'depart') {
            setDepartValue(station.bldn_nm);
        } else {
            setArriveValue(station.bldn_nm);
        }
        if (type === 'depart') {
            setFilteredDepartStations([]);
        } else {
            setFilteredArriveStations([]);
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 사용자 위치 가져오기
        getUserLocation();
    }, []);

    useEffect(() => {
        // userLocation이 업데이트될 때 departValue와 arriveValue가 null일 경우 현재 위치를 설정
        if (userLocation) {
            if (departValue === null) {
                setDepartValue(`현재 위치: ${userLocation.latitude}, ${userLocation.longitude}`);
            }
            if (arriveValue === null) {
                setArriveValue(`현재 위치: ${userLocation.latitude}, ${userLocation.longitude}`);
            }
        }
    }, [userLocation]);

    const swapValues = () => {
        const tempDepart = departValue;
        const tempArrive = arriveValue;
        setDepartValue(tempArrive);
        setArriveValue(tempDepart);
        setRotation(rotation + 180);
    };
    
    useEffect(() => {
        const departCoords = getDepartCoordinates();
        const arriveCoords = getArriveCoordinates();
        
        console.log('출발지:', departCoords);
        console.log('도착지:', arriveCoords);
    }, [departValue, arriveValue, hospitalCoordinates, stations]);
    

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
                </SelectVehicle>

                <SearchingBox>
                    <SearchingDepart>
                        <SearchingImage src={departIcon} alt="출발" />
                        <SearchingInput
                            type="text"
                            id="depart-input"
                            name="depart-input"
                            placeholder="출발지(공백 시, 현재 위치로 자동 설정)"
                            spellCheck="false"
                            value={departValue || ""}
                            onChange={handleDepartInputChange}
                            onKeyDown={handleDepartInputKeyDown}
                        />
                        {filteredDepartStations.length > 0 && (
                            <SuggestionsList>
                                {filteredDepartStations.map((station, index) => (
                                    <SuggestionItem key={index} onClick={() => handleStationSelect(station, 'depart')}>
                                        {station.bldn_nm}역
                                    </SuggestionItem>
                                ))}
                            </SuggestionsList>
                        )}
                    </SearchingDepart>
                    <ChangeIcon 
                        src={changeIcon} 
                        alt="변경" 
                        id="changeDeAr"
                        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s' }}
                        onClick={swapValues}
                    />
                    <SearchingArrive>
                        <SearchingImage src={arriveIcon} alt="도착" />
                        <SearchingInput
                            type="text"
                            id="arrive-input"
                            name="arrive-input"
                            placeholder="도착지(공백 시, 현재 위치로 자동 설정)"
                            spellCheck="false"
                            value={arriveValue || ""}
                            onChange={handleArriveInputChange}
                            onKeyDown={handleArriveInputKeyDown}
                        />
                        {filteredArriveStations.length > 0 && (
                            <SuggestionsList>
                                {filteredArriveStations.map((station, index) => (
                                    <SuggestionItem key={index} onClick={() => handleStationSelect(station, 'arrive')}>
                                        {station.bldn_nm}역
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