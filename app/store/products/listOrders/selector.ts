import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.orders.pending;

const getData = (state: AppState) => state.orders.data;

const getMessage = (state: AppState) => state.orders.message;

const getError = (state: AppState) => state.orders.error;

const getSuccess = (state: AppState) => state.orders.success;

export const getListOrdersDataSelector = createSelector(
  getData,
  (data) => data
);

export const getListOrdersPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getListOrdersErrorSelector = createSelector(
  getError,
  (error) => error
);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
