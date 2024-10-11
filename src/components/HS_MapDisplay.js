import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import userMarkerIcon from '../svg/userMarker.svg';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TrainIcon from '@mui/icons-material/Train';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

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
    z-index: 1000;
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

const HS_MapDisplay = ({ openInfoPopUp, searchQuery, stations }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(18);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

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

    const centerMapOnUserLocation = () => {
        if (userLocation && map) {
            const newLocation = new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude);
            map.setCenter(newLocation);
        }
    };

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
    
            // 1km 이내의 역만 필터링
            const nearbyStations = stationsWithDistance.filter(station => station.distance <= 1); // 1km = 1
    
            // 거리순으로 정렬
            const sortedStations = nearbyStations.sort((a, b) => a.distance - b.distance);
    
            // 같은 역 이름으로 그룹화
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
    
            // 최종 리스트 생성
            const stationList = Object.entries(groupedStations).map(([name, data]) => {
                const routes = [...new Set(data.routes)]; // 중복 route 제거
                return `${name} (${routes.join(', ')}) ${data.minDistance.toFixed(1)} km`;
            }).join('\n');
    
            alert(`인근 역 목록 (1km 이내):\n${stationList}`);
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구의 반지름 (킬로미터)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 반환 (킬로미터)
    };

    const zoomIn = () => {
        if (map) {
            const newZoomLevel = map.getZoom() + 1;
            map.setZoom(newZoomLevel);
        }
    };

    const zoomOut = () => {
        if (map) {
            const newZoomLevel = map.getZoom() - 1;
            map.setZoom(newZoomLevel);
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
        </MapContainer>
    );
};

export default HS_MapDisplay;