import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {};

// 산 전체 목록 가져오기 API (이름순)
export const getMountainList = createAsyncThunk(
  'mountainSlice/getMountainList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains?sort=${args.standard}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 검색한 산 불러오기 API
export const getSearchedMountain = createAsyncThunk(
  'mountainSlice/getSearchedMountain',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains/search/2?keyword=${args.keyword}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산 상세 정보 불러오기 API
export const getMountainDetail = createAsyncThunk(
  'mountainSlice/getMountainDetail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains/${args.mountainId}`,
      );
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
      })
      .addCase(getSearchedMountain.fulfilled, (state, {payload}) => {
        console.log('getSearchedMountainFulfilled ==> ', payload);
      })
      .addCase(getSearchedMountain.rejected, (state, {payload}) => {
        console.log('getSearchedMountainRejected ==>', payload);
      })
      .addCase(getMountainDetail.fulfilled, (state, {payload}) => {
        console.log('getMountainDetailFulfilled ==> ', payload);
      })
      .addCase(getMountainDetail.rejected, (state, {payload}) => {
        console.log('getMountainDetailRejected ==>', payload);
      });
  },
});

export default mountainSlice;
