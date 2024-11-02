import axios from 'axios';

const SUPPORT_API_URL = 'https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/api/support';

// 문의하기 API 호출 함수
export const sendSupportMessage = async (formData) => {
    try {
        const response = await axios.post(`${SUPPORT_API_URL}/contact`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 필요에 따라 토큰 추가 가능
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending support message:', error);
        throw error;
    }
};
