import { combineReducers } from 'redux';

import registerReducer from './user/register/reducer';
import loginReducer from './user/login/reducer';
import forgetReducer from './user/forgotPassword/reducer';
import addBrandReducer from './brands/addBrand/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  forget: forgetReducer,
  addBrand: addBrandReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
