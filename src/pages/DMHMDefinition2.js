import React, { useState, useEffect } from 'react';
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
  padding-bottom: 100px;
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

const GridImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const GridText = styled.div`
  font-size: 0.9rem;
  color: #656565;
  line-height: 1.5;
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

const TopButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  color: #FFD651;
  border: 2px solid #FFD651;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 100;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  bottom: 50px; 
  right: 20px; 


  &:hover {
    background-color: #FFD651;
    color: white;
  }
`;


const DMHMDefinition2 = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubButton, setSelectedSubButton] = useState(null);
  const [selectedStage, setSelectedStage] = useState('stage0');
  const [showTopButton, setShowTopButton] = useState(false);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleChapter = (chapter) => {
    if (selectedChapter === chapter) {
      setSelectedChapter(null);
      setSelectedSubButton(null);
    } else {
      setSelectedChapter(chapter);

      // '일반적인 반응' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch21') {
        setSelectedSubButton('generalReactions');
      }

      // '연령별 반응' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch22') {
        setSelectedSubButton('ageReactions');
      }

      // '시기별 반응' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch23') {
        setSelectedSubButton('timeReactions');
      }

      // '상실에 대한 대처 방법' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch24') {
        setSelectedSubButton('whatIsLoss');
      }

      setSelectedStage('stage0'); // 기본 Stage 버튼 초기화
    }

   // 스크롤을 페이지 상단으로 이동
   window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   // TOP 버튼
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    // 맨 위로 가는 함수
    const scrollToTop = () => {
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
              아직은 이런 상태가 아니라 하더라도, 아래 적힌 방법에 따라 노력을 해보기를 권합니다. 당신이 이 끔찍한 일들을 받아들이고, 그와 관련된 괴로움을 줄이는데 도움이 될 것입니다.​</p><br/>

              <GridContainer>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/stress.png" alt="Stress Management" />
                  <GridText style={{paddingLeft: '15px'}}>극도의 스트레스를 받을만한 사건이 발생했음을 그대로 받아들이세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/exercise.png" alt="Exercise" />
                  <GridText style={{paddingLeft: '15px'}}>충분한 휴식, 일상적인 운동과 균형 잡힌 식사를 통해 당신 스스로를 소중히 여기세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/no-alcohol.png" alt="No Alcohol" />
                  <GridText style={{paddingLeft: '15px'}}>술과 커피를 줄이고 담배를 끊어보세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/relax.png" alt="Relaxation" />
                  <GridText style={{paddingLeft: '15px'}}>긴장을 풀 수 있는 시간을 가지세요.
                  (예 :음악듣기, 목용하기, 심호홉, 명상 등)</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/normal-life.png" alt="Return to Normal" />
                  <GridText style={{paddingLeft: '15px'}}>평범한 일상생활들을 다시 조금씩 시작해 보세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/emotions.png" alt="Control Emotions" />
                  <GridText style={{paddingLeft: '15px'}}>당신의 감정을 억누르려 하지 마세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/delay.png" alt="Decision Delay" />
                  <GridText style={{paddingLeft: '15px'}}>충격적 사고를 겪은 직후라면, 이사나 이직 같은 큰 결정은 잠시 뒤로 미뤄두세요.<br/>
                  식사나 옷 같은 일상의 작은 결정을 통해 여전히 내가 내 삶의 주인임을 깨달아보세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/family.png" alt="Support System" />
                  <GridText style={{paddingLeft: '15px'}}>주변의 친한 사람들과 함께 시간을 보내주세요.<br/>
                  끔찍한 사건에 관한 이야기가 나올까 봐 두려울 수 있지만, 너무 고독해지지 않도록 노력하세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/talk.png" alt="Talk to Someone" />
                  <GridText style={{paddingLeft: '15px'}}>당신을 이해해줄 수 있는 사람들과 이야기해보세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/news.png" alt="Limit Media" />
                  <GridText style={{paddingLeft: '15px'}}>신문방송, 인터넷 등은 정규방송을 통해 사고와 수습에 대한 정확하 정보를 얻는 것 정도로 충분해요.<br/>
                  재난의 과정을 반복적으로 보는 일을 피하시기를 권해요.</GridText>
                </GridItem>
              </GridContainer>
          </TextBox>
        );
      case 'familyTreatment':
        return (
          <TextBox>
            <h2>1. 고통스러운 일을 겪은 친구와 가족들을 위하여</h2>
            <p>정신적 충격을 받은 후, 많은 사람들은 고통, 슬픔, 자책감, 분노를 느끼며 비탄에 빠집니다.​<br/>
              이를 극복하는 것은 매우 어려워 보일 것이며, 도대체 무슨 일이 일어났는지 실감하고 받아들이는데도 시간이 걸릴 것입니다.​<br/>
              그러나 이런 감정들은 보통 ‘몇 주에 걸쳐’ 조금씩 나아집니다. 이 시기에 가족과 친구들의 도움은 특히 중요합니다. 
              아래의 방법들을 통해 고통 받는 친구들과 가족들을 도울 수 있을 것입니다.</p><br/>
              <GridContainer>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/problem.png" alt="Problem" />
                  <GridText style={{paddingLeft: '15px'}}>친구 혹은 가족들이 충격적인 사건을 경험했음을 인지하세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/media.png" alt="Media" />
                  <GridText style={{paddingLeft: '15px'}}>사고 당사자들이 사고에 대한 매체의 보도를 접하는 일에 신중을 가할 수 있도록 도와주세요</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/time.png" alt="Time" />
                  <GridText style={{paddingLeft: '15px'}}>충분한 휴식, 긴장이완, 규칙적 운동과 식사를 통해 
                    그들이 스스로를 돌볼 수 있도록 격려해주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/entertain.png" alt="Entertain" />
                  <GridText style={{paddingLeft: '15px'}}>그들이 즐길만한 일을 할 수 있도록 도와주세요</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/effort.png" alt="Effort" />
                  <GridText style={{paddingLeft: '15px'}}>회복을 위한 그들의 노력과 성과를 인정해 주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/cant.png" alt="Can't" />
                  <GridText style={{paddingLeft: '15px'}}>대화를 통해 그들을 안심시켜주고, 분명히 나아진다는 확신을 주는 것이 중요해요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/anger.png" alt="Anger" />
                  <GridText style={{paddingLeft: '15px'}}>사고에 대해 이야기하는 것 자체로 화를 낼 수 있다는 것을 이해해야해요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/conversation.png" alt="Conversation" />
                  <GridText style={{paddingLeft: '15px'}}>만약 대화를 이어나가기 힘들어 보인다면, 다른 시간을 내어 이야기해 보는 것이 좋아요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/reaction.png" alt="reaction" />
                  <GridText style={{paddingLeft: '15px'}}>그들의 이야기를 적절히 반응하고, 
                    맞장구를 치며 그들을 이해하고 있음을 보여주세요.</GridText>
                </GridItem>
              </GridContainer><br/>
              <h2>2. 재난을 경험한 가까운 사람에게 사회적 지지 제공하기</h2>
              <ImgBox><img src="/DMHM-images/사회적지지(1).png" alt="사회적 지지(1)" /></ImgBox>
              <ImgBox><img src="/DMHM-images/사회적지지(2).png" alt="사회적 지지(2)" /></ImgBox>
              <ImgBox><img src="/DMHM-images/사회적지지(3).png" alt="사회적 지지(3)" /></ImgBox>
          </TextBox>
        );
        case 'ageReactions':
          return (
            <>
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
          );
        case 'childrenTreatment':
          return (
            <>
              <h2>1. 재난에서 아이들의 마음건강 지키기</h2>
              <ImgBox><img src="/DMHM-images/아동마음대처(1).png" alt="아동마음대처(1)" /></ImgBox><br/>

              <h2>2. 사랑하는 나의 아이를 위하여</h2>
              <p>아이들이 경험하는 사고의 충격은 인생을 살아가는데 있어 가장 첫 번째의 엄청난 시련일 수 있습니다.<br/>
              아이들은 그들이 느끼는 감정을 표현하는 능력이 약할 수 있어 제대로 표현하지 못하거나 스스로를 억압할 수 있습니다.
              결과적으로 오랜 기간 후에 억압되어 있던 감정을 다시 느끼게 되는 겁니다. 
              아이에게 자신의 슬픔을 표현할 수 있도록 기회를 제공한다면 아이의 고통을 줄이고 안전감을 갖도록 도와줄 것입니다.</p>

              <GridContainer>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/care.png" alt="Care" />
                  <GridText style={{paddingLeft: '15px'}}>아이들이 안전하고 보살핌 받고 있다고 안심시켜주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/talk-about.png" alt="Talk About" />
                  <GridText style={{paddingLeft: '15px'}}>아이가 준비가 되면, 함께 충격적인 경험에 대해 말할 수 있도록 들어주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/special-attention.png" alt="Special Attention" />
                  <GridText style={{paddingLeft: '15px'}}>취침 시, 아이에게 특별한 관심을 주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/emotional-support.png" alt="Emotional Support" />
                  <GridText style={{paddingLeft: '15px'}}>감정 표현을 격려해주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/family-time.png" alt="Family Time" />
                  <GridText style={{paddingLeft: '15px'}}>가족이 다 같이 활동을 즐겨주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/family-role.png" alt="Family Role" />
                  <GridText style={{paddingLeft: '15px'}}>가족의 역할을 유지해주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/sad-to-happy.png" alt="Sad to Happy" />
                  <GridText style={{paddingLeft: '15px'}}>애도 방법에 대해 아이에게 가르칠 필요는 없어요. 
                    슬픔은 행복의 표현처럼 자연스러운 반응으로 이해하도록 해주세요.</GridText>
                </GridItem>
                <GridItem style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <GridImage src="/DMHM-images/understand-death.png" alt="Understand Death" />
                  <GridText style={{paddingLeft: '15px'}}>죽음에 대해 연령에 맞게 이해시켜주세요.</GridText>
                </GridItem>
              </GridContainer>

              <h2>3. 재난을 경험한 부모를 위한 TIP</h2>
              <ImgBox><img src="/DMHM-images/아동마음대처(2).png" alt="아동마음대처(2)" /></ImgBox><br/>

            </>
          );
        case 'elderlyTreatment':
          return (
            <>
              <h2>노인을 위한 대처요령</h2>
              <ImgBox><img src="/DMHM-images/노인마음대처.png" alt="노인마음대처" /></ImgBox>
            </>
          );
        case 'disabilityTreatment':
          return (
            <>
              <h2>치매-장애인을 위한 대처</h2>
              <ImgBox><img src="/DMHM-images/치매장애인대처(1).png" alt="치매장애인대처(1)" /></ImgBox><br/>
              <ImgBox><img src="/DMHM-images/치매장애인대처(2).png" alt="치매장애인대처(2)" /></ImgBox><br/>
              <ImgBox><img src="/DMHM-images/치매장애인대처(3).png" alt="치매장애인대처(3)" /></ImgBox><br/>
            </>
          );  
        case 'timeReactions':
          return (
            <>
              <h2>1. 급성기 (재난 후 3-7일 이내)</h2>
                <GrayBox>
                - 재난이 발생한 직후의 시기이며 최우선적으로 신체적인 도움을 받아야 함<br/>
                - 심리적인 피해는 아직 파악되기 어려움<br/>
                - 피해자에게 어떤 일이 발생했는지 사태를 파악하기도 어려움<br/>
                - 망연자실하여 판단력이나 현실감을 잃는 등 급성 스트레스 반응을 나타내기도 함<br/>
                - 정신이 멍해지고 마비되는 증상을 보이거나 자신이 있는 곳과 사람들이 낯설게 느끼기도 함<br/>
                - 이러한 상태는 자신을 보호하는 일종의 방어적 반응인데, 심한 외상적 충격에서 스스로를 보호하기 위해 
                  ‘마치 나쁜 꿈을 꾸고 있는 것 같다’거나 극단적인 경우에는 ‘아무 일도 일어나지 않았다’고 보고하는 경우도 발생함<br/>
                - 보통 재난 직후에 나타나며, 얼핏 생존자가 현저하게 침착한 행동을 하는 것처럼 보이기도 함<br/>
                - 단기적으로는 이런 억압, 부정, 격리가 자연스럽고 필요한 반응일 수 있지만, 사람에 따라서는 이것이 지속되기도 하며, 
                  재난 경험을 극복하는 데 방해가 되기도 함
                </GrayBox><br/>
              <h2>2. 아급성기 (재난 후 1-3개월 이내)</h2>
                <ImgBox><img src="/DMHM-images/불안공포반응.png" alt="불안공포반응" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>불안·공포 반응</BoxTitle>
                    <BoxContent>
                    - 외상 사건을 실감하게 되면 불안∙공포 반응이 나타나는데, 이는 투쟁-도피반응에서 일어나는 정상적인 생물학적 반응임<br/>
                    - 사고가 났다는 사실에 대해 극도로 무서워하면서 불안해하고, 또다시 사고를 당하지나 않을까 두려워함<br/>
                    - 사건 장면이 자꾸 떠오르거나 악몽을 꾸기도 함<br/>
                    - 생존자들은 죽음에 대한 이미지를 수시로 경험하며, 이는 깨어 있을 때도 불시로 떠오르며, 악몽으로 나타나기도 함<br/>
                    - 잘리거나 으깨어진 신체 부위, 비명, 몸에서 흐르는 피, 타는 냄새 등의 플래시백으로 표현되기도 함<br/>
                    - 이에 따른 공포와 불쾌감이 크기 때문에 사건을 연상시키는 장소나 사람 등 관련된 자극을 전부 피하고자 함<br/>
                    - 작은 자극에도 소스라치게 놀라고 예민해져서 주위 사람에게 화를 내는 일이 잦아지며,‘ 왜 하필 나한테 이런 일이 일어났는가?’라는 분노가 치밀어 오르기도 하는데, 가족과 의료진에게 분노의 감정을 투사하기도 함
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/애도반응과우울.png" alt="애도반응과우울" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>애도 반응과 우울</BoxTitle>
                    <BoxContent>
                    - 외상후스트레스장애(Post-Traumatic Stress Disorder, PTSD) 증상과 함께 가족이나 친구, 친지의 죽음 등 상실에 대한 반응으로
                      우울감 및 애도 반응이 나타나는 시기이기도 함<br/>
                    - 기분이 가라앉고, 아무것도 하고 싶지 않으며, 잠도 오지 않고 식욕도 감소함. 간혹 심한 감정 기복을 호소하는 경우도 발생함<br/>
                    - 앞날에 대해서 부정적인 생각에 사로잡혀서 다시는 예전과 같은 생활을 할 수 없을 것이라는 비관적 생각을 하기도 함<br/>
                    - 사람들이 정서적으로 멀게 느껴지며, 사람들과 친하게 지내는 것이 어렵게 느껴지기도 함<br/>
                    - 친밀감, 행복, 성적인 감정 등의 긍정적인 감정을 지속적으로 느끼는 데 어려움이 생김. 
                      극단적으로는 어떠한 정서도 표현하지 못하게 됨
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/죄책감.png" alt="죄책감" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>죄책감</BoxTitle>
                    <BoxContent>
                    - 생존자는 자신이 살아남은 것에 대한 실존적인 죄책감과 함께 재난현장에서 했던 자신의 행동에 대해 죄책감을 느끼게 됨<br/>
                    - 자녀를 잃고 자신만 살아난 사람이나 여러 사람 중에 자신만 살아난 사람은 죄책감을 더 크게 느끼게 됨<br/>
                    - 죄책감은 많은 경우 과도한 책임감이나 후회와 관련을 보임<br/>
                    - 자신이 어떤 행동을 하지 말았어야 했는데, 반대로 어떤 행동을 했어야 했는데 하고 생각하기도 함<br/>
                    - 보통 자신이 하지 않은 행동에 대해 더 큰 죄책감을 느끼게 되며, 이는 만약 내가 어떻게 하기만 했더라면 
                      상황이 달라졌을 것이라고 생각하면서 자신의 책임에 대해 과대 해석하고 불필요하게 자책하기 때문에 발생함<br/>
                    - 그러나 많은 경우 사건 현장에서는 그 일을 막을 수 있었던 여력이나 선택권이 없었으며, 
                      의사결정의 결과를 예측하기 힘든 경우가 많음<br/>
                    - 자신이 성격적으로 혹은 도덕적으로 문제가 있는 사람이라서 외상 사건을 막지 못했다는 생각을 하면 
                      더욱 심한 자기 비하에 시달리기도 함<br/>
                    - 간혹 자신이 현장에서 한 행동이나 하지 않았던 행동을 다른 사람들이 알게 되면 비난할지도 모른다는 두려움 때문에 
                      죄책감을 계속 숨기고 있는 경우도 발생함<br/>
                    - 생존자가 죄책감을 느끼는 경우 사람들로부터 자신을 고립시키게 되고, 
                      대처할 때에도 다른 사람의 도움을 거절하려는 경향이 생기고, PTSD로 이어질 가능성이 더 크게 나타남.
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/불신과고립감.png" alt="불신과고립감" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>불신과 고립감</BoxTitle>
                    <BoxContent>
                    - 재난 피해자는 자신과 타인, 세상에 대한 지속적이고 비정상적인 부정적 믿음을 가지기도 함<br/>
                    - 세상을 너무 위험한 곳으로만 바라보며, 간혹 자신이나 타인을 극단적으로 부정적으로 보고 
                      자신에게 심각한 문제가 있거나 타인은 아무도 믿을 수 없다고 생각하기도 함<br/>
                    - 가족, 친척, 친구 등이 공감과 동정을 갖고 만나러 와 주는 시기이지만, 정작 본인은 사람들이 동정 어린 시선을 불편해함<br/>
                    - 자신의 경험에 대해 매우 특별하게 생각하면서 다른 사람들은 결코 이해하지 못할 것이라며 자신들끼리 소그룹을 형성하기도 함<br/>
                    - 생존자 특유의 정체성을 가지고 다른 사람에 대해 분노나 일종의 집단행동을 보임으로써 통제감을 얻고자 하지만, 
                      이런 태도는 계속해서 피해자로 살아가게끔 만드는 부작용을 일으키기도 함<br/>
                    - 주위 사람들이 자신의 외상 사건을 듣기 싫어한다고 생각하는 경우도 있는데, 이때는 자신의 느낌을 
                      아무에게도 털어놓지 못하고 자신을 이해해 줄 사람이 없다고 느끼면서 타인들로부터 고립되거나 소외된 느낌을 받기도 함<br/>
                    - 재난 피해자를 맞아들이는 직장이나 학교 등에서 이들의 심리 상태와 부담감에 대한 이해 없이 
                      단순한 호기심이나 동정하는 태도로 대하면 재난 피해자는 더욱 고립감을 느끼며 적응에 어려움을 겪게 됨<br/>
                    - 직장 상사나 학교 선생님은 빠른 복귀가 피해자의 회복에 도움을 준다고 생각해 무리하게 밀어붙이는 경우가 있는데, 
                      충분한 준비가 되어 있지 않은 경우 결국 사회 복귀의 실패로 이어져 더 큰 좌절감과 불신감을 초래할 가능성이 높음<br/>
                    - 피해자의 이름과 주소가 알려지는 경우 매스컴의 취재가 시작되며 피해자는 그것을 견디기 힘들어하고 취재가 두려워 
                      전화도, 외출도 하지 못하는 경우가 발생함
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/인지능력의변화.png" alt="인지능력의변화" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>인지 능력의 변화</BoxTitle>
                    <BoxContent>
                    - 발생한 외상 사건의 특정한 부분이나 전체를 기억하지 못하기도 함<br/>
                    - 이는 외상 사건에 대한 기억상실은 두부외상이나 기존의 알코올 중독 때문일 수도 있고 
                      해리성 기억상실 현상일 수도 있어 신체검사와 과거력 문진을 통해 감별을 해야 함<br/>
                    - 해리는 의식, 기억, 주체성, 환경 지각의 통합적인 기능이 붕괴하는 증상으로 외상 사건 직후 발생 가능함<br/>
                    - 시간이 굉장히 느리게 가는 듯이 느껴지고, 사건의 순서가 혼동되는 등의 지각장애가 생기기도 함<br/>
                    - 사건에 대한 기억상실 외에도 전반적인 기억력의 저하를 호소하는 경우도 흔함<br/>
                    - 집중력이 떨어져 업무 처리에 어려움을 겪음<br/>
                    - 전반적인 단기 기억력도 떨어져 같은 일을 여러 번 묻기도 함
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/신체증상.png" alt="신체증상" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>신체 증상</BoxTitle>
                    <BoxContent>
                    - 신체증상은 재난 중 발생한 부상이나 기존 신체 질환의 악화가 원인인 경우도 있고, 재난 충격으로 인한 스트레스 반응이기도 함<br/>
                    - 피로감, 두통, 위장관 증상, 불면증, 식욕 저하, 면역력 저하, 근골격계 증상 등이 흔함<br/>
                    - 신체증상이 동반되면 우울감, 비관 등의 심리 반응에 악영향을 미쳐, 활동이 위축되어 사회적 기능의 회복도 늦춰짐<br/>
                    - 재난 초기부터 동반된 신체증상이 있는지 조사하고 적극적인 치료적 개입이 이루어져야 함
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/물질남용.png" alt="물질남용" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>물질 남용</BoxTitle>
                    <BoxContent>
                    - 술이 괴로운 기억과 불안은 물론 신체적 아픔을 달래준다는 것은 잘못된 믿음으로, 
                      사고 후 음주량이 늘거나 향정신성 약물에 탐닉하게 되면 장기적으로 술이나 약물의 남용이나 의존성을 유발하고, 
                      큰 해악을 끼치게 됨<br/>
                    - 개인의 건강에 악영향을 미치고, 가족 간 관계를 손상시키며, 더 나아가 사회 문제가 될 가능성을 가짐<br/>
                    - 급성기부터 술을 남용하지 않도록 주의시켜야 함
                    </BoxContent>
                </BoxContainer><br/>
              <h2>3. 만성기 (재난 3개월 이후)</h2>
                <ImgBox><img src="/DMHM-images/심리적인문제.png" alt="심리적인문제" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>심리적인 문제</BoxTitle>
                    <BoxContent>
                    - 초조와 불안, 쉽게 화를 내는 증상이 계속<br/>
                    - 이러한 증상은 스스로 조절이 잘 되지 않음<br/>
                    - 피해자는 수일이 지나도 증상이 회복되지 않는 것을 초조해하고 치료 자체에 대한 의문을 가짐<br/>
                    - ‘왜 내가 이렇게 되어야만 하는가?’라는 생각으로 분노의 감정을 분출함<br/>
                    - 죄책감, 우울 증상이나 피폐감이 강해짐<br/>
                    - 사고 전의 일생생활로 돌아갈 수 없음에 초조해짐<br/>
                    - 회복의 희망을 잃은 피해자도 나타남<br/>
                    - 열상이나 방사선 피폭 장해 등 심각한 신체적 후유증이 있는 경우에는 특히 그러함<br/>
                    - 절망감에 빠져 자살을 시도하는 사람이나 자포자기하는 행동에 빠지는 사람이 생김<br/>
                    - 친한 동료나 친구를 잃은 경우나 유족의 경우 심각한 애도 반응이 지속될 수 있음
                    </BoxContent>
                </BoxContainer><br/>
                <ImgBox><img src="/DMHM-images/사회환경적문제.png" alt="사회환경적문제" /></ImgBox>
                <BoxContainer>
                  <BoxTitle>사회환경적 문제</BoxTitle>
                    <BoxContent>
                    - 피해자의 회복이 늦어지는 데 대해, 주변 사람들의 이해가 떨어지기 시작함<br/>
                    - 피해자의 정신적 증상이 유약하기 때문이거나 성격 문제 등으로 취급되어 결과적으로 피해자의 고립감과 불신감은 더욱 심해짐<br/>
                    - 순조롭게 회복하는 피해자와 그렇지 않은 피해자의 비교가 표면화되면서 피해자 간의 불신이나 억측을 낳을 수 있음.<br/>
                    - 형사 소송이나 민사 소송 등 법적 문제가 생길 수 있음. 현재의 사법 제도 하에서 재판은 장기화할 수밖에 없어 
                      피해자 간의 갈등이 심해지기도 함, 이차 스트레스로 인해 정신적 증상이 악화되기도 함<br/>
                    - 종업원이나 승무원의 경우 신체증상이 가벼워도 정신적 증상이 심할 경우에는 복직 여부가 주요한 이슈가 됨<br/>
                    - 알코올 의존 등 약물 의존 문제가 표면화됨.<br/>
                    - PTSD 증상이 심하지만 적절한 의학적 조언을 받고 있지 않은 피해자라면 일상생활의 대처 수단으로 
                      물질이나 약물에 의존할 수밖에 없음, 이 경우 의존 경향이 장기화하는 경우도 있으니 주의해야 함<br/>
                    - 흔히 기념일 반응이 일어남, 재해 발생의 시간대와 날짜, 요일 등 사고를 상기시키게 하는 것은 
                      많은 피해자에게 여러 심리 반응과 강한 비탄 반응을 일으킬 수 있음
                    </BoxContent>
                </BoxContainer><br/>
            </>
          );  
        case 'timeTreatment':
          return (
            <>
              <h2>시기별 대처요령</h2>
              <ImgBox><img src="/DMHM-images/시기별대처요령.png" alt="시기별대처요령" /></ImgBox>
            </>
          );
        case 'whatIsLoss':
          return (
            <>
              <h2>상실이란?</h2>
              <ImgBox><img src="/DMHM-images/상실이란.png" alt="상실이란" /></ImgBox>
              <TextBox>
              상실이란 일반적으로 가치 있다고 생각하는 어떤 대상과의 관계가 끊어지거나 헤어지는 것, 
              가치 있다고 생각하는 것을 박탈당함을 뜻하며, 상실감은 무엇인가를 잃어버린 후의 느낌이나 감정 상태를 말합니다. 
              상실에는 관계의 상실, 물질적 상실, 역할의 상실 등 여러 가지 유형이 있지만 
              흔하게는 소중하게 여기는 사랑하는 대상의 죽음을 상실로 여깁니다.
              </TextBox><br/><br/><br/>
            </>
          );
        case '4ways':
          return (
            <>
              <h2>애도의 4가지 과정</h2>
              <TextBox>
              - 극심한 슬픔의 기간은 약 6개월에서 1년가량 지속되는 것으로 알려져 있습니다.<br/>
              - 상실을 경험한 사람들은 일반적으로 다음과 같은 과정을 거치며 상실과 새로운 삶에 적응하게 됩니다.<br/>
              - 네 가지 과정은 반드시 순차적인 것은 아니며, 순서와 상관없이 혼재되어 경험할 수 있습니다.
              </TextBox><br/>

              <h3>1 .상실을 현실로 받아들이기</h3>
              <GrayBox>
              - 사랑하는 사람의 죽음을 이성적, 감정적으로 받아들이는 시기입니다.<br/>
              - 상실을 받아들이는 것에 대한 회피, 부정하고자 하는 것이 일반적인 반응입니다. 
                그러나 오랜 기간 과도한 회피는 애도의 진행과 회복에 방해가 될 수 있습니다.
              </GrayBox><br/>

              <h3>2. 상실로 인한 고통을 충분히 경험하기</h3>
              <GrayBox>
              - 애도의 과정에서 수반되는 고통을 오롯이 겪어내는 것입니다.<br/>
              - 고통을 억누르려고 하면 신체적 통증, 과도한 음주, 약물 사용 등 부적응적인 방식이 나타날 수 있습니다.<br/>
              - 심적 고통에 직면하여 안전하고 지지적인 환경에서 건강하게 표현하고 충분히 겪어낼 때 건강한 회복이 시작됩니다.
              </GrayBox><br/>

              <h3>3. 고인이 없는 환경에 적응하기</h3>
              <GrayBox>
              - 고인이 없는 새로운 환경에 적응하는 것을 의미하며, 
                이는 일상생활과 같은 외적 환경 뿐 아니라 내적·영적 차원에서의 적응도 포함합니다.<br/>
              - 고인이 생전에 해왔던 역할들을 감당하게 되면서 원망이나 그리움이 짙어질 수 있으며 
                스스로가 아무것도 할 수 없는 사람처럼 느껴질 수 있습니다.<br/>
              - 새로운 역할을 해내고 고인이 없는 세상에 적응하기 위해 주변의 다양한 자원과 적응적인 대응전략을 개발하고 잘 활용해야합니다.
              </GrayBox><br/>

              <h3>4. 고인과의 관계를 재배치하고 자신의 삶을 이어나가기</h3>
              <GrayBox>
              - 애도는 고인에 대한 사랑과 기억을 끊어내는 것이 아니라 오히려 고인을 온전하게 기억하고 마음속에 재배치함으로써 
                고인에 대한 기억을 간직한 채 살아가는 것입니다.<br/>
              - 고인이 없는 삶 속에서도 자신과 사랑하는 사람들, 즐거운 활동에 대한 긍정적인 감정을 유지하는 것입니다.
              </GrayBox><br/><br/><br/>
            </>
          );
        case 'lossTreatment':
          return (
            <>
              <h2>스스로를 돌보기</h2>
              <TextBox>
              - 사별의 적응에는 시간이 오래 걸리니 너무 불안해하거나 조급해 하지 말고 
                식사, 수면 등 일상생활을 유지하는데 필요한 일들을 수행하기 위해 조금씩 노력하는 것이 중요합니다.<br/>
              - 갑자기 심한 죄책감 등으로 인한 격정적으로 눈물이 쏟아진다거나 심하게 외로운 기분에 휩싸이는 것도 자연스러운 감정적 반응입니다. 
                억지로 피하려고 하지 마시고 슬플 때는 우는 것이 좋습니다.<br/>
              - 재난 상황이 떠올라 두렵거나 왜 나한테 이런 일이 닥쳤는지 생각하면서 심한 분노를 느낄 수도 있습니다. 
                이런 때에 심장이 두근거리고 호흡이 가빠질 수도 있는데, 이런 경우 천천히 심호흡을 하면서 마음을 가다듬는 것도 도움이 됩니다.<br/>
              - 정상적으로 적응한 후에도 기일이나 기념일 등 평소보다 더욱 고통스러울 수 있는 때를 
                미리 예상하고 대비책을 마련하여 연습하면 조절감을 느끼고 극복해나갈 수 있는 힘을 얻을 수 있습니다.
              </TextBox><br/>

              <h2>믿을만한 주변 사람에게 도움을 청하기</h2>
              <TextBox>
              - 상실을 겪은 후 혼자서 지나치게 오랜 시간을 보내는 것은 좋지 않습니다.
              - 일상생활에서의 어려움에 관해 도움을 청하거나, 혼자 감당하기 힘든 슬픔을 함께 나누는 것이 좋습니다.
              - 분노나 격한 감정을 느낄 때, 믿을만한 사람과 이야기를 나누는 것은 도움이 될 수 있습니다.
              </TextBox><br/><br/><br/>
            </>
          );
        case 'parentLoss':
          return (
            <>
              <h2>유년기에 경험하는 부모의 사별</h2>
              <TextBox>
              - 아이들이 상실을 애도하는 능력은 인지적·정서적 발달과 관련되어 있습니다. 
                애도할 수 있는 능력이 몇 살부터 가능한지에 대한 학자들의 의견이 일치되지는 않지만, 
                일반적으로 대상 항상성을 획득하고 시간의 영원성, 불가역성 등에 대해 이해할 수 있는 나이의 아이들은 
                애도할 수 있는 능력을 갖추고 있다고 여겨집니다.<br/><br/>
              - 부모를 잃는 경험을 아동·청소년 시기에 경험하는 경우, 애도 과정을 건강히 겪어내는데 실패한다면 
                성인기에 기분장애나 대인관계의 어려움을 경험할 확률이 높아집니다. 
                가족과 가까운 어른들은 가능한 한 많은 시간을 그 아이와 함께 보내고, 
                아이가 자신의 소중한 사람을 잃은 아이가 슬픔이나 분노 등의 감정을 숨기지 않고 
                자유롭게 표현해도 된다고 알려주어야 합니다. 부모의 장례식 참석여부에 대한 선택권을 주고 
                준비에 포함시키는 것은 긍정적인 효과를 가져올 수 있습니다.<br/><br/>
              - 아이가 아래에 나열된 증상을 가지고 있는 경우는 심각하게 생각하는 것이 좋습니다.
              </TextBox><br/>
              <GrayBox>
              - 너무 오랫동안 일상적인 활동이나 사건에 흥미를 잃고 우울에 빠져 지낸다.<br/>
              - 너무 오랫동안 잠을 못 자고 식욕이 없고 혼자 있는 것을 두려워한다.<br/>
              - 너무 오랫동안 나이보다 어린 아이처럼 행동한다.<br/>
              - 죽은 사람의 행동과 말투를 지나치게 따라한다.<br/>
              - 죽은 사람과 함께 있고 싶다고 여러 번 말한다.<br/>
              - 친구와 어울려 놀지 않는다.<br/>
              - 학교 성적이 급격히 떨어지거나 학교에 가는 것을 거부한다.<br/><br/>
              만약 이러한 증상이 나타난다면 전문가의 도움이 필요합니다. 
              아이가 소중한 사람의 죽음을 받아들이고 주변 사람들이 아이의 회복 과정을 지원하기 위하여 정신건강전문가가 도움이 될 것입니다.
              </GrayBox><br/><br/><br/>
            </>
          );
        case 'Q&A':
          return (
            <>
              <BoxContainer>
                <br/>
                <BoxTitle>Q1. 사별 후 심리적 장애를 겪는 사람들은 주로 어떤 심리적 반응을 보이나요?</BoxTitle>
                  <BoxContent>
                  A1. 전문가들의 조사에 의하면, 심리적 어려움을 겪는 사람들은 다음과 같은 반응을 보입니다.<br/>
                  - 사랑하는 사람의 죽음과 고인을 생각나게 하는 것들에 대한 지나친 집중<br/>
                  - 죽은 사람에 대한 강한 그리움과 갈망<br/>
                  - 죽음을 받아들이는 것이 힘듦<br/>
                  - 죽음과 관련된 사건에 관한 분노<br/>
                  - 일상에 대한 무감각 혹은 무심함<br/>
                  - 일상적인 생활을 해나가는데 문제가 있음<br/>
                  - 사회 활동을 멀리함<br/>
                  - 다른 사람들을 믿지 못함<br/>
                  - 삶에 어떠한 의미나 목적도 없다고 느낌<br/>
                  - 고인의 목소리가 들리거나 고인이 내 앞에 서있는 것을 봄<br/><br/>
                  위와 같은 반응은 사별 후 심리적 어려움을 크게 겪지 않는 사람들에게서도 나타날 수 있습니다.<br/>
                  하지만 이들에게서는 사별 후 일반적인 심리적 적응 과정을 거치는 동안 이런 반응들이 사라집니다. 
                  학계에서는 6개월이 지난 후에도 위와 같은 증상을 보인다면 ‘복잡성 애도(Complicated grief)’를 
                  겪고 있을 가능성이 높다고 보고 있습니다.
                  </BoxContent>
              </BoxContainer><br/>
              <BoxContainer>
                <BoxTitle>Q2. 사별을 경험한 사람 중에서 얼마만큼의 사람들이 심리적 어려움을 경험하나요?</BoxTitle>
                  <BoxContent>
                  A2. 서구의 연구 결과에 의하면 일반적으로 사별을 경험한 사람들 중 5% 정도가 복잡성 애도 등의 사별 후 
                  심리적 어려움을 갖고 있다고 보고되고 있습니다. 
                  우울증 등의 심리적 어려움을 겪는 사람들을 대상으로 한 연구에서는 약 20% 수준으로 높게 나타나고 있습니다.<br/>
                  우리나라에서는 65세 이상 노인 2천여 명을 대상으로 2014년에 처음 복잡성 애도 유병률 연구가 시행되었는데 
                  5% 수준인 것으로 보고되었습니다.
                  </BoxContent>
              </BoxContainer><br/>
              <BoxContainer>
                <BoxTitle>Q3. 흔히 알려져 있는 우울증, 외상 후 스트레스 장애와 복잡성 애도 등의 사별 후 심리적 어려움은 다른가요?</BoxTitle>
                  <BoxContent>
                  A3. 우울증상은 그 원인이 불명확한데 반해, 복잡성 애도는 모든 증상이 고인 혹은 죽음과 관련되어 있습니다.<br/>
                  외상 후 스트레스 장애는 죽음과 관련된 기억을 피하는 것이 주요 증상인데 반해, 
                  복잡성 애도는 고인이나 죽음과 관련된 기억에서 오히려 벗어나지 못하는 것이 일반적인 특징이기도 합니다. <br/>
                  그리고 최근의 뇌 사진 연구 등에서도 외상 후 스트레스 장애와 복잡성 애도는 다른 반응 형태를 띠는 것으로 나타나고 있습니다.
                  하지만 복잡성 애도를 가진 사람에게서 우울증과 외상 후 스트레스 장애가 많이 발견된다고 합니다. 
                  따라서 복잡성 애도를 갖고 있다고 해서 우울증이나 외상 후 스트레스 장애에 대한 정신치료나 약물치료가 필요할 수 있습니다.
                  </BoxContent>
              </BoxContainer><br/>
              <BoxContainer>
                <BoxTitle>Q4. 자녀의 죽음의 경우에도 치료가 효과적일 수 있을까요?</BoxTitle>
                  <BoxContent>
                  A4. 자녀의 죽음은 우리가 직면할 수 있는 심리적 고통 중에 가장 큰 것일 것입니다. 
                  상실의 감정을 극복하기도 어려울뿐더러, 자녀가 없는 새 삶에 적응하는 것도 힘듭니다.<br/>
                  자녀의 죽음을 겪은 부모는 일반적으로 "왜 그것을 막지 못했을까?"혹은 
                  때때로 "왜 내 아이가 그렇게 무모하고 부주의했을까?"와 같은 어려운 질문과 씨름합니다.<br/>
                  자녀의 죽음을 경험한 부부는 고통스러운 기억을 공유하고 있기 때문에 서로에게 힘이 되어줄 수도 있지만, 
                  서로를 비난할 수도 있고 서로를 피하고 싶어 할 수도 있습니다. 
                  이러한 상황은 부부 관계에 스트레스를 초래하여 상실의 고통을 가중시킬 수 있습니다.<br/>
                  따라서 심리적 적응의 과정이 좀 더 길어지고 힘들어질 수 있지만, 효과적인 치료 과정을 위해 전문가의 도움을 받는 것이 좋습니다.
                  </BoxContent>
              </BoxContainer><br/>
              <BoxContainer>
                <BoxTitle>Q5. 주변에 상실의 경험으로 인해 고통을 받고 있는 친구가 있습니다. 어떻게 도와줄 수 있을까요?</BoxTitle>
                  <BoxContent>
                  A5. 사별한 분께 가장 중요한 도움은 옆에 누군가 있다는 사실을 꾸준히 알게끔 해주는 것입니다. 
                  친구 분이 오랜 시간이 지나도 힘들어하실 때에는 사별 후 심리적 적응에 관해 배우고 함께 치료에 나서면 큰 도움이 될 것입니다.<br/>
                  우리가 흔히 하는 말로 "산 사람은 살아야지."등의 조언은 절대 도움이 되지 않습니다. 
                  무엇이 도움이 될지 당사자에게 묻고 당사자가 원하는 바를 간접적으로 돕는 일이 심리적 적응에 도움이 될 것입니다.<br/>
                  사별을 경험하신 분들은, 고인이 평소 맡아서 하시던 일을 처리하지 못하실 때가 있어 문제가 되기도 합니다. 
                  예를 들면, 여성분들의 경우 재정 문제를 잘 처리하지 못하는 데서 낭패감을 겪고 심리적 적응에 실패하는 경우도 있고, 
                  남성분들의 경우 집안일이나 육아의 문제를 잘 수행하지 못하는 것이 심리적 적응을 방해하는 경우가 많습니다. 
                  이런 일을 조용히 도와드리는 것도 큰 도움이 될 것입니다.<br/>
                  전문가들께서도 도움을 드리고 싶은 마음에 무작정 덤벼드는 일을 삼가야 됩니다. 
                  일단 사별 후 심리적 적응 과정에 관해 알 필요가 있습니다. 당사자가 필요로 하지 않는 도움은 오히려 적응에 방해가 됩니다. 
                  상실을 겪으신 분께서 전문적 도움이 필요하다고 느끼실 때까지 사별 후 심리적 적응 과정에 관해 천천히 설명해드리는 일이 우선입니다.
                  </BoxContent>
              </BoxContainer><br/>
            </>
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
                  style={{paddingLeft: '10px'}}
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
              <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'ageReactions'}
                  onClick={() => setSelectedSubButton('ageReactions')}
                >
                  연령별 반응
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'childrenTreatment'}
                  onClick={() => setSelectedSubButton('childrenTreatment')}
                >
                  아동 청소년을 위한 대처
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'elderlyTreatment'}
                  onClick={() => setSelectedSubButton('elderlyTreatment')}
                >
                  노인을 위한 대처
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'disabilityTreatment'}
                  onClick={() => setSelectedSubButton('disabilityTreatment')}
                >
                  치매-장애인을 위한 대처
                </SubButton>
              </SubButtonBox>
              {renderContent()}
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
            <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'timeReactions'}
                  onClick={() => setSelectedSubButton('timeReactions')}
                  style={{paddingLeft: '10px'}}
                >
                  시기별 반응
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'timeTreatment'}
                  onClick={() => setSelectedSubButton('timeTreatment')}
                >
                  시기별 대처
                </SubButton>
              </SubButtonBox>
              {renderContent()}
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
              <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'whatIsLoss'}
                  onClick={() => setSelectedSubButton('whatIsLoss')}
                  style={{paddingLeft: '10px'}}
                >
                  상실이란?
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === '4ways'}
                  onClick={() => setSelectedSubButton('4ways')}
                >
                  애도의<br/>4가지 과정
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'lossTreatment'}
                  onClick={() => setSelectedSubButton('lossTreatment')}
                >
                  상실에 대한 <br/>대처방법
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'parentLoss'}
                  onClick={() => setSelectedSubButton('parentLoss')}
                >
                  유년기에 경험하는 <br/>부모의 사별
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'Q&A'}
                  onClick={() => setSelectedSubButton('Q&A')}
                >
                  Q&A
                </SubButton>
              </SubButtonBox>
              {renderContent()}
            </>
          )}
        </ButtonBox>
        <TopButton show={showTopButton} onClick={scrollToTop}>
          TOP
        </TopButton>
      </Content>
      <BottomNav />
    </AppContainer>
    </>
  );
};

export default DMHMDefinition2;
