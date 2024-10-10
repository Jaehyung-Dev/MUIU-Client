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

const MindCheck_Suicide_Process = ({ updateScore }) => {
    const [selectedScores, setSelectedScores] = useState(Array(4).fill(0));
    const navigate = useNavigate();

    const handleScoreChange = (index, score) => {
        const newScores = [...selectedScores];
        newScores[index] = score;
        setSelectedScores(newScores);
    };

    const handleSubmit = () => {
        const totalScore = selectedScores.reduce((acc, score) => acc + score, 0);
        updateScore(totalScore);

        const isNormal = selectedScores[1] === 0;
        const isCaution = (selectedScores[0] === 1 || selectedScores[1] === 1) && (selectedScores[2] === 0 && selectedScores[3] === 0);
        const isSevere = (selectedScores[2] === 10 || selectedScores[2] === 20) || selectedScores[3] === 0;
        
        let status = null;
        if (isNormal) {
            status = 'Normal';
        } else if (isCaution) {
            status = 'Caution';
        } else if (isSevere) {
            status = 'Severe';
        }
    
        // status를 부모 컴포넌트로 전달하는 함수 호출
        updateScore(totalScore, status);    
        navigate('/mind-check/suicide/result'); 
    };

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>자살위험성</Title>
                <PageDetail>
                    당신 자신을 정말 해치겠다는 생각을<br />
                    했던 적이 있습니까?
                </PageDetail>
                <ItemLine />
                <Warning1>
                    위 질문에 “예”라고 답하신 분만 아래의 문항에 답변하세요.
                    아니라면  답변하지 않으셔도 됩니다.
                </Warning1>
                <ItemLine />
                {[0, 1, 2, 3].map((index) => (
                    <CheckItem key={index}>
                        <span>{index + 1}</span>
                        <label>
                            {index === 0 && "이전에 당신을 위험에 빠뜨리는 행동을 한 적이 있습니까?"}
                            {index === 1 && "당신 자신을 해칠 방법에 대해 지금도 생각을 하고 있습니까?"}
                            {index === 2 && "생각하는 것과 생각을 행동에 옮기는 것은 큰 차이가 있습니다. 앞으로 한 달 내에는 어느 때라도 당신 자신을 해치거나 당신의 삶을 끝내겠다는 그 생각을 행동으로 옮길 것 같습니까?"}
                            {index === 3 && "입맛이 없거나 과식을 하는 경향이 심해지셨습니까?"}
                        </label>
                        
                        {index === 2 ? (
                            [0, 10, 20].map((score) => (
                                <CheckItem key={score}>
                                    <label style={{fontSize: '0.55rem', textAlign: 'center'}}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            checked={selectedScores[index] === score}
                                            onChange={() => handleScoreChange(index, score)}
                                        />
                                        {score === 0 ? <><br />전혀<br />아니다</> : score === 10 ? <><br />다소<br />그렇다</> : <><br />매우<br />그렇다</>}
                                    </label>
                                </CheckItem>
                            ))
                        ) : (
                            [1, 0].map((score) => (
                                <CheckItem key={score}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            checked={selectedScores[index] === score}
                                            onChange={() => handleScoreChange(index, score)}
                                        />
                                        {score === 1 ? "있다" : "없다"}
                                    </label>
                                </CheckItem>
                            ))
                        )}
                    </CheckItem>
                ))}
                <ItemLine />
                <OkBtn onClick={handleSubmit}>설문 완료</OkBtn>
            </Paper>
        </Board>
    );
}

export default MindCheck_Suicide_Process;