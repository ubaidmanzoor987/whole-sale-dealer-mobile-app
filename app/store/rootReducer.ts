import { combineReducers } from 'redux';

import registerReducer from './user/register/reducer';
import loginReducer from './user/login/reducer';
import forgetReducer from './user/forgotPassword/reducer';
import addBrandReducer from './brands/addBrand/reducer';
import listBrandReducer from './brands/listBrands/reducer';
import addProductReducer from './products/addProduct/reducer';
import listProductReducer from './products/listProducts/reducer';
import listCustomerReducer from './customers/list/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  forget: forgetReducer,
  addBrand: addBrandReducer,
  brands: listBrandReducer,
  products: listProductReducer,
  addProduct: addProductReducer,
  customersList: listCustomerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
