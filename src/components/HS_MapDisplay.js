import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import userMarkerIcon from '../svg/userMarker.svg';
import nearbyIcon from '../svg/nearby.svg';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TrainIcon from '@mui/icons-material/Train';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import hospitalData from '../JSON/hospitalData.json';
import hospitalMarkerIcon from '../HS_images/hospitalMarker.svg';
import shelterData from '../JSON/shelterData.json';
import shelterMarkerIcon from '../HS_images/shelterMarker.svg';
import HS_InfoModal from './HS_InfoModal'; // 모달 컴포넌트 import

const MapContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 10px;
    position: relative;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
`;

const ControlPanel = styled.div`
    position: absolute; 
    top: 150px;
    right: 10px;
    display: flex;
    flex-direction: column;
    z-index: 990;
`;

const ControlButton = styled.button`
    background-color: white;
    color: #666;
    border: 1px solid #666;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 30px;
    height: 30px;
`;

const HS_MapDisplay = ({ openInfoPopUp, openPhotoPopUp, openFindRoadPopUp, searchQuery, stations }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    
    // 모달 상태 및 데이터 추가
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [nearestStation, setNearestStation] = useState(null); // 가까운 역 이름
    const [nearestDistance, setNearestDistance] = useState(null); // 가까운 역 거리

    /* 사용자 위치를 실시간으로 받아오는 기능 */
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
        getUserLocation();
    }, []);

    useEffect(() => {
        const { naver } = window;

        if (mapRef.current && naver) {
            const initialLocation = userLocation
                ? new naver.maps.LatLng(userLocation.latitude, userLocation.longitude)
                : new naver.maps.LatLng(37.4997777, 127.0324107);

            const mapOptions = {
                center: initialLocation,
                zoom: zoomLevel,
            };

            const newMap = new naver.maps.Map(mapRef.current, mapOptions);
            setMap(newMap);

            const addMarkersWithinBounds = () => {
                const bounds = newMap.getBounds();
                const newMarkers = [];

                // 병원 마커 추가
                hospitalData.DATA.forEach(hospital => {
                    const hospitalPosition = new naver.maps.LatLng(
                        Number(hospital.wgs84lat),
                        Number(hospital.wgs84lon)
                    );

                    if (bounds.hasLatLng(hospitalPosition)) {
                        const hospitalMarker = new naver.maps.Marker({
                            position: hospitalPosition,
                            map: newMap,
                            icon: {
                                url: hospitalMarkerIcon,
                                size: new naver.maps.Size(100, 100),
                                anchor: new naver.maps.Point(11, 35),
                            },
                        });

                        newMarkers.push(hospitalMarker);

                        // 마커 클릭 이벤트 리스너 추가
                        naver.maps.Event.addListener(hospitalMarker, 'click', () => {
                            setSelectedHospital(hospital); // 클릭한 병원 데이터 설정
                            findNearestStation(hospital); // 가까운 역 찾기 호출
                            setModalOpen(true); // 모달 열기
                        });
                    }
                });

                // 쉘터 마커 추가 생략...
                shelterData.DATA.forEach(shelter => {
                    const shelterPosition = new naver.maps.LatLng(
                        Number(shelter.ycord),
                        Number(shelter.xcord)
                    );

                    if (bounds.hasLatLng(shelterPosition)) {
                        const shelterMarker = new naver.maps.Marker({
                            position: shelterPosition,
                            map: newMap,
                            icon: {
                                url: shelterMarkerIcon,
                                size: new naver.maps.Size(100, 100),
                                anchor: new naver.maps.Point(11, 35),
                            },
                        });

                        newMarkers.push(shelterMarker);

                        // 마커 클릭 이벤트 리스너 추가 
                        naver.maps.Event.addListener(shelterMarker, 'click', () => {
                            openInfoPopUp();
                        });
                    }
                });
            };

            // 지도 초기화 후 마커 추가
            addMarkersWithinBounds();

            // 지도 이동 시 마커 업데이트
            naver.maps.Event.addListener(newMap, 'bounds_changed', addMarkersWithinBounds);

            if (userLocation) {
                new naver.maps.Marker({
                    position: initialLocation,
                    map: newMap,
                    icon: {
                        url: userMarkerIcon,
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(11, 35)
                    },
                });
            }
        }
    }, [userLocation]);

    useEffect(() => {
        const { naver } = window;

        if (map && userLocation) {
            const newLocation = new naver.maps.LatLng(userLocation.latitude, userLocation.longitude);
            map.setCenter(newLocation);
        }
    }, [userLocation, map]);
    
    useEffect(() => {
        setResults([]); 

        if (searchQuery) {
            const fetchLocalData = async () => {
                const client_id = process.env.REACT_APP_CLIENT_ID;
                const client_secret = process.env.REACT_APP_CLIENT_SECRET;
                const api_url = `/map-geocode/v2/geocode?query=${encodeURI(searchQuery)}`;
        
                try {
                    const response = await axios.get(api_url, {
                        headers: {
                            'X-NCP-APIGW-API-KEY-ID': client_id,
                            'X-NCP-APIGW-API-KEY': client_secret
                        }
                    });
        
                    if (response.data && response.data.addresses) {
                        setResults(response.data.addresses);
                        const { x, y } = response.data.addresses[0]; 
                        const newLocation = new window.naver.maps.LatLng(y, x);
        
                        if (map) {
                            map.setCenter(newLocation);
                        }
                    } else {
                        setResults([]);
                        setError('검색 결과가 없습니다.');
                    }
                } catch (err) {
                    setError(err.response ? err.response.status : 'Error occurred');
                    setResults([]);
                }
            };
        
            fetchLocalData();
        }
    }, [searchQuery, map]);

    /* 사용자 위치를 중심으로 지도 중심 이동 기능 구현 */
    const centerMapOnUserLocation = () => {
        if (userLocation && map) {
            const newLocation = new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude);
            map.setCenter(newLocation);
        }
    };

    /* 사용자 위치 기준 인근역 표시 기능 구현*/
    const toggleNearbyStations = () => {
        if (userLocation && stations) {
            const userLat = userLocation.latitude;
            const userLon = userLocation.longitude;

            const stationsWithDistance = stations.map(station => {
                const stationLat = parseFloat(station.lat);
                const stationLon = parseFloat(station.lot);
                const distance = calculateDistance(userLat, userLon, stationLat, stationLon);
                return { ...station, distance };
            });
    
            /* 1km 이내의 역만 필터링 */ 
            const nearbyStations = stationsWithDistance.filter(station => station.distance <= 1);
    
            /* 거리순 정렬 */
            const sortedStations = nearbyStations.sort((a, b) => a.distance - b.distance);
    
            /* 같은 역사명을 가진 지하철역 그룹화 */
            const groupedStations = {};
    
            sortedStations.forEach(station => {
                if (!groupedStations[station.bldn_nm]) {
                    groupedStations[station.bldn_nm] = {
                        routes: [],
                        minDistance: station.distance
                    };
                }
                groupedStations[station.bldn_nm].routes.push(station.route); // route 추가
                groupedStations[station.bldn_nm].minDistance = Math.min(groupedStations[station.bldn_nm].minDistance, station.distance);
            });
    
            /* 최종 리스트 생성 */
            const stationList = Object.entries(groupedStations).map(([name, data]) => {
                const routes = [...new Set(data.routes)];
                return `${name} (${routes.join(', ')}) ${data.minDistance.toFixed(1)} km`;
            }).join('\n');
    
            alert(`인근 역 목록(반경 1km 이내):\n${stationList}`);
            
            /* 인근역 Marker 생성 및 Marker 삭제(3초 후) */ 
            const { naver } = window;
            const markers = []; 

            sortedStations.forEach(station => {
                const position = new naver.maps.LatLng(station.lat, station.lot);
                const marker = new naver.maps.Marker({
                    position,
                    map: map,
                    title: station.bldn_nm,
                    icon: {
                        url: nearbyIcon,
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(0, 0)
                    },
                });
                markers.push(marker);
            });

            setTimeout(() => {
                markers.forEach(marker => {
                    marker.setMap(null);
                });
            }, 3000);
        }
    };

    /* 인근 지하철역과 사용자 위치 간 거리 계산 */
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구 반지름 (킬로미터)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // 미터 단위로 변환
    };

    const findNearestStation = (hospital) => {
        if (stations) {
            const hospitalLat = Number(hospital.wgs84lat);
            const hospitalLon = Number(hospital.wgs84lon);
    
            let closestStation = null;
            let closestDistance = Infinity;
    
            stations.forEach(station => {
                const stationLat = parseFloat(station.lat);
                const stationLon = parseFloat(station.lot);
                const distance = calculateDistance(hospitalLat, hospitalLon, stationLat, stationLon);
    
                console.log(`병원: (${hospitalLat}, ${hospitalLon}), 역: (${stationLat}, ${stationLon}), 거리: ${distance}`);
    
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestStation = station.bldn_nm; // 역 이름
                }
            });
    
            // 가까운 역이 있는 경우
            if (closestStation) {
                setNearestStation(closestStation);
                setNearestDistance(closestDistance);
            } else {
                setNearestStation(null);
                setNearestDistance(null);
            }
        }
    };

    /* zoomIn 기능 구현 */
    const zoomIn = () => {
        if (map) {
            const newZoomLevel = map.getZoom() + 1;
            if (newZoomLevel > 20) {
                alert('최대 줌인입니다.');
            } else {
                map.setZoom(newZoomLevel);
            }
        }
    };

    /* zoomOut 기능 구현 */
    const zoomOut = () => {
        if (map) {
            const newZoomLevel = map.getZoom() - 1;
            if (newZoomLevel < 10) {
                alert('최소 줌아웃입니다.');
            } else {
                map.setZoom(newZoomLevel);
            }
        }
    };

    return (
        <MapContainer>
            <MapDisplay>
                <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
                    <ControlPanel>
                        <ControlButton onClick={() => window.scrollTo(0, 0)}>
                            <ArrowDropUpIcon />
                        </ControlButton>
                        <ControlButton onClick={centerMapOnUserLocation}>
                            <GpsFixedIcon />
                        </ControlButton>
                        <ControlButton onClick={toggleNearbyStations}>
                            <TrainIcon />
                        </ControlButton>
                        <ControlButton onClick={zoomIn}>
                            <ZoomInIcon />
                        </ControlButton>
                        <ControlButton onClick={zoomOut}>
                            <ZoomOutIcon />
                        </ControlButton>
                    </ControlPanel>
                </div>
            </MapDisplay>
            <div>
                {error && <p>오류: {error}</p>}
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>
                            <span>{item.roadAddress || item.jibunAddress}: ({item.y}, {item.x})</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* 모달 컴포넌트 추가 */}
            {selectedHospital && (
                <HS_InfoModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedHospital(null); // 선택된 병원 초기화
                        setNearestStation(null); // 가까운 역 초기화
                        setNearestDistance(null); // 거리 초기화
                    }}
                    openPhotoPopUp={openPhotoPopUp}
                    openFindRoadPopUp={openFindRoadPopUp}
                    hospitalData={selectedHospital} // 선택한 병원 데이터 전달
                    nearestStation={nearestStation} // 가까운 역 이름 전달
                    nearestDistance={nearestDistance} // 가까운 역 거리 전달
                />
            )}
        </MapContainer>
    );
};

export default HS_MapDisplay;