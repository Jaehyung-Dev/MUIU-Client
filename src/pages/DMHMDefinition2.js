import React, { useState } from 'react';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav'; // 공용 Footer 컴포넌트

const AppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  // margin-top: 70px;
  box-sizing: border-box;
`;

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
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  width: 100%;
  border: none;
  box-sizing: border-box;
  padding: 0; /* 박스의 패딩 제거 */
  margin: 0 auto; /* 전체 중앙 정렬 */
  // text-align: center; /* 텍스트 중앙 정렬 */
  border-collapse: collapse; /* 테두리 겹침 제거 */
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
  width: 100%;

  &::after {
    content: '${(props) => (props.isOpen ? '▲' : '▼')}';
    position: absolute;
    right: 15px;
    font-size: 1rem;
  }
`;

const SubButtonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #f0f0f0;
  padding: 10px 0;
`;

const SubButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${(props) => (props.isActive ? '#0066cc' : '#656565')};
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  margin-right: 20px;
  position: relative;

  &::after {
    content: '';
    width: ${(props) => (props.isActive ? '100%' : '0')};
    height: 3px;
    background-color: #FFD651;
    position: absolute;
    bottom: -10px;
    left: 0;
    transition: width 0.3s;
  }

  &:hover {
    color: #0066cc;
  }
`;

const StageButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  box-sizing: border-box;
  width: 100%;
`;

const StageButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.isActive ? '#FFD651' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#656565')};
  border: 1px solid #FFD651;
  text-align: center;
  cursor: pointer;
  font-weight: bold;

  &:not(:last-child) {
    border-right: 1px solid #FFD651;
  }
`;

const BoxContainer = styled.div`
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
`;

const BoxTitle = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  border: 1px solid #ddd;
  border-bottom: none;
  text-align: center;
`;

const BoxContent = styled.div`
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  line-height: 2;
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
  text-align: left;
  margin-top: 10px;
  padding: 20px;
  position: relative;
  word-break: keep-all;
  line-height: 2;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  text-align: left;
`;

const GridTitle = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const GridContent = styled.div`
  padding: 20px;
  background-color: white;
`;

const ImgBox = styled.div`
  text-align: center;
  margin-top: 50px;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
