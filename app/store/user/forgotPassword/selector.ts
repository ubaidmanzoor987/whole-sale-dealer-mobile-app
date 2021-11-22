import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.forget.pending;

const getData = (state: AppState) => state.forget.data;

const getMessage = (state: AppState) => state.forget.message;

const getError = (state: AppState) => state.forget.error;

const getSuccess = (state: AppState) => state.forget.success;

export const getDataSelector = createSelector(getData, (user) => user);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
