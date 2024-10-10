import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuDropdown from '../components/MenuDropdown';
import mainImage1 from '../HS_images/병원 예시 이미지 1.jpg';
import mainImage2 from '../HS_images/병원 예시 이미지 2.jpg';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
    z-index: 1000;
`;

const BackButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

const Title = styled.h1`
    font-weight: 700;
    color: black;
    font-size: 18px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const IconContainer = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    margin-right: 10px;
`;

const Container = styled.div`
    text-align: center;
    min-height: 100vh;
    display: flex;
    width: 100vw;
    max-width: 600px;
    flex-direction: column;
`;

const ConsultationListWrapper = styled.div`
    background-color: #F3F3F3;
    width: 100%;
    padding: 15px 0;
    flex: 1;
`;

const InnerContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ConsultationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
`;

const ConsultationCard = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardContent = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    margin-right: 20px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const StarredPlace = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        setFavorites(savedFavorites);
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleFavorite = (id) => {
        const updatedFavorites = { ...favorites, [id]: !favorites[id] };
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <HeaderContainer>
                <BackButton onClick={handleBackClick}>
                    <ArrowBackIosIcon />
                </BackButton>
                <Title>즐겨찾기 장소</Title>
                <IconContainer>
                    <MenuIcon onClick={toggleMenu} />
                </IconContainer>
            </HeaderContainer>

            {menuOpen && (
                <MenuDropdown activeMenuItem="" handleMenuClick={() => setMenuOpen(false)} />
            )}

            <Container>
                <ConsultationListWrapper>
                    <InnerContainer>
                        <ConsultationList>
                            {!favorites['shelter'] && (
                                <ConsultationCard>
                                    <CardContent>
                                        <ImageWrapper>
                                            <img src={mainImage1} alt="Shelter" />
                                        </ImageWrapper>
                                        <div>
                                            <strong>비트캠프 대피소</strong>
                                            <p>서울특별시 강남구 강남대로 96 7층</p>
                                            <p>02-1111-1234</p>
                                        </div>
                                    </CardContent>
                                    <div onClick={() => toggleFavorite('shelter')}>
                                        {!favorites['shelter'] ? (
                                            <FavoriteIcon style={{color:"#FFCC00"}} />
                                        ) : (
                                            <FavoriteBorderIcon style={{color:"#FFCC00"}}/>
                                        )}
                                    </div>
                                </ConsultationCard>
                            )}
                            {!favorites['hospital'] && (
                                <ConsultationCard>
                                    <CardContent>
                                        <ImageWrapper>
                                            <img src={mainImage2} alt="Hospital" />
                                        </ImageWrapper>
                                        <div>
                                            <strong>서울아산병원</strong>
                                            <p>서울특별시 관악구 관악로5-8 702호</p>
                                            <p>02-2222-1234</p>
                                        </div>
                                    </CardContent>
                                    <div onClick={() => toggleFavorite('hospital')}>
                                        {!favorites['hospital'] ? (
                                            <FavoriteIcon style={{color:"#FFCC00"}}/>
                                        ) : (
                                            <FavoriteBorderIcon style={{color:"#FFCC00"}}/>
                                        )}
                                    </div>
                                </ConsultationCard>
                            )}
                        </ConsultationList>
                    </InnerContainer>
                </ConsultationListWrapper>
            </Container>
        </div>
    );
};

export default StarredPlace;
