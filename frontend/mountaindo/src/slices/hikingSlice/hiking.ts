import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';

// 등산 기록 저장
export const endHiking = createAsyncThunk(
  'userSlice/endHiking',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post(
        '/api/v1/hikings',
        {hikingRequest: args.hikingRequest},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산 검색
export const searchMountain = createAsyncThunk(
  'userSlice/searchMountain',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/mountains/search/2?keyword=${args.keyword}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산 상세 조회
export const mountainDetail = createAsyncThunk(
  'userSlice/mountainDetail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/mountains/${args.mountainId}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 완등한 산 목록 조회
export const completedMountainList = createAsyncThunk(
  'userSlice/completedMountainList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('/api/v1/hikings/2');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 방문한 등산 코스 목록 조회
export const visitedTrailList = createAsyncThunk(
  'userSlice/visitedTrailList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('/api/v1/hikings');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const hikingSlice = createSlice({
  name: 'hiking',
  initialState: {
    isPending: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(endHiking.fulfilled, (state, {payload}) => {
        console.log('endHiking Fulfilled ==> ', payload);
      })
      .addCase(endHiking.rejected, (state, {payload}) => {
        console.log('endHiking Rejected ==>', payload);
      })
      .addCase(searchMountain.fulfilled, (state, {payload}) => {
        console.log('searchMountain Fulfilled ==> ', payload);
      })
      .addCase(searchMountain.rejected, (state, {payload}) => {
        console.log('searchMountain Rejected ==>', payload);
      })
      .addCase(mountainDetail.fulfilled, (state, {payload}) => {
        console.log('mountainDetail Fulfilled ==> ', payload);
      })
      .addCase(mountainDetail.rejected, (state, {payload}) => {
        console.log('mountainDetail Rejected ==>', payload);
      })
      .addCase(completedMountainList.pending, (state, {payload}) => {
        console.log('completedMountainList Pending ==> ', payload);
        state.isPending = true;
      })
      .addCase(completedMountainList.fulfilled, (state, {payload}) => {
        console.log('completedMountainList Fulfilled ==> ', payload);
        state.isPending = false;
      })
      .addCase(completedMountainList.rejected, (state, {payload}) => {
        console.log('completedMountainList Rejected ==>', payload);
        state.isPending = false;
      })
      .addCase(visitedTrailList.fulfilled, (state, {payload}) => {
        console.log('visitedTrailList Fulfilled ==> ', payload);
      })
      .addCase(visitedTrailList.rejected, (state, {payload}) => {
        console.log('visitedTrailList Rejected ==>', payload);
      });
  },
});

export default hikingSlice;
