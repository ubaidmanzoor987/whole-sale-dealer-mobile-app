import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_User_Create_Request,
} from './actionTypes';
import {
  requestUser,
  responseUser,
  FetchUserRequest
} from './types';
import { ENV_VAR } from '@app/utils/environments';

const userCreate = (body: requestUser) =>
  axios.post<responseUser>(ENV_VAR.baseUrl + 'user/insert_user', body);

function* fetchUserCreateSaga(action: FetchUserRequest): any {
  try {
    const response = yield call(userCreate, action.payload);
    yield put(
      actions.fetchUserCreateSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    console.log('response', e.response);
    yield put(
      actions.fetchUserCreateFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* createUserSaga() {
  yield all([takeLatest(Fetch_User_Create_Request, fetchUserCreateSaga)]);
}

export default createUserSaga;