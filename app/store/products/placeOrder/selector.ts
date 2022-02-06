import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.placeOrder.pending;

const getData = (state: AppState) => state.placeOrder.data;

const getMessage = (state: AppState) => state.placeOrder.message;

const getError = (state: AppState) => state.placeOrder.error;

const getSuccess = (state: AppState) => state.placeOrder.success;

export const getPlaceOrderDataSelector = createSelector(getData, (data) => data);

export const getPlaceOrderPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getPlaceOrderErrorSelector = createSelector(getError, (error) => error);

export const getPlaceOrderMessageSelector = createSelector(
  getMessage,
  (message) => message
);
