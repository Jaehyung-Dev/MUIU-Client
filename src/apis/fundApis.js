import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

// 게시글 작성 API 호출을 createAsyncThunk로 변환
export const createFundPost = createAsyncThunk(
  'fund/createFundPost',
  async (formData, thunkApi) => {
      try {
          const response = await axios.post('https://www.xn--api-248mu45ca3z.site/api/fund/post', formData, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                'Content-Type': 'multipart/form-data',
                withCredentials: true,  // 쿠키 포함 설정
              },
          });
          return response.data;
      } catch(e) {
          return thunkApi.rejectWithValue(e);
      }
  }
);

// 게시글 업데이트 API 호출을 createAsyncThunk로 변환
export const updateFundPost = createAsyncThunk(
  'fund/updateFundPost',
  async ({ postId, postData }, thunkApi) => {
      try {
          const response = await axios.put(`https://www.xn--api-248mu45ca3z.site/api/fund/post/${postId}`, postData, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                  'Content-Type': 'application/json',
                  withCredentials: true,  // 쿠키 포함 설정
              },
          });
          return response.data;
      } catch(e) {
          return thunkApi.rejectWithValue(e);
    }
  }
);

// 이미지 업로드 API 호출을 createAsyncThunk로 변환
export const uploadImage = createAsyncThunk(
  'fund/uploadImage',
  async (file, thunkApi) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
          const response = await axios.post('https://www.xn--api-248mu45ca3z.site/api/fund/upload', formData, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                'Content-Type': 'multipart/form-data',
                withCredentials: true,  // 쿠키 포함 설정
              },
          });
          return response.data.imageUrl;
      } catch(e) {
          return thunkApi.rejectWithValue(e);
      }
  }
);