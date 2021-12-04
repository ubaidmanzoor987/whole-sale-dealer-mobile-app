import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_User_Forget_Request,
} from './actionTypes';
import {
  requestUserForget,
  responseUserForget,
  FetchUserForgetRequest
} from './types';
import { ENV_VAR } from '@app/utils/environments';

const userForget = (body: requestUserForget) =>
  axios.post<responseUserForget>(ENV_VAR.baseUrl + 'user/forgetPassword', body);

function* fetchUserForgetSaga(action: FetchUserForgetRequest): any {
  try {
    const response = yield call(userForget, action.payload);
    yield put(
      actions.fetchUserForgetSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchUserForgetFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* ForgetUserSaga() {
  yield all([takeLatest(Fetch_User_Forget_Request, fetchUserForgetSaga)]);
}

export default ForgetUserSaga;
