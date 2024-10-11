import {createSlice} from '@reduxjs/toolkit';
import { join, login, logout, verifySms } from '../apis/memberApis';

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        isLogin: false,
        id: 0,
        username: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            console.log("Join Success Payload:", action.payload);
            if (action.payload) {
                alert(`${action.payload.username}님 가입 축하드립니다.`);
                window.location.href = '/login';
            }
            return state;
        });
        builder.addCase(join.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.username}님 환영합니다.`);
            sessionStorage.setItem('ACCESS_TOKEN', action.payload.token);

            return {
                ...state,
                isLogin: true,
                id: action.payload.id,
                username: action.payload.username,
                nickname: action.payload.nickname,
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if(action.payload.response.data.statusMessage === 'username not exist') {
                alert("존재하지 않는 아이디입니다.");
                return state;
            }

            if(action.payload.response.data.statusMessage === 'wrong password') {
                alert("잘못된 비밀번호입니다.");
                return state;
            }

            return state;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            alert("로그아웃 완료.");
            sessionStorage.removeItem("ACCESS_TOKEN");
            
            return {
                ...state,
                isLogin: false,
                id: 0,
                username: '',
            }
        });
        builder.addCase(logout.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
        builder.addCase(verifySms.fulfilled, (state, action) => {
            alert("인증 코드가 성공적으로 전송되었습니다.");
            return {
                ...state,
                smsSent: true,
            };
        });
        builder.addCase(verifySms.rejected, (state, action) => {
            alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
            return {
                ...state,
                smsSent: false,
            };
        });
    }
});

export default memberSlice.reducer;