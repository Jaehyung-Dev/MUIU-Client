import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const WriteDiaryAPI = async (diaryData) => {
  try {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error("JWT token not found");
    }

    console.log('Sending diary data:', diaryData);
    const response = await axios.post('https://www.xn--api-248mu45ca3z.site/diaries/write', diaryData, {
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

export const handleDiarySubmission = async (diaryData, userId, navigate) => {
  try {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error("JWT token not found");
    }

    // 오늘 일기가 이미 작성되었는지 확인
    const checkResponse = await axios.get(`https://www.xn--api-248mu45ca3z.site/diaries/check-today?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (checkResponse.data.exists) {
      // 이미 작성된 일기가 있는 경우, 수정 여부를 묻는 확인 창 표시
      const proceed = window.confirm("오늘의 일기를 이미 작성하셨습니다. 수정하시겠습니까?");
      if (proceed) {
        navigate(`/my-diary/edit`); // 수정 페이지로 이동
      } else {
        navigate(`/my-diary`); // 메인 페이지로 이동
      }
    } else {
      // 오늘 일기가 없는 경우 새 일기 작성
      console.log('Sending diary data:', diaryData);
      const writeResponse = await axios.post('https://www.xn--api-248mu45ca3z.site/diaries/write', diaryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Server response:', writeResponse.data);
      alert("일기가 성공적으로 작성되었습니다.");
      navigate('/my-diary-collection'); // 일기 모음 페이지로 이동
    }
  } catch (error) {
    // 확인 또는 작성 과정에서 발생하는 오류 처리
    if (error.response && error.response.status === 400) {
      alert("오늘의 일기를 이미 작성하셨습니다."); // 이미 작성된 일기 경고창 표시
    } else {
      console.error("Error handling diary submission:", error);
      alert("일기 작성 중 오류가 발생했습니다."); // 일반 오류 경고창 표시
    }
  }
};