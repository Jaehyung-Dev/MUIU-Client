import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const WriteDiaryAPI = async (diaryData) => {
  try {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error("JWT token not found");
    }

    console.log('Sending diary data:', diaryData);
    const response = await axios.post('/api3/diaries/write', diaryData, {
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
