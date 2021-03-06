import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@app/screens/Themed';
import { ENV_VAR } from '@app/utils/environments';
import { IProducts } from '@app/store/products/listProducts/types';
import { ImageResult } from 'expo-image-manipulator';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCartRequest } from '@app/store/products/cart/actions';
import { useNavigation } from '@react-navigation/native';
import { Snackbar, Switch } from 'react-native-paper';
import { getCartProductDataSelector } from '@app/store/products/cart/selector';
import { responseData } from 'store/products/listOrders/types';
import { updateOrder } from '@app/utils/apis';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { fetchListOrderRequest } from '@app/store/products/listOrders/actions';

interface Props {
  ref: React.Ref<any>;
  navigation?: any;
  closeSheet?: any;
  row?: (IProducts & responseData) | any;
  isCart?: boolean;
  isOrder?: boolean;
}

interface IForm {
  image1?: ImageResult;
  image2?: ImageResult;
  image3?: ImageResult;
}

const ProductDetailsBottomSheet: React.FC<Props> = React.forwardRef(
  (_, ref) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = React.useState<ImageResult>();
    const [cartProducts, setCartProducts] = React.useState<Array<IProducts>>(
      []
    );
    const cartStoreProducts = useSelector(getCartProductDataSelector);

    const user = useSelector(getUserSelector);

    const [form, setForm] = useState<IForm>({
      image1: {
        uri: '',
        height: -1,
        width: -1,
        base64: '',
      },
      image2: {
        uri: '',
        height: -1,
        width: -1,
        base64: '',
      } as any,
      image3: {
        uri: '',
        height: 0,
        width: 0,
        base64: '',
      } as any,
    });
    const addImageTag = (
      image_number: number,
      image: ImageResult | undefined
    ) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setPreviewImage(image);
          }}
          style={{
            borderWidth: 1,
            width: '20%',
            borderColor: 'lightgrey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '2%',
          }}
        >
          {image && image.uri ? (
            <Image
              style={{
                width: '100%',
                height: 70,
              }}
              source={{ uri: image.uri }}
            />
          ) : (
            <Image
              style={{
                width: '100%',
                height: 70,
              }}
              source={require('@app/assets/images/sampleImage.png')}
            />
          )}

          <Text>Image {image_number}</Text>
        </TouchableOpacity>
      );
    };
    const getIndex = (array, value: number) => {
      const ind = array.findIndex((obj) => obj.product_id === value);
      return ind;
    };

    const onPressAddToCart = () => {
      if (_.row) {
        const ind = getIndex(cartProducts, _.row.product_id);
        if (ind === -1) {
          _.row.order_quantity = '1';
          _.row.order_price = _.row.price.toString();
          const newArray = [...cartProducts];
          newArray.push(_.row);
          dispatch(fetchProductsCartRequest({ data: newArray }));
          setCartProducts((oldData) => [...oldData, _.row as any]);
        }
        _.closeSheet();
      }
    };

    const onPressRemoveFromCart = () => {
      if (_.row) {
        const ind = getIndex(cartStoreProducts, _.row.product_id);
        if (ind !== -1) {
          const newArray = [...cartStoreProducts];
          newArray.splice(ind, 1);
          dispatch(fetchProductsCartRequest({ data: newArray }));
          setCartProducts(newArray);
        }
        _.closeSheet();
      }
    };

    useEffect(() => {
      const { row } = _;
      console.log('rpw', row.status, row.order_id)
      if (row) {
        setForm({
          image2: {
            uri: row.image2 !== '' ? ENV_VAR.baseUrl + row.image2 : '',
            height: -1,
            width: -1,
            base64: row.image2b64,
          },
          image3: {
            uri: row.image3 !== '' ? ENV_VAR.baseUrl + row.image3 : '',
            height: -1,
            width: -1,
            base64: row.image3b64,
          },
          image1: {
            uri: row.image1 !== '' ? ENV_VAR.baseUrl + row.image1 : '',
            height: -1,
            width: -1,
            base64: row.image1b64,
          },
        });
        setPreviewImage({
          uri: row.image1 !== '' ? ENV_VAR.baseUrl + row.image1 : '',
          height: -1,
          width: -1,
          base64: row.image1b64,
        });
        if (row.status && row.status === "completed") {
          setIsSwitchOn(true);
        }
      }
    }, [_.row]);

    // useEffect(() => {
    //   if (cartProducts) {
    //     dispatch(fetchProductsCartRequest({ data: cartProducts }));
    //   }
    // }, [dispatch, cartProducts]);
    const onToggleSwitch = async () => {
      setIsSwitchOn(!isSwitchOn);
      if (user && user.id) {
        const dt = {
          user_id: user.id,
          order_id: _.row.order_id,
          status: isSwitchOn ? "pending" : "completed"
        };
        setVisible(true);
        const res = await updateOrder(dt);
        console.log("res", res);
        if (res.data && res.data.order_id) {
          setMessage(res.message);
        } 
        if (res.error && res.error.length > 0) {
          setMessage(res.error);
          setIsError(true);
        }
        dispatch(fetchListOrderRequest({user_id: user.id}))
      }
    };
    const onDismissSnackBar = () => setVisible(false);

    return (
      <>
        <Modalize ref={ref} modalHeight={Dimensions.get('screen').height / 1.2}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleWelcomeText}>Product Details</Text>
            </View>
            <ScrollView>
              <View
                style={{
                  backgroundColor: 'transparent',
                  marginVertical: 10,
                  width: '100%',
                }}
              >
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'lightgrey',
                      borderWidth: 1,
                      width: '90%',
                      marginLeft: '5%',
                    }}
                  >
                    {previewImage && previewImage.uri ? (
                      <Image
                        style={{
                          width: '100%',
                          height: 240,
                        }}
                        source={{ uri: previewImage.uri }}
                      />
                    ) : (
                      <Image
                        style={{
                          width: '100%',
                          height: 240,
                        }}
                        source={require('@app/assets/images/sampleImage.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    marginVertical: 10,
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    marginLeft: '3%',
                  }}
                >
                  {addImageTag(1, form.image1)}
                  {addImageTag(2, form.image2)}
                  {addImageTag(3, form.image3)}
                </View>
              </View>
              <View style={styles.fieldsView}>
                <Text
                  style={{
                    fontSize: 40,
                    color: '#5460E0',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}
                >
                  {_.row?.product_name}
                </Text>
                <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColumnLeft}>
                      <Text style={{ paddingVertical: '5%' }}>
                        Quantitities Available In Stocks{' '}
                      </Text>
                    </View>
                    <View style={styles.tableColumnRight}>
                      <Text>{_.row?.quantities}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={{
                        ...styles.tableColumnLeft,
                        borderTopStartRadius: 0,
                      }}
                    >
                      <Text style={{ paddingVertical: '5%' }}>
                        Price Per Piece{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableColumnRight,
                        borderTopEndRadius: 0,
                      }}
                    >
                      <Text>{_.row?.price}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={{
                        ...styles.tableColumnLeft,
                        borderTopStartRadius: 0,
                      }}
                    >
                      <Text style={{ paddingVertical: '5%' }}>Brand </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableColumnRight,
                        borderTopEndRadius: 0,
                      }}
                    >
                      <Text>{_.row?.brand_name}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={{
                        ...styles.tableColumnLeft,
                        borderTopStartRadius: 0,
                      }}
                    >
                      <Text style={{ paddingVertical: '5%' }}>
                        Customer Shop Address{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableColumnRight,
                        borderTopEndRadius: 0,
                      }}
                    >
                      <Text>{_.row?.customer_shop_address}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={{
                        ...styles.tableColumnLeft,
                        borderTopStartRadius: 0,
                      }}
                    >
                      <Text style={{ paddingVertical: '5%' }}>
                        Customer Name{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableColumnRight,
                        borderTopEndRadius: 0,
                      }}
                    >
                      <Text>{_.row?.customer_name}</Text>
                    </View>
                  </View>
                </View>
                {_.isCart === false && _.isOrder === false && (
                  <View
                    style={{
                      ...styles.inputFieldsMainView,
                      marginVertical: '5%',
                    }}
                  >
                    <View style={styles.addToCartButtonView}>
                      <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={onPressAddToCart}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20,
                            fontStyle: 'italic',
                            marginRight: 10,
                            textTransform: 'none',
                            paddingRight: 10,
                          }}
                        >
                          Add Product To Cart{' '}
                        </Text>
                        <MaterialCommunityIcons
                          name="cart"
                          size={20}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {_.isCart === true && (
                  <>
                    <View
                      style={{
                        ...styles.inputFieldsMainView,
                        marginVertical: '2%',
                      }}
                    >
                      <View style={styles.addToCartButtonView}>
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={onPressRemoveFromCart}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 20,
                              fontStyle: 'italic',
                              marginRight: 10,
                              textTransform: 'none',
                              paddingRight: 10,
                            }}
                          >
                            Remove From Cart{' '}
                          </Text>
                          <MaterialCommunityIcons
                            name="cart"
                            size={20}
                            color={'white'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
                {_.isOrder === true && (
                  <View style={styles.statusView}>
                    <Text style={styles.statusViewText}>Order Complete</Text>
                    <Switch
                      value={isSwitchOn}
                      onValueChange={onToggleSwitch}
                      thumbColor="#5460E0"
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </ScrollView>
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
        </Modalize>
      </>
    );
  }
);

