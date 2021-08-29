import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchUserFailure, fetchUserSuccess } from "./actions";
import { Fetch_User_Request } from "./actionTypes";
import { IUser, requestUser, FetchUserRequest } from "./types";
import { baseUrl } from "../../constants/baseUrl";

const getUser = (body: requestUser) =>
  axios.post<IUser>(baseUrl + "shopkeeper/login", body);

function* fetchUserSaga(action: FetchUserRequest): any {
  try {
    const response = yield call(getUser, action.payload);
    yield put(
      fetchUserSuccess({
        user: response.data,
      })
    );
    if (response && response.data && response.data.status === 1) {
      yield put(
        fetchUserFailure({
          error: response.data.msg,
        })
      );
    }
  } catch (e) {
    yield put(
      fetchUserFailure({
        error: e.msg,
      })
    );
  }
}

function* authSaga() {
  yield all([takeLatest(Fetch_User_Request, fetchUserSaga)]);
}

export default authSaga;
