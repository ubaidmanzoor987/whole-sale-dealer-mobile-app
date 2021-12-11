import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TextInput as TextInputNative,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Button, Checkbox, Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getDataSelector } from '@app/store/user/login/selector';
import {
  getDataSelector as getBrandSelector,
  getPendingSelector,
  getErrorSelector,
} from '@app/store/brands/addBrand/selector';
import {
  fetchBrandCreateClear,
  fetchBrandCreateRequest,
} from '@app/store/brands/addBrand/actions';
import { fetchBrandListRequest } from '@app/store/brands/listBrands/actions';
import { updateBrand } from '@app/utils/apis';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

interface Props {
  ref: React.Ref<any>;
  navigation?: any;
  closeSheet?: any;
  row?: any;
  isEdit?: boolean;
}

export interface AddBrand {
  brand_name: string;
  own_brand: string;
  error?: string;
  user_id: number | null;
  brand_id?: number;
}

export interface Product {
  product_name: string,
  image1: string,
  image2: string,
  image3: string,
  price: number,
  quantities: number,
  product_des: string,
  brand_id: number
}

const AddBrandBottomSheet: React.FC<Props> = React.forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const brand = useSelector(getBrandSelector);
  const isPending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);
  const user = useSelector(getDataSelector);
  const [updatePending, setUpdatePending] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const [form, setForm] = useState<Product>(() => ({
    product_name: '',
    image1: '',
    image2: '',
    image3: '',
    price: -1,
    quantities: -1,
    product_des: '',
    brand_id: -1
  }));

  useEffect(() => {
    if (error && error.length > 0) {
      setForm(() => ({
        ...form,
        error,
      }));
    }
  }, [error]);

  // useEffect(() => {
  //   if (_.isEdit === true && _.row?.brand_name) {
  //     setForm({
  //       ...form,
  //       brand_name: _.row.brand_name,
  //       own_brand: _.row.own_brand,
  //       brand_id: _.row.id,
  //     });
  //   } else {
  //     setForm({
  //       own_brand: "false",
  //       brand_name: '',
  //       error: '',
  //       user_id: -1,
  //       brand_id: undefined,
  //     });
  //   }
  // }, [_.isEdit, _.row]);

  // useEffect(() => {
  //   if (brand && brand.brand_name) {
  //     dispatch(fetchBrandListRequest({ user_id: user && user.id }));
  //     setForm({
  //       own_brand: "false",
  //       brand_name: '',
  //       error: '',
  //       user_id: -1,
  //     });
  //     _.closeSheet();
  //     dispatch(fetchBrandCreateClear());
  //   }
  // }, [brand]);

  const handleSubmit = async () => {
    const data = form;
    if (_.isEdit === false) {
      data['user_id'] = user && user.id;
      delete data['error'];
      dispatch(fetchBrandCreateRequest(data));
    } else {
      data['user_id'] = user && user.id;
      const res = await updateBrand(data);
      setUpdatePending(true);
      if (res.message) {
        dispatch(fetchBrandListRequest({user_id: user && user.id}))
        setUpdatePending(false);
        setForm({
          own_brand: "false",
          brand_name: '',
          error: '',
          user_id: -1,
        });
        _.closeSheet();
      } else if (res.error) {
        setUpdatePending(false);
      }
    }
  };

  const askForPermission = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 'ok');
      return false;
    }
    return true;
  };

  const getImageFromGallery = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      const galleryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });
      if (!galleryImage.cancelled) {
        processImage(galleryImage.uri);
        console.log(galleryImage.uri);
        
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
  };

  const processImage = async (imageUri) => {
    try {
      let processedImage = (await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 400 } }],
        { format: 'jpeg' as any, base64: true }
      )) as any;
      // setProfileImgUrl(`data:image/jpeg;base64,${processedImage.base64}`);
      // setSelectedImage(processedImage.base64);
      // const data = {
      //   image: `data:image/jpeg;base64,${processedImage.base64}`,
      //   user_id: form.id,
      //   email: form.email,
      //   shop_name: form.email,
      // };
      // const res = await updateUser(data);
      // if (res.message) {
      //   setVisible(true);
      //   setMessage(res.message);
      // } else if (res.error) {
      //   setVisible(true);
      //   setMessage(res.message);
      //   setIsError(true);
      // }
    } catch (ex) {
      console.log('Exception in processImage', ex);
    }
  };

  return (
    <>
      <Modalize ref={ref} modalHeight={Dimensions.get('screen').height / 1.2}>
        <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleWelcomeText}>
              {_.isEdit === false ? 'Add Product' : 'Edit Product'}
            </Text>
            <Text style={styles.titleSignText}>
              Fill required information for add new product.
            </Text>
          </View>
          {/* <View style={styles.fieldsView}>
            <View style={styles.inputFieldsMainView}>
              <Text style={styles.labelText}>Brand Name</Text>
              <View style={styles.inputFieldSubView}>
                <TextInput
                  placeholder="Enter Brand Name"
                  style={{ width: '85%', paddingLeft: '5%' }}
                  maxLength={40}
                  onChangeText={(text: string) => {
                    setForm(() => ({ ...form, brand_name: text }));
                  }}
                  value={form.brand_name}
                />
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={form.own_brand === "true" ? 'checked' : 'unchecked'}
                onPress={() => {
                  setForm(() => ({ ...form, own_brand: form.own_brand === "true" ? "false" : "true" }));
                }}
              />
              <Text style={styles.label}>Own Brand</Text>
            </View>
            <View style={styles.loginButtonView}>
              {isPending || updatePending ? (
                <ActivityIndicator
                  size="large"
                  color="#5460E0"
                  style={styles.activitIndicator}
                />
              ) : (
                <Button
                  style={styles.loginButton}
                  mode="contained"
                  onPress={handleSubmit}
                >
                  <Text style={styles.loginButtonText}>
                    {_.isEdit === false ? 'Add Brand' : 'Update Brand'}
                  </Text>
                </Button>
              )}
            </View>
            <Text style={{ color: 'red', fontSize: 13 }}>{form.error}</Text>
          </View> */}
          <View style={styles.fieldsView}>
            <TouchableOpacity onPress={getImageFromGallery}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain',
                  borderWidth: 1,
                  borderColor: 'red',
                }}
                source={require('@app/assets/images/main.jpeg')}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.fieldsView}>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Email*</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) => setForm(() => ({ ...form, product_name: e }))}
                    value={form.product_name}
                    defaultValue={form.product_name}
                    placeholder="Enter Product Name"
                    style={styles.inputField}
                  />
                </View>
              </View>
              <View style={styles.inputFieldsMainView1}>
                <View style={styles.userNameView}>
                  <Text style={styles.labelText}>Qty</Text>
                  <View
                    style={{
                      ...styles.inputFieldSubView1,
                    }}
                  >
                    <TextInputNative
                      placeholder="Enter Qty"
                      value={form.quantities}
                      style={{ marginLeft: '11%' }}
                      maxLength={15}
                      keyboardType='numeric'
                    />
                  </View>
                </View>
                <View style={styles.userNameView}>
                  <Text style={styles.labelText}>Shop Name*</Text>
                  <View
                    style={{
                      ...styles.inputFieldSubView1,
                    }}
                  >
                    <TextInputNative
                      onChangeText={() => console.log()}
                      placeholder="Enter Shop Name"
                      value={form.shop_name}
                      defaultValue={form.shop_name}
                      style={{ marginLeft: '11%' }}
                      maxLength={30}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Owner Name</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) =>
                      setForm(() => ({ ...form, owner_name: e }))
                    }
                    placeholder="Owner Name"
                    keyboardType="email-address"
                    style={{ width: '80%', marginLeft: '5%' }}
                    maxLength={50}
                  />
                </View>
              </View>

              <View style={styles.inputFieldsMainView1}>
                <View style={styles.userNameView}>
                  <Text style={styles.labelText}>Owner Phone No</Text>
                  <View
                    style={{
                      ...styles.inputFieldSubView1,
                    }}
                  >
                    <TextInputNative
                      onChangeText={(e) => {
                        setForm(() => ({ ...form, owner_phone_no: e }));
                      }}
                      placeholder="Enter Owner Phone No"
                      value={form.shop_phone_no1}
                      defaultValue={form.owner_phone_no}
                      style={{ marginLeft: '11%' }}
                      maxLength={15}
                    />
                  </View>
                </View>
                <View style={styles.userNameView}>
                  <Text style={styles.labelText}>Shop Phone No</Text>
                  <View
                    style={{
                      ...styles.inputFieldSubView1,
                    }}
                  >
                    <TextInputNative
                      onChangeText={(e) =>
                        setForm(() => ({ ...form, shop_phone_no1: e }))
                      }
                      placeholder="Enter Shop Phone No"
                      value={form.shop_phone_no1}
                      defaultValue={form.shop_phone_no1}
                      style={{ marginLeft: '11%' }}
                      maxLength={30}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Address</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                    height: 70,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) => setForm(() => ({ ...form, address: e }))}
                    placeholder="Enter Your Address"
                    style={{ width: '80%', marginLeft: '5%' }}
                    multiline={true}
                  />
                </View>
              </View>
              <View style={{ ...styles.inputFieldsMainView, marginBottom: 70 }}>
                <View style={styles.signupButton}>
                  {isPending ? (
                    <ActivityIndicator
                      size="large"
                      color="#5460E0"
                      style={styles.activitIndicator}
                    />
                  ) : (
                    <MaterialButton
                      style={styles.UpdateProfileButton}
                      mode="contained"
                      onPress={handleSubmit}
                    >
                      <Text style={styles.UpdateProfileButtonText}>
                        Update Profile
                      </Text>
                    </MaterialButton>
                  )}
                </View>
                {/* <Text style={{ color: 'red', fontSize: 13 }}>
                  {form.error}
              </Text> */}
              </View>
            </View>
          </KeyboardAwareScrollView>
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
        </ScrollView>
      </Modalize>
    </>
  );
});