`;


const DMHMDefinition2 = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubButton, setSelectedSubButton] = useState(null);
  const [selectedStage, setSelectedStage] = useState('stage0');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('children');

  const toggleChapter = (chapter) => {
    if (selectedChapter === chapter) {
      setSelectedChapter(null);
      setSelectedSubButton(null);
    } else {
      setSelectedChapter(chapter);
      setSelectedSubButton('generalReactions'); // 기본 서브 버튼 선택
    }

    setSelectedStage('stage0'); // 기본 Stage 버튼 초기화

    // 스크롤을 페이지 상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (selectedSubButton) {
      case 'generalReactions':
        return (
          <>
            <h2>1. 일반적인 반응</h2>
            <GrayBox>
              - 믿을 수 없음과 충격<br />
              - 공포와 미래에 대한 불안<br />
              - 지남력 장애 (혼미), 무관심 및 감정적 마비<br />
              - 신경질적인 반응(과민성) 및 분노<br />
              - 슬픔과 우울함<br />
              - 무기력감<br />
              - 극심한 배고픔 혹은 식욕 상실<br />
              - 의사결정의 어려움<br />
              - “명확한 이유 없는” 울음<br />
              - 두통 및 위장장애<br />
              - 수면 장애<br />
              - 과도한 음주 혹은 약물의 사용<br /><br />
              이러한 반응은 대부분의 경우 시간이 흐름에 따라 점차 감소하게 되며 다시 일상적인 활동에 주의를 집중할 수 있게 됨. 
              스트레스에 대처하는 방법은 모두 다르므로 주변의 다른 사람과 비교하거나, 다른 사람의 반응이나 감정을 평가하지 않도록 함.
            </GrayBox>
            <br />
            <h2>2. 재난 반응의 5단계</h2>
            <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'stage0'}
                onClick={() => setSelectedStage('stage0')}
              >
                제0기:<br/>경고 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'stage1'}
                onClick={() => setSelectedStage('stage1')}
              >
                제1기:<br/>영웅 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'stage2'}
                onClick={() => setSelectedStage('stage2')}
              >
                제2기:<br/>허니문 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'stage3'}
                onClick={() => setSelectedStage('stage3')}
              >
                제3기:<br/>희망과 좌절과<br/>현실 폭로 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'stage4'}
                onClick={() => setSelectedStage('stage4')}
              >
                제4기:<br/>재건 반응
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
              <br />
              <h2>3. 재난 충격 이후 나타날 수 있는 다양한 증상</h2>
                <GridContainer>
                  <GridItem>
                    <GridTitle>정서적 문제</GridTitle>
                    <GridContent>
                      - 불안<br/>
                      - 우울<br/>
                      - 불안한 정서<br/>
                      - 예민, 짜증<br/>
                      - 죄책감, 수치심<br/>
                      - 무감각<br/>
                      - 좌절에 대한 내성 부족<br/>
                      - 자아도취, 지나친 자신감<br/>
                      - 생존자들에 대한 동일 시
                    </GridContent>
                  </GridItem>
                  <GridItem>
                    <GridTitle>신체적 문제</GridTitle>
                    <GridContent>
                      - 불면<br/>
                      - 악몽<br/>
                      - 통증(두통, 복통, 근골격계 등)<br/>
                      - 식욕변화, 소화불량<br/>
                      - 감기, 감염 등 면역력 저하<br/>
                      - 만성피로<br/>
                      - 눈가, 입가의 근육 떨림<br/>
                      - 생리주기 변화<br/>
                      - 체중변화<br/>
                      - 탈모
                    </GridContent>
                  </GridItem>
                  <GridItem>
                    <GridTitle>인지적 문제</GridTitle>
                    <GridContent>
                      - 기억력 감소<br/>
                      - 사고의 속도와 이해 저하<br/>
                      - 우선순위, 의사결정의 어려움<br/>
                      - 반복된 외상 사건 기억<br/>
                      - 새로운 생각에 대한 저항<br/>
                      - 의사결정의 어려움, 경직된 사고, 집중력 부족
                    </GridContent>
                  </GridItem>
                  <GridItem>
                    <GridTitle>행동장애</GridTitle>
                    <GridContent>
                      - 외상 사건을 연상시키는 상황 회피<br/>
                      - 위축된 대인관계<br/>
                      - 활동 감소<br/>
                      - 알코올, 약물 사용 증가<br/>
                      - 잦은 지각, 업무 회피<br/>
                      - 분노 폭발, 잦은 다툼
                    </GridContent>
                  </GridItem>
                  <GridItem style={{ gridColumn: 'span 2' }}>
                    <GridTitle>영적 문제</GridTitle>
                    <GridContent>
                      - 자신감 상실<br/>
                      - 의미 상실, 회의<br/>
                      - 소외감<br/>
                      - 가치관 변화
                    </GridContent>
                  </GridItem>
                </GridContainer>
            <br />

            <h2>4. 정신과적 개입이 필요한 경우</h2>
            <GrayBox>
              1) 해리 증상(기억상실, 시공간 지남력 상실)을 보이는 경우<br />
              2) 우울(무희망감, 절망, 사회적 철퇴)증상이 있는 경우<br />
              3) 불안(절박감, 초조, 다른 재난이 닥칠 것이라는 강박적인 두려움)을 보이는 경우<br />
              4) 정신 질환(환청, 환시, 망상 등)이 있을 경우<br />
              5) 자신을 돌볼 수 없는 경우(식사, 목욕, 옷 갈아입기 등의 일상생활 유지가 어려운 경우)<br />
              6) 자살/타살, 자해/타해의 위험이 있는 경우<br />
              7) 알코올이나 다른 약물을 과용하는 경우<br />
              8) 가정폭력, 아동학대, 노인학대가 있는 경우
            </GrayBox>
          </>
        );
      case 'generalTreatment':
        return (
          <TextBox>
            <h2>재난에서 마음건강 지키기</h2>
            <ImgBox><img src="/DMHM-images/일반적인대처_브로셔.png" alt="일반적인 대처" /></ImgBox>
            <br/>
            <h2>충격적인 일을 마주한 자신을 위한 지침</h2>
            <p>정신적 충격에서 회복된다는 것은 단순히 그 사건을 망각하는 것이 아닙니다. 
              그 일을 떠올렸을 때 더 이상의 감정적 고통을 느끼지 않는 상태를 말하는 것도 아닙니다.​<br/>
              진짜 ‘회복’은 덜 괴로운 상태가 되는 것, 그리고 시간이 지날수록 당신의 대처능력에 더 큰 자신감을 가지게 되는 것을 의미합니다.​​<br/>
              아직은 이런 상태가 아니라 하더라도, 아래 적힌 방법에 따라 노력을 해보기를 권합니다. 당신이 이 끔찍한 일들을 받아들이고, 그와 관련된 괴로움을 줄이는데 도움이 될 것입니다.​</p>
          </TextBox>
        );
      case 'familyTreatment':
        return (
          <TextBox>
            <h2>1. 고통스러운 일을 겪은 친구와 가족들을 위하여</h2>
            <p>정신적 충격을 받은 후, 많은 사람들은 고통, 슬픔, 자책감, 분노를 느끼며 비탄에 빠집니다.​<br/>
              이를 극복하는 것은 매우 어려워 보일 것이며, 도대체 무슨 일이 일어났는지 실감하고 받아들이는데도 시간이 걸릴 것입니다.​<br/>
              그러나 이런 감정들은 보통 ‘몇 주에 걸쳐’ 조금씩 나아집니다. 이 시기에 가족과 친구들의 도움은 특히 중요합니다. 
              아래의 방법들을 통해 고통 받는 친구들과 가족들을 도울 수 있을 것입니다.

</p>
          </TextBox>
        );
      default:
        return null;
    }
  };

  const renderStageContent = () => {
    switch (selectedStage) {
      case 'stage0':
        return (
          <TextBox>
            <h2>제0기: 경고 반응</h2>
            <p>
              이 시기는 임박한 재난에 대한 뉴스가 확산되는 시기임. 
              사람들은 가용한 정보와 사실을 최대한 취합하려고 하고, 적절한 재난 대비를 하려고 노력함.
            </p>
            <BoxContainer>
              <BoxTitle>정서적 반응</BoxTitle>
              <BoxContent>
                - 물리적 현상(멀리서 다가오는 태풍이나 빈번해진 화산 활동 등)을 목격하며, 불안과 초조, 
                  짜증과 같은 복합적인 정서 반응을 보이게 됨.<br/>
                - 초기 재난의 피해를 입어 충격을 받고, 멍해지는 경우도 있음.
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>행동적 반응</BoxTitle>
              <BoxContent>
                - 안전한 장소를 찾거나 주변 사람들의 안위를 걱정하지만, 
                  재난의 위험에 대해 과소평가하며 평소와 다름없이 지내는 경우도 있음.<br/>
                - 우왕좌왕하면서 적절한 행동을 보이지 못하는 경우도 있음.
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>유용한 자원</BoxTitle>
              <BoxContent>
                - 가용한 대피소나 비상 물자 등에 대한 정보 및 보급, 탈출로, 연락망의 점검 등이 필요함.
              </BoxContent>
            </BoxContainer>
          </TextBox>
        );
      case 'stage1':
        return (
          <TextBox>
            <h2>제1기: 영웅 반응</h2>
            <p>
            재난이 일어나면 즉각적인 후폭퐁이 발생함. 
            영웅 반응 시기에는 지역 사회에 식량과 식수, 보호소를 제공하는 응급 활동이 가장 두드러지게 되는데, 
            이와 관련한 정서적, 행동적 반응은 다음과 같음.
            </p>
            <BoxContainer>
              <BoxTitle>정서적 반응</BoxTitle>
              <BoxContent>
              - 가장 핵심적인 심리적 반응은 애도와 상실임<br/>
              - 그러나 동시에 강한 이타성의 감정이 집단 내에서 일어남<br/>
              - 영웅 반응이 일어난 사람들은 주변 사람들을 구조하고 피해자에게 필요한 것을 제공하려는 강한 동기를 보이게 됨<br/>
              - 종종 자신의 안위에 대해서는 큰 관심을 보이지 않음
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>행동적 반응</BoxTitle>
              <BoxContent>
              - 집단 전체가 영웅 반응을 보이게 되면, 집단의 에너지는 생명과 재산을 구하는 활동에 집중됨<br/>
              - 자신의 생명이나 재산보다 공동체의 자원을 더 우선시하는 경향을 보이기도 함<br/>
              - 자신의 재산이 파괴되었거나 심지어 가족이 죽거나 다친 경우에도, 용감히 다른 사람을 구하려는 이타적 행동이 일어나기도 함
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>유용한 자원</BoxTitle>
              <BoxContent>
              - 이 시기에는 가족, 이웃 그리고 위기 대응 팀의 이타적 협력이 가장 요구됨<br/>
              - 대개 재난 후 첫 몇 시간 동안의 구조 활동에 필요한 심리적 자원임
              </BoxContent>
            </BoxContainer>
          </TextBox>
        );
      case 'stage2':
        return (
          <TextBox>
            <h2>제2기: 허니문 반응</h2>
            <p>
            재난 이후 수일에서 수개월(주로 3-6개월) 사이에 일어나는 반응으로 재난의 종류나 양상, 심각성에 따라서 기간이 좌우됨
            </p>
            <BoxContainer>
              <BoxTitle>정서적 반응</BoxTitle>
              <BoxContent>
               - 생존자나 그들의 가족은 살아남았다는 안도감을 느끼게 되며, 종종 감정적인 고양을 느끼기도 함<br/>
               - 일단 살아남았으니, 그 외의 문제들은 잘 해결해 낼 수 있을 것이라는 확신을 가지기도 함<br/>
               - 또한 끔찍한 경험을 공유한 지역 사회 및 사회의 다른 구성원들에 대한 강한 결속감을 느끼게 됨<br/>
               - 재난 구호 요원은 자신의 역할에 대해서 뿌듯함을 느끼기도 하고. 구호 기구에 모금이 집중되기도 함<br/>
               - 구조 상황에 대한 집중적인 언론 보도 등을 통해서 피해자들에 대한 동정심과 구호 요원에 대한 긍정적 평판이 확산됨<br/>
               - 생존자들은 자신이 정부로부터 삶을 재건하기 위한 충분한 보상과 지원을 받을 수 있을 것이라는 강력한 기대를 하게 됨<br/>
               - 실제로 복구와 지원에 대한 다양한 공적 약속이 이 시기에 주로 맺어짐
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>행동적 반응</BoxTitle>
              <BoxContent>
              - 이 시기에는 자원봉사자를 구하는 것이 상당히 용이하며, 물적 지원이나 재정적 도움도 쉽게 획득할 수 있음<br/>
              - 재난 통제 기구는 각 행위자, 즉 생존자, 지역 사회, 일반 대중 등의 기대와 희망을 조율하는 역할을 하여야 하며 
                원활한 의사소통이 요구됨<br/>
              - 이 시기의 생존자들은 약속 받은 지원을 기대하면서, 자원봉사자와 힘을 합쳐, 주로 재난의 물리적 흔적을 지우는 일에 주력함
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>유용한 자원</BoxTitle>
              <BoxContent>
              - 재난 이전부터 존재하던 지역 사회 자원이 가장 핵심적인 자원임(지역 사회가 완전히 와해된 것이 아니라면).
              또한 재난 이후에 새로 결성되거나 유입된 집단도 회복에 큰 도움이 되는 자원이 될 수 있음.
              </BoxContent>
            </BoxContainer>
          </TextBox>
        );
      case 'stage3':
        return (
          <TextBox>
            <h2>제3기: 희망과 좌절과 현실 폭로 반응</h2>
            <p>
            엄중한 현실로 돌아오는 일은 피할 수 없음.
            정부는 지원에 대한 세세한 제한 조건을 수립하고, 보험 회사 등은 가능한 보상액을 줄이려고 협상을 시도함. 
            언론의 관심은 식고, 구호 기구도 철수함. 이 시기는 수개월부터 약 2년까지 지속됨.
            </p>
            <BoxContainer>
              <BoxTitle>정서적 반응</BoxTitle>
              <BoxContent>
              - 더 이상 세상 혹은 해당 지역의 집중적인 관심을 받지 못함<br/>
              - 생존자들은 분노와 분개, 비탄, 깊은 실망감을 느끼게 됨<br/>
              - 약속된 도움은 기대와는 달리 충분하지 않고, 종종 지연되기도 함<br/>
              - 점점 지쳐가면서 상당한 스트레스를 경험하게 됨
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>행동적 반응</BoxTitle>
              <BoxContent>
              - 이 시기에 생존자들은 정부나 구호 기구의 약속이나 의도에 대해 의심하고, 원하는 지원이 제공될 것인지에 대해 의구심을 품게 됨<br/>
              - 정상적인 삶으로 돌아가는데 얼마나 시간이 걸릴 지에 대해 부정적인 전망을 하게 됨<br/>
              - 많은 사람들이 점점 개인적인 사람과 개별적인 문제를 해결하는데 주력하게 됨<br/>
              - 공동체에 대한 결속감은 사라짐<br/>
              - 집단의 리더나 구호 기구는 가능한 정확한 정보를 전달하고, 잘못된 루머가 전파되는 것을 차단하여야 함.<br/>
              - 특히 SNS를 통한 유언비어의 확산을 즉시 교정하는 것이 필요함
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>유용한 자원</BoxTitle>
              <BoxContent>
              - 이전까지 활동하던 외부 기구들이 철수함<br/>
              - 외부의 지원이 중단된 지역 사회의 대응 기구는 상당히 무력할 수 있음<br/>
              - 따라서 해당 지역 사회는 자금을 지원하고, 직접적인 도움을 지속할 수 있는 대안적 자원을 확보해야 함<br/>
              - 종종 피해자 스스로 기존 구호 기구의 도움 외에 대안적인 지원을 개별적으로 확보하여야 함
              </BoxContent>
            </BoxContainer>
          </TextBox>
        );
      case 'stage4':
        return (
          <TextBox>
            <h2>제4기: 재건 반응</h2>
            <p>
            재난 이후 수년 이상 지속되며, 대중의 관심이나 매스미디어의 반응은 완전히 중단됨. 
            상당히 오랫동안 외로운 재건 작업이 이어질 수 있음(매스미디어의 반응은 매년 기념일에 집중되고 이후 다시 사라짐)
            </p>
            <BoxContainer>
              <BoxTitle>정서적 반응</BoxTitle>
              <BoxContent>
              - 피해자들의 정서 반응은 다음의 세 가지 요인에 의해서 결정됨.<br/>
              - 첫째 기존의 정서적 혹은 재정적 상태, 둘째 이전 단계에서 겪은 경험, 셋째 실제 가용한 자원의 수준임<br/>
              - 자원이 충분할 경우 생존자의 스트레스가 감소하는 것으로 알려져 있음<br/>
              - 생존자들은 결국 자신의 삶에 대한 궁극적인 책임을 자신이 질 수 밖에 없다는 사실을 깨닫게 됨<br/>
              - 회복의 노력이 가시적인 성과를 거두면, 지역 사회의 효능감이 확산되어 추가적인 회복을 위한 동력이 될 수 있음<br/>
              - 그러나 회복의 결과가 분명하게 드러나지 않으면, 개인들은 외상후스트레스장애(PTSD)가 고착되고 
                점점 심각한 정신적 신체적 문제가 유발될 수 있음
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>행동적 반응</BoxTitle>
              <BoxContent>
              - 대개 재건 시기에 주로 보이는 행동은 자기 책임감임<br/>
              - 최상의 경우라면 각 개인 혹은 개별적인 가족은 스스로의 회복을 컨트롤하고 새로운 재건의 계획을 자발적으로 수립 구축할 수 있어야 함<br/>
              - 그러나 적절한 행동이 어렵거나 혹은 필요한 자원이 제공되지 않으면, 행동은 점점 역기능적으로 진행하여 문제가 악화될 수 있음<br/>
              - 특히 우울장애로 인해서 감정이 메마르게 되는 경우, 정상적인 회복과 재건을 위한 심리적 동기가 감소하고 건강한 행동 반응도 제한될 수 있음
              </BoxContent>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>유용한 자원</BoxTitle>
              <BoxContent>
              - 이 시기에는 지역 사회 및 집단의 장기적 관점의 재정적 투자가 가장 필요함
              </BoxContent>
            </BoxContainer>
          </TextBox>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <AppContainer>
      <Content>
        <ButtonBox>
        <DropdownButton
            isOpen={selectedChapter === 'ch21'}
            onClick={() => toggleChapter('ch21')}
          >
            일반적인 반응
          </DropdownButton>
          {selectedChapter === 'ch21' && (
            <>
              <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'generalReactions'}
                  onClick={() => setSelectedSubButton('generalReactions')}
                >
                  일반적인 반응
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'generalTreatment'}
                  onClick={() => setSelectedSubButton('generalTreatment')}
                >
                  일반적인 대처
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'familyTreatment'}
                  onClick={() => setSelectedSubButton('familyTreatment')}
                >
                  친구와 가족을 위한 대처
                </SubButton>
              </SubButtonBox>
              {renderContent()}
            </>
          )} <br/>

          <DropdownButton
            isOpen={selectedChapter === 'ch22'}
            onClick={() => toggleChapter('ch22')}
          >
            연령별 반응
          </DropdownButton>
          {selectedChapter === 'ch22' && (
            <>
              <h1>연령별 반응</h1>
              <hr style={{ border: '1px solid #FFD651' }} />
              <h2>1. 아동ㆍ청소년</h2>
              <ImgBox><img src="/DMHM-images/신생아.png" alt="신생아" /></ImgBox>
              <BoxContainer>
                <BoxTitle>신생아(2세)</BoxTitle>
                  <BoxContent>
                  - 사고나 감정을 설명할 수 있는 말을 못하며 특정한 소리, 음향 또는 냄새를 기억<br/>
                  - 유아는 짜증을 내거나 평소보다 더 울거나 안아달라고 보챔<br/>
                  - 이 연령의 아이에게는 부모의 대처 방법이 가장 큰 영향을 미침<br/>
                  - 성장함에 따라 몇 년 전에 발생한 정신적 충격의 요소를 놀이에 반영할 수 있으나 마치 잊고 있는 것처럼 보이기도 함
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/유치원.png" alt="유치원" /></ImgBox>
              <BoxContainer>
                <BoxTitle>유치원 (3~6세)</BoxTitle>
                  <BoxContent>
                  - 큰 사건 앞에서 무력함을 느끼고 감당하지 못하는 경우가 종종 발생<br/>
                  - 보호자와 분리되는 것에 대한 극심한 공포와 불안을 느낌<br/>
                  - 영구적인 상실의 개념을 이해할 수 없어서 결과를 되돌릴 수 있거나 영원하다고 생각하기도 함<br/>
                  - 충격적인 사건을 겪고 몇 주가 지난 후 놀이 활동에서 사고나 재난을 재현하기도 함
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/학령.png" alt="학령" /></ImgBox>
              <BoxContainer>
                <BoxTitle>학령 (7-10세)</BoxTitle>
                  <BoxContent>
                  - 큰 사건 앞에서 무력함을 느끼고 감당하지 못하는 경우가 종종 발생<br/>
                  - 보호자와 분리되는 것에 대한 극심한 공포와 불안을 느낌<br/>
                  - 영구적인 상실의 개념을 이해할 수 없어서 결과를 되돌릴 수 있거나 영원하다고 생각하기도 함<br/>
                  - 충격적인 사건을 겪고 몇 주가 지난 후 놀이 활동에서 사고나 재난을 재현하기도 함
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/사춘기 이전 청소년.png" alt="청소년" /></ImgBox>
              <BoxContainer>
                <BoxTitle>사춘기 이전-청소년 (11-18세)</BoxTitle>
                  <BoxContent>
                  - 재난 사고에 대해 보다 정교한 이해력을 가지고 있고 성인과 유사 반응 보임<br/>
                  - 10대들은 무모한 운전 또는 술이나 약물 사용 등 위험하거나 위험을 수반하는 행동을 하기도 함<br/>
                  - 어떤 아이들은 집을 나서는 것에 두려움을 느끼고 이전 수준의 활동을 피하기도 함<br/>
                  - 외상 후에는 세상에 대한 시각이 다소 위험하거나 불안함<br/>
                  - 강한 감정에 사로잡혀 있음에도 이에 대하여 다른 사람과 얘기할 수 없다고 느끼기도 함
                  </BoxContent>
              </BoxContainer><br/><br/>

              <h2>2. 성인</h2>
              <ImgBox><img src="/DMHM-images/높은 수준의 걱정_각성.png" alt="걱정/각성" /></ImgBox>
              <BoxContainer>
                <BoxTitle>높은 수준의 걱정 / 각성</BoxTitle>
                  <BoxContent>
                  - 긴장과 걱정은 재난 후 일반적인 반응<br/>
                  - 성인은 미래에 대해 지나친 걱정을 하고<br/>
                  - 수면에 어려움을 겪거나<br/>
                  - 집중을 못하고 불안해거나<br/>
                  - 안절부절 못 할 수도 있음<br/>
                  - 이러한 반응의 일환으로 빠른 심장박동 및 발한을 경험할 수도 있음
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/본인의 반응에 대한 걱정 혹은 수치심.png" alt="걱정/수치심" /></ImgBox>
              <BoxContainer>
                <BoxTitle>본인의 반응에 대한 걱정 혹은 수치심</BoxTitle>
                  <BoxContent>
                  - 많은 이들은 재난에 강한 반응을 보임<br/>
                  - 두려움, 걱정, 주의 집중의 어려움, 본인의 반응에 대한 부끄러움, 무엇인가에 대한 죄책감 등<br/>
                  - 극도로 어려운 사고 이후 다양한 감정을 느끼는 것은 당연한 것이며 정상적인 것임
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/처리해야하는 일에 대해 압도당하는 느낌.png" alt="압도" /></ImgBox>
              <BoxContainer>
                <BoxTitle>처리해야 하는 일에 대해 압도당하는 느낌</BoxTitle>
                  <BoxContent>
                  - 집 정리, 음식, 보험 서류작업, 보육, 육아 등
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/재난 재발에 대한 두려움.png" alt="두려움" /></ImgBox>
              <BoxContainer>
                <BoxTitle>재난 재발에 대한 두려움 및<br/>재난을 기억나게 하는 것들에 대한 과민한 반응</BoxTitle>
                  <BoxContent>
                  - 재난이 또 발생할 것이라는 두려움을 느끼는 것<br/>
                  - 발생했던 재난을 기억나게 하는 것들에 대한 과민한 반응은 일반적인 것임
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/세계와 본인에 대한 관점.png" alt="관점" /></ImgBox>
              <BoxContainer>
                <BoxTitle>세계와 본인에 대한 관점과 태도의 변화</BoxTitle>
                  <BoxContent>
                  - 재난 후 세계관과 본인에 대한 태도의 변화는 일반적인 것임<br/>
                  - 본인의 종교적 신념에 대한 의문<br/>
                  - 타인이나 사회 기관에 대한 신뢰 및 저하
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/음주 약물 사용 도박.png" alt="음주/약물/도박" /></ImgBox>
              <BoxContainer>
                <BoxTitle>음주, 약물 사용, 도박 혹은 안전하지 않은 성생활</BoxTitle>
                  <BoxContent>
                  - 많은 이들은 재난 이후 본인이 통제할 수 없으며 무섭고
                  - 희망이 없다고 느끼거나 분노를 느끼며 이러한 행동을 함
                  - 이는 특히 이전에 약물 남용 혹은 중독의 경험이 있는 경우 문제가 될 수 있음
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/대인관계의 변화.png" alt="대인관계의 변화" /></ImgBox>
              <BoxContainer>
                <BoxTitle>대인관계의 변화</BoxTitle>
                  <BoxContent>
                  - 사람들은 가족 혹은 친구에 대한 감정에 변화가 생길 수 있음<br/>
                  - 예를 들어, 상대방을 과보호하거나 서로의 안전에 대해 매우 걱정할 수 있으며<br/>
                  - 가족이나 친구의 대응을 답답하게 여길 수 있으며<br/>
                  - 가족 혹은 친구로부터 멀어지고 있다고 느낄 수 있음
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/지나친 분노.png" alt="지나친 분노" /></ImgBox>
              <BoxContainer>
                <BoxTitle>지나친 분노</BoxTitle>
                  <BoxContent>
                  - 재난 이후 어느 정도 수준의 분노는 당연하며 예상 가능함<br/>
                  - 특히 무언가 불공평하다는 생각이 드는 경우에는 더 그러함<br/>
                  - 하지만, 이러한 분노가 폭력적 행동, 극심한 분노로 연결되면 이는 심각한 문제임
                  </BoxContent>
              </BoxContainer><br/>
              <ImgBox><img src="/DMHM-images/수면 장애.png" alt="수면 장애" /></ImgBox>
              <BoxContainer>
                <BoxTitle>수면 장애</BoxTitle>
                  <BoxContent>
                  - 잠드는 데에 어려움을 겪거나 자주 깨는 것은 재난을 겪은 이들이<br/> 
                  과민하거나 많은 어려운 점들에 대한 걱정 및 생활의 변화에 대한 걱정을<br/> 
                  갖고 있으므로 공통적으로 보여지는 증상임
                  </BoxContent>
              </BoxContainer><br/><br/>

              <h2>3. 노인</h2>
              <BoxContainer>
                  <BoxContent>
                  - 재난 상황에서 노인의 정신건강 문제는 외상후스트레스장애(Post-Traumatic Stress Disorder: PTSD)보다는 
                    우울, 불안, 기억력 장애가 더 흔함<br/>
                  - 실제로는 우울이나 불안 등의 감정적 증상보다는 모호한 통증이나 자율신경계 증상과 같은 신체증상을 호소하는 경우가 더 많음<br/>
                  - 노인성 우울증이나 불안장애에서 신체화 증상이나 건강염려증 증상이 흔하게 나타나는 것과 같이, 
                    재난을 겪은 노인이 불안이나 우울을 경험하게 될 때에도 유사한 증상을 보임<br/>
                  - 노인은 급성 스트레스에 대한 반응도 신체적 방법으로 표현하는 경우가 많음<br/>
                  - 노인에서의 재난 이후 정신 증상 중 특이한 증상 중 하나는 기억력 저하로 많은 노인이 트라우마 이후 경도의 기억력 장애를 호소함<br/>
                  - 이러한 증상은 불안에 뒤이어 나타나는 기억력 장애로 재난을 당한 노인이 기억력 저하를 호소한다고 해서 
                    바로 치매로 진단하기보다는 불안과 우울 등의 정신건강 문제를 살펴보는 것이 중요함<br/>
                  - 노인은 성인에 비해 재난 이후 도움을 요청하지 않는 경우가 많음<br/>
                  - 글을 제대로 읽지 못하거나 구호 서비스를 신청하는 서류 작업에 어려움을 느끼는 것과 같은 실제적인 이유 이외에도 
                    지원을 받는 것에 대해 창피하게 생각하거나 구호 서비스를 제공받음으로 인해 다른 권한을 잃을 수 있다고 우려하기도 함<br/>
                  - 노인이 된 이후에도 혼자서 독립적으로 생활하는 것에 대해 중요한 의미를 두어 재난 이후에 필요한 서비스가 있더라도 
                    적극적으로 서비스를 신청하고 받는 것을 꺼리는 경우가 많음<br/>
                  - 또, 이전 재난 상황에서 무사히 생존한 노인의 경우 이번 재난 상황에서도 이전처럼 안전하게 지나갈 것이라고 생각하여 
                    대피 명령 등을 따르지 않아 위험한 상황에 더 노출되는 경우도 있음<br/>
                  - 노인들이 대피 행동이나 구호 요청을 적극적으로 하지 않는 것은 재난으로부터의 회복을 어렵게 할 수 있으며, 
                    이러한 어려움을 해결하기 위해서는 일반 성인에게 서비스를 제공할 때보다 더 직접적이고 적극적으로 움직이는 것을 고려해야 함.<br/><br/>
                  <b>※ 취약한 노인들은 다음의 몇 가지 유형으로 구분할 수 있음 :</b><br/>
                  - 노쇠하거나 장애가 있는 단절 된 노인, 단독가구 노인<br/>
                  - 단절된 노인 부부 혹은 부부 중 한 사람 또는 두 사람 모두 장애가 있는 노인 부부<br/>
                  - 어린 부양가족이 있는 단절된 노인<br/>
                  - 가족과 함께 지내고 있으나 가족의 지지를 받지 못하며 단절된 노인
                  </BoxContent>
              </BoxContainer><br/>

            </>
          )}<br/>

          <DropdownButton
            isOpen={selectedChapter === 'ch23'}
            onClick={() => toggleChapter('ch23')}
          >
            시기별 반응
          </DropdownButton>
          {selectedChapter === 'ch23' && (
            <>
            </>
          )}<br/>

          <DropdownButton
            isOpen={selectedChapter === 'ch24'}
            onClick={() => toggleChapter('ch24')}
          >
            상실에 대한 대처방법
          </DropdownButton>
          {selectedChapter === 'ch24' && (
            <>
            </>
          )}
        </ButtonBox>
      </Content>
      <BottomNav />
    </AppContainer>
    </>
  );
};

export default DMHMDefinition2;
