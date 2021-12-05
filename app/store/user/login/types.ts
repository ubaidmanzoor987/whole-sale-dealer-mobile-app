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

export interface requestUserLogin {
  user_name: string;
  password: string;
  user_type: string;
}

export interface responseUserLogin {
  success: boolean;
  message: string;
  data: IUser | null;
  error: string | null | any;
}

export interface userLoginState {
  pending: boolean;
  data: IUser | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchUserResponsePayload {
  response: responseUserLogin;
}

export interface FetchUserLoginRequest {
  type: typeof actionTypes.Fetch_User_Login_Request;
  payload: requestUserLogin;
}

export interface FetchUserAutoLoginRequest {
  type: typeof actionTypes.User_Auto_Login;
  payload: IUser;
}

export type FetchUserLoginSuccess = {
  type: typeof actionTypes.Fetch_User_Login_Success;
  payload: FetchUserResponsePayload;
};

export type FetchUserLoginFailure = {
  type: typeof actionTypes.Fetch_User_Login_Failure;
  payload: FetchUserResponsePayload;
};

export type FetchUserLoginClear = {
  type: typeof actionTypes.Fetch_User_Login_Clear;
};

export type AutoUserLogin = {
  type: typeof actionTypes.User_Auto_Login;
  payload: FetchUserAutoLoginRequest;
};

export type UserActions =
  | FetchUserLoginRequest
  | FetchUserLoginSuccess
  | FetchUserLoginFailure
  | FetchUserLoginClear
  | AutoUserLogin;
