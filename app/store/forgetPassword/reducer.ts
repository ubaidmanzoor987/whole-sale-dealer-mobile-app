import * as actions from './actionTypes';

import { IUser, IUserData, UserActions, UserForgetState } from './types';

const initialState: UserForgetState = {
  pending: false,
  user: {} as any,
  message: '',
  error: null,
};

export default (state = initialState, action: UserActions): UserForgetState => {
  switch (action.type) {
      case actions.Fetch_User_Forget_Request:
        return {
          ...state,
          pending: true,
          user: {} as any,
          error: null,
        };
      case actions.Fetch_User_Forget_Success:
        return {
          ...state,
          pending: false,
          user: action.payload.data,
          message: action.payload.message,
          error: null,
        };
      case actions.Fetch_User_Forget_Failure:
        return {
          ...state,
          pending: false,
          message: '',
          user: {} as any,
          error: action.payload.error,
        };
      
    default:
      return {
        ...state,
      };
  }
};
