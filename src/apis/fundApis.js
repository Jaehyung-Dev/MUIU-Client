import axios from 'axios';

const FUND_API_URL = 'http://localhost:9090/api/fund';

export const createFundPost = async (postData) => {
    try {
        const response = await axios.post(`${FUND_API_URL}/post`, postData);
        return response.data;
    } catch (error) {
        console.error('Error creating fund post:', error);
        throw error;
        
    }
};
