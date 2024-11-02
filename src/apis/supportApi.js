import axios from 'axios';

const SUPPORT_API_URL = 'https://www.xn--api-248mu45ca3z.site/api/support';

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
