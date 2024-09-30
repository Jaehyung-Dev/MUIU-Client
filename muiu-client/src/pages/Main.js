import React from 'react';
import styled from 'styled-components';
import { MdGpsFixed } from "react-icons/md";

const Content = styled.div`
    margin-top: 62px;
    margin-bttom: 100px;
`;

const Section = styled.div`

    padding: 20px;

    h2 {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
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
    padding: 20px;
    background-color: #F4F4F4;
    display: flex;
`;

const Block = styled.div`
    border-radius: 10px;
    background-color: white;
    // margin: 5px
    padding: 10px;
    
    .block-text-bold {
        font-weight: bold;
    }

    .block-text-small {
        font-weight: normal;
        font-size: 10px;
        color: gray;
    }
`;

export const Main = () => {
    return (
        <>
            <Content>
                <Section>
                    <h2>상담 전 내 마음 알아보기</h2>
                    <div class="bookmark-group">
                        <div class="bookmark">
                            <div class="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div class="bookmark-title">상담접수지</div>
                            <div class="bookmark-content">
                                <p>내 상황<br/>전달하기</p>
                            </div>
                        </div>

                        <div class="bookmark">
                            <div class="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div class="bookmark-title">상담접수지</div>
                            <div class="bookmark-content">
                                <p>내 상황<br/>전달하기</p>
                            </div>
                        </div>

                        <div class="bookmark">
                            <div class="bookmark-img">
                                <img src="/images/Main/bookmark.svg" alt="bookmark"/>
                            </div>
                            <div class="bookmark-title">상담접수지</div>
                            <div class="bookmark-content">
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
                    <div class="current-info-items">
                        <div class="current-info-item">
                            <div class="current-location">
                                <p>봉천동</p>
                            </div>
                            <div class="current-location-info">
                                <p>관악로 21-1 도로공사로 인해 교통체증이 예상됩니다. 교통사고에 유의하세요.</p>
                            </div>
                        </div>

                        <div class="current-info-item">
                            <div class="current-location">
                                <p>봉천동</p>
                            </div>
                            <div class="current-location-info">
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
        </>
    );
};

export default Main;