import React from 'react';
import styled from 'styled-components';
import { MdGpsFixed } from "react-icons/md";

const Content = styled.div`
    // margin-top: 62px;
`;

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

    .bookmark-group {
        display: flex;
        justify-content: space-between;

        .bookmark {
            box-sizing: border-box;
            background-color: #FFF5CF;
            border-radius: 10px;
            width: 31%;
            height: 110px;
            display: flex;
            flex-direction: column;
            padding: 4% 4% 3%;
            position: relative;

            .bookmark-img {
                width: 100%;
                height: 25px;
                position: absolute;
                top: -3%;
                right: -75%
            }
            
            .bookmark-title {
                font-size: 15px;
                color: #F90;
                font-weight: bold;
                text-align: left;
            }

            .bookmark-content {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: left;
                align-items: center;
                padding-top: 20px;

                p {
                    font-size: 13px;
                    color: #F90;
                    font-weight: normal;
                    text-align: left;
                }
            }
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
                font-size: 13px;
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

    button {
        font-family: 'Pretendard-Regular';
        color: gray;
        outline: none;
        border: none;
        border-radius: 10px;
        width: 80px;
        height: 20px;
        font-weight: bold;

        .checked {
            background-color: #FFCC00;
            color: black;
        }
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
                    background-image: url('/images/Main/backgroundImg1.svg');
                    background-size: cover;
                    background-repeat: no-repeat;
                    color: white;
                }

                .funding-top2 {
                    width: 100%;
                    height: 60%;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-image: url('/images/Main/backgroundImg2.svg');
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
                    font-size: 10px;

                    .funding-detail-content {
                        margin-top: 5px;
                        color: gray;
                    }
                }
            }
        }
    }
`;

const Banner = styled.div`
    padding: 20px;
    width: 90%;
    height: 100px;
    background-image: url('/images/Main/test-img.svg');
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    border-radius: 10px;
    margin: 0 auto;
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
    // margin: 5px
    padding: 0.8rem;
    width: 43%;
    
    .block-text-bold {
        font-weight: bold;
    }

    .block-text-small {
        font-weight: normal;
        font-size: 10px;
        color: gray;
    }

    img {
        width: 100%;
        height: 125px;
        padding-top: 10px;
    }
`;

export const Main = () => {
    return (
        <>
            <Content>
                <Section>
                    <h2>상담 전 내 마음 알아보기</h2>
                    <div className="bookmark-group">
                        <div className="bookmark">
                            <div className="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div className="bookmark-title">상담접수지</div>
                            <div className="bookmark-content">
                                <p>내 상황<br/>전달하기</p>
                            </div>
                        </div>

                        <div className="bookmark">
                            <div className="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div className="bookmark-title">상담접수지</div>
                            <div className="bookmark-content">
                                <p>내 상황<br/>전달하기</p>
                            </div>
                        </div>

                        <div className="bookmark">
                            <div className="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div className="bookmark-title">상담접수지</div>
                            <div className="bookmark-content">
                                <p>내 상황<br/>전달하기</p>
                            </div>
                        </div>  
                    </div>
                </Section>
                <Banner/>
                <Section>
                    <h2>서울시 관악구&nbsp;&nbsp;
                        <MdGpsFixed size="1.2rem"/>
                    </h2>
                    <div className="current-info-items">
                        <div className="current-info-item">
                            <div className="current-location">
                                <p>봉천동</p>
                            </div>
                            <div className="current-location-info">
                                <p>관악로 21-1 도로공사로 인해 교통체증이 예상됩니다. 교통사고에 유의하세요.</p>
                            </div>
                        </div>

                        <div className="current-info-item">
                            <div className="current-location">
                                <p>봉천동</p>
                            </div>
                            <div className="current-location-info">
                                <p>관악로 21-1 도로공사로 인해 교통체증이 예상됩니다. 교통사고에 유의하세요.</p>
                            </div>
                        </div>
                    </div>
                </Section>
            </Content>
            <Blocks>
                <Block>
                    <div className="block-text-bold">안녕하세요. 서준님,</div>
                    <div className="block-text-small">오늘의 하루는<br/>어떠셨나요?</div>
                    <img src="/images/Main/graphImg.svg" alt="graphImg"/>
                </Block>
                <Block>
                    <div className="block-text-small" style={{textAlign: 'right'}}>평생 써먹는<br/>자존감 높이는법</div>
                    <div className="block-text-bold" style={{textAlign: 'right'}}>정다은 상담사</div>
                    <img src="/images/Main/counsel-ex.svg" alt="counsel-ex"/>
                </Block>
            </Blocks>
            <Content>
                <Section>
                    <h2>재난 안전 크라우드 펀딩
                        <a className="seeAll" href="#">전체보기</a> {/** 추후 navi나 Nav로 바꿀 예정 */}
                    </h2>
                    
                    <div className="btn-group">
                        <button className="checked">재난기부금</button>
                        <button>재난용품</button>
                    </div>

                    <div className="funding-items">

                        <div className="funding-item-section">
                            <div className="funding-item">
                                <div className="funding-top1">
                                    <div className="funding-title">호우피해<br/>긴급모금</div>
                                    <div className="funding-content">폭우로 삶의 터전을 잃은<br/>이웃들에게 힘이 되어주세요.</div>
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
                                    <div className="funding-title">산불피해<br/>긴급모금</div>
                                    <div className="funding-content">삶의 터전을 잃어버린<br/>피해 주민들을 위해<br/>함께 힘을 모아주세요.</div>
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