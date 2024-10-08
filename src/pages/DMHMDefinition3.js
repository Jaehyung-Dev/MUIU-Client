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


const DMHMDefinition3 = () => {
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

      // '자연재난' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch31') {
        setSelectedSubButton('storm');
        setSelectedStage('stormReactions'); // 기본 Stage 버튼 초기화
      }

      // '사회재난' 챕터 클릭 시 서브 버튼 기본값 설정
      if (chapter === 'ch32') {
        setSelectedSubButton('fireDisaster');
        setSelectedStage('fireDisasterReactions'); // 기본 Stage 버튼 초기화
      }

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
      case 'storm':
        return (
          <>
          <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'stormReactions'}
                onClick={() => setSelectedStage('stormReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'stormReacts'}
                onClick={() => setSelectedStage('stormReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
          </>
        );
      case 'snow':
        return (
          <>
          <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'snowReactions'}
                onClick={() => setSelectedStage('snowReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'snowReacts'}
                onClick={() => setSelectedStage('snowReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
          </>
        );
      case 'wind':
        return (
          <>
          <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'windReactions'}
                onClick={() => setSelectedStage('windReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'windReacts'}
                onClick={() => setSelectedStage('windReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
          </>
        );
        case 'drought':
          return (
            <>
            <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'droughtReactions'}
                onClick={() => setSelectedStage('droughtReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'droughtReacts'}
                onClick={() => setSelectedStage('droughtReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
            </>
          );
        case 'earthquake':
          return (
            <>
            <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'earthquaketReactions'}
                onClick={() => setSelectedStage('earthquakeReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'earthquakeReacts'}
                onClick={() => setSelectedStage('earthquakeReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
            </>
          );

        case 'fireDisaster':
          return (
            <>
            <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'fireDisasterReactions'}
                onClick={() => setSelectedStage('fireDisasterReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'fireDisasterReacts'}
                onClick={() => setSelectedStage('fireDisasterReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
            </>
          );
        case 'carAccident':
          return (
            <>
            <StageButtonBox>
              <StageButton
                isActive={selectedStage === 'carAccidentReactions'}
                onClick={() => setSelectedStage('carAccidentReactions')}
              >
                재난 유형별 반응
              </StageButton>
              <StageButton
                isActive={selectedStage === 'carAccidentReacts'}
                onClick={() => setSelectedStage('carAccidentReacts')}
              >
                재난 유형별 대처
              </StageButton>
              </StageButtonBox>
              {renderStageContent()}
            </>
          );  
      default:
        return null;
    }
  };

  const renderStageContent = () => {
    switch (selectedStage) {
      case 'stormReactions':
        return (
          <>
          <h1>재난 유형별 반응 - 호우/태풍</h1>
          <ImgBox><img src="/DMHM-images/호우태풍.png" alt="호우/태풍" /></ImgBox>
          <br/>
          <h2>일반적 반응</h2>
          <TextBox>
          - 압도적인 불안, 수면장애, 우울장애<br/><br/>
          - 과도한 걱정, 알 수 없는 죄책감<br/><br/>
          - 무력감, 무희망감<br/><br/>
          - 태풍, 홍수와 관련한 일기예보만 나오면 무슨 일이 생기지 않을까 두려움<br/><br/>
          - 직장에 결근, 학교에 결석하는 행동<br/><br/>
          - 태풍과 관련된 반복적인 악몽, 생각, 기억 등을 경험
          </TextBox><br/>

          <h2>특징</h2>
          - 호우와 태풍은 대개 자연재난이므로 삼리사회적인 아노미에 빠지는 일은 드묾<br/><br/>
          - 주로 피해 지역에 국한된 공포 반응을 유발하고, 지역 사회가 집중적으로 붕괴되는 국소성이 큰 특징<br/><br/>
          - 그러나 국가 전체적으로 긍정적 자원이 제공되며, 정보나 NGO, 자원 봉사 기관 등 다양한 도움이 적극적으로 유입되는 특징이 있음.<br/><br/>
          - 단, 일부 홍수는 댐 건설이나 둑 보수 등 방재 대책의 미비에 대한 사회적 비난과 갈등이 유발될 수 있음. <br/><br/>
            적절한 추가 재난 예방 및 방재 대책의 수립과 소통을 통해서 사회적 갈등을 최소화활 수 있음.<br/><br/>
          - 지역적으로 보건 수요가 급증하므로 주변 지역으로의 적절한 분산 및 임시 진료 체계의 현장 진입이 필요함.<br/><br/>
          - 장기적으로 피해 지역의 커뮤니티가 붕괴될 수 있으므로, 지속적인 지원 대책이 필요함.<br/><br/>
          </>
        );
      case 'stormReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 호우/태풍</h1>
          <ImgBox><img src="/DMHM-images/호우태풍대처.png" alt="호우/태풍 대처방법" /></ImgBox><br/>

          <h2>일반적 요령</h2>
          <TextBox>
          - 취약한 가족 구성원은 미리 안전한 지역으로 대피<br/>
          - 상시적인 일기예보 청취를 통해서 위험성을 미리 확인<br/>
          - 통신망 두절 시 비상 연락 대책 수립
          </TextBox><br/>

          <h2>특별히 주의할 사항</h2>
          <TextBox>
          - 홍수와 태풍, 호우는 빈발 계절이 있으므로, 산사태 취역 지역이나 호수, 강 인근 지역에서는 관련 방제 대책 수립<br/>
          - 태풍과 집중 호우는 한반도에서 가장 강력한 자연 재난 중 하나이므로, 철저한 준비가 필요함.<br/>
          - 호우나 태풍에 대한 특정 공포증이 있는 경우에는 미리 안전 지역으로 대피<br/>
          - 홍수와 태풍, 집중 호우는 수인성 전염병 등을 유발할 수 있으므로, 취약한 노인, 어린이 등은 일시적으로 대피하는 것이 필요<br/>
          </TextBox><br/><br/>
          </>
        );
      case 'snowReactions':
        return (
          <>
          <h1>재난 유형별 반응 - 대설/한파</h1>
          <ImgBox><img src="/DMHM-images/대설한파.png" alt="대설/한파" /></ImgBox><br/>

          <h2>일반적 반응</h2>
          <TextBox>
            - 압도적인 불안, 수면장애, 우울증상<br/>
            - 추위와 고립에 대한 과도한 걱정, 고립에 대비한 과도한 준비 행동(식량 비축, 난방유 비축, 통신 장치 등)<br/>
            - 무력감, 무희망감<br/>
            - 대설과 한파 관련 일기예보에 대한 걱정<br/>
            - 겨울마다 반복되는 트라우마의 재경험<br/>
            - 거주지에 대한 불만족감과 제설 대책 등에 대한 정부 불신<br/>
            - 대설과 한파 등과 관련된 반복적인 악몽, 생각, 기억
          </TextBox><br/>

          <h2>특징</h2>
          <TextBox>
            - 대설과 한파는 자연재난으로 인식되어 사회적 혼란으로 이어지는 경우는 흔하지 않음<br/>
            - 난방 수요 및 난방비 급증, 제설 대책 등에 대한 사회적 갈등은 있을 수 있음<br/>
            - 제설 책임에 대한 이웃과의 갈등<br/>
            - 상습 대설 지역에서는 겨울철에 대한 반복적인 트라우마가 있을 수 있음<br/>
            - 직접적인 추위 노출은 정신적 자원을 급속도로 소진시켜 PTSD의 위험성을 높일 수 있음<br/>
            - 불안을 해결하기 위한 음주 등 부적응적 행동은 한파에 의한 신체적 질병 발생률을 배가시킬 수 있음.
          </TextBox>

          </>
        );
      case 'snowReacts':
        return (
          <>
          <h1>재난 유형별 대처 - 대설/한파</h1>
          <ImgBox><img src="/DMHM-images/대설한파대처.png" alt="대설/한파 대처" /></ImgBox><br/>

          <h2>일반적 요령</h2>
          <TextBox>
            - 상습 대설 지역에서는 지역 사회의 월동 대책 모임 등을 결성, 관련 노하우를 나누고, 집단 수준의 방재 대책을 추진<br/>
            - 고립과 연락 두절, 방한 대책과 월동 장비 등을 미리 준비<br/>
            - 장기간 고립에 대비한 식료품과 식수 준비는 불안감을 줄일 수 있음
          </TextBox><br/>

          <h2>특별히 주의할 사항</h2>
          <TextBox>
            - 대설이 잦은 지역에서는 고립에 대한 준비 이외에, 탈출을 위한 비상 연락망이나 특수 차량 이용법을 숙지<br/>
            - 폐쇄공포증이나 주요우울장애 등을 앓는 경우에는 고립에 대비하여 미리 안전 지역으로 이동<br/>
            - 일광 노출 부족은 계절성 우울증을 유발할 수 있으므로, 충분한 채광으로 빛에 노출하는 것이 필요<br/>
            - 한파에 취약한 노약자 및 호흡기 질환자는 미리 안전한 지역으로 이동하거나, 고립에 대비한 호흡기 관련 약품을 미리 처방받아야 함<br/>
            - 한파 중에는 무리한 활동을 피하고, 우울감으로 인해 식사량이 줄어들 수 있으므로 고열량의 식품을 충분히 섭취하는 것이 바람직함.<br/>
            - 알코올 사용 장애 환자는 한파 노출에 취약하므로, 음주량을 줄이는 것이 필요
          </TextBox><br/><br/>
          </>
        );
      case 'windReactions':
        return (
          <>
          <h1>재난 유형별 반응 - 강풍/풍량</h1>
          <ImgBox><img src="/DMHM-images/강풍풍량.png" alt="강풍/풍량" /></ImgBox><br/>

          <h2>일반적 반응</h2>
          <TextBox>
            - 압도적인 불안, 수면장애, 우울증상<br/>
            - 강풍, 풍량과 관련한 일기예보만 나오면 무슨 일이 생기지 않을까 두려움<br/>
            - 강풍이나 풍량과 관련된 반복적인 악몽, 생각, 기억 등을 경험
          </TextBox><br/>

          <h2>특징</h2>
          <TextBox>
            - 한국 사회에는 강풍이나 풍량으로 인한 포괄적 피해는 흔하지 않음<br/>
            - 일부 지역에서 보고되는 토네이도는 막연한 공포 반응을 유발할 수 있음.<br/>
            - 심한 풍량은 해상 근무자 및 가족의 불안과 두려움을 유발할 수 있음.<br/>
            - 국내에서 강풍과 풍량은 대게 극히 일부 지역에서 산발적인 피해를 입히므로, 
              오히려 피해자는 적절한 사회적 지원과 관심에서 소외될 수 있는 우려가 있음
          </TextBox>

          </>
        );
      case 'windReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 강풍/풍량</h1>
          <ImgBox><img src="/DMHM-images/강풍풍량대처.png" alt="강풍/풍량 대처" /></ImgBox><br/>

          <h2>일반적 요령</h2>
          <TextBox>
            - 한반도에서 강풍은 제한적 피해만을 입히는 비교적 작은 규모의 재난이지만, 
              도시 지역에서는 간판이나 설치물 추락으로 인한 이차적 피해의 가능성이 있음<br/>
            - 종종 가로수나 전봇대 전도로 인한 단전, 차량 손상, 인명 피해 등이 발생<br/>
            - 옥외 간판을 점검하고, 창문이나 출입문을 고정하며, 필요시 판자나 테이프 등으로 유리창 파손에 대비하는 것이 필요
          </TextBox><br/>

          <h2>특별히 주의할 사항</h2>
          <TextBox>
            - 강력한 바람은 어린이에게 설명할 수 없는 불안을 유발할 수 있음. 
              가급적 안전한 실내에서 어린이가 이해할 수 있는 방식으로 상환을 설명해주는 것이 필요<br/>
            - 어민, 해상 플랜트 근무자, 도서 지역 거주민은 심한 풍량에 대한 심리적 트라우마가 없는지 미리 점검하고, 
              반복적인 우울, 불안, 두려움 등이 지속되면 적절한 정신의학적 상담을 받는 것이 필요
          </TextBox><br/><br/>
          </>
        );
      case 'droughtReactions':
        return (
          <>
          <h1>재난 유형별 반응 - 가뭄/폭염</h1>
          <ImgBox><img src="/DMHM-images/가뭄폭염.png" alt="가뭄/폭염" /></ImgBox><br/>

          <h2>일반적 반응</h2>
          <TextBox>
            - 서서히 지속되는 불안<br/>
            - 불쾌지수 상승으로 인한 짜증과 갈등<br/>
            - 탈진으로 인한 무력감, 무조감<br/>
            - 야외 활동 기피 등으로 막연한 우울감과 고립감<br/>
            - 수면 부족으로 인한 집중력 저하, 업무 및 학업 효율성 감소<br/>
            - 예민한 상황에서 가족과 지인과의 불필요한 신체적, 정신적 갈등의 증가
          </TextBox><br/>

          <h2>특징</h2>
          <TextBox>
            - 서서히 진행하는 자연재난이므로 심리적 영향을 감지하기 어려우며 다른 자연재난보다 오래 지속되는 경향<br/>
            - 폭염은 열탈진, 열사병 등 신체적 문제를 유발하고, 섬망, 판단력 저하, 의식 소실 등 직접적인 정신적 문제를 유발<br/>
            - 폭염으로 인한 취약계층 사망률 증가는 사회적 불안과 안전감 상실, 패닉 등으로 이어질 수 있음<br/>
            - 전력 공급 장애로 인한 냉방 중단은 단시간 내에 광범위한 지역에 심각한 재난적 상황을 유발할 수 있음<br/>
            - 먼지, 물 부족, 공기 오염과 관련된 건강에 대한 염려<br/>
            - 흉작에 관련된 원초적 불안<br/>
            - 식료품비 상승에 대한 현실적인 두려움<br/>
            - 수단 등 일부 저개발국가에서는 기아를 유발하여, 사회 불안정, 내전으로 이어진 사례가 있음.
          </TextBox>
          </>
        );
      case 'droughtReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 가뭄/폭염</h1>
          <ImgBox><img src="/DMHM-images/가뭄폭염대처.png" alt="가뭄/폭염 대처" /></ImgBox><br/>

          <h2>일반적 요령</h2>
          <TextBox>
            - 폭염은 신체적 탈진을 유발하여, 이차적으로 정신적 장애를 일으킬 수 있음<br/>
            - 열사병이나 열탈진의 과거력이 있는 경우, 미리 적절한 냉방 대책을 수립해야 함<br/>
            - 최대한 야외 활동을 피하고, 불가피할 경우 동선을 파악하여 폭염 노출을 최소화하여야 함.<br/>
            - 늘 충분한 물을 섭취하며 과도한 신체적 활동을 피하는 것이 필요<br/>
            - 식욕이 떨어져도 충분한 열량을 섭취하는 것이 바람직
          </TextBox><br/>

          <h2>특별히 주의할 사항</h2>
          <TextBox>
            - 폭염의 피해는 특히 열섬 현상으로 인해 도심지에 집중되는 경향. 
              취약자는 미리 폭염 대피소의 위치를 파악하고, 냉방 설비 등을 설치하여 적절한 냉방 대책을 수립하는 것이 필요<br/>
            - 열사병의 경우 종종 첫 증상이 의식 소실이므로, 미리 대비하지 않으면 치명적인 결과를 낳을 수 있음<br/>
            - 야외 활동이 불가피할 경우, 아침과 저녁에 업무를 배정하고 대낮에는 휴식을 취하는 방식으로 조절, 
              직사광선 노출을 줄이도록 모자를 사용<br/>
            - 취약한 가족이 있거나, 특수 환경 종사자, 군인 등은 열사병 응급처치법을 숙지하는 것이 필요<br/>
              (옷을 풀고, 찬 물을 뿌리며 겨드랑이와 사타구니 등에 찬 수건을 적용, 신속하게 서늘한 곳으로 이동하고, 
              의식이 명확하지 않으면 경구 수분 공급을 피하고 정맥 내 수액 공급을 위해 의료기관으로 이송하는 것이 바람직함. 
              가벼운 열탈진의 경우, 경구 수분 공급으로 충분하나 구분이 어려울 경우 열사병에 준하여 응급조치)
          </TextBox><br/><br/>
          </>
        );
      case 'earthquakeReactions':
        return (
          <>
          <h1>재난 유형별 반응 - 지진</h1>
          <ImgBox><img src="/DMHM-images/지진.png" alt="지진" /></ImgBox><br/>

          <h2>일반적 반응</h2>
          <TextBox>
            - 늘 긴장하면서, 작은 일에 쉽게 놀람<br/>
            - 잠을 들지 못하거나, 자주 깸<br/>
            - 지진에 대한 생각과 기억이 머릿속을 떠나지 않음<br/>
            - 식사나 수면이 불규칙함<br/>
            - 사람들을 만나지 않으려고 함<br/>
            - 기력이 떨어지고, 쉽게 지침<br/>
            - 두통이나 복통 등, 설명할 수 없는 신체적 통증이 지속됨<br/>
            - 이 상황에서 벗어날 수 없다는 두려움<br/>
            - 흡연과 음주, 약물 사용의 증가<br/>
            - 알 수 없는 두려움이나 불안감, 죄책감<br/>
            - 자신이나 혹은 다른 사람을 해치는 상상을 하기도 함<br/>
            - 원래 하던 집안일이나 직장 일을 하는 것이 어려움
          </TextBox><br/>

          <h2>특징</h2>
          <TextBox>
            - 집단 주택이 많은 한국의 특성상 작은 규모의 지진에도 큰 피해가 유발될 수 있음.<br/>
            - 특정 단층 지역에 집중된 지진 발생은 해당 지역 주민의 만성적인 불안을 유발<br/>
            - 특히 건물의 안전성이나 부동산 가격에 대한 부정적 전망은 이차적 우울감 및 사회에 대한 불신으로 이어질 수 있음.<br/>
            - 안전성이 의심되는 집단 주택에서 계속 거주해야 하는 경우, 지속적인 트라우마 재경험으로 인해 심리적 증상이 장기화될 수 있음.
          </TextBox>
          </>
        );
      case 'earthquakeReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 지진</h1>
          <ImgBox><img src="/DMHM-images/지진대처.png" alt="지진 대처" /></ImgBox><br/><br/>
          </>
        );
      case 'fireDisasterReactions':
        return (
          <>
          <h1>재난 유형별 대처요령 - 화재</h1>
          <ImgBox><img src="/DMHM-images/화재.png" alt="화재" /></ImgBox><br/>
          <li>불면, 악몽, 사망자에 대한 죄책감, 화재에 대한 공포감을 경험</li>
          <li>특히, 피해를 미연에 방지할 수 있었던 경우 다음과 같은 특성들을 경험</li>
          <TextBox>
          - 화재 사건을 되돌리고 싶은 강렬한 소망<br/>
          - 극심한 분노<br/>
          - 신체화 증상
          </TextBox>
          <li>밀폐된 공간을 피하는 행동</li>
          <li>탈출구를 반복 확인하는 행동</li>
          <li>가스 불 점검에 집착하거나 불을 가까이하지 못하는 행동</li>
          <li>화재 경보를 연상시키는 소리에 대한 과각성 증상</li>
          </>
        );
      case 'fireDisasterReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 화재</h1>
          <ImgBox><img src="/DMHM-images/화재대처1.png" alt="화재 대처 - 1" /></ImgBox>
          <ImgBox><img src="/DMHM-images/화재대처2.png" alt="화재 대처 - 2" /></ImgBox><br/><br/>
          </>
        );
      case 'carAccidentReactions':
        return (
          <>
          <h1>재난 유형별 대처요령 - 교통사고</h1>
          <ImgBox><img src="/DMHM-images/교통사고.png" alt="교통사고" /></ImgBox><br/>
          <li>침습 증상(사고 당시의 이미지, 감각, 감정, 사고(생각)을 불러일으키는 증상) 경험</li>
          <li>회피 증상</li>
          <li>지각된 높은 스트레스</li>
          <li>사고와 관련한 환청, 환영, 악몽의 경험</li>
          <li>사망자에 대한 죄책감</li>
          <li>소리에 대한 과각성 반응</li>
          <li>사고 희생자 가족들의 심리적 반응</li>
          <TextBox>
          - 일반 우울장애, 불안장애보다 더 심한 우울감과 불안감<br/>
          - 신체화 증상<br/>
          - 타인에 대한 의심, 분노감<br/>
          - 죄책감<br/>
          - 무기력<br/>
          - 절망감<br/>
          - 자살 충동
          </TextBox>
          </>
        );
      case 'carAccidentReacts':
        return (
          <>
          <h1>재난 유형별 대처요령 - 교통사고</h1>
          <TextBox>
          교통사고는 신체 건강뿐만 아니라, 정신건강에 영향을 줍니다.<br/>
          대다수의 사람들은 교통사고 후 심리적 영향에 대한 관심이 높지 않습니다.<br/>
          교통사고 이후, 불안, 분노, 죄책감, PTSD, 기억상실, 우울, 수면 장애 등의 증상을 겪을 수 있습니다.<br/>
          교통사고 이후 겪게 되는 심리적 충격에 대해서 신속하게 대처하는 것은 정신건강과 행복에 매우 중요합니다.<br/><br/>

          가까운 분들에게 교통사고에 대해서 이야기 하세요.<br/>
          가족, 친구, 친지에게 교통사고 경험에 대해서 이야기 하세요.<br/>
          교통사고가 발생했던 순간부터지금까지 당신은 어떻게 생각하고, 느끼고, 반응해왔는지 이야기 하세요.
          </TextBox><br/>
          <h2>1.여러 활동을 시도해 보세요.</h2>
          <p>신체적으로 영향을 주지 않는 선에서, 운동과 다양한 활동에 참가하세요. 
          의사들은 가능한 신체활동의 범위에 대해서 알려 줄 것입니다.</p>

          <h2>2.의료진의 지시에 따르세요.</h2>
          <p>심리적 도움이 필요할 경우, 의료진들은 여러분에게 도움을 줄 수 있는 기관을 안내해 줄 것입니다.</p>

          <h2>3.교통사고 전 일상생활로 돌아가도록 노력하세요.</h2>
          <p>교통사고는 당신의 일상생활 능력에 영향을 줄 수 있습니다. 처음에는 불편하고 두려울지라도, 
          교통사고 이전의 일상생활로 돌아가도록 노력하는 것은 회복에 매우 중요합니다.</p>

          <h2>4.방어운전을 배우세요. 교통사고 이후, 다시 운전을 하는 것은 심리적으로 힘들 수 있습니다.</h2>
          <p>안전운전을 하거나, 안전벨트 착용, 운전에 집중하는 것들을 배우는 것은 미래의 사고나 부상 위험을 줄일 수 있습니다. 
            피곤할 때는 절대 운전하지 마세요.
            음주나 여러분의 판단의 영향을 줄 약을 먹었을 경우, 절대 운전하지 마세요.</p>
          </>
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
            isOpen={selectedChapter === 'ch31'}
            onClick={() => toggleChapter('ch31')}
          >
            자연재난
          </DropdownButton>
          {selectedChapter === 'ch31' && (
            <>
              <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'storm'}
                  onClick={() => 
                    {setSelectedSubButton('storm');
                    setSelectedStage('stormReactions');}
                    }
                  style={{paddingLeft: '10px'}}
                >
                  호우/태풍
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'snow'}
                  onClick={() => 
                    {setSelectedSubButton('snow');
                    setSelectedStage('snowReactions');}
                  }
                >
                  대설/한파
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'wind'}
                  onClick={() => 
                    {setSelectedSubButton('wind');
                      setSelectedStage('windReactions');}
                    }
                >
                  강풍/풍량
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'drought'}
                  onClick={() => 
                    {setSelectedSubButton('drought');
                      setSelectedStage('droughtReactions');}
                    }
                >
                  가뭄/폭염
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'earthquake'}
                  onClick={() => 
                    {setSelectedSubButton('earthquake');
                      setSelectedStage('earthquakeReactions');}
                    }
                >
                  지진
                </SubButton>
              </SubButtonBox>
              {renderContent()}
            </>
          )} <br/>

          <DropdownButton
            isOpen={selectedChapter === 'ch32'}
            onClick={() => toggleChapter('ch32')}
          >
            사회재난
          </DropdownButton>
          {selectedChapter === 'ch32' && (
            <>
              <SubButtonBox>
                <SubButton
                  isActive={selectedSubButton === 'fireDisaster'}
                  onClick={() => 
                    {setSelectedSubButton('fireDisaster');
                     setSelectedStage('fireDisasterReactions');}
                    }
                  style={{paddingLeft: '10px'}}
                >
                  화재
                </SubButton>
                <SubButton
                  isActive={selectedSubButton === 'carAccident'}
                  onClick={() => 
                    {setSelectedSubButton('carAccident');
                     setSelectedStage('carAccidentReactions');}
                    }
                >
                  교통사고
                </SubButton>
              </SubButtonBox>
              {renderContent()}
            </>
          )}<br/>
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

export default DMHMDefinition3;
