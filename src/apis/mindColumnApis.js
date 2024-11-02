import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const post = createAsyncThunk(
    'mind-column/post',
    async(formData, thunkApi) => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await axios.post('https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/mind-column', {
                mindColumDto : {mc_title : formData.mindColumDto.mc_title},
                uploadFiles: formData.mindColumDto.mcfList
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const getList = createAsyncThunk(
    'mind-column/getList',
    async(_, thunkApi) => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await axios.get('https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/mind-column', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {}
            });
            console.log('API Response:', response.data);
            return response.data;
        } catch (e) {
            console.error('API Error:', e); 
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const update = createAsyncThunk(
    'mind-column/update',
    async({id, formData}, thunkApi) => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await axios.patch(`https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/mind-column/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const deleteCard = createAsyncThunk(
    'mind-column/delete',
    async(id, thunkApi) => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await axios.delete(`https://www.%EB%A7%88%EC%9D%8C%EC%9D%B4%EC%9D%8Capi.site/mind-column/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data.items;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);