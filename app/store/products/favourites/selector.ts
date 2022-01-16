import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.favourites.pending;

const getData = (state: AppState) => state.favourites.data;

const getMessage = (state: AppState) => state.favourites.message;

const getError = (state: AppState) => state.favourites.error;

const getSuccess = (state: AppState) => state.favourites.success;

export const getFavouiteProductDataSelector = createSelector(
  getData,
  (data) => data
);

export const getFavouiteProductPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getFavouiteProductErrorSelector = createSelector(
  getError,
  (error) => error
);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
