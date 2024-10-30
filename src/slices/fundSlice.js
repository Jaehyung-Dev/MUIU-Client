// fundSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createFundPost, updateFundPost, uploadImage } from "../apis/fundApis";

const fundSlice = createSlice({
    name: 'fund',
    initialState: {
        fundPosts: [],
        singleFundPost: null,
        imageUploadUrl: null, // 초기값을 null로 설정 🛠️
        loading: false,
        error: null
    },
    reducers: {
        resetImageUrl: (state) => {
            state.imageUploadUrl = null; // 초기화 리듀서 🛠️
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFundPost.fulfilled, (state, action) => {
                state.fundPosts.push(action.payload);
                state.loading = false;
                alert('게시글이 성공적으로 등록되었습니다.');
            })
            .addCase(createFundPost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                alert('게시글 등록에 실패했습니다.');
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.imageUploadUrl = action.payload; // 업로드 성공 시 URL 업데이트 🛠️
                state.loading = false;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                alert('이미지 업로드에 실패했습니다.');
            });
    }
});

export const { resetImageUrl, clearError } = fundSlice.actions;
export default fundSlice.reducer;
