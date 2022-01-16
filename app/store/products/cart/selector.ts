import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.cart.pending;

const getData = (state: AppState) => state.cart.data;

const getMessage = (state: AppState) => state.cart.message;

const getError = (state: AppState) => state.cart.error;

const getSuccess = (state: AppState) => state.cart.success;

export const getCartProductDataSelector = createSelector(
  getData,
  (data) => data
);

export const getCartProductPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getCartProductErrorSelector = createSelector(
  getError,
  (error) => error
);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
