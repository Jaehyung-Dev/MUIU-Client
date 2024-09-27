import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    flex: 1;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('${process.env.PUBLIC_URL}/HS_images/map-test.png');
`;

const HS_MapDisplay = ({ openInfoPopUp, openPhotoPopUp, openFindRoadPopUp }) => {
    return (
        <MapContainer>
            <MapDisplay>
                <button onClick={openInfoPopUp}>정보 보기</button>
                <button onClick={openPhotoPopUp}>사진 보기</button>
                <button onClick={openFindRoadPopUp}>길찾기 보기</button>
            </MapDisplay>
        </MapContainer>
    );
};

export default HS_MapDisplay;