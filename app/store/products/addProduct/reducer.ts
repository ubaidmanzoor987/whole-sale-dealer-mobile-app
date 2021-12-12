import * as actions from './actionTypes';

import { ProductsActions, ProductsState, IProducts } from './types';

const initialState: ProductsState = {
  pending: false,
  data: {} as IProducts,
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: ProductsActions): ProductsState => {
  switch (action.type) {
    case actions.Fetch_Products_Add_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Products_Add_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_Products_Add_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || {} as IProducts,
        error: action.payload.response.error,
      };
    case actions.Fetch_Products_Add_Clear:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
