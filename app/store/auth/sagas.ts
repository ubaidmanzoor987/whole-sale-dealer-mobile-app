import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchUserFailure, fetchUserSuccess } from './actions';
import { Fetch_User_Request } from './actionTypes';
import { IUser, requestUser, FetchUserRequest } from './types';
import { ENV_VAR } from '@app/utils/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = (body: requestUser) =>
  axios.post<IUser>(ENV_VAR.baseUrl + 'shopkeeper/login?t=' + new Date(), body);

async function storeToken(token, user) {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}

function* fetchUserSaga(action: FetchUserRequest): any {
  try {
    const response = yield call(getUser, action.payload);

    if (response.data.data === null) {
      yield put(
        fetchUserFailure({
          error: response.data.message,
        })
      );
    } else {
      yield put(
        fetchUserSuccess({
          user: response.data,
        })
      );
      const token = JSON.stringify(response.data?.data?.token);
      const user = JSON.stringify(response.data?.data);
      yield call(storeToken, token, user);
    }
  } catch (e: any) {
    yield put(
      fetchUserFailure({
        error: e.message,
      })
    );
  }
}

function* authSaga() {
  yield all([takeLatest(Fetch_User_Request, fetchUserSaga)]);
}

export default authSaga;
