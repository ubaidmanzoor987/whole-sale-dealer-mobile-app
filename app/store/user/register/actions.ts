import * as actions from './actionTypes';
import * as types from './types';

export const fetchUserCreateRequest = (
  data: types.requestUser
): types.FetchUserRequest => ({
  type: actions.Fetch_User_Create_Request,
  payload: data,
});

export const fetchUserCreateSuccess = (
  payload: types.FetchUserResponsePayload
): types.FetchUserSuccess => ({
  type: actions.Fetch_User_Create_Success,
  payload,
});

export const fetchUserCreateFailure = (
  payload: types.FetchUserResponsePayload
): types.FetchUserFailure => ({
  type: actions.Fetch_User_Create_Failure,
  payload,
});

export const fetchUserCreateClear = (
): types.FetchUserClear => ({
  type: actions.Fetch_User_Create_Clear,
});
