import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Clock } from 'lucide-react';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
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
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import shelterData from '../JSON/shelterData.json';

const Modal = styled.div`
    display: ${(props) => (props.isShelterFindRoadOpen ? 'block' : 'none')};
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

const TransitRouteCard = styled.div`
    width: 90%;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.div`
    height: 10px;
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin: 5px 0;
    display: flex;
`;

const ProgressSegment = styled.div`
    height: 100%;
    width: ${(props) => props.width}%; /* 동적으로 width 설정 */
    background-color: ${(props) => props.color}; /* 동적으로 색상 설정 */
    border-radius: 5px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Duration = styled.div`
    display: flex;
    align-items: center;
`;

const Cost = styled.div`
    font-size: 1rem;
    font-weight: bold;
`;

const SegmentDetails = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

const SegmentInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: #555;
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

const HS_FindRoadModal_Shelter = ({ isShelterFindRoadOpen, closeShelterFind, shelterName, mode, stations }) => {
    const [activeTab, setActiveTab] = useState('traffic');

    /* 출발, 도착지 설정을 위한 부분 */
    const [departValue, setDepartValue] = useState('');
    const [arriveValue, setArriveValue] = useState('');
    const [filteredDepartStations, setFilteredDepartStations] = useState([]);
    const [filteredArriveStations, setFilteredArriveStations] = useState([]);
    const [shelterCoordinates, setShelterCoordinates] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [rotation, setRotation] = useState(0);

    // 대피소 이름
    useEffect(() => {
        if (shelterName) {
            const coordinates = getShelterCoordinates(shelterName);
            setShelterCoordinates(coordinates);
        }
    }, [shelterName]);

    const getShelterCoordinates = (shelterName) => {
        const shelter = shelterData.DATA.find(shelter => shelter.equp_nm.trim() === shelterName.trim());
        if (shelter) {
            return { lat: parseFloat(shelter.ycord), lng: parseFloat(shelter.xcord) };
        }
        return null; 
    };

    const getDepartCoordinates = () => {
        if (departValue) {
            // 대피소 이름이 출발지일 경우
            if (departValue === shelterName) {
                return getShelterCoordinates(shelterName); // 대피소 좌표 반환
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
            // 대피소 이름이 도착지일 경우
            if (arriveValue === shelterName) {
                return getShelterCoordinates(shelterName); // 대피소 좌표 반환
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
            setDepartValue(shelterName); // 출발지에 대피소 이름 설정
            setArriveValue('');
        } else if (mode === 'arrive') {
            setArriveValue(shelterName);
            setDepartValue('');
        }
    }, [shelterName, mode]);
    

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
    
    /* 길찾기 기능 구현 */
    // 대중교통
    const [transitData, setTransitData] = useState(null); // API 데이터를 저장할 상태 추가

    // 대중교통 길찾기 API 호출
    const fetchTransitRoutes = async (departCoords, arriveCoords) => {
        const appKey = process.env.REACT_APP_TMAP_APP_KEY;
        const url = 'https://apis.openapi.sk.com/transit/routes';
        const body = {
            startX: departCoords.lng,
            startY: departCoords.lat,
            endX: arriveCoords.lng,
            endY: arriveCoords.lat,
            count: 10,
            lang: 0,
            format: 'json'
        };
    
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'appKey': appKey,
                },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) {
                if (response.status === 429) {
                    alert('요청이 너무 많습니다. 잠시 후에 다시 시도해주세요.');
                } else {
                    alert('API 요청 실패: ' + response.status);
                }
                return;
            }
    
            const data = await response.json();
            console.log('API 응답 데이터:', data);
    
            // itineraries가 존재하는지 및 길이가 0이 아닌지 체크
            if (data && data.metaData && data.metaData.plan && Array.isArray(data.metaData.plan.itineraries) && data.metaData.plan.itineraries.length > 0) {
                setTransitData(data.metaData.plan.itineraries);
            } else {
                console.error('itineraries가 존재하지 않거나 비어있습니다:', data);
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    };

    const handleFindingClick = () => {
        const departCoords = getDepartCoordinates();
        const arriveCoords = getArriveCoordinates();

        if (departCoords && arriveCoords) {
            fetchTransitRoutes(departCoords, arriveCoords);
        } else {
            console.error('출발지 또는 도착지 좌표를 가져올 수 없습니다.');
        }
    };
    
    // api 할당량 끝났을 때용 dummy 데이터 다 쓰면 transitData 에서 dummy로
    const dummyTransitData = [
        {
            totalTime: 6000,
            fare: {
                regular: {
                    totalFare: 1650,
                },
            },
            legs: [
                {
                    mode: 'WALK',
                    sectionTime: 120,
                    start: {
                        name: '출발지',
                    },
                    end: {
                        name: '서울역',
                    },
                },
                {
                    mode: 'SUBWAY',
                    sectionTime: 1800,
                    start: {
                        name: '서울역',
                    },
                    end: {
                        name: '정부과천청사',
                    },
                    route: '수도권4호선',
                },
                {
                    mode: 'WALK',
                    sectionTime: 300, // 도보 시간 (초)
                    start: {
                        name: '정부과천청사',
                    },
                    end: {
                        name: '(임시)정부과천청사역6번출구',
                    },
                },
                {
                    mode: 'BUS',
                    sectionTime: 300, // 도보 시간 (초)
                    start: {
                        name: '정부과천청사',
                    },
                    end: {
                        name: '(임시)정부과천청사역6번출구',
                    },
                    route: "일반:7",
                },
            ],
        },
        {
            totalTime: 4600,
            fare: {
                regular: {
                    totalFare: 1650,
                },
            },
            legs: [
                {
                    mode: 'WALK',
                    sectionTime: 120,
                    start: {
                        name: '출발지',
                    },
                    end: {
                        name: '서울역',
                    },
                },
                {
                    mode: 'SUBWAY',
                    sectionTime: 1800,
                    start: {
                        name: '서울역',
                    },
                    end: {
                        name: '정부과천청사',
                    },
                    route: '수도권4호선',
                },
                {
                    mode: 'WALK',
                    sectionTime: 300,
                    start: {
                        name: '정부과천청사',
                    },
                    end: {
                        name: '(임시)정부과천청사역6번출구',
                    },
                },
                {
                    mode: 'BUS',
                    sectionTime: 300, // 도보 시간 (초)
                    start: {
                        name: '정부과천청사',
                    },
                    end: {
                        name: '(임시)정부과천청사역6번출구',
                    },
                    route: "일반:7",
                },
            ],
        },
    ];
    
    // 시간 포맷 함수
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours > 0 ? `${hours}시간 ` : ''}${minutes}분`;
    };

    if (!isShelterFindRoadOpen) return null;

    return (
        <Modal
            isShelterFindRoadOpen={isShelterFindRoadOpen}
            onClick={() => { 
                setActiveTab('traffic');
                closeShelterFind();
        }}>
            <ModalContent style={{ backgroundColor: '#F3F3F3' }} onClick={(e) => { e.stopPropagation(); }}>
                <BackBtn
                    onClick={() => { 
                        setActiveTab('traffic');
                        closeShelterFind();
                }}>
                    <ArrowBackIosIcon style={{fontSize: '1rem'}} />
                </BackBtn>
                
                <SelectVehicle>
                    <VehicleTab 
                        id="traffic" 
                        onClick={() => setActiveTab('traffic')}
                    >
                        <TabImage 
                            src={activeTab === 'traffic' ? trafficHoverIcon : trafficIcon} 
                            alt="대중교통" 
                            className="tab-image"
                        />
                    </VehicleTab>
                    <VehicleTab 
                        id="car" 
                        onClick={() => setActiveTab('car')}
                    >
                        <TabImage 
                            src={activeTab === 'car' ? carHoverIcon : carIcon} 
                            alt="자동차" 
                            className="tab-image" 
                        />
                    </VehicleTab>
                    <VehicleTab 
                        id="walk" 
                        onClick={() => setActiveTab('walk')}
                    >
                        <TabImage 
                            src={activeTab === 'walk' ? walkHoverIcon : walkIcon} 
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
                        <FindingImage
                            src={findIcon} 
                            alt="길찾기" 
                            id="find-btn" 
                            onClick={handleFindingClick} />
                    </Finding>
                </SearchingBox>

                <FindingResultItems>
                    {activeTab === 'traffic' ? (
                        Array.isArray(dummyTransitData) && dummyTransitData.length > 0 ? (
                            // 총 소요 시간 기준으로 정렬
                            dummyTransitData
                                .sort((a, b) => a.totalTime - b.totalTime) // 총 소요 시간 짧은 순서로 정렬
                                .map((itinerary, index) => {
                                    const totalDurationInSeconds = itinerary.totalTime; // 전체 시간 (초)
                                    const totalTime = formatTime(totalDurationInSeconds); // 총 시간 (시/분)
                                    const totalFare = itinerary.fare.regular.totalFare; // 요금

                                    return (
                                        <TransitRouteCard key={index}>
                                            <Header>
                                                <Duration>
                                                    {/* 최적 경로 아이콘 추가 */}
                                                    {index === 0 && (
                                                        <>
                                                            <VerifiedIcon style={{fontSize: '0.9rem', color: '#3661B2', marginRight: '5px'}} />
                                                            <span style={{marginRight: '10px', fontSize: '0.9rem', fontWeight: 'bold', color: '#3661B2'}}>최적</span>
                                                        </>
                                                    )}
                                                    <Clock style={{ width: '0.9rem', height: '0.9rem' }} />
                                                    <span className="font-medium" style={{ marginLeft: '10px' }}>{totalTime}</span>
                                                </Duration>
                                                <Cost>{totalFare.toLocaleString()}원</Cost>
                                            </Header>

                                            <Progress>
                                                {itinerary.legs.map((leg, legIndex) => {
                                                    const legDuration = leg.sectionTime; // 각 교통수단의 소요 시간 (초)
                                                    const progressWidth = (legDuration / totalDurationInSeconds) * 100; // 비율 계산
                                                    let progressColor;

                                                    // 색상 설정
                                                    if (leg.mode === 'BUS') {
                                                        progressColor = '#ff6f61'; // 버스 색상
                                                    } else if (leg.mode === 'SUBWAY') {
                                                        progressColor = '#6fa3ef'; // 지하철 색상
                                                    } else if (leg.mode === 'WALK') {
                                                        progressColor = '#90ee90'; // 도보 색상
                                                    }

                                                    return (
                                                        <ProgressSegment key={legIndex} width={progressWidth} color={progressColor} />
                                                    );
                                                })}
                                            </Progress>

                                            {/* 교통수단 설명 부분 */}
                                            {itinerary.legs.map((leg, legIndex) => (
                                                <SegmentDetails key={legIndex}>
                                                    <SegmentInfo>
                                                        {leg.mode === 'BUS' && <DirectionsBusIcon style={{ fontSize: '0.8rem', marginRight: '5px' }} />}
                                                        {leg.mode === 'SUBWAY' && <TrainIcon style={{ fontSize: '0.8rem', marginRight: '5px' }} />}
                                                        {leg.mode === 'WALK' && <DirectionsWalkIcon style={{ fontSize: '0.8rem', marginRight: '5px' }} />}
                                                        <span style={{ marginRight: '15px' }}>
                                                            {leg.mode === 'BUS' ? `버스 ${leg.route}` : leg.mode === 'SUBWAY' ? `지하철 ${leg.route}` : `도보`}
                                                        </span>
                                                        {formatTime(leg.sectionTime)}
                                                    </SegmentInfo>
                                                    <SegmentInfo style={{ marginLeft: 'calc(0.8rem + 5px)', marginTop: '5px' }}>
                                                        {leg.start.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{leg.end.name}
                                                    </SegmentInfo>
                                                </SegmentDetails>
                                            ))}
                                        </TransitRouteCard>
                                    );
                                })
                        ) : (
                            <div>길찾기 결과가 없습니다.</div>
                        )
                    ) : activeTab === 'walk' ? (
                        (() => {
                            const departCoords = getDepartCoordinates();
                            const arriveCoords = getArriveCoordinates();
                    
                            // 출발지와 도착지 좌표가 유효한지 확인
                            if (!departCoords || !arriveCoords) {
                                return <div>출발지 또는 도착지 좌표를 가져올 수 없습니다.</div>;
                            }
                    
                            return (
                                <>
                                    <div id="map_wrap" className="map_wrap3">
                                        <div id="map_div" style={{ height: '100%', width: '100%' }}></div>
                                    </div>
                                    <p id="result"></p>
                    
                                    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                                    <script src={`${process.env.REACT_APP_TMAP_APP_KEY}`}></script>
                                    <script type="text/javascript">
                                        {`
                                            var map;
                                            var marker_s, marker_e;
                    
                                            function initTmap() {
                                                const departCoords = { lat: ${departCoords.lat}, lng: ${departCoords.lng} };
                                                const arriveCoords = { lat: ${arriveCoords.lat}, lng: ${arriveCoords.lng} };
                    
                                                map = new Tmapv2.Map("map_div", {
                                                    center : new Tmapv2.LatLng(${shelterCoordinates.lat}, ${shelterCoordinates.lng}),
                                                    width : "100%",
                                                    height : "400px",
                                                    zoom : 17,
                                                    zoomControl : true,
                                                    scrollwheel : true
                                                });
                    
                                                // 시작 마커
                                                marker_s = new Tmapv2.Marker({
                                                    position : new Tmapv2.LatLng(departCoords.lat, departCoords.lng),
                                                    icon : "/upload/tmap/marker/pin_r_m_s.png",
                                                    iconSize : new Tmapv2.Size(24, 38),
                                                    map : map
                                                });
                    
                                                // 도착 마커
                                                marker_e = new Tmapv2.Marker({
                                                    position : new Tmapv2.LatLng(arriveCoords.lat, arriveCoords.lng),
                                                    icon : "/upload/tmap/marker/pin_r_m_e.png",
                                                    iconSize : new Tmapv2.Size(24, 38),
                                                    map : map
                                                });
                    
                                                // 경로탐색 API 요청
                                                var headers = {}; 
                                                headers["appKey"] = "${process.env.REACT_APP_TMAP_APP_KEY}";
                    
                                                $.ajax({
                                                    method : "POST",
                                                    headers : headers,
                                                    url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
                                                    async : false,
                                                    data : {
                                                        "startX": departCoords.lng,
                                                        "startY": departCoords.lat,
                                                        "endX": arriveCoords.lng,
                                                        "endY": arriveCoords.lat,
                                                        "reqCoordType" : "WGS84GEO",
                                                        "resCoordType" : "EPSG3857",
                                                        "startName" : "출발지",
                                                        "endName" : "도착지"
                                                    },
                                                    success : function(response) {
                                                        var resultData = response.features;
                                                        var tDistance = "총 거리 : " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km,";
                                                        var tTime = " 총 시간 : " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분";
                    
                                                        $("#result").text(tDistance + tTime);
                    
                                                        // 경로를 지도에 표시
                                                        if (resultData.length > 0) {
                                                            const coordinates = resultData[0].geometry.coordinates;
                                                            const route = coordinates.map(coord => new Tmapv2.LatLng(coord[1], coord[0]));
                    
                                                            // 경로 그리기
                                                            var polyline = new Tmapv2.Polyline({
                                                                path: route,
                                                                strokeColor: "#FF0000",
                                                                strokeWidth: 6,
                                                                map: map
                                                            });
                                                        }
                                                    },
                                                    error: function(request, status, error) {
                                                        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                                                    }
                                                });
                                            }
                    
                                            window.onload = initTmap;
                                        `}
                                    </script>
                                </>
                            );
                        })()
                    ) : (
                        <div>길찾기 결과가 없습니다.</div>
                    )}
                </FindingResultItems>
            </ModalContent>
        </Modal>    
    );
};

export default HS_FindRoadModal_Shelter;