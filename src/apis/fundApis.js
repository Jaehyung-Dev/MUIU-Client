import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const FUND_API_URL = 'http://localhost:9090/api/fund';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: FUND_API_URL,
    withCredentials: true,  // 쿠키 포함 설정
});

// 요청마다 Authorization 헤더 추가
apiClient.interceptors.request.use(config => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 게시글 작성 API 호출
export const createFundPost = async (formData) => {
    try {
        const response = await axios.post('http://localhost:9090/api/fund/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating fund post:', error);
        throw error;
    }
};


// JSON 요청으로 게시글 업데이트
export const updateFundPost = async (postId, postData) => {
    try {
        const response = await apiClient.put(`/post/${postId}`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating fund post:', error);
        throw error;
    }
};

// 이미지 업로드 함수
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
