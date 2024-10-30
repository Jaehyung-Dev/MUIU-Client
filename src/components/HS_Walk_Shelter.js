import React, { useEffect, useRef, useState } from 'react';

const HS_Walk_Shelter = ({ userLocation, departCoords, arriveCoords }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const userMarkerIcon = '/path/to/user-icon.png';
    const tmapAppKey = process.env.REACT_APP_TMAP_APP_KEY;

    useEffect(() => {
        const { naver } = window;

        if (mapRef.current && naver) {
            const initialLocation = userLocation
                ? new naver.maps.LatLng(userLocation.latitude, userLocation.longitude)
                : new naver.maps.LatLng(37.4997777, 127.0324107);

            const mapOptions = {
                center: initialLocation,
                zoom: 14,
            };

            const newMap = new naver.maps.Map(mapRef.current, mapOptions);
            setMap(newMap);

            // 사용자 위치 마커 표시
            if (userLocation) {
                new naver.maps.Marker({
                    position: initialLocation,
                    map: newMap,
                    icon: {
                        url: userMarkerIcon,
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(11, 35),
                    },
                    zIndex: 15
                });
            }

            // 길찾기 API 호출
            if (departCoords && arriveCoords) {
                const requestData = {
                    startX: departCoords.longitude,
                    startY: departCoords.latitude,
                    endX: arriveCoords.longitude,
                    endY: arriveCoords.latitude,
                    startName: '출발지이름',
                    endName: '도착지이름',
                };

                fetch('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'appKey': tmapAppKey,
                    },
                    body: JSON.stringify(requestData),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        const coordinates = data.features[0].geometry.coordinates.map(coord => 
                            new naver.maps.LatLng(coord[1], coord[0])
                        );

                        new naver.maps.Polyline({
                            path: coordinates,
                            strokeColor: '#FF0000',
                            strokeWeight: 5,
                            map: newMap,
                        });
                    } else {
                        console.error('경로를 찾을 수 없습니다:', data);
                    }
                })
                .catch(error => {
                    console.error('API 호출 중 오류 발생:', error);
                });
            }
        }
    }, [userLocation, departCoords, arriveCoords]);

    return <div ref={mapRef} style={{ width: '95%', height: '600px' }} />;
};

export default HS_Walk_Shelter;