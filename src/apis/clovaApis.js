import axios from 'axios';

// 채팅 메시지를 백엔드로 보내고 응답을 받는 함수
export const clovaApis = async (message) => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    
    if (!token) {
      throw new Error("JWT token not found");
    }

    try {
      // Spring Boot 백엔드에 사용자 메시지 전송
      const response = await axios.post('http://localhost:9090/ai-counseling', { 
        text: message 
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
      
      // 응답 데이터 반환
      return response.data.reply;
    } catch (error) {
      console.error('오류:', error);
      throw error;
    }
  };