import axios from 'axios';

// 로컬 저장소에서 JWT 토큰을 세션 저장소에 저장
const localJwtToken = localStorage.getItem('jwt');  // 로컬 저장소에서 JWT 토큰 가져오기
if (localJwtToken && !sessionStorage.getItem('ACCESS_TOKEN')) {
    sessionStorage.setItem('ACCESS_TOKEN', localJwtToken);  // 세션에 ACCESS_TOKEN으로 저장
} else {
    console.warn('No JWT token found in localStorage.');
}

const token = sessionStorage.getItem('ACCESS_TOKEN'); 

// JWT 토큰을 포함한 API 요청을 위한 기본 axios 인스턴스 설정
const apiClient = axios.create({
  baseURL: '/api',  // API의 기본 URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  withCredentials: true // 쿠키 또는 세션 ID를 함께 보내기 위해 필요
});

// 요청 전에 JWT 토큰을 Authorization 헤더에 추가하는 interceptor
apiClient.interceptors.request.use(config => {
  const token = sessionStorage.getItem('ACCESS_TOKEN');  // 세션에서 JWT 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // JWT 토큰이 있으면 Authorization 헤더에 추가
  } else {
    console.warn("JWT token is missing from sessionStorage.");
  }
  return config;
}, error => {
  console.error("Error setting Authorization header:", error);
  return Promise.reject(error);
});

// 유저 정보 가져오기 API (userId 파라미터 없이 호출)
export const getUserInfo = async () => {
  try {
    const response = await apiClient.get(`http://localhost:9090/diaries/my-diaries`);  // API 호출
    console.log('User info response:', response.data);  // 서버 응답 데이터 로그 출력
    alert(response.data);
    return response.data;  // 서버 응답 데이터를 반환
  } catch (error) {
    console.error('Error fetching user info:', error.message);  // 오류 메시지 출력
    if (error.response) {
      // 서버에서 응답이 있을 경우
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else {
      // 서버에서 응답이 없을 경우
      console.error('No response from server');
    }
    throw new Error('Error fetching user info: ' + error.message);  // 예외 처리
  }
  
};
