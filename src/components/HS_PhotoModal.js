import React from 'react';
import styled from 'styled-components';

import imgReady from '../HS_images/imgReady.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import hospitalData from '../JSON/hospitalData.json';

const Modal = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    position: relative;
    margin: 5vh auto;
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    height: 85%;
    overflow: hidden;
`;

const ImagesBox = styled.div`
    flex: 1;
    overflow-y: auto;
    background-color: white;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 5px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;

    &.active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    &:hover {
        color: #FFD700;
    }
`;

const TabsInfoPicture = styled.div`
    display: flex;
    margin-bottom: 20px;

    .tab {
        border-bottom: 2px solid #A1A1A1;
    }

    .active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    .tab:hover {
        color: #FFD700;
    }
`;

const BackButton = styled.button`
    width: 100%;
    height: 30px;
    text-align: left;
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #A1A1A1;
    cursor: pointer;
    padding: 5px 10px 0;
    align-items: center;
`;

const HS_PhotoModal = ({ isOpen, onClose, hospitalName }) => {
    const selectedHospital = hospitalData.DATA.find(hospital => hospital.dutyname === hospitalName);
    
    const imgUrls = selectedHospital ? selectedHospital.imgUrls : [];

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClick={onClose}>
            <ModalContent onClick={(e) => {e.stopPropagation();}}>
                <BackButton onClick={onClose}><ArrowBackIosIcon style={{fontSize: '1rem'}} /></BackButton>

                <TabsInfoPicture>
                    <Tab style={{borderBottom: '2px solid #A1A1A1'}} onClick={onClose}>정보</Tab>
                    <Tab className="active">사진</Tab>
                </TabsInfoPicture>

                <ImagesBox>
                    {imgUrls.length > 0 ? (
                        imgUrls.map((url, index) => (
                            <Image key={index} src={url} alt={`${hospitalName} 이미지 ${index + 1}`} />
                        ))
                    ) : (
                        <Image src={imgReady}/>
                    )}
                </ImagesBox>
            </ModalContent>
        </Modal>
    );
};

export default HS_PhotoModal;