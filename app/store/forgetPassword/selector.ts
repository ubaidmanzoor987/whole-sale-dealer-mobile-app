import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getPending = (state: AppState) => state.ForgetReducer.pending;

const getUser = (state: AppState) => state.ForgetReducer.user;

const getMessage = (state: AppState) => state.ForgetReducer.message;

const getError = (state: AppState) => state.ForgetReducer.error;

export const getUserSelector = createSelector(getUser, (user) => user);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
