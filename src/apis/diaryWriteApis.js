import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const WriteDiaryAPI = async (diaryData) => {
  try {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error("JWT token not found");
    }

    console.log('Sending diary data:', diaryData);
    const response = await axios.post('http://localhost:9090/diaries/write', diaryData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error writing diary:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else {
      console.error('No response from server');
    }
    throw new Error('Error writing diary: ' + error.message);
  }
};

// 오늘 일기를 이미 작성했는지 확인하는 API
export const CheckTodayDiaryAPI = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:9090/diaries/check-today?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
      },
    });
    return response.data; // 정상적인 응답이 올 경우 반환
  } catch (error) {
    console.log("Error response:", error.response); // 에러 응답 내용을 콘솔에 출력
    
    // 400 에러로 인해 이미 일기가 작성된 경우 처리
    if (error.response && error.response.status === 400) {
      alert("오늘의 일기를 이미 작성하셨습니다."); // alert 창 표시
      return { exists: true }; // 이미 작성된 상태임을 표시
    } else {
      console.error("Error checking today's diary:", error);
      throw error; // 다른 에러는 다시 throw
    }
  }
};

export const handleWriteDiary = async (diaryData, userId, navigate) => {
  try {
    const todayDiaryExists = await CheckTodayDiaryAPI(userId);
    
    if (todayDiaryExists) {
      const proceed = window.confirm("오늘의 일기를 이미 작성하셨습니다. 수정하시겠습니까?");
      if (proceed) {
        navigate(`/my-diary/edit`); // 수정 페이지로 이동
      } else {
        navigate(`/my-diary`); // 메인 페이지로 이동
      }
    } else {
      // 오늘 일기가 없으면 새 일기 작성
      await WriteDiaryAPI(diaryData);
      alert("일기가 성공적으로 작성되었습니다.");
    }
  } catch (error) {
    console.error("Error handling diary write:", error);
    alert("일기 작성 중 오류가 발생했습니다.");
  }
};
