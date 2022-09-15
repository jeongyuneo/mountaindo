import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visibleModal: false,
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setVisibleModal(state, action) {
      state.visibleModal = action.payload.visibleModal;
    },
  },
  // extraReducers: builder => {},
});

export default modalSlice;
