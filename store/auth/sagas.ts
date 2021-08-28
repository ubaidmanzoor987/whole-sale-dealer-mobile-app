import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchUserFailure, fetchUserSuccess } from "./actions";
import { Fetch_User_Request } from "./actionTypes";
import { IUser, requestUser, FetchUserRequest } from "./types";

const baseUrl = "http://127.0.0.1:5000/";
const getUser = async (body: requestUser) =>
  await axios.post<IUser>(baseUrl + "shopkeeper/login", body);

function* fetchUserSaga(action: FetchUserRequest): any {
  try {
    const response = yield call(getUser, action.payload);
    console.log("response", response);
    yield put(
      fetchUserSuccess({
        user: response.data,
      })
    );
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
