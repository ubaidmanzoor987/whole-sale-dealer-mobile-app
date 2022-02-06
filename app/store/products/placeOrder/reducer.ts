import * as actions from './actionTypes';

import { placeOrderActions, placeOrderState, responseData } from './types';

const initialState: placeOrderState = {
  pending: false,
  data: [] as responseData[],
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: placeOrderActions): placeOrderState => {
  switch (action.type) {
    case actions.Fetch_Place_Order_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Place_Order_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_Place_Order_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || [],
        error: action.payload.response.error,
      };
    case actions.Fetch_Place_Order_Clear:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
