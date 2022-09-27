import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

export const signUp = createAsyncThunk(
  'userSlice/signUp',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('api/v1/members', {
        email: args.email,
        password: args.password,
        name: args.name,
        birth: args.check,
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
      .addCase(signUp.pending, (state, {payload}) => {
        console.log('SignUp Pending ==>', payload);
      })
      .addCase(signUp.fulfilled, (state, {payload}) => {
        console.log('SignUp Fulfilled ==>', payload);
      })
      .addCase(signUp.rejected, (state, {payload}) => {
        console.log('SignUp Rejected ==>', payload);
      })
      .addCase(checkCertification.pending, (state, {payload}) => {
        console.log('CheckCertification Pending ==>', payload);
      })
      .addCase(checkCertification.fulfilled, (state, {payload}) => {
        console.log('CheckCertification Fullfilled ==>', payload);
      })
      .addCase(checkCertification.rejected, (state, {payload}) => {
        console.log('CheckCertification Rejected ==>', payload);
      });
  },
});

export default userSlice;
