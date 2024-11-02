import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';

// Styled components
const Main = styled.main`
  a {
    text-decoration: none;
  }

  .card {
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

  .share-icon {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    color: #fff;
    z-index: 10; 
    transition: color 0.3s ease, transform 0.3s ease; 

    &:hover {
      color: #FFCC00;
      transform: scale(1.2); /* 호버 시 아이콘 크기 확대 */
    }
  }

  .copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    font-size: 0.9rem;
    opacity: 0.9;
    z-index: 1000;
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


const FundCard = ({ imageSrc, altText, title, date, link, postId }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = (e, postId) => {
    e.preventDefault(); // Link 태그 클릭 방지
    navigator.clipboard.writeText(`${window.location.origin}${link}`)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };  

  return (
    <Link to={link} style={{ position: 'relative', display: 'block' }}>
      <div className="card">
        {/* 공유 아이콘을 카드 안에서 오른쪽 상단에 위치 */}
        <IconButton className="share-icon" onClick={handleCopyClick}>
          <ShareIcon />
        </IconButton>
        <img src={imageSrc} className="card-img" alt={altText} />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-date">{date}</p>
        </div>
        {copySuccess && <span className="copy-message">주소가 복사되었습니다!</span>}
      </div>
    </Link>
  );
};

const Fund = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]); // 새로 작성된 글들을 저장하는 배열
  const userRole = useSelector((state) => state.memberSlice.role);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (location.state && location.state.postData) {
      setPosts((prevPosts) => [...prevPosts, location.state.postData]); // postData가 있을 때만 추가
    }

    // 서버에서 post 데이터를 가져오는 API 호출
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://www.마음이음api.site/api/fund/posts', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          },
          withCredentials: true
        });

        const sortedPosts = response.data.sort((a, b) => new Date(a.fundStartDate) - new Date(b.fundStartDate));
        setPosts(sortedPosts); // 서버에서 받아온 posts 데이터를 상태에 저장
        console.log("Fetched posts:", sortedPosts); // 콘솔에 모든 posts 데이터를 출력하여 확인
        console.log(`흠냥`,userRole);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  

    console.log(`posts:`,posts); // 서버로부터 받아온 모든 posts 데이터를 확인

    fetchPosts();
  }, [location.state]); // location.state가 변경될 때마다 실행

  return (
    <Main>
      {/* <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card1.png`}
        altText="호우피해 긴급모금 카드 이미지"
        title="호우피해 긴급모금"
        date="2024.6.16 ~ 2024.7.31"
        link="/fund-detail"
      />
      <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card2.png`}
        altText="산불피해 긴급모금 카드 이미지"
        title="산불피해 긴급모금"
        date="2024.7.01 ~ 2024.8.01"
        link="/fund-detail"
      />
      <FundCard
        imageSrc={`${process.env.PUBLIC_URL}/images/store-card3.png`}
        altText="산불피해 긴급모금 카드 이미지"
        title="전북 호우피해 구호키트 지원 캠페인"
        date="2024.7.16 ~ 2024.8.16"
        link="/fund-detail"
      /> */}

      {/* 서버에서 불러온 글들을 표시하는 카드들 */}
      {posts.map((post) => (
        <FundCard
          key={post.postId}
          imageSrc={post.mainImage}
          altText={post.title}
          title={post.title}
          date={`${post.fundStartDate} ~ ${post.fundEndDate}`}
          link={`/fund-detail/${post.postId}`} // 게시글 postId를 링크에 포함시킴
          postId={post.postId} // postId 전달
        />
      ))}


      {/* role이 ROLE_COUNSELOR일 때만 글 작성 버튼을 렌더링 */}
      {userRole  === 'ROLE_COUNSELOR' && (
        <div className="write-button-container">
          <Link to="/fund-post" className="write-button">글 작성하기</Link>
        </div>
      )}

    </Main>
  );
};

export default Fund;
