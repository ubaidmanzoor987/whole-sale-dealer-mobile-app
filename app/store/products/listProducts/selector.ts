import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.products.pending;

const getData = (state: AppState) => state.products.data;

const getMessage = (state: AppState) => state.products.message;

const getError = (state: AppState) => state.products.error;

const getSuccess = (state: AppState) => state.products.success;

export const getProductSelector = createSelector(getData, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
