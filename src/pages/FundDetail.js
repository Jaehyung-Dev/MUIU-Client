import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DonationDetails from '../components/DonationDetails';
import Loading from '../pages/Loading'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';


// Styled components
const Main = styled.main`
  position: relative;

  .fund-btn {
    height: 2.5rem;
    width: 9rem;
    border: none;
    border-radius: 0.35rem;
    display: block;
    margin: 5rem auto;
    margin-bottom: 2rem;
    background-color: #3A76E9;
    color: #fff;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .separator {
    border-top: 0.5rem solid #dfdfdf;
    margin: 0.4rem 0;
  }

  .separator-thin {
    border-top: 0.15rem solid #dfdfdf;
    margin: 0.4rem 0;
  }

  .post-detail {
    padding: 1.2rem;
  }

  .post-detail-title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .post-detail-content {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.4;

    p, span, h1, h2, h3, h4, h5, h6 {
      margin: 0; /* 모든 기본 속성 제거 */
    }

    /* Quill 에디터에서 인라인 스타일로 지정한 폰트 크기 적용 */
    .ql-size-small {
      font-size: 0.75em;
    }
    .ql-size-large {
      font-size: 1.5em;
    }
    .ql-size-huge {
      font-size: 2.5em;
    }
  }

  .detail-info-box .detail-info {
    font-weight: 600;
    margin: 1rem;
  }
  
  .detail-content {
    margin: 0.65rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;
  }

  .detail-info-description {
    color: #9e9e9e;
    font-size: 0.85rem;
    margin: 0.7rem 0 4rem 0.7rem;
  }

  .share-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .share-icon:hover {
    transform: scale(1.1);
    color: #FFCC00;
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

  .icon-without-pointer {
    pointer-events: none;
  }


  @media (max-width: 600px) {
    .post-img {
      width: 100%;
      height: auto;
    }
  }

  @media (min-width: 601px) {
    body {
      max-width: 600px;
      margin: 0 auto;
    }

    .post-img {
      width: 100%;
      height: auto;
    }
  }
`;


const MenuContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 120px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 10px;
`;

const StyledMoreVertIcon = styled(MoreVertIcon)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #FFCC00;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
      background-color: #f0f0f0;
      transform: scale(1.1);
      // color: #FFCC00;
  }
`;

// toast 스타일을 CSS로 커스터마이징
const toastStyle = `
.custom-toast {
  background-color: white !important;
  color: black !important;
  border: 1px solid #FFCC00;
}

.custom-progress-bar {
  background-color: #FFCC00 !important;
}
`;

// 스타일을 페이지에 적용
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = toastStyle;
document.head.appendChild(styleSheet);

