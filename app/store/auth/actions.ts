import * as actions from './actionTypes';
import * as types from './types';

export const fetchUserRequest = (
  data: types.requestUser
): types.FetchUserRequest => ({
  type: actions.Fetch_User_Request,
  payload: data,
});

export const fetchUserSuccess = (
  payload: types.FetchUserSuccessPayload
): types.FetchUserSuccess => ({
  type: actions.Fetch_User_Success,
  payload,
});

export const fetchUserFailure = (
  payload: types.FetchUserFailurePayload
): types.FetchUserFailure => ({
  type: actions.Fetch_User_Failure,
  payload,
});

// Logout Actions Start

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
  payload: types.FetchUserFailurePayload
): types.FetchUserLogoutFailure => ({
  type: actions.Fetch_User_Logout_Failure,
  payload,
});
