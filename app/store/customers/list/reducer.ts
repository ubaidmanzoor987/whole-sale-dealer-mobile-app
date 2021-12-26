import * as actions from './actionTypes';

import { UserActions, listCustomerState } from './types';

const initialState: listCustomerState = {
  pending: false,
  data: [],
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: UserActions): listCustomerState => {
  switch (action.type) {
    case actions.Fetch_Customer_List_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Customer_List_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_Customer_List_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || [],
        error: action.payload.response.error,
      };
    case actions.Fetch_Customer_List_Clear:
      return {
        pending: false,
        data: [],
        message: "",
        error: "",
        success: false,
      };
    default:
      return {
        ...state,
      };
  }
};
