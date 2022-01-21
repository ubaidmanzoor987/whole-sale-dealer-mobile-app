import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.order.pending;

const getData = (state: AppState) => state.order.data;

const getMessage = (state: AppState) => state.order.message;

const getError = (state: AppState) => state.order.error;

const getSuccess = (state: AppState) => state.order.success;

export const getOrderProductDataSelector = createSelector(
  getData,
  (data) => data
);

export const getOrderProductPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getOrderProductErrorSelector = createSelector(
  getError,
  (error) => error
);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
