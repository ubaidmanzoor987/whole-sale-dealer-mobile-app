import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/sagas";
import ForgetSaga from "./forgetPassword/sagas";

export function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(ForgetSaga)]);
}
