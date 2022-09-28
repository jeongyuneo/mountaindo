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
      });
  },
});

export default rankingSlice;
