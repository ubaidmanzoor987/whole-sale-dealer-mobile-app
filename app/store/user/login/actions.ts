import * as actions from './actionTypes';
import * as types from './types';

export const fetchUserLoginRequest = (
  data: types.requestUserLogin
): types.FetchUserLoginRequest => ({
  type: actions.Fetch_User_Login_Request,
  payload: data,
});

export const fetchUserLoginSuccess = (
  payload: types.FetchUserResponsePayload
): types.FetchUserLoginSuccess => ({
  type: actions.Fetch_User_Login_Success,
  payload,
});

export const fetchUserLoginFailure = (
  payload: types.FetchUserResponsePayload
): types.FetchUserLoginFailure => ({
  type: actions.Fetch_User_Login_Failure,
  payload,
});

export const fetchUserLoginClear = (
): types.FetchUserLoginClear => ({
  type: actions.Fetch_User_Login_Clear,
});
