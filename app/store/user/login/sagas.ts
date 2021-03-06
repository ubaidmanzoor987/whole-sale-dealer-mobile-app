import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const userLogin = (body: requestUserLogin) =>
  axios.post<IUser>( 'user/login', body);

function* fetchUserLoginSaga(action: FetchUserLoginRequest): any {
  try {
    const response = yield call(userLogin, action.payload);

    AsyncStorage.setItem('user', JSON.stringify(response.data.data));

    yield put(
      actions.fetchUserLoginSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
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
