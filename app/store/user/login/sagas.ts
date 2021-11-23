// import axios from 'axios';
import axios from '../../../api/axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_User_Login_Request,
} from './actionTypes';
import {
  IUser,
  requestUserLogin,
  responseUserLogin,
  FetchUserLoginRequest
} from './types';
import { ENV_VAR } from '@app/utils/environments';
const userLogin = (body: requestUserLogin) =>
  axios.post<IUser>( 'user/login', body);

function* fetchUserLoginSaga(action: FetchUserLoginRequest): any {
  try {
    const response = yield call(userLogin, action.payload);
    yield put(
      actions.fetchUserLoginSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    console.log('response', e.response);
    yield put(
      actions.fetchUserLoginFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* loginUserSaga() {
  yield all([takeLatest(Fetch_User_Login_Request, fetchUserLoginSaga)]);
}

export default loginUserSaga;
