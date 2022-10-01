import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {};

// 산 전체 목록 가져오기 API
export const getMountainList = createAsyncThunk(
  'mountainSlice/getMountainList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('api/v1/mountains?sort=name');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 검색한 산 불러오기
export const getSearchedMountain = createAsyncThunk(
  'mountainSlice/getSearchedMountain',
  async (args: any, {rejectWithValue}) => {
    try {
      console.log('args', args);
      const response = await axiosService.get(
        `api/v1/mountains/search/2?keyword=${args.keyword}`,
      );
      console.log('response', response);
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
