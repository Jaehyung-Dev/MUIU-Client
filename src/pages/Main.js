import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MdGpsFixed } from "react-icons/md";
import axios from 'axios';
import graphImg from '../svg/graphImg.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../apis/memberApis';

const Content = styled.div``;

const Section = styled.div`

    padding: 20px;

    h2 {
        font-size: 1.2rem;
        display: flex;
        align-items: center;

        a {
            margin-left: auto;
            font-size: 10px;
            color: gray;
        }
    }

    .current-info-items {
        width: 100%;
        height: 90px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        justify-content: space-around;

        .current-info-item {
            width: 100%;
            height: 40px;
            display: flex;

            .current-location {
                width: 12%;
                height: 40px;
                font-weight: bold;
                font-size: 13px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 0.5rem;

                p{
                    text-align: center;
                    text-wrap: wrap;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
            }

            .current-location-info {
                width: 88%;
                height: 40px;
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;

                p{
                    text-align: left;
                    text-wrap: wrap;
                    font-size: 0.8rem;
                }
            }
        }
    }

    button.seeAll {
        font-family: 'Pretendard-Regular';
        font-size: 10px;
        color: gray;
        margin-left: auto;
        background-color: transparent;
        border: none;
    }

    .funding-items {
        width: 100%;
        height: 150px;
        display: flex;
        margin-bottom: 6vh;

        .funding-item-section {
            flex: 1;
            padding: 10px;

            .funding-item {
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
                border-radius: 10px;

                .funding-top1 {
                    width: 100%;
                    height: 60%;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-image: url(${process.env.PUBLIC_URL}/images/store-img1-1.png);
                    background-size: cover;
                    background-repeat: no-repeat;
                    color: white;
                }

                .funding-top2 {
                    width: 100%;
                    height: 60%;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-image: url(${process.env.PUBLIC_URL}/images/store-img1-2.png);
                    background-size: cover;
                    background-repeat: no-repeat;
                    color: white;
                }

                .funding-title {
                    width: 100%;
                    font-size: 15px;
                    font-weight: bold;
                    text-align: left;
                    padding: 10px;
                }

                .funding-content {
                    width: 100%;
                    height: 50px;
                    font-size: 13px;
                    font-weight: bold;
                    text-align: left;
                    padding: 10px;
                }

                .funding-bottom {
                    width: 100%;
                    height: 40%;
                    padding: 10px;
                    color: black;
                    font-size: 13px;

                    .funding-detail-content {
                        margin-top: 5px;
                        color: gray;
                    }
                }
            }
        }
    }
`;

const CarouselWrapper = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
`;

const Banner = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
    width: ${({ imageCount }) => `${imageCount * 100}%`};
`;

const ImageSlide = styled.div`
    min-width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)')};
    margin: 0 5px;
    cursor: pointer;
`;

const Blocks = styled.div`
    padding: 1.2rem;
    background-color: #F4F4F4;
    display: flex;
    justify-content: space-between;
`;

const Block = styled.div`
    border-radius: 10px;
    background-color: white;
    padding: 0.8rem;
    width: 43%;

    @media (max-width: 393px) {
        width: 40%;
    }
    
    .block-text-bold {
        font-weight: bold;
        font-size: 18px;
    }

    .block-text-small {
        font-weight: normal;
        font-size: 15px;
        color: gray;
    }

    img {
        width: 100%;
        height: auto;
        padding-top: 10px;
        align-items: center;
        justify-content: center;

        @media (max-width: 393px) {
            margin-bottom: -30px;
        }
    }

    svg {
        align-items: center;
        justify-content: center;

        @media (max-width: 393px) {
            margin-left: -50px;
            margin-bottom: 20px;
        }
    }
`;

