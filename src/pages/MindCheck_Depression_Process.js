import React, { useState } from 'react';
import styled from 'styled-components';
import clip from '../svg/clip.svg';
import { useNavigate } from 'react-router-dom';

const Board = styled.div`
    background-color: #D6DAE6;
    width: 85%; 
    min-height: 600px;
    margin: 3rem auto;
    position: relative;

    @media (max-width: 400px){
        min-height: 400px;
    }

    @media (max-width: 500px){
        min-height: 500px;
    }

    img {
        width: 30%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Paper = styled.div`
    background-color: white;
    width: 85%; 
    min-height: 600px;
    margin: 1.5rem auto 2rem;
    padding: 3rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 400px){
        min-height: 400px;
    }

    @media (max-width: 500px){
        min-height: 500px;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
`;

const PageDetail = styled.div`
    display: flex;
    justify-content: center;
    background-color: #FFEBAC;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const ItemLine = styled.div`
    width: 100%;
    height: 3px;
    background-color: #000000;
    border-radius: 15px;
`;

const Warning1 = styled.p`
    color: #394FBC;
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    align-items: center;
`;

const Warning2 = styled.p`
    color: #394FBC;
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    align-items: center;
`;

const CheckItem = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 1rem auto;
    cursor: pointer;

    span {
        font-size: 1.25rem;
        margin-right: 1rem;
    }

    label {
        width: 250%;
        font-size: 0.85rem;
        margin-right: 1rem;
    }

    input[type="radio"] {
        margin-left: auto;
    }
`;

const OkBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 5px;
    height: 25px;
    background-color: #FFCD5E;
    color: #FFFFFF;
    font-weight: bold;
    padding: 5px;
    width: 80px;
    margin: 1rem auto 0;
`;

const MindCheck_Depression_Process = ({ updateScore }) => {
    const [selectedScores, setSelectedScores] = useState(Array(9).fill(0));
    const navigate = useNavigate();

    const handleScoreChange = (index, score) => {
        const newScores = [...selectedScores];
        newScores[index] = score;
        setSelectedScores(newScores);
    };

    const handleSubmit = () => {
        const totalScore = selectedScores.reduce((acc, score) => acc + score, 0);
        updateScore(totalScore);
        navigate('/mind-check/depression/result');
    };

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>우울증상</Title>
                <PageDetail>
                    지난 2주일 동안 당신은 다음의 문제들로 인해서<br />
                    얼마나 자주 방해를 받았습니까?
                </PageDetail>
                <ItemLine />
                <Warning1>
                    각 문항은 좌측에서 우측으로 0~3점이 배점됩니다.
                </Warning1>
                <Warning2>
                    0 -전혀 방해 받지 않음 /
                    1 - 며칠 /<br />
                    2 - 7일 이상 /
                    3 - 거의 매일
                </Warning2>
                <ItemLine />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <CheckItem key={index}>
                        <span>{index + 1}</span>
                        <label>
                            {index === 0 && "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함"}
                            {index === 1 && "기분이 가라않거나 우울하거나 희망이 없음"}
                            {index === 2 && "잠이 들거나 계속 잠을 자는 것이 어려움. 또는 잠을 너무 많이 잠"}
                            {index === 3 && "피곤하다고 느끼거나 기운이 거의 없음"}
                            {index === 4 && "입맛이 없거나 과식을 함"}
                            {index === 5 && "자신을 부정적으로 봄. 혹은 자신이 실패자라고 느낌"}
                            {index === 6 && "신문을 읽거나 tv를 보는 것과 같은 일에 집중하는 것이 어려움"}
                            {index === 7 && "다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함.또는 반대로 평상시보다 많이 움직여서, 너무 안절부절 못하거나 들떠있음"}
                            {index === 8 && "자신이 죽는 것이 더 낫다고생각하거나 어떤 식으로든 자신을 해칠것이라고 생각함."}
                        </label>
                        {[0, 1, 2, 3].map((score) => (
                            <CheckItem key={score}>
                                <label key={score}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        checked={selectedScores[index] === score}
                                        onChange={() => handleScoreChange(index, score)}
                                    />
                                </label>
                            </CheckItem>
                        ))}
                    </CheckItem>
                ))}
                <ItemLine />
                <OkBtn onClick={handleSubmit}>설문 완료</OkBtn>
            </Paper>
        </Board>
    );
}

export default MindCheck_Depression_Process;