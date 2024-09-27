import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    margin-top: 62px;
    margin-bttom: 100px;
`;

const Section = styled.div`

    padding: 20px;

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

export const Main = () => {
    return (
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
            <Banner>
                {/* <img src='/images/Main/test-img.svg' alt="광고"/> */}
            </Banner>
        </Content>
    );
};

export default Main;