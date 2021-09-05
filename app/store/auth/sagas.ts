import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import { Fetch_User_Request, Fetch_User_Logout_Request } from './actionTypes';
import {
  IUser,
  requestUser,
  requestUserLogout,
  FetchUserRequest,
  FetchUserLogoutRequest,
} from './types';
import { ENV_VAR } from '@app/utils/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = (body: requestUser) =>
  axios.post<IUser>(ENV_VAR.baseUrl + 'shopkeeper/login?t=' + new Date(), body);

const logoutUser = (body: requestUserLogout) =>
  axios.post<IUser>(
    ENV_VAR.baseUrl + 'shopkeeper/logout?t=' + new Date(),
    body
  );

async function storeData(token, user) {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    console.log('AsyncStorage error during store data: ', error);
  }
}

async function clearData() {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.log('AsyncStorage error during remove data:', error);
  }
}

function* fetchUserSaga(action: FetchUserRequest): any {
  try {
    const response = yield call(getUser, action.payload);
    if (response.data.data === null) {
      yield put(
        actions.fetchUserFailure({
          error: response.data.message,
        })
      );
    } else {
      yield put(
        actions.fetchUserSuccess({
          user: response.data.data,
          message: response.data.message,
        })
      );
      const token = JSON.stringify(response.data?.data?.token);
      const user = JSON.stringify(response.data?.data);
      yield call(storeData, token, user);
    }
  } catch (e: any) {
    yield put(
      actions.fetchUserFailure({
        error: e.message,
      })
    );
  }
}

function* fetchUserLogoutSaga(action: FetchUserLogoutRequest): any {
  try {
    const response = yield call(logoutUser, action.payload);

    yield put(
      actions.fetchUserLogoutSuccess({
        message: response.data.message,
        data: {},
      })
    );
    yield call(clearData);
  } catch (e: any) {
    yield put(
      actions.fetchUserLogoutFailure({
        error: e.message,
      })
    );
  }
}

function* authSaga() {
  yield all([takeLatest(Fetch_User_Request, fetchUserSaga)]);
  yield all([takeLatest(Fetch_User_Logout_Request, fetchUserLogoutSaga)]);
}

export default authSaga;
