import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_User_Forget_Request,
} from './actionTypes';
import {
  IUser,
  FetchUserForgetRequest,
  requestUserForget
} from './types';
import { ENV_VAR } from '@app/utils/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Forget Password
const userForget = (body: requestUserForget) =>
  axios.post<IUser>(
    ENV_VAR.baseUrl + 'shopkeeper/forgetPassword',
    body
  ); 

function* fetchUserForgetSaga(action: FetchUserForgetRequest): any {
  try {
    const response = yield call(userForget, action.payload);
    console.log('iuihiuhihu',response.data);
    
    yield put(
      actions.fetchUserForgetSuccess({
        message: response.data.message,
        data: response.data.data,
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchUserForgetFailure({
        error: e.message,
      })
    );
  }
}

function* ForgetSaga() {
  yield all([takeLatest(Fetch_User_Forget_Request, fetchUserForgetSaga)])
}

export default ForgetSaga;
