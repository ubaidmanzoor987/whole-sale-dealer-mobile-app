import * as actions from './actionTypes';
import * as types from './types';

// Sign Up Actions
export const fetchUserCreateRequest = (
  data: types.requestUserCreate
): types.FetchUserCreateRequest => ({
  type: actions.Fetch_User_Create_Request,
  payload: data,
});

export const fetchUserCreateSuccess = (
  payload: types.FetchUserCreateSuccessPayload
): types.FetchUserCreateSuccess => ({
  type: actions.Fetch_User_Create_Success,
  payload,
});

export const fetchUserCreateFailure = (
  payload: types.FetchUserCreateFailurePayload
): types.FetchUserCreateFailure => ({
  type: actions.Fetch_User_Create_Failure,
  payload,
});

// Login Actions
export const fetchUserLoginRequest = (
  data: types.requestUserLogin
): types.FetchUserLoginRequest => ({
  type: actions.Fetch_User_Login_Request,
  payload: data,
});

export const fetchUserLoginSuccess = (
  payload: types.FetchUserLoginSuccessPayload
): types.FetchUserLoginSuccess => ({
  type: actions.Fetch_User_Login_Success,
  payload,
});

export const fetchUserLoginFailure = (
  payload: types.FetchUserLoginFailurePayload
): types.FetchUserLoginFailure => ({
  type: actions.Fetch_User_Login_Failure,
  payload,
});

// Logout Actions
export const fetchUserLogoutRequest = (
  data: types.requestUserLogout
): types.FetchUserLogoutRequest => ({
  type: actions.Fetch_User_Logout_Request,
  payload: data,
});

export const fetchUserLogoutSuccess = (
  payload: types.FetchUserLogoutSuccessPayload
): types.FetchUserLogoutSuccess => ({
  type: actions.Fetch_User_Logout_Success,
  payload,
});

export const fetchUserLogoutFailure = (
  payload: types.FetchUserLogoutFailurePayload
): types.FetchUserLogoutFailure => ({
  type: actions.Fetch_User_Logout_Failure,
  payload,
});
