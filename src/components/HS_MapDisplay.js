import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import userMarkerIcon from '../svg/userMarker.svg';
import hospitalMarkerIcon from '../svg/hospitalMarker.svg';

const MapContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
`;

const CenterButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px;
    background-color: white;
    border: 1px solid #666;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000; // 버튼이 지도 위에 보이도록 설정
`;

const HS_MapDisplay = ({ openInfoPopUp, searchQuery }) => {
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
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT,
                },
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

    // 입력 받은 주소를 지도에 띄우기
    useEffect(() => {
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
    
                    console.log(response.data); // API 응답 확인
                    if (response.data && response.data.addresses) {
                        setResults(response.data.addresses);
                        const { x, y } = response.data.addresses[0]; 
                        const newLocation = new window.naver.maps.LatLng(y, x);
                        console.log('Setting map center to:', newLocation); // 새로운 위치 로그
    
                        // 마커 추가
                        new window.naver.maps.Marker({
                            position: newLocation,
                            map: map,
                            icon: {
                                url: hospitalMarkerIcon,
                                size: new window.naver.maps.Size(100, 100),
                                anchor: new window.naver.maps.Point(11, 35)
                            },
                        });
    
                        // 지도의 중심을 검색한 장소의 위치로 설정
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

    return (
        <MapContainer>
            <MapDisplay>
                <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
                <CenterButton onClick={centerMapOnUserLocation}>
                    현재 위치로 중심 이동
                </CenterButton>
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