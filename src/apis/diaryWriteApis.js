import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const WriteDiaryAPI = async (diaryData) => {
  try {
    const token = sessionStorage.getItem('ACCESS_TOKEN');  // 토큰을 sessionStorage에서 가져옴
    if (!token) {
      throw new Error("JWT token not found");
    }

    console.log('Sending diary data:', diaryData); // 요청을 보내기 전에 데이터를 출력
    const response = await axios.post('/diaries/write', diaryData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // JWT 토큰 추가
      },
    });
    console.log('Server response:', response.data); // 응답 데이터를 출력
    return response.data; // 백엔드에서 반환된 데이터를 리턴
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

// // 오늘 일기를 이미 작성했는지 확인하는 API
// export const CheckTodayDiaryAPI = async (userId) => {
//   try {
//     const response = await axios.get(`/diaries/check-today?userId=${userId}`, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     });
//     return response.data; // 서버에서 'exists'라는 플래그를 반환한다고 가정
//   } catch (error) {
//     console.error('Error checking today\'s diary:', error);
//     throw error;
//   }
// };
