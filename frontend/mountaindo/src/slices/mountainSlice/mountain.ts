import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {};

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

// 산 전체 목록 가져오기 API
export const getMountainList = createAsyncThunk(
  'mountainSlice/getMountainList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('api/v1/mountains');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const mountainSlice = createSlice({
  name: 'mountain',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMountainList.fulfilled, (state, {payload}) => {
        console.log('getMountainListFulfilled ==> ', payload);
      })
      .addCase(getMountainList.rejected, (state, {payload}) => {
        console.log('getMountainListRejected ==>', payload);
      });
  },
});

export default mountainSlice;
