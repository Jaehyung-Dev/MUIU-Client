import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import logo from '../svg/logo.svg';

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    border: none;
    padding: 0;
  }

  p {
    margin: 0;
  }
  
`;

const WelcomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 4rem;

  p {
    margin-top: 1rem;
    font-weight: bold;
    color: #fbbf24;
    font-size: 1.3rem;
  }

  img {
    margin-left: 1rem;
  }
`;

const StartDiv = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CoverAgreeDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3vw;
`;

const AgreeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 100%;
  border-top: ${({ border }) => (border ? 'solid 1px black' : 'none')};
  border-bottom: ${({ border }) => (border ? 'solid 1px rgb(201, 200, 200)' : 'none')};
  padding-top: ${({ border }) => (border ? '2rem' : '0')};
  padding-bottom: ${({ border }) => (border ? '2rem' : '0')};
`;

const InnerAgreeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`;

const AgreeSpace = styled.div`
  display: flex;
  align-items: center;
`;

const DetailDiv = styled.div`
  max-height: 10rem;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 95%;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const NextButton = styled.button`
  border-radius: 10px;
  width: 100%;
  height: 4rem;
  background-color: #ffd651;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: black;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #f8cb37;
  }
`;

const RotateImageDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ rotated }) => (rotated ? 'rotate(90deg)' : 'none')};
`;

const SpanLeftMargin = styled.span`
    margin-left: 0.5rem;
`;

const DetailFontsize = styled.p`
    font-size: 0.9rem;
    white-space: pre-wrap; /* 줄바꿈 처리 */
    word-wrap: break-word;
`;

const JoinAgree = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [termsOfUseCheck, setTermsOfUseCheck] = useState(false);
  const [personalCheck, setPersonalCheck] = useState(false);
  const [gradingCheck, setGradingCheck] = useState(false);
  const [examineeCheck, setExamineeCheck] = useState(false);
  const [locationCheck, setLocationCheck] = useState(false);
  const [recordCheck, setRecordCheck] = useState(false);

  const [termsRotated, setTermsRotated] = useState(false);
  const [personalRotated, setPersonalRotated] = useState(false);
  const [gradingRotated, setGradingRotated] = useState(false);
  const [examineeRotated, setExamineeRotated] = useState(false);
  const [locRotated, setLocRotated] = useState(false);
  const [recordRotated, setRecordRotated] = useState(false);

  const allCheckClicked = () => {
    setAllCheck(!allCheck);
    setTermsOfUseCheck(!allCheck);
    setPersonalCheck(!allCheck);
    setGradingCheck(!allCheck);
    setExamineeCheck(!allCheck);
    setLocationCheck(!allCheck);
    setRecordCheck(!allCheck);
  };

  const termsOfUseCheckClicked = () => setTermsOfUseCheck(!termsOfUseCheck);
  const personalCheckClicked = () => setPersonalCheck(!personalCheck);
  const gradingCheckClicked = () => setGradingCheck(!gradingCheck);
  const examineeCheckClicked = () => setExamineeCheck(!examineeCheck);
  const locationCheckClicked = () => setLocationCheck(!locationCheck);
  const recordCheckClicked = () => setRecordCheck(!recordCheck);

  const termsDetailClick = () => setTermsRotated(!termsRotated);
  const personalDetailClick = () => setPersonalRotated(!personalRotated);
  const gradingDetailClick = () => setGradingRotated(!gradingRotated);
  const examineeDetailClick = () => setExamineeRotated(!examineeRotated);
  const locationDetailClick = () => setLocRotated(!locRotated);
  const recordDetailClick = () => setRecordRotated(!recordRotated);

  const termsText = `
제1조(목적)
이 약관은 주식회사 서연 회사(전자상거래 사업자)가 운영하는 마음이음(https://www.maumieum.co.kr) 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」
제2조(정의)
① “몰”이란 주식회사 서연회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
제3조 (약관 등의 명시와 설명 및 개정)
① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 00 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  이 경우 "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.
제4조(서비스의 제공 및 변경)
① “몰”은 다음과 같은 업무를 수행합니다.
1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
2. 구매계약이 체결된 재화 또는 용역의 배송
3. 기타 “몰”이 정하는 업무
`;

  return (
    <>
        <Main>
            <WelcomeDiv>
                <img src={logo} alt="logo" />
                <p>환영합니다!</p>
            </WelcomeDiv>

            <StartDiv>
                <p>약관동의</p>
            </StartDiv>

            <CoverAgreeDiv>
                <AgreeDiv border>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={allCheckClicked}>
                        {allCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                        <SpanLeftMargin>
                        아래의 약관 및 동의사항에 모두 동의
                        </SpanLeftMargin>
                    </AgreeSpace>
                </InnerAgreeDiv>
                </AgreeDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={termsOfUseCheckClicked}>
                        {termsOfUseCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        이용약관 동의(필수)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={termsRotated}
                        onClick={termsDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={termsRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={personalCheckClicked}>
                        {personalCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        개인정보 수집 및 이용동의(필수)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={personalRotated}
                        onClick={personalDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={personalRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={gradingCheckClicked}>
                        {gradingCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        채점 프로그램 동의(필수)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={gradingRotated}
                        onClick={gradingDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={gradingRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={examineeCheckClicked}>
                        {examineeCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        수검자의 개인정보 수집 및 처리에 관한 정책 동의(필수)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={examineeRotated}
                        onClick={examineeDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={examineeRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={recordCheckClicked}>
                        {recordCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        상담 기록 보관 동의(선택)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={recordRotated}
                        onClick={recordDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={recordRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>

                <AgreeDiv>
                <InnerAgreeDiv>
                    <AgreeSpace onClick={locationCheckClicked}>
                        {locationCheck ? (
                        <CheckCircleIcon style={{ color: '#FFCB2A' }} />
                        ) : (
                        <CheckCircleOutlineIcon style={{ color: '#A1A1A1'}} />
                        )}
                    <SpanLeftMargin>
                        위치기반 서비스 동의(선택)
                    </SpanLeftMargin>
                    </AgreeSpace>
                    <RotateImageDiv rotated={locRotated}
                        onClick={locationDetailClick}>
                    <KeyboardArrowRightIcon style={{fontSize: '2rem', color: '#A1A1A1'}}/>
                    </RotateImageDiv>
                </InnerAgreeDiv>
                </AgreeDiv>
                <DetailDiv isVisible={locRotated}>
                    <DetailFontsize>
                        {termsText}
                    </DetailFontsize>
                </DetailDiv>
            </CoverAgreeDiv>

            <CenterDiv>
                <NextButton
                onClick={() => {
                    if (termsOfUseCheck && personalCheck && gradingCheck && examineeCheck) {
                        window.location.href = 'join';
                    } else {
                        alert('필수 항목을 모두 선택해주세요.');
                    }
                }}
                >
                다음
                </NextButton>
            </CenterDiv>
        </Main>
    </>
  );
};

export default JoinAgree;