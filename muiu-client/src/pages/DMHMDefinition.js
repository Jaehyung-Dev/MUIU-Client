import React, { useState } from 'react';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav'; // 공용 Footer 컴포넌트
import realityImg from '../DMHM-images/현실불안형.png';
import confusionImg from '../DMHM-images/혼란형.png';
import dazedImg from '../DMHM-images/망연자실형.png';
import disasterExperienceImg from '../DMHM-images/재난의 경험.png';
import disasterDamageImg from '../DMHM-images/재난에 의한 피해.png';
import disasterWitnessImg from '../DMHM-images/재난의 목격.png';

// Styled-components
const Content = styled.div`
  flex: 1;
  padding: 0rem 1rem;
  position: relative;
  z-index: 1;
  overflow-y: auto;
  background-color: white;
  width: 100%;
  margin: 0 auto;
`;

const SelectBox = styled.select`
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #fff;
  color: #656565;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
  border: 2px solid #FFD651;
  border-radius: 10px;
  text-align: center;
  font-weight: bolder;
`;

const ImgBox = styled.div`
  text-align: center;
  margin-top: 50px;

  img {
    width: 70%;
    max-width: 600px;
    height: auto;
  }
`;

const TitleBox = styled.div`
  font-size: large;
  margin-bottom: 20px;
`;

const TextBox = styled.div`
  font-size: medium;
  margin-bottom: 10px;
  margin-top: 10px;
  word-break: keep-all;
`;

const GrayBox = styled.div`
  font-size: medium;
  background-color: #F3F3F3;
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  position: relative;
  word-break: keep-all;

  ${(props) =>
    props.hasVerticalLine &&
    `
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -43px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 1cm;
      background-color: #706d4f;
      z-index: 1;
    }
  `}
`;

const DMHM_Definition = () => {


  return (
    <>
      {/* <Header title="마음이음" backButton={backBtn} searchButton={searchBtn} menuButton={menuBtn} /> */}
      <Content>
        <form>
            <SelectBox name="manual" id="manualList">
                <option value="ch1">정의</option>
                <option value="ch2">심리적 반응 및 대처방법</option>
                <option value="ch3">재난 유형별 반응 및 대처방법</option>
                <option value="ch4">재난 정신건강 질환</option>
            </SelectBox>
            <SelectBox name="manual" id="manualList">
              <option value="ch11">재난 정신건강이란</option>
              <option value="ch12">재난 경험자란</option>
            </SelectBox>
        </form>
        <br/>
        
        <>
        <h2>1. 재난 정신건강 서비스란?</h2>
        <TextBox>
          재난 경험자의 심리적 고통을 완화하고 정신적 안정을 도모하며, 정신건강 고위험군을 조기 발견하여 적절한 치료개입을 제공함으로써 궁극적으로 지역사회 전체의 회복을 지원하는 일련의 활동을 말합니다.
        </TextBox>
        <br/>

        <h2>2. 재난 경험 시 겪을 수 있는 심리적 영향</h2>
        <TextBox><b>-심리적 반응</b></TextBox>

        <ImgBox><img src={realityImg} alt="현실 불안형" /></ImgBox>
        <GrayBox>
          <b>현실 불안형</b><br/><br/>
          재난 피해의 원인, 규모, 정도, 원조의 내용을 모르기 때문에 발생하는 현실적인 불안으로 타인이 알 수 있는 증상보다는 마음속으로 견딥니다.
        </GrayBox><br/><br/>

        <ImgBox><img src={confusionImg} alt="혼란형" /></ImgBox>
        <GrayBox>
          <b>혼란형</b><br/><br/>
          강한 불안으로 진정하기 어렵고, 말투나 행동에 일관성이 없습니다.
        </GrayBox><br/><br/>

        <ImgBox><img src={dazedImg} alt="망연자실형" /></ImgBox>
        <GrayBox>
          <b>망연자실형</b><br/><br/>
          겉보기에는 사고나 감정이 마비 또는 정지한 것처럼 보이는 상태입니다.
        </GrayBox><br/><br/>

        <TextBox><b>-발생 가능한 문제들</b></TextBox>
        <GrayBox hasVerticalLine>
        <b>심리적 트라우마란? (재난경험 자체에 의한 충격)</b><br/><br/>
            ‘정신적 외상’이란 충격적이거나 두려운 사건을 당하거나 목격하는 것을 말합니다. 
            자세히 설명하자면, 한 개인이 신체적·정신적으로 해롭거나 위협적인 사건, 상황을 겪은 후 
            신체적·사회적·정서적·영적 건강과 기능에 지속적으로 부정적인 영향을 받는 것입니다.
        </GrayBox>

        <ImgBox><img src={disasterExperienceImg} alt="재난의 경험" /></ImgBox>
        <GrayBox>
          <b>재난의 경험</b><br/><br/>
          지진의 흔들림이나 소리, 화재의 불꽃이나 열, 폭발의 소리나 열풍 등을 경험한 경우
        </GrayBox><br/><br/>

        <ImgBox><img src={disasterDamageImg} alt="재난에 의한 피해" /></ImgBox>
        <GrayBox>
          <b>재난에 의한 피해</b><br/><br/>
          부상, 가까운 관계자의 사상, 자택 손상 등의 피해
        </GrayBox><br/><br/>

        <ImgBox><img src={disasterWitnessImg} alt="재난의 목격" /></ImgBox>
        <GrayBox>
          <b>재난의 목격</b><br/><br/>
          시체, 화염, 가옥의 붕괴, 사람들의 혼란 등을 목격
        </GrayBox>
        </>

      </Content>
      <BottomNav />
    </>
  );
};

export default DMHM_Definition;
