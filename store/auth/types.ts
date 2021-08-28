import {
  Fetch_User_Request,
  Fetch_User_Success,
  Fetch_User_Failure,
} from "./actionTypes";

interface IUserData {
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
}
export interface IUser {
  status?: number;
  msg?: string;
  data?: IUserData;
}

export interface requestUser {
  user_name: string;
  password: string;
}

export interface UserState {
  pending: boolean;
  user: IUser;
  error: string | null;
}

export interface FetchUserSuccessPayload {
  user: IUser;
}

export interface FetchUserFailurePayload {
  error: string;
}

export interface FetchUserRequest {
  type: typeof Fetch_User_Request;
  payload: requestUser;
}

export type FetchUserSuccess = {
  type: typeof Fetch_User_Success;
  payload: FetchUserSuccessPayload;
};

export type FetchUserFailure = {
  type: typeof Fetch_User_Failure;
  payload: FetchUserFailurePayload;
};

export type UserActions =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure;
