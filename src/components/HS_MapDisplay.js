import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    flex: 1;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
`;

const HS_MapDisplay = ({ openInfoPopUp, openPhotoPopUp, openFindRoadPopUp }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);

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
        getUserLocation(); // 사용자 위치 가져오기

        const { naver } = window;

        if (mapRef.current && naver) {
            const initialLocation = userLocation
                ? new naver.maps.LatLng(userLocation.latitude, userLocation.longitude)
                : new naver.maps.LatLng(37.284795, 127.064359); // 기본 위치

            const mapOptions = {
                center: initialLocation,
                zoom: 18,
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT,
                },
            };

            const map = new naver.maps.Map(mapRef.current, mapOptions);

            if (userLocation) {
                new naver.maps.Marker({
                    position: initialLocation,
                    map,
                });
            }
        }
    }, [userLocation]); // userLocation이 변경될 때마다 재렌더링

    return (
        <MapContainer>
            <MapDisplay>
                <button onClick={openInfoPopUp}>정보 보기</button>
                <button onClick={openPhotoPopUp}>사진 보기</button>
                <button onClick={openFindRoadPopUp}>길찾기 보기</button>

                <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
            </MapDisplay>
        </MapContainer>
    );
};

export default HS_MapDisplay;