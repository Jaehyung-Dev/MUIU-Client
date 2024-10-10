import React from 'react';
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
`;

const Subtitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
`;

const UserScore = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 1.15rem;
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
    align-items: center;
    margin: 1rem auto;
    cursor: pointer;

    label {
        width: 250%;
        font-size: 0.85rem;
        margin-left: auto;
    }

    input {
        margin-right: 1rem;
    }
`;

const Criteria = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    font-size: 1rem;
    margin-right: 1rem;

    span {
        padding: 0 auto;
        color: #796464;
        font-size: 0.65rem;
    }
`;

const Warning = styled.p`
    color: #394FBC;
    font-size: 0.6rem;
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    align-items: center;
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
    width: 160px;
    margin: 1rem auto 0;
`;

const MindCheck_Stress_Result = ({ score }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/mind-check');
    };

    // 점수에 따른 체크 상태 결정
    const isNormalChecked = score >= 0 && score <= 1;
    const isCautionChecked = score >= 2 && score <= 3;
    const isSevereChecked = score >= 4 && score <= 5;

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>외상 후 스트레스 증상</Title>
                <Subtitle>검사결과</Subtitle>
                <UserScore>총 {score}점</UserScore>
                <ItemLine />
                <CheckItem>
                    <input type="checkbox" checked={isNormalChecked} readOnly />
                    <Criteria>정상<span>0~1점</span></Criteria>
                    <label>일상생활 적응에 지장을 초래할만한 외상 사건 경험이나 이와 관련된 인지적, 정서적, 행동문제를 거의 보고하지 않았습니다.</label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isCautionChecked} readOnly />
                    <Criteria>주의<br />요망<span>2~3점</span></Criteria>
                    <label>외상 사건과 관련된 반응으로 불편감을 호소하고 있습니다. 평소보다 일상생활에 적응하는데 어려움을 느끼신다면 추가적인 평가나 정신건강 전문가의 도움을 받아보시기를 권해 드립니다.</label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isSevereChecked} readOnly />
                    <Criteria>심한<br />수준<span>4~5점</span></Criteria>
                    <label>외상 사건과 관련된 반응으로 심한 불편감을 호소하고 있습니다. 평소보다 일상생활에 적응하는데 어려움을 느낄 수 있습니다. 추가적인 평가나 정신건강 전문가의 도움을 받아보시기를 권해드립니다.</label>
                </CheckItem>
                <Warning>‣ 결과는 자기보고 형식으로 측정되며, 정신과적 진단을 의미하는 것은 아닙니다.</Warning>
                <ItemLine />
                <OkBtn onClick={handleSubmit}>다른 자가진단 하러가기</OkBtn>
            </Paper>
        </Board>
    );
}

export default MindCheck_Stress_Result;