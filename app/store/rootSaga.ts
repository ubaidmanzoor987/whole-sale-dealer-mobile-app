import { all, fork } from "redux-saga/effects";

import registerSaga from "./user/register/sagas";
import loginSaga from "./user/login/sagas";
import forgotSaga from './user/forgotPassword/sagas'

export function* rootSaga() {
  yield all([fork(registerSaga)]);
  yield all([fork(loginSaga)]);
  yield all([fork(forgotSaga)]);
}
