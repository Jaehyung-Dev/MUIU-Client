import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifySms = createAsyncThunk(
    'sms/send',
    async (phoneNumber, thunkApi) => {
        try {
            const response = await axios.post(`https://www.마음이음api.site/sms/send/${phoneNumber}`);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
)

export const verifyCounselNum = createAsyncThunk(
    'member/counselNum',
    async (verifyNumber, thunkApi) => {
        try{
            const response = await axios.post(`https://www.마음이음api.site/members/counselNum/${verifyNumber}`);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
)

export const join = createAsyncThunk(
    'members/join',
    async (member, thunkApi) => {
        try {
            console.log("Sending member data to server:", member);
            const response = await axios.post('https://www.마음이음api.site/members/join', member);

            return response.data.item;   
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const login = createAsyncThunk(
    'members/login',
    async (member, thunkApi) => {
        try {
            const response = await axios.post('https://www.마음이음api.site/members/login', member);

            return response.data.item;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    'members/logout',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `https://www.마음이음api.site/members/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    }
                }
            );

            return response.data.item;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);