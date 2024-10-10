import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClearIcon from '@mui/icons-material/Clear';

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

const Card = styled.div`
    width: 100%;
    padding-top: 100%; /* 1:1 비율 유지 */
    position: relative;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;

const ModalOverlay = styled.div`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    padding: 1rem;
    border-radius: 10px;
    width: 100vw;
    height: 100vh;
    position: relative;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-width: 80%;
        max-height: 80%;
        border-radius: 10px;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 1.5rem;
        background: none;
        border: none;
        color: #333;
        cursor: pointer;
    }
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background-color: white;
    border: none;
    color: #333;
    cursor: pointer;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    ${(props) => (props.right ? 'right: 1rem;' : 'left: 1rem;')}

    // &:hover {
    //     transform: scale(1.1);
    // }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 1.5rem;
    background-color: white;
    border: none;
    color: #333;
    cursor: pointer;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

const PageNumber = styled.div`
    position: absolute;
    bottom: 1rem;
    font-size: 1rem;
    color: #555;
    width: 100%;
    text-align: center;
`;

export const MindColumn = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const location = useLocation();
    const selectedImageList = location.state?.selectedImageList || 'sleepless_night'; 

    const imageLists = {
        sleepless_night: Array.from({ length: 10 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/sleepless_night(${i}).png`),
        ptsd: Array.from({ length: 8 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/ptsd(${i}).png`),
        panic_disorder: Array.from({ length: 10 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/panic_disorder(${i}).png`),
        social_psychology: Array.from({ length: 9 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/social_psychology(${i}).png`),
    };

    const images = imageLists[selectedImageList];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const openModal = (selectedImages) => {
        setSelectedImages(selectedImages);
        setCurrentImageIndex(0);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    const showNextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
    const showPrevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);

    return (
        <>
            <Cards>
                {Object.keys(imageLists).map((key, index) => (
                    <Card key={index} onClick={() => openModal(imageLists[key])}>
                        <img src={imageLists[key][0]} alt={`이미지 ${index + 1}`} />
                    </Card>
                ))}
            </Cards>

            <ModalOverlay visible={isModalOpen}>
                <ModalContent>
                    <CloseButton onClick={closeModal}><ClearIcon fontSize="large" /></CloseButton>
                    <img src={selectedImages[currentImageIndex]} alt="모달 이미지" />
                    {currentImageIndex > 0 && <NavButton onClick={showPrevImage}><NavigateBeforeIcon fontSize="large" /></NavButton>}
                    {currentImageIndex < selectedImages.length - 1 && <NavButton right onClick={showNextImage}><NavigateNextIcon fontSize="large" /></NavButton>}
                    <PageNumber>{`${currentImageIndex + 1} / ${selectedImages.length}`}</PageNumber>
                </ModalContent>
            </ModalOverlay>
        </>
    );
};

export default MindColumn;