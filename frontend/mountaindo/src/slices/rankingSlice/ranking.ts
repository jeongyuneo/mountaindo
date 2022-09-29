import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';

// 전체 랭킹 조회
export const totalRanking = createAsyncThunk(
  'userSlice/totalRanking',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('/api/v1/rankings');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 전체 랭킹 검색
export const totalRankingSearch = createAsyncThunk(
  'userSlice/totalRankingSearch',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/rankings/1?keyword=${args.keyword}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산별 랭킹 조회
export const mountainRanking = createAsyncThunk(
  'userSlice/mountainRanking',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/rankings/2/${args.mountainId}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산별 랭킹 검색
export const mountainRankingSearch = createAsyncThunk(
  'userSlice/mountainRankingSearch',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/rankings/3/${args.mountainId}?keyword=${args.keyword}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const rankingSlice = createSlice({
  name: 'ranking',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(totalRanking.fulfilled, (state, {payload}) => {
        console.log('totalRanking Fulfilled ==> ', payload);
      })
      .addCase(totalRanking.rejected, (state, {payload}) => {
        console.log('totalRanking Rejected ==>', payload);
      })
      .addCase(totalRankingSearch.fulfilled, (state, {payload}) => {
        console.log('totalRankingSearch Fulfilled ==> ', payload);
      })
      .addCase(totalRankingSearch.rejected, (state, {payload}) => {
        console.log('totalRankingSearch Rejected ==>', payload);
      })
      .addCase(mountainRanking.fulfilled, (state, {payload}) => {
        console.log('mountainRanking Fulfilled ==> ', payload);
      })
      .addCase(mountainRanking.rejected, (state, {payload}) => {
        console.log('mountainRanking Rejected ==>', payload);
      })
      .addCase(mountainRankingSearch.fulfilled, (state, {payload}) => {
        console.log('mountainRankingSearch Fulfilled ==> ', payload);
      })
      .addCase(mountainRankingSearch.rejected, (state, {payload}) => {
        console.log('mountainRankingSearch Rejected ==>', payload);
      });
  },
});

export default rankingSlice;
