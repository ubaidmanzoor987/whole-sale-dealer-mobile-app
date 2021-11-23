import * as actions from './actionTypes';

import { UserActions, UserState } from './types';

const initialState: UserState = {
  pending: false,
  data: {} as any,
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case actions.Fetch_User_Create_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_User_Create_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_User_Create_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || {} as any,
        error: action.payload.response.error,
      };
    case actions.Fetch_User_Create_Clear:
      return {
        pending: false,
        data: {} as any,
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
