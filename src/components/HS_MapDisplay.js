import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import userMarkerIcon from '../svg/userMarker.svg';
import hospitalMarkerIcon from '../svg/hospitalMarker.svg';

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
`;

const HS_MapDisplay = ({ openInfoPopUp, openPhotoPopUp, openFindRoadPopUp }) => {
    const mapRef = useRef(null);
    // 사용자 위치 실시간 로딩 변수 설정
    const [userLocation, setUserLocation] = useState(null);
    // 지도 변수 설정
    const [map, setMap] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(18);

    // 사용자 위치 실시간 로딩 기능
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

    // 지도 구현 파트(사용자 위치 실시간 적용)
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
                const userMarker = new naver.maps.Marker({
                    position: initialLocation,
                    map: newMap,
                    icon: {
                        url: userMarkerIcon, // 임포트한 이미지 사용
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(11, 35)
                    },
                });

                const hospitalMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(37.4997779, 127.0324107),
                    map: newMap,
                    icon: {
                        url: hospitalMarkerIcon, // 임포트한 이미지 사용
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(11, 35)
                    },
                });

                naver.maps.Event.addListener(hospitalMarker, 'click', () => {
                    openInfoPopUp();
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

    return (
        <MapContainer>
            <MapDisplay>
                <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
            </MapDisplay>
        </MapContainer>
    );
};

export default HS_MapDisplay;