const ModalOverlay = styled.div`
    display: flex; 
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
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
        max-width: 80%;
        max-height: 80%;
        border-radius: 10px;
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
    ${(props) => (props.$right ? 'right: 1rem;' : 'left: 1rem;')}
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

export const Main = () => {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const naverLoginChk = useSelector((state) => state.memberSlice.naverLogin);
    const location = useLocation();

    const [messages, setMessages] = useState([]);
    const [temporaryLocation] = useState('서울특별시');

    useEffect(() => {
        if (naverLoginChk) {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (naverLoginChk && token) {
                sessionStorage.setItem('ACCESS_TOKEN', token);
                dispatch(fetchUser(token));
            }
        }
    }, [dispatch, naverLoginChk, location]);

    useEffect(() => {
        axios.get(`http://localhost:9090/api/disaster-messages/category?category=${temporaryLocation}`)
            .then(response => {
                console.log(response.data);
                setMessages(response.data.slice(0, 2));
            })
            .catch(error => {
                console.error('Error fetching disaster messages:', error);
            });
    }, [temporaryLocation]);
    
    
    useEffect(() => {
        if (naverLoginChk) {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (naverLoginChk && token) {
                sessionStorage.setItem('ACCESS_TOKEN', token);
        
                // 사용자 정보를 가져오는 Redux 액션 디스패치
                dispatch(fetchUser(token));
            }
        }
    }, [dispatch, naverLoginChk]); // naverLoginChk가 true일 때만 실행

    const handleFundClick = () => navi('/fund');
    const handleDiaryClick = () => navi('/my-diary');

    // 이미지 리스트 정의
    const imageList = {
        sleepless_night: Array.from({ length: 10 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/sleepless_night(${i}).png`),
        ptsd: Array.from({ length: 8 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/ptsd(${i}).png`),
        panic_disorder: Array.from({ length: 10 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/panic_disorder(${i}).png`),
        social_psychology: Array.from({ length: 9 }, (_, i) => `${process.env.PUBLIC_URL}/MC_images/social_psychology(${i}).png`)
    };

    const imageKeys = Object.keys(imageList);
    const [randomImageKey, setRandomImageKey] = useState(imageKeys[0]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 무작위 이미지 리스트 키 설정
    useEffect(() => {
        const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
        setRandomImageKey(randomKey);
    }, []);

    const closeModal = () => setModalOpen(false);
    const showNextImage = () => setCurrentImageIndex((currentImageIndex + 1) % imageList[randomImageKey].length);
    const showPrevImage = () => setCurrentImageIndex((currentImageIndex - 1 + imageList[randomImageKey].length) % imageList[randomImageKey].length);

    const carouselImages = [
        `${process.env.PUBLIC_URL}/images/test-img1.png`,
        `${process.env.PUBLIC_URL}/images/test-img2.png`,
        `${process.env.PUBLIC_URL}/images/test-img3.png`,
    ];

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlideIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <Content>
            <CarouselWrapper>
            <Banner imageCount={carouselImages.length} currentIndex={activeSlideIndex}>
                {carouselImages.map((image, index) => (
                    <ImageSlide key={index}>
                        <SlideImage src={image} alt={`slide-${index}`} />
                    </ImageSlide>
                ))}
            </Banner>
            <DotsWrapper>
                {carouselImages.map((_, index) => (
                    <Dot
                        key={index}
                        active={activeSlideIndex === index}
                        onClick={() => setActiveSlideIndex(index)}
                    />
                ))}
            </DotsWrapper>
        </CarouselWrapper>
        <Section>
                    <h2>{temporaryLocation}&nbsp;&nbsp;
                        <MdGpsFixed size="1.2rem" />
                    </h2>
                    <div className="current-info-items">
                        {messages.map((message, index) => (
                            <div className="current-info-item" key={index}>
                                <div className="current-location">
                                    <p>{`${message.alertLevel}`}</p>
                                </div>
                                <div className="current-location-info">
                                    <p>{`${message.occurrenceTime} - ${message.messageContent}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            </Content>
            <Blocks>
                <Block onClick={handleDiaryClick}>
                    <div className="block-text-bold">안녕하세요.<br /> 서준님,</div>
                    <div className="block-text-small">오늘의 하루는<br />어떠셨나요?</div>
                    <img src={graphImg} alt="graphImg" style={{ marginBottom: "-5%" }} />
                </Block>
                <Block onClick={() => setModalOpen(true)}>
                    <div className="block-text-small"
                        style={{ textAlign: 'right', cursor: 'pointer' }}
                        onClick={() => navi('/mind-column')}>
                        마음컬럼 전체보기
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/MC_images/${randomImageKey}(0).png`} alt="mind-column" />
                </Block>
            </Blocks>

            {/* 마음컬럼 모달 창 */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={closeModal}>
                            <ClearIcon fontSize="large" />
                        </CloseButton>
                        <img src={imageList[randomImageKey][currentImageIndex]} alt="모달 이미지" />
                        {currentImageIndex > 0 && (
                            <NavButton onClick={showPrevImage}>
                                <NavigateBeforeIcon fontSize="large" />
                            </NavButton>
                        )}
                        {currentImageIndex < imageList[randomImageKey].length - 1 && (
                            <NavButton $right onClick={showNextImage}>
                                <NavigateNextIcon fontSize="large" />
                            </NavButton>
                        )}
                        <PageNumber>{`${currentImageIndex + 1} / ${imageList[randomImageKey].length}`}</PageNumber>
                    </ModalContent>
                </ModalOverlay>
            )}

            <Content>
                <Section>
                    <h2>마음나누기
                        <button className="seeAll" onClick={handleFundClick}>전체보기</button>
                    </h2>
                    <div className="funding-items">
                        <div className="funding-item-section">
                            <div className="funding-item">
                                <div className="funding-top1">
                                    <div className="funding-title">호우피해<br />긴급모금</div>
                                    <div className="funding-content">폭우로 삶의 터전을 잃은<br />이웃들에게 힘이 되어주세요.</div>
                                </div>
                                <div className="funding-bottom">
                                    호우피해긴급모금
                                    <div className="funding-detail-content">2024.7.16 ~ 2024.8.16</div>
                                </div>
                            </div>
                        </div>
                        <div className="funding-item-section">
                            <div className="funding-item">
                                <div className="funding-top2">
                                    <div className="funding-title">산불피해<br />긴급모금</div>
                                    <div className="funding-content">삶의 터전을 잃어버린<br />피해 주민들을 위해<br />함께 힘을 모아주세요.</div>
                                </div>
                                <div className="funding-bottom">
                                    산불피해긴급모금
                                    <div className="funding-detail-content">2024.7.16 ~ 2024.8.16</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Section>
            </Content>
        </>
    );
};

export default Main;
