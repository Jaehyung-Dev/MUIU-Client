import axios from 'axios';

export const WriteDiaryAPI = async (diaryData) => {
  try {
    console.log('Sending diary data:', diaryData); // 요청을 보내기 전에 데이터를 출력
    const response = await axios.post('http://localhost:9090/diaries/write', diaryData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Server response:', response.data); // 응답 데이터를 출력
    return response.data; // 백엔드에서 반환된 데이터를 리턴
  } catch (error) {
    // 에러 메시지와 자세한 정보를 로그에 출력
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
