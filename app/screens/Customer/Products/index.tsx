import React, { useEffect } from 'react';
import {
  getPendingSelector,
  getProductSelector,
  getErrorSelector,
} from '@app/store/products/listProducts/selector';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { fetchProductsListRequest } from '@app/store/products/listProducts/actions';
import CommonScreen from '../Common';

export function CustomerProductsScreen() {
  const dispatch = useDispatch();

  // Products Store Data
  const productsPending = useSelector(getPendingSelector);
  const productsData = useSelector(getProductSelector);
  const productsError = useSelector(getErrorSelector);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchProductsListRequest({ user_id: user.id }));
    }
  }, []);

  const refetchProducts = () => {
    if (user && user.id) {
      dispatch(fetchProductsListRequest({ user_id: user.id }));
    }
  };

  return (
    <CommonScreen
      title='Products'
      subtitle='List of all products'
      data={productsData}
      isPending={productsPending}
      error={productsError}
      refetchProducts={refetchProducts}
      showFavourite={true}
      isCart={false}
    />
  );
}