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

const MindCheck_Anxiety_Process = ({ updateScore }) => {
    const [selectedScores, setSelectedScores] = useState(Array(7).fill(0));
    const navigate = useNavigate();

    const handleScoreChange = (index, score) => {
        const newScores = [...selectedScores];
        newScores[index] = score;
        setSelectedScores(newScores);
    };

    const handleSubmit = () => {
        const totalScore = selectedScores.reduce((acc, score) => acc + score, 0);
        updateScore(totalScore);
        navigate('/mind-check/anxiety/result');
    };

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>불안증상</Title>
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
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <CheckItem key={index}>
                        <span>{index + 1}</span>
                        <label>
                            {index === 0 && "초조하거나 불안하거나 조마조마하게 느낀다"}
                            {index === 1 && "걱정하는 것을 멈추거나 조절할 수가 없다."}
                            {index === 2 && "여러가지 것들에 대해 걱정을 너무 많이 한다."}
                            {index === 3 && "편하게 있기가 어렵다."}
                            {index === 4 && "쉽게 짜증이 나거나 쉽게 성을 내게 된다."}
                            {index === 5 && "너무 안절부절못해서 가만히 있기가 힘들다."}
                            {index === 6 && "마치 끔찍한 일이 생길 것처럼 두렵게 느껴진다."}
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

export default MindCheck_Anxiety_Process;