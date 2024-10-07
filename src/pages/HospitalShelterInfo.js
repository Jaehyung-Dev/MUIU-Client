import React, { useState } from 'react';
import styled from 'styled-components';
import HS_SearchBar from '../components/HS_SearchBar';
import HS_MapDisplay from '../components/HS_MapDisplay';
import HS_InfoModal from '../components/HS_InfoModal';
import HS_PhotoModal from '../components/HS_PhotoModal';
import HS_FindRoadModal from '../components/HS_FindRoadModal';

const Main = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const HospitalShelterInfo = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    const [isFindRoadOpen, setIsFindRoadOpen] = useState(false);

    const openInfoPopUp = () => setIsInfoOpen(true);
    const closeInfoPopUp = () => setIsInfoOpen(false);

    const openPhotoPopUp = () => setIsPhotoOpen(true);
    const closePhotoPopUp = () => setIsPhotoOpen(false);

    const openFindRoadPopUp = () => setIsFindRoadOpen(true);
    const closeFindRoadPopUp = () => setIsFindRoadOpen(false);

    return (
        <Main>
            <HS_SearchBar/>
            <HS_MapDisplay
                openInfoPopUp={openInfoPopUp} 
                openPhotoPopUp={openPhotoPopUp} 
                openFindRoadPopUp={openFindRoadPopUp} />
            <HS_InfoModal isOpen={isInfoOpen} onClose={closeInfoPopUp} openPhotoPopUp={openPhotoPopUp} openFindRoadPopUp={openFindRoadPopUp}/>
            <HS_PhotoModal isOpen={isPhotoOpen} onClose={closePhotoPopUp} />
            <HS_FindRoadModal isOpen={isFindRoadOpen} onClose={closeFindRoadPopUp} />
        </Main>
    );
};

export default HospitalShelterInfo;
