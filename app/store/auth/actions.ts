import * as actions from './actionTypes';
import {
  FetchUserRequest,
  FetchUserSuccess,
  FetchUserSuccessPayload,
  FetchUserFailure,
  FetchUserFailurePayload,
  requestUser,
} from './types';

export const fetchUserRequest = (data: requestUser): FetchUserRequest => ({
  type: actions.Fetch_User_Request,
  payload: data,
});

export const fetchUserSuccess = (
  payload: FetchUserSuccessPayload
): FetchUserSuccess => ({
  type: actions.Fetch_User_Success,
  payload,
});

export const fetchUserFailure = (
  payload: FetchUserFailurePayload
): FetchUserFailure => ({
  type: actions.Fetch_User_Failure,
  payload,
});