const FundDetail = () => {
  const { postId } = useParams(); // URL에서 postId를 가져옴
  const [percentage, setPercentage] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0); 
  const [post, setPost] = useState(null); // 서버에서 받아온 데이터를 저장
  const [copyMessage, setCopyMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();


  // 케밥버튼 토글
  const toggleMenu = () => {
    console.log('Menu 토글 클릭됨');  
      setMenuVisible(!menuVisible);
  };
  
  // 케밥 - edit버튼
  const handleEditClick = (event) => {
    event.stopPropagation();  // 이벤트 전파 차단
    if (!post) {
      console.error('Post가 존재하지 않습니다.');
      return;
    }
    console.log('Navigate 호출 전: ', post); // post 데이터 확인
    navigate('/fund-post', { state: { post } });  // 현재 post 데이터를 넘기면서 FundPost.js로 이동
  };  

  // 케밥 - delete버튼
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:9090/api/fund/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      
      if (response.status === 200) {
        toast.success('게시글이 성공적으로 삭제되었습니다!', {
          position: "top-center",
          autoClose: 3000,
          className: 'custom-toast',
        });
        setTimeout(() => navigate('/fund'), 3000);
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      toast.error('게시글 삭제에 실패했습니다.', {
        position: "top-center",
        autoClose: 3000,
        className: 'custom-toast',
      });
    }
  };

  // 메뉴 외부 클릭 시 메뉴 닫기
  const handleClickOutside = (event) => {
    // 메뉴 외부를 클릭했을 때만 메뉴를 닫기
    if (menuVisible && !event.target.closest('.menu-container') && !event.target.closest('.MuiSvgIcon-root')) {
      setMenuVisible(false);
    }
  };  

  // 공유버튼(주소복사)
  const handleShareClick = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopyMessage('링크가 복사되었습니다.');
        setTimeout(() => setCopyMessage(''), 2000);
      })
      .catch(() => {
        setCopyMessage('링크 복사에 실패했습니다.');
        setTimeout(() => setCopyMessage(''), 2000);
      });
  };

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    // 게시글 데이터를 서버에서 가져오는 함수
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/fund/post/${postId}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` // 토큰을 헤더에 포함
          }
        });
        const post = response.data;
        console.log(`post뭐임`,post);
        
        // 서버에서 받은 데이터를 상태로 저장
        setPost(response.data);

        setCurrentAmount(post.currentAmount || 0);  // currentAmount가 null인 경우 0으로 설정

        // 목표 금액과 현재 금액을 기반으로 퍼센트 계산
        const calculatedPercentage = (currentAmount / post.targetAmount) * 100;
        setPercentage(calculatedPercentage);
        console.log(`calculatedPercentage`,calculatedPercentage);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetail();

    console.log(menuVisible ? '메뉴가 열렸습니다.' : '메뉴가 닫혔습니다.');

    document.addEventListener('mousedown', handleClickOutside);

    // cleanup 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [postId, menuVisible]); // postId가 변경될 때마다 실행되도록 postId를 배열에 추가


  if (!post) {
    return <Loading />; // 로딩 중일 때 로딩 페이지 표시
  }  


  return (
    <Main>
      <StyledMoreVertIcon onClick={toggleMenu} />

      {menuVisible && (
          <MenuContainer>
            <MenuItem onMouseDown={handleEditClick}>
                <EditIcon /> 
                {/* mui가 부모꺼랑 조부모꺼까지 이벤트 다 뺏어감. 전파 방지 코드 추가해도 안됨여 */}
                <span>Edit</span>
            </MenuItem>

            <MenuItem onMouseDown={handleDeleteClick}>
              <DeleteIcon />
                <span>Delete</span>
            </MenuItem>
          </MenuContainer>
      )}

      <ShareIcon className="share-icon" onClick={handleShareClick} />
      
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
      
      <DonationDetails
        imageSrc={post.mainImage}   
        title={post.title}
        recipient={post.teamName}
        percentage={percentage}
        targetAmount={post.targetAmount}
      />
      
      <button className="fund-btn" onClick={() => navigate(`/fund-payment/${post.postId}`)}>
        기부하기
      </button>
  
      <div className="separator"></div>
  
      <div className="post-detail">
        {/* <p className="post-detail-title"></p> */}
        {/* description을 HTML로 렌더링 */}
        <div className="post-detail-content" dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
  
      <div className="separator"></div>
  
      <div className='detail-info-box'>
        <div className="detail-info">모금함 상세정보</div>
        <div className="separator-thin"></div>
        <div className="detail-content">
          <span>프로젝트팀</span>
          <span>{post.teamName}</span>
        </div>
        <div className="detail-content">
          <span>모금기간</span>
          <span>{post.fundStartDate} - {post.fundEndDate}</span>
        </div>
        <div className="detail-content">
          <span>영수증 발급기간</span>
          <span>한국사회복지관협회</span>
        </div>
        <div className="separator-thin"></div>
        <div className="detail-info-description">
          본 모금은 한국사회복지관협회에서 가업 검토 및 기부금 집행, 사후관리를 담당하고 있습니다.
        </div>
      </div>
      <ToastContainer 
        toastClassName="custom-toast"
        style={{ marginTop: '2rem' }}
        progressClassName="custom-progress-bar"
      /> 
    </Main>
  );
};

export default FundDetail;
