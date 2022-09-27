import {combineReducers} from 'redux';

import userSlice from '../slices/userSlice/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
