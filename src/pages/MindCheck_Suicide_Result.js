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
    margin-bottom: 1rem;
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
        width: 200%;
        font-size: 0.75rem;
        margin-left: auto;
    
        @media screen and (max-width: 600px) {
            font-size: 0.55rem;
        }
    }

    input {
        margin-right: 1rem;
    }
`;

const Criteria = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    font-size: 0.85rem;
    margin-right: 1rem;

    span {
        padding: 0 auto;
        color: #394FBC;
        font-size: 0.75rem;
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

const MindCheck_Suicide_Result = ({ score, status }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/mind-check');
    };

    // 점수에 따른 체크 상태 결정
    const isNormalChecked = status === 'Normal';
    const isCautionChecked = status === 'Caution';
    const isSevereChecked = status === 'Severe';

    return (
        <Board>
            <img src={clip} alt='집게'/>
            <Paper>
                <Title>자살위험성</Title>
                <Subtitle>검사결과</Subtitle>
                <ItemLine />
                <CheckItem>
                    <input type="checkbox" checked={isNormalChecked} readOnly />
                    <Criteria>
                        자살<br />위험성<br />거의<br />없음
                    </Criteria>
                    <label><span>‘당신자신을 정말 해치겠다는 생각을 했던 적이 있습니까?’ 라는 문항에 ‘ 없다’라고 응답한 경우 또는 아래 기준에 해당되지 않는 경우</span></label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isCautionChecked} readOnly />
                    <Criteria>
                        자살<br />위험성<br />낮음
                    </Criteria>
                    <label>
                        <span>1,2번 문항중에 하나라도 ‘있다’라고 응답하고,  3,4번 문항에는 해당되지 않는 경우</span><br />
                        자살 과거력이 있었거나 자살 계획에 대한 생각을 보고하였지만, 우발적인 자살 시도를 보일 가능성은 낮습니다.
                    </label>
                </CheckItem>
                <CheckItem>
                    <input type="checkbox" checked={isSevereChecked} readOnly />
                    <Criteria>
                        자살<br />위험성<br />높음
                    </Criteria>
                    <label>
                        <span>3번 문항에 ‘약간’ 혹은 ‘매우 그렇다’라고 응답하거나 4번문항에 ‘없다’라고 응답한 경우</span><br />
                        자살 가능성이 있다고 보고하였거나 자살 사고나 행동을 저지할 수 있는 보호요인이 없다고 보고하였습니다. 추가적인 평가나 정신건강 전문가의 도움을 받아보시기를 권해드립니다.
                    </label>
                </CheckItem>
                <Warning>‣ 결과는 자기보고 형식으로 측정되며, 정신과적 진단을 의미하는 것은 아닙니다.</Warning>
                <ItemLine />
                <OkBtn onClick={handleSubmit}>다른 자가진단 하러가기</OkBtn>
            </Paper>
        </Board>
    );
}

export default MindCheck_Suicide_Result;