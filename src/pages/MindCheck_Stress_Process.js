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

    input {
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

const MindCheck_Stress_Process = ({ updateScore }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const handleCheckboxChange = (option) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.includes(option) 
                ? prev.filter((item) => item !== option)
                : [...prev, option]; 

            return newSelectedOptions;
        });
    };

    const handleSubmit = () => {
        const score = selectedOptions.length; 
        updateScore(score);
        navigate('/mind-check/stress/result');
    };


    return (
        <>
            <Board>
                <img src={clip} alt='집게'/>
                <Paper>
                    <Title>외상 후 스트레스 증상</Title>
                    <PageDetail>
                        살면서 두려웠던 경험, 힘들었던 경험,<br />
                        그 어떤 것이라도 있다면 그것 때문에<br />
                        지난 한 달 동안 다음을 경험한 적이 있습니까?
                    </PageDetail>
                    <ItemLine />
                    {[1, 2, 3, 4, 5].map((num) => (
                        <CheckItem key={num} onClick={() => handleCheckboxChange(num.toString())}>
                            <span>{num}</span>
                            <label>
                                {num === 1 && "그 경험에 관한 악몽을 꾸거나, 생각하고 싶지 않은데도 그 경험이 떠오른 적이 있었다."}
                                {num === 2 && "그 경험에 생각하지 않으려고 애쓰거나, 그 경험을 떠오르게 하는 상황을 피하기 위해 특별히 노력하였다."}
                                {num === 3 && "늘 주변을 살피고 경계하거나, 쉽게 놀라게 되었다."}
                                {num === 4 && "다른 사람, 일상활동, 또는 주변 상황에 대해 가졌던 느낌이 없어지거나, 그것에 대해 멀어진 느낌이 들었다."}
                                {num === 5 && "그 사건이나 그 사건으로 인해 생긴 문제에 대해 죄책감을 느끼거나, 자기자신이나 다른 사람에 대한 원망을 멈출 수가 없다."}
                            </label>
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(num.toString())}
                                readOnly
                            />
                        </CheckItem>
                    ))}
                    <ItemLine />
                    <OkBtn onClick={handleSubmit}>설문 완료</OkBtn>
                </Paper>
            </Board>
        </>
    );
}

export default MindCheck_Stress_Process;