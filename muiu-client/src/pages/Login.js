import React from 'react';
import styled from 'styled-components';

// 공통 스타일
const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
  width: 100%;

  input {
    background: none;
    border: none;
    outline: none;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
  }

  input::placeholder {
    color: #A1A1A1;
  } 

  button {
    border: none;
    padding: 0;
    color: black;
  }
`;

const DefaultDiv = styled.div`
  margin: 1rem 0;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;

  @media screen and (max-width: 600px) {
    margin-top: 0;
    margin-bottom: 1rem;
    height: 3rem;
  }
`;

const SelectDiv = styled(DefaultDiv)`
  margin-bottom: 3rem;

  @media screen and (max-width: 600px) {
    margin-bottom: 2rem;
  }
`;

const SelectButton = styled.button`
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 50%;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f8cb37;
  }

  @media screen and (max-width: 600px) {
    width: 40vw;
    height: 12vw;
  }
`;

const GeneralButton = styled(SelectButton)`
  margin-right: 0.5rem;
`;

const CounselorButton = styled(SelectButton)`
  margin-left: 0.5rem;
`;

const InputDiv = styled(DefaultDiv)`
  background-color: #f0f0f0;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const InputDefault = styled.input`
  font-size: 1.2rem;
  padding-left: 1.5rem;
  width: 100%;

  &::placeholder {
    color: #a1a1a1;
  }

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const LoginDiv = styled(DefaultDiv)`
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const LoginButton = styled.button`
  background-color: #ffd651;
  border-radius: 10px;
  width: 100%;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f8cb37;
  }

  @media screen and (max-width: 600px) {
    width: 80vw;
    height: 12vw;
  }
`;

const TextHover = styled.button`
  font-size: 0.8rem;
  color: black;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: rgb(105, 104, 104);
  }
`;

const SnsBar = styled(DefaultDiv)`
  display: flex;
  align-items: center;
`;

const LineImg1 = styled.img`
  padding: 0 0.5rem;
  height: 0.5rem;
  width: 0.1rem;
`;

const LineImg2 = styled.img`
  width: 8rem;

  @media screen and (max-width: 600px) {
    width: 6rem;
  }
`;

const SnsBarText = styled.span`
  margin: 0.5rem;
  font-size: 0.6rem;
`;

const NaverButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  svg rect {
    filter: brightness(1);
  }

  &:hover svg rect {
    filter: brightness(0.8);
  }
`;

