import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ShareIcon from '@mui/icons-material/Share';

// Styled components
const Main = styled.main`
  a {
    text-decoration: none;
  }

  .card {
    position: relative; /* 공유 아이콘 위치를 조정하기 위해 추가 */
    margin: 2rem 1rem;
    border-radius: 0.6rem;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* 카드 안의 내용이 넘칠 때를 대비 */
  }

  .card-img {
    width: 100%;
    height: 200px; 
    object-fit: cover; /* 이미지가 카드 영역을 꽉 채우게 */
  }

  .card-body {
    padding: 0 1.5rem 0.7rem;
  }

  .card-text {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #333;
  }

  .card-date {
    color: gray;
    font-size: 1.1em;
    font-weight: 400;
    letter-spacing: -0.3px;
  }

  .write-button-container {
    display: flex;
    justify-content: flex-end; /* 오른쪽 하단에 배치 */
    margin: 4rem 1rem 2rem 0;
  }

  .write-button {
    background-color: #FFCC00;
    color: white;
    font-size: 1.35rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.6rem;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    z-index: 10;
  }

  .share-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    cursor: pointer;
    z-index: 999;
    transition: transform 0.2s ease, color 0.2s ease; /* 호버 시 애니메이션 효과 추가 */
  }

  .share-icon:hover {
    transform: scale(1.15); /* 아이콘을 10% 정도 확대 */
    color: #FFD700; /* 호버 시 색상 변경 */
  }

  .copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    padding: 10px;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    font-size: 0.9rem;
    opacity: 0.9;
    z-index: 1000;
  }
  

  @media (max-width: 600px) {
  // 카드 이미지 안넘치게 조정
    .card-img {
      width: 100%;
      height: auto; 
      object-fit: cover; 
    }

    .card-text {
      font-size: 1.25rem;
    }

    .card-date{
      font-size: 0.9rem;
    }

    .write-button {
      font-size: 1.15rem;
    }
  }
`;




const FundCard = ({ imageSrc, altText, title, date, link, onShareClick }) => {
  return (
    <div className="card">
      <ShareIcon className="share-icon" onClick={() => onShareClick(link)} />
      <Link to={link}>
        <img src={imageSrc} className="card-img" alt={altText} />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-date">{date}</p>
        </div>
      </Link>
    </div>
  );
};

const Fund = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]); // 새로 작성된 글들을 저장하는 배열
  const [copyMessage, setCopyMessage] = useState(''); // 복사 알림 메시지 상태

  useEffect(() => {
    if (location.state && location.state.postData) {
      setPosts((prevPosts) => [...prevPosts, location.state.postData]); // postData가 있을 때만 추가
    }
  }, [location.state]); // location.state가 변경될 때마다 실행

  // 링크 복사 및 알림 표시 함수
  const handleShareClick = (link) => {
    navigator.clipboard.writeText(window.location.origin + link)
      .then(() => {
        setCopyMessage('해당 링크가 복사되었습니다.');
        setTimeout(() => setCopyMessage(''), 2000); // 2초 후에 메시지 사라짐
      })
      .catch(() => {
        setCopyMessage('링크 복사에 실패했습니다.');
        setTimeout(() => setCopyMessage(''), 2000);
      });
  };

  return (
    <Main>
      <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card1.png`}
        altText="호우피해 긴급모금 카드 이미지"
        title="호우피해 긴급모금"
        date="2024.6.16 ~ 2024.7.31"
        link="/fund-detail"
        onShareClick={handleShareClick}
      />
      <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card2.png`}
        altText="산불피해 긴급모금 카드 이미지"
        title="산불피해 긴급모금"
        date="2024.7.01 ~ 2024.8.01"
        link="/fund-detail"
        onShareClick={handleShareClick}
      />
      <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card3.png`}
        altText="산불피해 긴급모금 카드 이미지"
        title="전북 호우피해 구호키트 지원 캠페인"
        date="2024.7.16 ~ 2024.8.16"
        link="/fund-detail"
        onShareClick={handleShareClick}
      />

      {/* 새로 작성된 글들을 표시하는 카드들 */}
      {posts.map((post, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <p className="card-text">{post.title}</p>
            <p className="card-date">{post.fundPeriod}</p>
          </div>
        </div>
      ))}

      <div className="write-button-container">
        <Link to="/fund-post" className="write-button">글 작성하기</Link>
      </div>

      {copyMessage && <div className="copy-message">{copyMessage}</div>} {/* 복사 메시지 */}
    </Main>
  );
};

export default Fund;
