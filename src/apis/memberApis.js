import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const join = createAsyncThunk(
    'members/join',
    async (member, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:9090/members/join', member);

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
            const response = await axios.post('http://localhost:9090/members/login', member);

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
                `http://localhost:9090/members/logout`,
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