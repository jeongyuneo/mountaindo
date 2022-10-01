import {combineReducers} from 'redux';
import hikingSlice from '../slices/hikingSlice/hiking';
import rankingSlice from '../slices/rankingSlice/ranking';

import userSlice from '../slices/userSlice/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ranking: rankingSlice.reducer,
  hiking: hikingSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
