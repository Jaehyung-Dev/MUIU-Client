import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 동적으로 애니메이션 설정하기
const animateHeight = (height) => keyframes`
  0% {
    height: 0;
  }
  100% {
    height: ${height};
  }
`;

const EmotionDivCover = styled.div`
    width: 100%;
    min-height: 90vh;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
`;

const SelectDiv = styled.div`
    margin-top: 0.5rem;
    width: 40%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E4E4E4;
    border-radius: 5px;
    @media screen and (max-width: 600px) {
        width: 50%;
    }
`;

const SelectPeriod = styled.button`
    width: 6vw;
    height: 90%;
    border-radius: 5px;
    background-color: ${(props) => (props.clicked ? 'white' : '#E4E4E4')};
    transition: background-color 0.2s ease;
    margin: 0.1rem;
    border: none;
    p {
        margin: 0;
        color: black;
        font-size: 0.9rem;
    }

    @media screen and (max-width: 600px) {
        width: 15vw;
    }
`;

const GraphDiv = styled.div`
    width: 85%;
    height: 90vh;
    background-color: white;
    border-radius: 20px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 600px) {
        height: 78vh;
    }
`;

const GraphContent = styled.p`
    margin: 2rem 0 0 0;
    font-weight: bold;
    font-size: 1.1rem;
    @media screen and (max-width: 600px) {
        font-size: 0.9rem;
    }
`;

const CoverFeelDiv = styled.div`
    width: 80%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    @media screen and (max-width: 600px) {
        height: 4rem;
    }
`;

const FeelDiv = styled.div`
    display: flex;
    align-items: center;
    p {
        font-weight: bold;
        font-size: 1.1rem;
        @media screen and (max-width: 600px) {
            font-size: 0.9rem;
        }
    }
`;

const FeelTop = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FeelBottom = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const RoundDiv = styled.div`
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${({ color }) => color};
    @media screen and (max-width: 600px) {
        margin-right: 0.3rem;
    }
`;

const InnerGraphDiv = styled.div`
    width: 100%;
    height: 70vh;
    margin-top: 1rem;
`;

const CoverProgress = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    @media screen and (max-width: 600px) {
        height: 45vh;
    }
`;

const GraphRowDiv = styled.div`
    width: 10%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
        color: gray;
        margin: 0.1rem 0 0.1rem 1rem;
    }
    @media screen and (max-width: 600px) {
        height: auto;
        p {
            font-size: 0.8rem;
        }
    }
`;

const GraphMainDiv = styled.div`
    width: 80%;
    height: auto;
    margin-left: 0.5rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
`;

const CoverColumnDiv = styled.div`
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GraphColumnDiv = styled.div`
    width: 80%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 1rem;
    color: gray;
`;

const GraphOutline = styled.div`
    width: 8%;
    height: 93%;
    border-radius: 20px;
    background-color: rgba(128, 128, 128, 0.1);
    display: flex;
    align-items: end;
    margin: 0 1rem;
    @media screen and (max-width: 600px) {
        margin: 0 0.5rem;
        height: 90%;
    }
`;

const GraphInner = styled.div`
    width: 100%;
    border-radius: 20px;
    height: ${(props) => props.height || '1%'};
    background-color: ${(props) => props.color || 'none'};
    animation: ${animateHeight} 1s ease-in-out forwards; /* 1초 애니메이션 */
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.3);
`;

const EmotionGraph = () => {
    const [clickedIndex, setClickedIndex] = useState(0);
    const handleClick = (index) => setClickedIndex(index);
    const [isLoaded, setIsLoaded] = useState(false); // 그래프가 로드되었는지 확인

    const periodText = ['주간', '월간', '연간'];
    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

    const graphData = [
        { height: '50%', color: '#FF3B30' },
        { height: '70%', color: '#00C7BE' },
        { height: '30%', color: '#FFCC00' },
        { height: '90%', color: '#34C759' },
        { height: '60%', color: '#34C759' },
        { height: '40%', color: '#00C7BE' },
        { height: '80%', color: '#FF3B30' }
    ];

    // 컴포넌트가 마운트된 후 애니메이션 트리거
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <EmotionDivCover>
            <SelectDiv>
                {periodText.map((text, index) => (
                    <SelectPeriod
                        key={index}
                        clicked={clickedIndex === index}
                        onClick={() => handleClick(index)}
                    >
                        <p>{text}</p>
                    </SelectPeriod>
                ))}
            </SelectDiv>
            <GraphDiv>
                <GraphContent>이번주, 나의 기분을 확인해봐요</GraphContent>
                <p style={{ marginTop: '.5rem', fontSize: '0.7rem' }}>
                    지난 주의 기분과 비교해봐요
                </p>
                <CoverFeelDiv>
                    <FeelTop>
                        <FeelDiv>
                            <RoundDiv color="#FF3B30" />
                            <p>화가나요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color="#FF9500" />
                            <p>우울해요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color="#FFCC00" />
                            <p>보통이예요</p>
                        </FeelDiv>
                    </FeelTop>
                    <FeelBottom>
                        <FeelDiv>
                            <RoundDiv color="#34C759" />
                            <p>기분이좋아요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color="#00C7BE" />
                            <p>최고에요</p>
                        </FeelDiv>
                    </FeelBottom>
                </CoverFeelDiv>
                <InnerGraphDiv>
                    <CoverProgress>
                        <GraphRowDiv>
                            {Array.from({ length: 9 }, (_, i) => (
                                <p key={i}>{(8 - i) * 10}</p>
                            ))}
                        </GraphRowDiv>
                        <GraphMainDiv>
                            {graphData.map((data, index) => (
                                <GraphOutline key={index}>
                                    {/* isLoaded가 true일 때만 애니메이션 적용 */}
                                    <GraphInner height={isLoaded ? data.height : '0%'} color={data.color} />
                                </GraphOutline>
                            ))}
                        </GraphMainDiv>
                    </CoverProgress>
                    <CoverColumnDiv>
                        <GraphColumnDiv>
                            {daysOfWeek.map((day, index) => (
                                <p key={index}>{day}</p>
                            ))}
                        </GraphColumnDiv>
                    </CoverColumnDiv>
                </InnerGraphDiv>
            </GraphDiv>
        </EmotionDivCover>
    );
};

export default EmotionGraph;
