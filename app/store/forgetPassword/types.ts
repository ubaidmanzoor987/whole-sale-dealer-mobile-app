import * as actions from './actionTypes';

export interface IUserData {
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
  shopkeeper_id: number;
  token: string;
}

export interface UserForgetState {
  pending: Boolean;
  user: IUserData;
  message: string;
  error: string | null;
}
export interface IUser {
  data?: IUserData;
  message: string;
}
//Forget Password

export interface requestUserForget {
  email: string;
}

export interface FetchUserForgetSuccessPayload {
  message: string;
  data: any | null;
}

export interface FetchUserForgetFailurePayload {
  error: string;
}

export interface FetchUserForgetRequest {
  type: typeof actions.Fetch_User_Forget_Request;
  payload: requestUserForget;
}

export type FetchUserForgetSuccess = {
  type: typeof actions.Fetch_User_Forget_Success;
  payload: FetchUserForgetSuccessPayload;
};

export type FetchUserForgetFailure = {
  type: typeof actions.Fetch_User_Forget_Failure;
  payload: FetchUserForgetFailurePayload;
};
export type UserActions =
  | FetchUserForgetRequest
  | FetchUserForgetSuccess
  | FetchUserForgetFailure;