export default ProductDetailsBottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: Constants.statusBarHeight,
  },
  titleContainer: {
    height: 120,
    width: '99%',
    alignSelf: 'center',
    borderBottomRightRadius: 50,
    backgroundColor: '#F0F0F8',
  },
  titleWelcomeText: {
    paddingLeft: '5%',
    fontSize: 35,
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
  fieldsView: {
    width: '96%',
    alignItems: 'center',
    marginVertical: '5%',
    backgroundColor: 'transparent',
  },
  inputFieldsMainView: {
    marginLeft: '5%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  labelText: {
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    color: 'black',
    fontSize: 18,
  },
  inputFieldSubView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: '5%',
    borderRadius: 30,
    width: '88%',
    marginVertical: '4%',
    borderWidth: 1,
    height: 50,
  },
  icons: {
    paddingTop: '3.8%',
    width: '15%',
    paddingRight: '5%',
  },
  inputField: {
    width: '93%',
    marginLeft: '5%',
  },
  addToCartButtonView: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  addToCartButton: {
    width: '85%',
    padding: '4%',
    borderRadius: 20,
    backgroundColor: '#8D32AB',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    marginLeft: '5%',
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
  },
  tableRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  tableColumnLeft: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopStartRadius: 10,
  },
  tableColumnRight: {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopEndRadius: 10,
    borderLeftWidth: 0.5,
  },
  statusView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
    backgroundColor: 'transparent',
    marginTop: '2.5%',
  },
  statusViewText: {
    flex: 1,
    paddingTop: '1%',
    color: 'grey',
    fontSize: 15,
  },
});
