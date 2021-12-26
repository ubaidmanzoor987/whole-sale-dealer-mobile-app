import * as actionTypes from './actionTypes';

export interface ICustomers {
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

export interface requestCustomers {
  user_id: number | null;
}

export interface responseCustomers {
  success: boolean;
  message: string;
  data: ICustomers[] | [];
  error: string | null | any;
}

export interface CustomersState {
  pending: boolean;
  data: ICustomers[] | [];
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchCustomersResponsePayload {
  response: responseCustomers;
}

export interface FetchCustomersRequest {
  type: typeof actionTypes.Fetch_Customers_List_Request;
  payload: requestCustomers;
}

export type FetchCustomersSuccess = {
  type: typeof actionTypes.Fetch_Customers_List_Success;
  payload: FetchCustomersResponsePayload;
};

export type FetchCustomersFailure = {
  type: typeof actionTypes.Fetch_Customers_List_Failure;
  payload: FetchCustomersResponsePayload;
};

export type FetchCustomersClear = {
  type: typeof actionTypes.Fetch_Customers_List_Clear;
};

export type CustomersActions =
  | FetchCustomersRequest
  | FetchCustomersSuccess
  | FetchCustomersFailure
  | FetchCustomersClear;
