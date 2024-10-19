import axios from 'axios';

const FUND_API_URL = 'http://localhost:9090/api/fund';

export const createFundPost = async (formData) => {
    try {
        const response = await axios.post(`${FUND_API_URL}/post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // sessionStorage로 토큰 가져오깅
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating fund post:', error);
        throw error;
    }
};


