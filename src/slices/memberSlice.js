import {createSlice} from '@reduxjs/toolkit';
import { join, login, logout, verifySms, verifyCounselNum, fetchUser } from '../apis/memberApis';

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        isLogin: false,
        id: 0,
        username: '',
        role: '',
        naverLogin: false,
    },
    reducers: {
        // 네이버 로그인 상태를 변경하는 reducer 추가
        setNaverLogin: (state, action) => {
            state.naverLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            window.location.href = '/join-success';
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
                role: action.payload.role,
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
                role: '',
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
        builder.addCase(verifyCounselNum.fulfilled, (state, action) => {
            alert("인증 코드 전송 성공");
            return {
                ...state,
                counselVerify: true,
            };
        });
        builder.addCase(verifyCounselNum.rejected, (state, action) => {
            alert("인증 코드 전송 실패");
            return {
                ...state,
                counselVerify: false,
            };
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return {
                ...state,
                isLogin: true,
                id: action.payload.id,
                username: action.payload.username,
                role: action.payload.role,
            };
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            alert("사용자 정보를 가져오는 데 실패했습니다.");
            return state;
        });
    }
});

// `setNaverLogin` 액션을 export
export const { setNaverLogin } = memberSlice.actions;

export default memberSlice.reducer;