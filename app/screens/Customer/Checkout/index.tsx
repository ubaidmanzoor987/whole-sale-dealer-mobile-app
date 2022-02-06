import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import Constants from 'expo-constants';
import { IProducts } from '@app/store/products/listProducts/types';
import { ENV_VAR } from '@app/utils/environments';
import { EmptyContainer } from '@app/utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProductDataSelector } from '@app/store/products/cart/selector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  fetchPlaceOrderRequest,
  fetchPlaceOrderClear,
} from '@app/store/products/placeOrder/actions';
import {
  getPlaceOrderDataSelector,
  getPlaceOrderPendingSelector,
  getPlaceOrderErrorSelector,
} from '@app/store/products/placeOrder/selector';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';

import { Snackbar } from 'react-native-paper';

interface renderProps {
  product: IProducts;
  index?: any;
  type?: any;
}

export function CheckoutScreen() {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const user = useSelector(getUserSelector);
  const cart = useSelector(getCartProductDataSelector);
  const orderData = useSelector(getPlaceOrderDataSelector);
  const orderPending = useSelector(getPlaceOrderPendingSelector);
  const orderError = useSelector(getPlaceOrderErrorSelector);
  const navigation = useNavigation();
  const ref = useRef() as any;

  const RenderedItemsData = ({ product }: renderProps) => {
    const [quantity, setQuantity] = useState<string>('1');
    const incrDecreaseQuantity = (name: string) => {
      switch (name) {
        case 'plus':
          if (Number(quantity) === product.quantities) return;
          setQuantity((Number(quantity) + 1).toString());
          product.order_quantity = (
            Number(product.order_quantity) + 1
          ).toString();
          product.order_price = (
            Number(product.price) * Number(product.order_quantity)
          ).toString();
          break;

        case 'minus':
          if (Number(product.order_quantity) > 1) {
            product.order_quantity = (
              Number(product.order_quantity) - 1
            ).toString();
            product.order_price = (
              Number(product.price) * Number(product.order_quantity)
            ).toString();
            setQuantity((Number(quantity) - 1).toString());
          }
          break;
        default:
          break;
      }
    };
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: '4%',
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 10,
          padding: '5%',
        }}
      >
        <View
          style={{
            width: '25%',
            display: 'flex',
            marginLeft: '2%',
          }}
        >
          {product.image1 ? (
            <Image
              source={{ uri: ENV_VAR.baseUrl + product.image1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 25,
              }}
            />
          ) : (
            <MaterialCommunityIcons name="face-profile" size={70} />
          )}
        </View>
        <View
          style={{
            width: '73%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text style={{ fontSize: 20, marginTop: '5%' }}>
            {product.product_name}
          </Text>
          <Text>Product By: {product.user_name_shopkeeper}</Text>
          <View
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <View style={{ width: '100%', marginVertical: '2%' }}>
              <Text>Quantities</Text>
            </View>
            <View style={{ width: '100%', marginLeft: '-5%' }}>
              <TextInput
                value={product.order_quantity ? product.order_quantity : '1'}
                placeholder="Quantity"
                style={styles.inputField}
                keyboardType="decimal-pad"
                maxLength={4}
              />
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity onPress={() => incrDecreaseQuantity('plus')}>
                <MaterialCommunityIcons
                  name="plus-box"
                  color="#5460E0"
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => incrDecreaseQuantity('minus')}>
                <MaterialCommunityIcons
                  name="minus-box"
                  color="#5460E0"
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}
            >
              <Text>Total Quantities Available in Stock</Text>
              <Text> {Number(product.quantities) - (Number(product.order_quantity))}</Text>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}
            >
              <Text>Total Price</Text>
              <Text>
                {' '}
                {Number(product.price) *
                  Number(product.order_quantity ? product.order_quantity : 1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  React.useEffect(()=>{
    if (orderError && orderError.length > 0) {
      setVisible(true);
      setMessage(orderError);
      dispatch(fetchPlaceOrderClear());
    }
  }, [orderError])

  React.useEffect(()=>{
    if (ref.current === true && orderData.length > 0) {
      setVisible(true);
      setMessage("Successfully placed order");
      ref.current = false;
      dispatch(fetchPlaceOrderClear());
    }
  }, [ref.current, orderData])

  const onPressOrder = () => {
    if (user && user.id) {
      const product = cart.map((ct: IProducts) => ({
        id: ct.product_id,
        quantity: Number(ct.order_quantity),
        total_price: Number(ct.order_price),
      }));
      const cartData = {
        user_id: user && user.id,
        product,
      };
      dispatch(fetchPlaceOrderRequest(cartData));
      ref.current = true;
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity onPress={goBack}>
            <MaterialCommunityIcons
              name="arrow-left"
              style={{
                ...styles.titleWelcomeText,
                paddingTop: '7%',
                paddingLeft: '2%',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleWelcomeText}>Checkout</Text>
        </View>
        <Text style={styles.titleSignText}>Order Your product now!</Text>
      </View>
      <FlatList
        data={cart}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        renderItem={({ item, index }) => (
          <RenderedItemsData product={item} index={index} />
        )}
        ListEmptyComponent={<EmptyContainer />}
      />
      {cart.length > 0 && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: '5%',
          }}
        >
          <TouchableOpacity
            ref={ref}
            onPress={onPressOrder}
            style={{
              borderRadius: 40,
              width: '45%',
              backgroundColor: '#5460E0',
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Place Your Order
            </Text>
          </TouchableOpacity>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{
              backgroundColor: isError ? 'red' : '#5460E0',
              marginBottom: '6%',
            }}
          >
            <Text style={{ color: 'white' }}>{message}</Text>
          </Snackbar>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
    marginTop: Constants.statusBarHeight,
    height: '100%',
  },
  titleContainer: {
    backgroundColor: 'white',
    width: '99%',
    alignSelf: 'center',
    borderBottomRightRadius: 80,
  },
  titleWelcomeText: {
    paddingLeft: '5%',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: '5%',
    color: '#5460E0',
  },
  titleSignText: {
    paddingLeft: '5%',
    fontStyle: 'italic',
    color: 'black',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#5460E0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    display: 'flex',
  },
  flatListContainer: {
    width: '98%',
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 50,
  },
  tableRow: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  columnHeader: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    width: '20%',
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndator: {
    marginTop: '-100%',
  },
  addBrandTouchable: {
    marginLeft: '1%',
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
    backgroundColor: 'white',
  },
  inputField: {
    width: '93%',
    marginLeft: '5%',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: '2%',
    padding: '2%',
  },
});
