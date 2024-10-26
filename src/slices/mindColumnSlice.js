import { createSlice } from "@reduxjs/toolkit";
import { post } from "../apis/mindColumnApis";

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
        // builder.addCase(getList.fulfilled, (state, action) => {
        //     alert('정상적으로 등록되었습니다.');

        //     return {
        //         ...state,
        //         mindColumn: action.payload.pageItems,
        //         page: 0
        //     }
        // });
        // builder.addCase(getList.rejected, (state, action) => {
        //     alert('에러가 발생했습니다.');
        //     console.log(action.payload);
        //     return state; 
        // });
    }
});

export default mindColumnSlice.reducer;