export const Login = () => {
  return (
    <Main>
      <DefaultDiv>
        <p className="bold">회원 유형을 선택하세요</p>
      </DefaultDiv>
      <SelectDiv>
        <GeneralButton>
          <p>일반회원</p>
        </GeneralButton>
        <CounselorButton>
          <p>상담사</p>
        </CounselorButton>
      </SelectDiv>
      <InputDiv>
        <InputDefault type="text" placeholder="아이디를 입력하세요" />
      </InputDiv>
      <InputDiv>
        <InputDefault type="password" placeholder="비밀번호를 입력하세요" />
      </InputDiv>
      <LoginDiv>
        <LoginButton>
          <p>로그인</p>
        </LoginButton>
      </LoginDiv>
      <DefaultDiv>
        <TextHover>아이디 찾기</TextHover>
        <LineImg1 src="../svg/Line 3.svg" alt="line3" />
        <TextHover>비밀번호 찾기</TextHover>
        <LineImg1 src="../svg/Line 3.svg" alt="line3" />
        <TextHover onClick={() => window.location.href = 'agree'}>회원가입</TextHover>
      </DefaultDiv>
      <SnsBar>
        <LineImg2 src="../svg/Line 1.svg" alt="line1" />
        <SnsBarText>sns 계정으로 로그인</SnsBarText>
        <LineImg2 src="../svg/Line 1.svg" alt="line1" />
      </SnsBar>
      <NaverButton>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill="url(#pattern0_364_497)" />
            <defs>
            <pattern id="pattern0_364_497" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_364_497" transform="scale(0.00333333)" />
            </pattern>
            <image id="image0_364_497" width="300" height="300" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAALVBMVEVHcEwAvDQArS4AxDkAwzkCtDUAwzkAxzz///8AuAgAwSnr+/IAxDc71GuU6K7st4XxAAAAB3RSTlMAQzTMvoPqKyPOlgAABwFJREFUeNrt3TFPG0kUB/ABh9uGwuZOojUVTQpHQnKLBBIt3TUp0tEu2OEp1vZxDkIbQri0Jg6hTq6yIkV7ID4AQbqey32Jy0FOsfHuemfmPzN/pLzSWsk/7Zt5M7P2zij1I4LE6gqTprZQeyhD8alWqwVHSU7UA5qW1iQ32oFSWvtFJsSDGk/2RsN3+qRk+EzlnGjEAlf+PGeykuqykoZ71X0xiI9sCfSTyKYpq+Ww7E+nYhyJM9eUWMU6Sxf00SHnxDocVNYZAUSDLYNuXNMCijpFFXXrauJYbZxqUYCxhVJFAo2YrmEBh+2pDTRru8rWsGDNa1YcxCDwrCEvqjwVa2RWSFUbQFViWpxFnahiYarXTy5Zj3gKKaSoLorTMCyqM+I41hlvluHtuifOw6TVp+5ZCVF9t6v14iUo5jP2MxwRxtsV+WLFbN3QoDN6u1l6t0s8Bl031O2MTZ+shGCqbDN9/tUv6zHlzSp7u+Z9szZLsTZ8s7aDL3fMp4MSIAgbfLlGH4VgxZQ5nJzFShhWg61olStdIoxZnA3FGoRd4Bst/KckWFS5Bp4yA1AUjhUT9sPivhiFZMV8/bC4L4owZrESltVgbFr5jUuEMYvToVl1xhzmZbEZmtUK+6hNq3HNBFdl/toyH561yTby5I8/QhB0I0/e+DPLwBqEfgSYHY8pm9Z44yoxIHZeZsZB1rWn5S8tHBZLNK0n3czY7WVce5R56TPtxhUZs/ay7sErQ1asP07nsDK/zJTV0m/xeaw/ejiW6M+18ljdFMiKcayD1BVr0Yb1vIdjbWlPAXNZO4c4VqJd43NZ3csUxhLt6UM+67cejtXQnT7ks8YrqjlroLsWy2eNf585K9adPhSwxrJozhIga6fvgjVlyxr7QgtWVfPpQxFr9xjGqms+fShidS9hrBjJ+pziWU171q1x0YL1fcq1Zs/qHqBYbc1VTzHrQwpiCZS110OzIgRrtKLasGIka/Q7Eax5CGukotqwNqGskYpKxPo7xbLWMKzhimrDauk9rJnEGq6oNiwBs4YqKoBVQbGGKqoVq6H1f/2JrKGKasVaxrK6z3pAVgRjdQ8hrBjN6qSUrKdAluBYzw8RLEGzul84Wf/3RTLW3jGKNYVkdTsIVhXO+pZFNta3ikrHuqmodKynnKybimrPmsGybiqqHWtd59fgkqzrvmjHinX+WlOStdenZF1nkZD1XxYJWd0+J+vr8pqRtdujZH0dFylZn1NK1l4vPOt9BuvQntW0Y+1k/UHkix2rXf7pVi7rIOv7w7NeZn1qz7JN4sHbjE//sWZZNvmdFyele6jHnrjz4vQ9JauzT8mSd5ys0ytKVueCkpUcU7Lk7E9KVkLKeoNnzdqzpINlDewX+zes11DWuv2jkWuW9KCsKop1dkHJSvYpWeWy6J91dgRk1WGsUhVV524pDKsPZCkYq9xPL/5ZyWtKVpm+qMWKMKzOFYoVI1nnv1Oy5BTLugdidY5ArGUoKzmBsioglhyDWA3AX3+GWGf7GJbCsnIe5Jqy1lCsSctrvb+VzaNYHQhrE82aNC4GYk2qqHqsCMaaUFE9/kt3hCWvgSyFY6UAlsKziiuqJmsNxpK31qw25KWHW6w3V7asFuQVkVusjjUrdsEqrKiarGkcS04vLFl1yMtat1lFy2vNl7UUkFW0MPP4xt0Y6wmOFQFZBY+6dF+bnEWy+lasAeaV3DGWnF3ZsBqYF5jHWeevbFig173HWXJiwUpAL8dnsHIrqvbL8RGSlRyZs2KHrHcolkKyclca2ttUmG/qkcXK+1Fdf1OPyJTVzWBJ35QV628Y0/krM3oZl55nX3qpVePLTrn6WXGcVfKSzEv75xqTLerNiFi3biLd6Ip0WzDSTdRYt5ybD8/avDvbGZJu/si6VWYUmhXfpW1YSTetDZ3F+G5tiEy6fTTrZtsRY9Oi3cg95O2K794hAaRHKpAeQMF6XAfp4SasR8GQHpxDesxQmIo6+VAm0iOsSA/8Yj0ejfQwOdaj90gPKiQ91pH1EEy/TyNanAesapxHS1ZKyQ/vJT3q2N/t0jx2nLBlER86TnpEu5/WpX+gvY/OmOirfKyBBgYs9wv/LROV+19b1o1Yrm+X2c1SasrprH67ashyuwh6pIyDqpJ6mT7XLVjuan2srMLRtL5lp3L1kLdqyXIzwxko61jkKaRui+p2VSGCqGI5rBIxiIVtXlsKFk2eiuWoeSFVuMGxDmWpCmTFkTQUOCBT6GUFjzl71YJyELZ5xGcQMptYVo5iOuXpg5i62napMq+rynHcN0F9VM6jssHSBS0TqTzFXPAamhNLZVErym9w5e971H6eZHpQU0Fiaa2gfq6ogMGTvdvJXKg9HAZ9qtUWFFGsrqofEST+BY4VCSQCR8rIAAAAAElFTkSuQmCC"/>
            </defs>
        </svg>
      </NaverButton>
    </Main>
  );
};

export default Login;
