import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import clip from '../svg/clip.svg'


const Banner = styled.div`
    background-image: url('${process.env.PUBLIC_URL}/images/mind-check-header.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 300px;

    @media (max-width: 400px){
        height: 200px;
    }

    @media (max-width: 500px){
        height: 230px;
    }
`;

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

    @media (max-width: 400px){
        min-height: 400px;
    }

    @media (max-width: 500px){
        min-height: 500px;
    }
`;

const CheckItem = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem auto;
    cursor: pointer;

    input {
        margin-right: 1rem;
    }

    label {
        font-size: 1.2rem;
    }
`;

const MindCheck = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const handleCheck = (option) => {
        setSelectedOption(option);
        navigate(`/mind-check/${option}`);
    };


    return (
        <>
            <Banner>
            </Banner>
            <Board>
                <img src={clip} alt='집게'/>
                <Paper>
                    <CheckItem onClick={() => handleCheck("stress")}>
                        <input type="checkbox" checked={selectedOption === "stress"} readOnly />
                        <label>외상 후 스트레스 증상</label>
                    </CheckItem>
                    <CheckItem onClick={() => handleCheck("depression")}>
                        <input type="checkbox" checked={selectedOption === "depression"} readOnly />
                        <label>우울 증상</label>
                    </CheckItem>
                    <CheckItem onClick={() => handleCheck("anxiety")}>
                        <input type="checkbox" checked={selectedOption === "anxiety"} readOnly />
                        <label>불안 증상</label>
                    </CheckItem>
                    <CheckItem onClick={() => handleCheck("physical")}>
                        <input type="checkbox" checked={selectedOption === "physical"} readOnly />
                        <label>신체 증상</label>
                    </CheckItem>
                    <CheckItem onClick={() => handleCheck("suicide")}>
                        <input type="checkbox" checked={selectedOption === "suicide"} readOnly />
                        <label>자살 위험성</label>
                    </CheckItem>
                </Paper>
            </Board>
        </>
    )
}

export default MindCheck