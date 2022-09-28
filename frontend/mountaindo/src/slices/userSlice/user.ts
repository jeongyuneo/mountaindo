import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  servey1: '',
  servey2: '',
  servey3: '',
  servey4: '',
  servey5: '',
  isServeyed: false,
  isLoggedIn: false,
};

// 회원정보 API
export const userInfo = createAsyncThunk(
  'userSlice/userInfo',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('/api/v1/members');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 로그인 API
export const login = createAsyncThunk(
  'userSlice/login',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/login', {
        email: args.email,
        password: args.password,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 이메일 중복확인하기
export const checkCertification = createAsyncThunk(
  'userSlice/checkCertification',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('api/v1/members/email?', {
        params: {
          email: args.email,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 회원가입하기
export const signUp = createAsyncThunk(
  'userSlice/signUp',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('api/v1/members', {
        email: args.email,
        password: args.password,
        name: args.name,
        birth: args.birth,
        phone: args.phoneNumber,
        address: {
          si: args.selectedCity,
          gu: args.selectedCity2,
          dong: args.selectedCity2,
          fullAddress: '경기도',
        },
        nickname: args.nickName,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 설문조사 결과 저장하기
export const servey = createAsyncThunk(
  'userSlice/servey',
  async (args: any, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosService.post(
        '/api/v1/members/initial-survey',
        {
          headers: {
            Authorization: token,
          },
          myLevel: args.servey1,
          visitedMountain: args.servey2,
          preferredMountainLocation: args.servey3,
          preferredMountainStyle: args.servey4,
          preferredClimbingTime: args.servey5,
        },
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 아아디 찾기 (이메일)
export const findEmail = createAsyncThunk(
  'userSlice/findEmail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/email', {
        name: args.name,
        birth: args.birth,
        phone: args.phone,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 비밀번호 찾기
export const findPassword = createAsyncThunk(
  'userSlice/findPassword',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/password', {
        name: args.name,
        email: args.email,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 회원탈퇴
export const signOut = createAsyncThunk(
  'userSlice/signOut',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.delete('/api/v1/members');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout(state, action) {
      state.isLoggedIn = false;
    },
    setServey(state, action) {
      if (action.payload.number === 1) {
        state.servey1 = action.payload.myLevel;
      } else if (action.payload.number === 2) {
        state.servey2 = action.payload.visitedMountain;
      } else if (action.payload.number === 3) {
        state.servey3 = action.payload.preferredMountainLocation;
      } else if (action.payload.number === 4) {
        state.servey4 = action.payload.preferredMountainStyle;
      } else if (action.payload.number === 5) {
        state.servey5 = action.payload.preferredClimbingTime;
      }
    },
    setIsServeyed(state) {
      state.isServeyed = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, {payload}) => {
        console.log('Login Pending ==>', payload);
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        console.log('LoginFulfilled ==> ', payload);
        if (payload.token) {
          state.isLoggedIn = true;
        }
      })
      .addCase(login.rejected, (state, {payload}) => {
        console.log('LoginRejected ==>', payload);
        state.isLoggedIn = false;
      })
      .addCase(userInfo.fulfilled, (state, {payload}) => {
        console.log('userInfoFulfilled ==> ', payload);
      })
      .addCase(userInfo.rejected, (state, {payload}) => {
        console.log('userInfoRejected ==>', payload);
      })
      .addCase(checkCertification.fulfilled, (state, {payload}) => {
        console.log('CheckCertification Fullfilled ==>', payload);
      })
      .addCase(checkCertification.rejected, (state, {payload}) => {
        console.log('CheckCertification Rejected ==>', payload);
      })
      .addCase(signUp.pending, (state, {payload}) => {
        console.log('SignUp Pending ==>', payload);
      })
      .addCase(signUp.fulfilled, (state, {payload}) => {
        console.log('SignUp Fulfilled ==>', payload);
      })
      .addCase(signUp.rejected, (state, {payload}) => {
        console.log('SignUp Rejected ==>', payload);
      })
      .addCase(servey.fulfilled, (state, {payload}) => {
        console.log('Servey Fulfilled ==>', payload);
      })
      .addCase(servey.rejected, (state, {payload}) => {
        console.log('Servey Rejected ==>', payload);
      })
      .addCase(findEmail.fulfilled, (state, {payload}) => {
        console.log('findEmail Fulfilled ==> ', payload);
      })
      .addCase(findEmail.rejected, (state, {payload}) => {
        console.log('findEmail Rejected ==>', payload);
      })
      .addCase(findPassword.fulfilled, (state, {payload}) => {
        console.log('findPassword Fulfilled ==> ', payload);
      })
      .addCase(findPassword.rejected, (state, {payload}) => {
        console.log('findPassword Rejected ==>', payload);
      })
      .addCase(signOut.fulfilled, (state, {payload}) => {
        console.log('signOut Fulfilled ==> ', payload);
      })
      .addCase(signOut.rejected, (state, {payload}) => {
        console.log('signOut Rejected ==>', payload);
      });
  },
});

export default userSlice;
