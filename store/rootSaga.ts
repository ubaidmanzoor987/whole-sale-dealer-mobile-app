import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/sagas";

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
