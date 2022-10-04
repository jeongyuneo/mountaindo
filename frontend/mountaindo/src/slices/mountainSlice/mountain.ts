import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {
  mountainList: [],
  page: 0,
  standard: 'name',
  location: '전체',
};

// 산 전체 목록 가져오기 API (이름순, 인기순, 고도 높은 순, 고도 낮은 순)
export const getMountainList = createAsyncThunk(
  'mountainSlice/getMountainList',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains?sort=${args.standard}&si=${args.location}&page=${args.page}`,
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
        `api/v1/mountains/search/1?keyword=${args.keyword}&sort=${args.standard}&si=${args.location}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 검색한 등산로 불러오기 API
export const getSearchedTrail = createAsyncThunk(
  'mountainSlice/getSearchTrail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains/search/2?keyword=${args.keyword}&sort=${args.standard}&si=${args.location}`,
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

// 등산로 상세 정보 불러오기 API
export const getTrailDetail = createAsyncThunk(
  'mountainSlice/getTrailDetail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/mountains/trail/${args.trailId}`,
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const mountainSlice = createSlice({
  name: 'mountain',
  initialState,
  reducers: {
    setInitialMountainList(state) {
      state.mountainList = [];
    },
    setInitialPage(state) {
      state.page = 0;
    },
    setStandard(state, action) {
      state.standard = action.payload.standard;
    },
    setLocation(state, action) {
      state.location = action.payload.location;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMountainList.fulfilled, (state, {payload}) => {
        console.log('getMountainListFulfilled ==>', payload);
        state.page = state.page + 1;
        state.mountainList = state.mountainList.concat(payload);
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
      .addCase(getSearchedTrail.fulfilled, (state, {payload}) => {
        console.log('getSearchedTrailFulfilled ==> ', payload);
      })
      .addCase(getSearchedTrail.rejected, (state, {payload}) => {
        console.log('getSearchedTrailRejected ==>', payload);
      })
      .addCase(getMountainDetail.fulfilled, (state, {payload}) => {
        console.log('getMountainDetailFulfilled ==> ', payload);
      })
      .addCase(getMountainDetail.rejected, (state, {payload}) => {
        console.log('getMountainDetailRejected ==>', payload);
      })
      .addCase(getTrailDetail.fulfilled, (state, {payload}) => {
        console.log('getTrailDetailFulfilled ==> ', payload);
      })
      .addCase(getTrailDetail.rejected, (state, {payload}) => {
        console.log('getTrailDetailRejected ==>', payload);
      });
  },
});

export default mountainSlice;
