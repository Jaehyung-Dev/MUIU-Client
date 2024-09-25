import React, { useState } from 'react';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav'; // 공용 Footer 컴포넌트

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

const DMHM_Definition2 = () => {


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
              <option value="ch12">재난 경험자란</option>
              <option value="ch11">재난 정신건강이란</option>
            </SelectBox>
        </form>
        <br/>
        
        <>
        <h1>재난 경험자란</h1>
        <hr style={{ border: '1px solid #FFD651' }} />
        <h2>재난 경험자의 정의</h2>

        <TitleBox><b>1차: 재난 피해자</b></TitleBox>
        <TextBox>
          -재난으로 인해 직접적인 충격이나 손상을 받은 사람
          <br/><br/>
          <b>＃ 생존자들의 심리적 반응 및 충족되어야 하는 심리적 요구는 다음과 같습니다.</b>
        </TextBox>
        <GrayBox style={{ textAlign: 'left', lineHeight: '1.8'}}>
        - 자신의 기본적인 생존을 위한 걱정<br/>
        - 사랑하는 사람, 가지고 있는 의미 있는 소유물에 대한 상실감<br/>
        - 자신과 사랑하는 사람들의 안전에 대한 걱정과 불안<br/>
        - 악몽, 재난 상황의 재경험으로 인한 수면장애<br/>
        - 이주와 그에 따른 고립이나 악화된 주거 환경에 대한 염려<br/>
        - 재난충격 및 상실과 관련된 고통스러운 감정의 환기 및 정상화<br/>
        - 사회적 지지
        </GrayBox>
        <br/><br/>

        <TitleBox><b>2차: 재난 피해자와의 친구, 가족, 동료 등</b></TitleBox>
        <TextBox>
          -1차 피해자의 가족이나 친인척, 가까운 지인<br/><br/>
          <b>＃ 유족이 보일 수 있는 심리적 특징은 다음과 같습니다.</b>
        </TextBox>
        <GrayBox style={{ textAlign: 'left', lineHeight: '1.8'}}>
        - 트라우마, 우울, 불안, 불면<br/>
        - 사망과 관련된 정황에 대한 강박적 반추<br/>
        - 죄책감, 원망<br/>
        - 정서적 해리
        </GrayBox>
        <br/><br/>

        <TitleBox><b>3차: 재난 지원인력</b></TitleBox>
        <TextBox>
          -재난 상황에 참여하였던 재난업무종사자들로 구조·복구 작업에 참여한 소방관, 경찰관, 응급대원, 의사, 간호사, 사회복지사, 상담가, 성직자 등<br/>
        </TextBox>
        <br/><br/>
        
        <TitleBox><b>4차: 지역사회</b></TitleBox>
        <TextBox>
          -재난이 일어난 지역사회에 거주하는 주민<br/>
        </TextBox>
        <br/><br/>

        <TitleBox><b>5차: 전국민</b></TitleBox>
        <TextBox>
          -매스컴이나 대중매체를 통하여 간접적인 심리적 스트레스를 겪는 사람<br/><br/>
        </TextBox>
        <br/>
        </>

      </Content>
      <BottomNav />
    </>
  );
};

export default DMHM_Definition2;