export default AddBrandBottomSheet;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  textStyle: {
    color: '#1D1D1F',
    fontSize: 18,
    lineHeight: 25,
  },
  innerContainer: {
    backgroundColor: 'white',
    height: Dimensions.get('screen').height / 1.2,
  },
  titleContainer: {
    backgroundColor: '#F0F0F8',
    height: '20%',
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
  fieldsView: {
    width: '96%',
    alignItems: 'center',
    marginTop: '5%',
    backgroundColor: 'transparent',
  },
  inputFieldsMainView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  labelText: {
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    color: 'grey',
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
  errorMessage: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: '8%',
  },
  inputField: {
    width: '93%',
    marginLeft: '5%',
  },
  clientView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
    backgroundColor: 'transparent',
    marginTop: '2.5%',
  },
  clientViewText: {
    flex: 1,
    paddingTop: '1%',
    color: 'grey',
    fontSize: 15,
  },
  loginButtonView: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  loginButton: {
    width: '85%',
    padding: '1.8%',
    borderRadius: 20,
    backgroundColor: '#5460E0',
  },
  loginButtonText: {
    fontSize: 13,
    color: 'white',
  },
  signupButton: {
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: '10%',
    borderColor: 'grey',
    padding: '1.8%',
  },
  signUpButtonText: {
    fontSize: 13,
    color: '#5460E0',
  },
  activitIndicator: {
    width: '60%',
    padding: '2%',
  },
  forgotView: {
    backgroundColor: 'transparent',
    width: '95%',
    alignItems: 'center',
    paddingTop: '7%',
  },
  socialView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: '5%',
  },
  socialTouchable: {
    paddingTop: '1%',
    paddingHorizontal: '5%',
  },
  imageStyle: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  label: {
    margin: 8,
  },
  inputFieldsMainView1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: '11%',
    marginTop: '2%',
  },
  inputFieldSubView1: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: '5%',
    borderRadius: 30,
    width: '80%',
    marginVertical: '4%',
    height: 45,
    borderWidth: 1,
  },
  userNameView: {
    width: '49%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

});
