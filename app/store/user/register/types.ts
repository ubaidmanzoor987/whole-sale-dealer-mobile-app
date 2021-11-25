import * as actionTypes from './actionTypes';

export interface IUser {
  user_name: string;
  shop_name: string;
  owner_name: string;
  owner_phone_no: string;
  shop_phone_no1: string;
  shop_phone_no2: string;
  loc_long: string;
  loc_lat: string;
  address: string;
  image: string;
  email: string;
  id: number;
  token: string;
}

export interface requestUser {
  user_name: string;
  shop_name: string;
  email: string;
  password: string;
  user_type: string;
}

export interface responseUser {
  success: boolean;
  message: string;
  data: IUser | null;
  error: string | null | any;
}

export interface UserState {
  pending: boolean;
  data: IUser | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchUserResponsePayload {
  response: responseUser;
}

export interface FetchUserRequest {
  type: typeof actionTypes.Fetch_User_Create_Request;
  payload: requestUser;
}

export type FetchUserSuccess = {
  type: typeof actionTypes.Fetch_User_Create_Success;
  payload: FetchUserResponsePayload;
};

export type FetchUserFailure = {
  type: typeof actionTypes.Fetch_User_Create_Failure;
  payload: FetchUserResponsePayload;
};

export type FetchUserClear = {
  type: typeof actionTypes.Fetch_User_Create_Clear;
};

export type UserActions =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure
  | FetchUserClear;
