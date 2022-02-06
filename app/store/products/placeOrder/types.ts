import * as actionTypes from './actionTypes';

export interface IProducts {
  id: Number;
  quantity: Number;
  total_price: Number;
}

export interface responseData {
  created_at: String;
  order_id: Number;
  product_id: Number;
  quantites: Number;
  status: String;
  total_price: Number;
  updated_at: String;
  user_id: Number;
};
export interface requestPlaceOrder {
  product: IProducts[];
  user_id: Number | null;
}

export interface responsePlaceOrder {
  success: boolean;
  message: string;
  data: responseData[] | [];
  error: string | null | any;
}

export interface placeOrderState {
  pending: boolean;
  data: responseData[] | [];
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchPlaceOrderResponsePayload {
  response: responsePlaceOrder;
}

export interface FetchPlaceOrderRequest {
  type: typeof actionTypes.Fetch_Place_Order_Request;
  payload: requestPlaceOrder;
}

export type FetchPlaceOrderSuccess = {
  type: typeof actionTypes.Fetch_Place_Order_Success;
  payload: FetchPlaceOrderResponsePayload;
};

export type FetchPlaceOrderFailure = {
  type: typeof actionTypes.Fetch_Place_Order_Failure;
  payload: FetchPlaceOrderResponsePayload;
};

export type FetchPlaceOrderClear = {
  type: typeof actionTypes.Fetch_Place_Order_Clear;
};

export type placeOrderActions =
  | FetchPlaceOrderRequest
  | FetchPlaceOrderSuccess
  | FetchPlaceOrderFailure
  | FetchPlaceOrderClear;
