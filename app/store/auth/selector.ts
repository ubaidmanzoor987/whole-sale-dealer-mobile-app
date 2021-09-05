import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getPending = (state: AppState) => state.auth.pending;

const getUser = (state: AppState) => state.auth.user;

const getMessage = (state: AppState) => state.auth.message;

const getError = (state: AppState) => state.auth.error;

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
