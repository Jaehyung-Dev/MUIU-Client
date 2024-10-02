import React, { useState } from 'react';
import styled from 'styled-components';

const EmotionDivCover = styled.div`
    margin-top: 3rem;
    width: 100%;
    min-height: 90vh;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SelectDiv = styled.div`
    margin-top: 2rem;
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
`
const SelectPeriod = styled.button`
    width: 6vw;
    height: 90%;
    border-radius: 5px;
    background-color: ${(props) => (props.clicked ? 'white' : '#E4E4E4')};
    margin: 0.1rem;

    p {
        margin: 0;
        color: black;
        font-size: 0.9rem;
    }

    @media screen and (max-width: 600px) {
        width: 15vw;
    }
`

const GraphDiv = styled.div`
    width: 85%;
    height: 90vh;
    background-color: white;
    border-radius: 20px;
    margin-top: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CoverFeelDiv = styled.div`
    width: 80%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FeelDiv = styled.div`
    display: flex;
    align-items: center; 
`

const FeelTop = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;    
`
const FeelBottom = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;  
`
const RoundDiv = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${({ color }) => {
    switch(color) {
      case 'red':
        return '#FF3B30';
      case 'orange':
        return '#FF9500';
      case 'yellow':
        return '#FFCC00';
      case 'green':
        return '#34C759';
      case 'blue':
        return '#00C7BE';
    }
    }};
`

const InnerGraphDiv = styled.div`
    width: 100%;
    height: 70vh;
    margin-top: 2rem;
`
const GraphRowDiv = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
        color: gray;
    }
`


const EmotionGraph = () => {
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const periodText = ['주간', '월간', '연간'];

    return (
        <>
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
                <p style={{
                    marginTop: '2rem', fontWeight: 'bold', fontSize: '1.3rem'
                }}>이번주, 나의 기분을 확인해봐요</p>
                <p style={{
                    marginTop: '.5rem', marginBottom: '2rem', fontSize: '0.9rem'
                }}>지난 주의 기분과 비교해봐요</p>
                <CoverFeelDiv>
                    <FeelTop>
                        <FeelDiv>
                            <RoundDiv color='red'/>
                            <p>화가나요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color='orange'/>
                            <p>우울해요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color='yellow'/>
                            <p>보통이예요</p>
                        </FeelDiv>
                    </FeelTop>
                    <FeelBottom>
                        <FeelDiv>
                            <RoundDiv color='green'/>
                            <p>기분이좋아요</p>
                        </FeelDiv>
                        <FeelDiv>
                            <RoundDiv color='blue'/>
                            <p>최고에요</p>
                        </FeelDiv>
                    </FeelBottom>
                </CoverFeelDiv>
                <InnerGraphDiv>
                    <GraphRowDiv>
                        <p>80</p>
                        <p>70</p>
                        <p>60</p>
                        <p>50</p>
                        <p>40</p>
                        <p>30</p>
                        <p>20</p>
                        <p>10</p>
                        <p>0</p>
                    </GraphRowDiv>
                </InnerGraphDiv>
            </GraphDiv>
          </EmotionDivCover>
        </>
      );
    };

export default EmotionGraph;