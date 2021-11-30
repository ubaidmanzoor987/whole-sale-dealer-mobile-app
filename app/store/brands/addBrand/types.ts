import * as actionTypes from './actionTypes';

export interface IBrand {
  brand_name: string;
  own_brand: boolean;
  user_id: number;
}

export interface requestBrand {
    brand_name: string;
    own_brand: boolean;
    user_id: number | null;
}

export interface responseBrand {
  success: boolean;
  message: string;
  data: IBrand | null;
  error: string | null | any;
}

export interface BrandState {
  pending: boolean;
  data: IBrand | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchBrandResponsePayload {
  response: responseBrand;
}

export interface FetchBrandRequest {
  type: typeof actionTypes.Fetch_Brand_Create_Request;
  payload: requestBrand;
}

export type FetchBrandSuccess = {
  type: typeof actionTypes.Fetch_Brand_Create_Success;
  payload: FetchBrandResponsePayload;
};

export type FetchBrandFailure = {
  type: typeof actionTypes.Fetch_Brand_Create_Failure;
  payload: FetchBrandResponsePayload;
};

export type FetchBrandClear = {
  type: typeof actionTypes.Fetch_Brand_Create_Clear;
};

export type BrandActions =
  | FetchBrandRequest
  | FetchBrandSuccess
  | FetchBrandFailure
  | FetchBrandClear;
