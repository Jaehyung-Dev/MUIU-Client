import { createSlice } from "@reduxjs/toolkit";
import { deleteCard, getList, post, update } from "../apis/mindColumnApis";

const mindColumnSlice = createSlice({
    name: 'mindColumn',
    initialState: {
        mindColumn: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(post.fulfilled, (state, action) => {
            alert('정상적으로 등록되었습니다.');

            return {
                ...state,
                mindColumn: action.payload.pageItems,
                page: 0
            }
        });
        builder.addCase(post.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            console.log(action.payload);
            return state; 
        });
        builder.addCase(getList.fulfilled, (state, action) => {
            console.log('Fetched Data:', action.payload);

            return {
                ...state,
                mindColumn: action.payload.pageItems,
                page: action.payload.pageItems.pageable.pageNumber
            }
        });
        builder.addCase(getList.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            console.log(action.payload);
            return state; 
        });
        builder.addCase(update.fulfilled, (state, action) => {
            console.log('Fetched Data:', action.payload);

            return {
                ...state,
                mindColumn: action.payload.pageItems,
                page: 0
            }
        });
        builder.addCase(update.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            console.log(action.payload);
            return state; 
        });
        builder.addCase(deleteCard.fulfilled, (state, action) => {
            return {
                ...state,
                mindColumn: action.payload.pageItems,
                page: 0
            }
        });
        builder.addCase(deleteCard.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            console.log(action.payload);
            return state; 
        });
    }
});

export default mindColumnSlice.reducer;