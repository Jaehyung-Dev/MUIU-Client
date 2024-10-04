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

const ButtonBox = styled.div`
  margin: 20px 0;
`;

const DropdownButton = styled.button`
  margin-bottom: 10px;
  background-color: #FFD651;
  color: #656565;
  font-size: 1rem;
  cursor: pointer;
  width: 95%;
  height: 2.5rem;
  border: 2px solid #FFD651;
  border-radius: 10px;
  text-align: center;
  font-weight: bolder;
  position: relative;

  &::after {
    content: '${(props) => (props.isOpen ? '▲' : '▼')}';
    position: absolute;
    right: 15px;
    font-size: 1rem;
  }
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
    `&::after {
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
    }`}
`;

const DMHM_Definition = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const toggleChapter = (chapter) => {
    setSelectedChapter(selectedChapter === chapter ? null : chapter);
  };

  return (
    <>
      <Content>
        <ButtonBox>
          <DropdownButton
            isOpen={selectedChapter === 'ch11'}
            onClick={() => toggleChapter('ch11')}
          >
            재난 정신건강이란
          </DropdownButton>
          {selectedChapter === 'ch11' && (
            <>
              <h2>1. 재난 정신건강 서비스란?</h2>
              <TextBox>
                재난 경험자의 심리적 고통을 완화하고 정신적 안정을 도모하며, 정신건강 고위험군을 조기 발견하여 적절한 치료개입을 제공함으로써 궁극적으로 지역사회 전체의 회복을 지원하는 일련의 활동을 말합니다.
              </TextBox>
              <br />

              <h2>2. 재난 경험 시 겪을 수 있는 심리적 영향</h2>
              <TextBox><b>-심리적 반응</b></TextBox>

              <ImgBox><img src="/DMHM-images/현실불안형.png" alt="현실 불안형" /></ImgBox>
              <GrayBox>
                <b>현실 불안형</b><br /><br />
                재난 피해의 원인, 규모, 정도, 원조의 내용을 모르기 때문에 발생하는 현실적인 불안으로 타인이 알 수 있는 증상보다는 마음속으로 견딥니다.
              </GrayBox>
              <br /><br />

              <ImgBox><img src="/DHMH-images/혼란형.png" alt="혼란형" /></ImgBox>
              <GrayBox>
                <b>혼란형</b><br /><br />
                강한 불안으로 진정하기 어렵고, 말투나 행동에 일관성이 없습니다.
              </GrayBox>
              <br /><br />

              <ImgBox><img src="/DHMH-images/망연자실형.png" alt="망연자실형" /></ImgBox>
              <GrayBox>
                <b>망연자실형</b><br /><br />
                겉보기에는 사고나 감정이 마비 또는 정지한 것처럼 보이는 상태입니다.
              </GrayBox>
              <br /><br />
              <TextBox><b>-발생 가능한 문제들</b></TextBox>
              <GrayBox hasVerticalLine>
                <b>심리적 트라우마란? (재난경험 자체에 의한 충격)</b><br /><br />
                ‘정신적 외상’이란 충격적이거나 두려운 사건을 당하거나 목격하는 것을 말합니다. 자세히 설명하자면, 한 개인이 신체적·정신적으로 해롭거나 위협적인 사건, 상황을 겪은 후 신체적·사회적·정서적·영적 건강과 기능에 지속적으로 부정적인 영향을 받는 것입니다.
              </GrayBox>
              <br />

              <ImgBox><img src="/DMHM-images/재난의 경험.png" alt="재난의 경험" /></ImgBox>
              <GrayBox>
                <b>재난의 경험</b><br /><br />
                지진의 흔들림이나 소리, 화재의 불꽃이나 열, 폭발의 소리나 열풍 등을 경험한 경우
              </GrayBox>
              <br /><br />

              <ImgBox><img src="/DMHM-images/재난에 의한 피해.png" alt="재난에 의한 피해" /></ImgBox>
              <GrayBox>
                <b>재난에 의한 피해</b><br /><br />
                부상, 가까운 관계자의 사상, 자택 손상 등의 피해
              </GrayBox>
              <br /><br />

              <ImgBox><img src="/DMHM-images/재난의 목격.png" alt="재난의 목격" /></ImgBox>
              <GrayBox>
                <b>재난의 목격</b><br /><br />
                시체, 화염, 가옥의 붕괴, 사람들의 혼란 등을 목격
              </GrayBox>
            </>
          )}

          <DropdownButton
            isOpen={selectedChapter === 'ch12'}
            onClick={() => toggleChapter('ch12')}
          >
            재난 경험자란
          </DropdownButton>
          {selectedChapter === 'ch12' && (
            <>
              <h1>재난 경험자란</h1>
              <hr style={{ border: '1px solid #FFD651' }} />
              <h2>재난 경험자의 정의</h2>

              <TitleBox><b>1차: 재난 피해자</b></TitleBox>
              <TextBox>
                -재난으로 인해 직접적인 충격이나 손상을 받은 사람
                <br /><br />
                <b>＃ 생존자들의 심리적 반응 및 충족되어야 하는 심리적 요구는 다음과 같습니다.</b>
              </TextBox>
              <GrayBox style={{ textAlign: 'left', lineHeight: '1.8' }}>
                - 자신의 기본적인 생존을 위한 걱정<br />
                - 사랑하는 사람, 가지고 있는 의미 있는 소유물에 대한 상실감<br />
                - 자신과 사랑하는 사람들의 안전에 대한 걱정과 불안<br />
                - 악몽, 재난 상황의 재경험으로 인한 수면장애<br />
                - 이주와 그에 따른 고립이나 악화된 주거 환경에 대한 염려<br />
                - 재난충격 및 상실과 관련된 고통스러운 감정의 환기 및 정상화<br />
                - 사회적 지지
              </GrayBox>
              <br /><br />

              <TitleBox><b>2차: 재난 피해자와의 친구, 가족, 동료 등</b></TitleBox>
              <TextBox>
                -1차 피해자의 가족이나 친인척, 가까운 지인<br /><br />
                <b>＃ 유족이 보일 수 있는 심리적 특징은 다음과 같습니다.</b>
              </TextBox>
              <GrayBox style={{ textAlign: 'left', lineHeight: '1.8' }}>
                - 트라우마, 우울, 불안, 불면<br />
                - 사망과 관련된 정황에 대한 강박적 반추<br />
                - 죄책감, 원망<br />
                - 정서적 해리
              </GrayBox>
              <br /><br />

              <TitleBox><b>3차: 재난 지원인력</b></TitleBox>
              <TextBox>
                -재난 상황에 참여하였던 재난업무종사자들로 구조·복구 작업에 참여한 소방관, 경찰관, 응급대원, 의사, 간호사, 사회복지사, 상담가, 성직자 등<br />
              </TextBox>
              <br /><br />

              <TitleBox><b>4차: 지역사회</b></TitleBox>
              <TextBox>
                -재난이 일어난 지역사회에 거주하는 주민<br />
              </TextBox>
              <br /><br />

              <TitleBox><b>5차: 전국민</b></TitleBox>
              <TextBox>
                -매스컴이나 대중매체를 통하여 간접적인 심리적 스트레스를 겪는 사람<br /><br />
              </TextBox>
              <br />
            </>
          )}
        </ButtonBox>
      </Content>
      <BottomNav />
    </>
  );
};

export default DMHM_Definition;
