import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import axiosService from '../../store/axiosService';
const initialState = {
  name: '',
  email: '',
  accessToken: '',
};

export const login = createAsyncThunk(
  'userSlice/login',
  async (args: any, {rejectWithValue}) => {
    try {
      console.log('LOGIN_TRY ==>', args);
      console.log('CONFIG ===> ', Config.REACT_APP_BE_HOST);

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, {payload}) => {
        console.log('Login Pending ==>', payload);
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        console.log('LoginFulfilled ==> ', payload);
      })
      .addCase(login.rejected, (state, {payload}) => {
        console.log('LoginRejected ==>', payload);
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
      });
  },
});

export default userSlice;
