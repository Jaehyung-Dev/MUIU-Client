import React, { useEffect, useRef } from 'react';
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
    const lat = 37.284795;
    const lng = 127.064359;

    useEffect(() => {
        const { naver } = window;
        
        if (mapRef.current && naver) {
            const location = new naver.maps.LatLng(lat, lng);
            const map = new naver.maps.Map(mapRef.current, {
                center: location,
                zoom: 18,
            });

            new naver.maps.Marker({
                position: location,
                map,
            });
        }
    }, []);
    

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