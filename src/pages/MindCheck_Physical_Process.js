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

const MindCheck_Physical_Process = ({ updateScore }) => {
    const [selectedScores, setSelectedScores] = useState(Array(15).fill(0));
    const navigate = useNavigate();

    const handleScoreChange = (index, score) => {
        const newScores = [...selectedScores];
        newScores[index] = score;
        setSelectedScores(newScores);
    };

    const handleSubmit = () => {
        const totalScore = selectedScores.reduce((acc, score) => acc + score, 0);
        updateScore(totalScore);
        navigate('/mind-check/physical/result');
    };

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>신체증상</Title>
                <PageDetail>
                    지난 4주동안, 다음 나열되는 증상들에<br />
                    얼마나 자주 시달렸습니까?
                </PageDetail>
                <ItemLine />
                <Warning1>
                    각 문항은 좌측에서 우측으로 0~2점이 배점됩니다.
                </Warning1>
                <Warning2>
                    0 -전혀 시달리지 않음 /
                    1 - 약간 시달림 /
                    2 - 대단히 시달림
                </Warning2>
                <ItemLine />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((index) => (
                    <CheckItem key={index}>
                        <span>{index + 1}</span>
                        <label>
                            {index === 0 && "위통"}
                            {index === 1 && "허리통증"}
                            {index === 2 && "팔,다리,관절 (무릎,고관절 등)의 통증"}
                            {index === 3 && "생리기간 동안 생리통 등의 문제 (여성만 해당)"}
                            {index === 4 && "두통"}
                            {index === 5 && "가슴, 흉통"}
                            {index === 6 && "어지러움"}
                            {index === 7 && "기절할 것 같음"}
                            {index === 8 && "심장이 빨리 뜀"}
                            {index === 9 && "숨이 참"}
                            {index === 10 && "성교 중 통증 등의 문제"}
                            {index === 11 && "변비, 묽은 변이나 설사"}
                            {index === 12 && "매슥거림, 방귀, 소화불량"}
                            {index === 13 && "피로감, 기운없음"}
                            {index === 14 && "수면의 어려움"}
                        </label>
                        {[0, 1, 2].map((score) => (
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

export default MindCheck_Physical_Process;