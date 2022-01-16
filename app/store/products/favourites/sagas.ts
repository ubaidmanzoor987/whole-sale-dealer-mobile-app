import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_Favorite_Request,
} from './actionTypes';
import {
  FetchProductsRequest
} from './types';


function* fetchProductsFavoriteSaga(action: FetchProductsRequest): any {
  try {
    yield put(
      actions.fetchProductsFavoriteSuccess({
        response: action.payload.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchProductsFavoriteFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* FavoriteProductsSaga() {
  yield all([takeLatest(Fetch_Products_Favorite_Request, fetchProductsFavoriteSaga)]);
}

export default FavoriteProductsSaga;
