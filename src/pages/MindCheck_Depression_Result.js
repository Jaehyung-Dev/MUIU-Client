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
    text-align: center;

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

const MindCheck_Depression_Result = ({ score }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/mind-check');
    };

    // 점수에 따른 체크 상태 결정
    const isNormalChecked = score >= 0 && score <= 4;
    const isLittleCautionChecked = score >=5 && score <= 9;
    const isCautionChecked = score >= 10 && score <= 14;
    const isLittleSevereChecked = score >=15 && score <= 19;
    const isSevereChecked = score >= 20 && score <= 27;

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>우울증상</Title>
                <Subtitle>검사결과</Subtitle>
                <UserScore>총 {score}점</UserScore>
                <ItemLine />
                <CheckItem>
                    <input type="checkbox" checked={isNormalChecked} readOnly />
                    <Criteria>정상<span>0~4점</span></Criteria>
                    <label>적응상의 지장을 초래할만한 우울 관련 증상을 거의 보고하지 않았습니다.</label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isLittleCautionChecked} readOnly />
                    <Criteria>경미한<br />수준<span>5~9점</span></Criteria>
                    <label>경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다.</label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isCautionChecked} readOnly />
                    <Criteria>중간<br />수준<span>10~14점</span></Criteria>
                    <label>
                        중간수준의 우울감을 비교적 자주 경험하는 것으로 보고하였습니다.<br />
                        직업적.사회적 적응에 일부 영향을 미칠 수 있어 주의 깊은 관찰과 관심이 필요합니다.
                    </label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isLittleSevereChecked} readOnly />
                    <Criteria>약간 심한<br />수준<span>15~19점</span></Criteria>
                    <label>
                        약간 심한 수준의 우울감을 자주 경험하는 것으로 보고하였습니다.<br />
                        직업적, 사회적 적응에 일부 영향을 미칠 경우. 정신건강 전문가의 도움을 받아 보시기를 권해 드립니다.
                    </label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isSevereChecked} readOnly />
                    <Criteria>심한<br />수준<span>20~27점</span></Criteria>
                    <label> 광범위한 우울 증상을 매우 자주, 심한 수준에서 경험하는 것으로 보고하였습니다. 일상생활의 다양한 영역에서 어려움이 초래될경우. 추가적인 평가나 정신건강 전문가의 도움을 받아보시기를 권해 드립니다.</label>
                </CheckItem>
                <Warning>‣ 결과는 자기보고 형식으로 측정되며, 정신과적 진단을 의미하는 것은 아닙니다.</Warning>
                <ItemLine />
                <OkBtn onClick={handleSubmit}>다른 자가진단 하러가기</OkBtn>
            </Paper>
        </Board>
    );
}

export default MindCheck_Depression_Result;