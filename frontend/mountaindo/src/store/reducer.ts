import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import modalSlice from '../slices/modal';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
