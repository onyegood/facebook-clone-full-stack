import { combineReducers } from 'redux';
import { userReducer } from './user';

const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
