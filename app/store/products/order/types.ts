import * as actionTypes from './actionTypes';

export interface IProducts {
  id: Number;
  quantity: Number,
  total_price: Number,
}

export interface requestProducts {
  product: IProducts[];
  user_id: Number | null;
}

export interface ProductsState {
  pending: boolean;
  data: any;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchProductsResponsePayload {
  response: IProducts[];
}

export interface FetchProductsRequest {
  type: typeof actionTypes.Fetch_Products_Order_Request;
  payload: requestProducts;
}

export type FetchProductsSuccess = {
  type: typeof actionTypes.Fetch_Products_Order_Success;
  payload: FetchProductsResponsePayload;
};

export type FetchProductsFailure = {
  type: typeof actionTypes.Fetch_Products_Order_Failure;
  payload: FetchProductsResponsePayload;
};

export type FetchProductsClear = {
  type: typeof actionTypes.Fetch_Products_Order_Clear;
};

export type ProductsActions =
  | FetchProductsRequest
  | FetchProductsSuccess
  | FetchProductsFailure
  | FetchProductsClear;
