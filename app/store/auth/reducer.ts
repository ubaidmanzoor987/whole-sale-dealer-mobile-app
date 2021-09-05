import * as actions from './actionTypes';

import { UserActions, UserState } from './types';

const initialState: UserState = {
  pending: false,
  user: {} as any,
  message: '',
  error: null,
};

export default (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case actions.Fetch_User_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_User_Success:
      return {
        ...state,
        pending: false,
        user: action.payload.user,
        message: action.payload.message,
        error: null,
      };
    case actions.Fetch_User_Failure:
      return {
        ...state,
        pending: false,
        user: {} as any,
        error: action.payload.error,
      };
    case actions.Fetch_User_Logout_Request:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case actions.Fetch_User_Logout_Success:
      return {
        ...state,
        pending: false,
        user: action.payload.data,
        message: action.payload.message,
        error: null,
      };
    case actions.Fetch_User_Logout_Failure:
      return {
        ...state,
        pending: false,
        message: '',
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
