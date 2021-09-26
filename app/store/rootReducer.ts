import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import ForgetReducer from './forgetPassword/reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  ForgetReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
