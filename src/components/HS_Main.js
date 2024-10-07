import React, { useState } from 'react';
import styled from 'styled-components';
import HS_SearchBar from './HS_SearchBar';
import HS_MapDisplay from './HS_MapDisplay';
import HS_InfoModal from './HS_InfoModal';
import HS_PhotoModal from './HS_PhotoModal';
import HS_FindRoadModal from './HS_FindRoadModal';

const Main = styled.div`
    width: 100%;
    max-width: calc(600px - 30px);
    height: 60vh;
    min-height: calc(100vh - 77px - 80px);
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-y: hidden;
`;

const HS_Main = () => {
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

export default HS_Main;