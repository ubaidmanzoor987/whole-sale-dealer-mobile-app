import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonScreen from '../Common';
import { getListOrdersDataSelector } from '@app/store/products/listOrders/selector';
import { fetchListOrderRequest } from '@app/store/products/listOrders/actions';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';

export function OrdersScreen() {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector)
  useEffect(()=>{
    if (user && user.id){
      dispatch(fetchListOrderRequest({user_id: user.id}))
    }
  }, [])
  const orders = useSelector(getListOrdersDataSelector);
  return (
    <CommonScreen
      title='Orders'
      subtitle='List of all your orders'
      data={orders}
      isPending={false}
      error={''}
      showFavourite={false}
      isFavorite={false}
      isCart={false}
      isOrder={true}
    />
  );
}