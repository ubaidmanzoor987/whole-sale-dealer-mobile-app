import { all, fork } from "redux-saga/effects";

import registerSaga from "./user/register/sagas";
import loginSaga from "./user/login/sagas";
import forgotSaga from './user/forgotPassword/sagas';
import addBrandSaga from './brands/addBrand/sagas';
import listBrandSaga from './brands/listBrands/sagas';
import listProductSaga from './products/listProducts/sagas';
import addProductSaga from './products/addProduct/sagas';
import listCustomersSaga from './customers/list/sagas';
import listShopkeeperCustomers from './customers/shopkeeperCustomerList/sagas';
import favouritesProductSaga from './products/favourites/sagas';
import cartProductSaga from './products/cart/sagas';
import orderProductSaga from './products/order/sagas';

export function* rootSaga() {
  yield all([fork(registerSaga)]);
  yield all([fork(loginSaga)]);
  yield all([fork(forgotSaga)]);
  yield all([fork(addBrandSaga)]);
  yield all([fork(listBrandSaga)]);
  yield all([fork(listProductSaga)]);
  yield all([fork(addProductSaga)]);
  yield all([fork(listCustomersSaga)]);
  yield all([fork(listShopkeeperCustomers)]);
  yield all([fork(favouritesProductSaga)]);
  yield all([fork(cartProductSaga)]);
  yield all([fork(orderProductSaga)]);
}
