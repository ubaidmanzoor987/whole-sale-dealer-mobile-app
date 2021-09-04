import * as actions from './actionTypes';

import { UserActions, UserState } from './types';

const initialState: UserState = {
  pending: false,
  user: {},
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
        error: null,
      };
    case actions.Fetch_User_Failure:
      return {
        ...state,
        pending: false,
        user: {},
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
