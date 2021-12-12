import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Constants from 'expo-constants';
import { Button as MaterialButton, Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View } from '@app/screens/Themed';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { getDataSelector as getBrandSelector } from '@app/store/brands/listBrands/selector';
import CameraBottomSheet from '@app/screens/MediaScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageResult } from 'expo-image-manipulator';
import { fetchBrandListRequest } from '@app/store/brands/listBrands/actions';
import {
  fetchProductsAddClear,
  fetchProductsAddRequest,
} from '@app/store/products/addProduct/actions';
import {
  getaddProductelector,
  getErrorSelector,
  getPendingSelector,
} from '@app/store/products/addProduct/selector';

interface IAddProduct {
  image1?: ImageResult;
  image2?: ImageResult;
  image3?: ImageResult;
  brand_id: number;
  user_id: number;
  product_name: string;
  product_description: string;
  quantity: string;
  price: string;
  error?: string;
}

const icons = {
  search: {
    name: 'search', // search input
    size: 24,
  },
  arrowUp: {
    name: 'keyboard-arrow-up', // dropdown toggle
    size: 22,
  },
  arrowDown: {
    name: 'keyboard-arrow-down', // dropdown toggle
    size: 22,
  },
  selectArrowDown: {
    name: 'keyboard-arrow-down', // select
    size: 24,
  },
  close: {
    name: 'close', // chip close
    size: 16,
  },
  check: {
    name: 'check', // selected item
    size: 16,
  },
  cancel: {
    name: 'cancel', // cancel button
    size: 18,
  },
};
export default function AddProductScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const user = useSelector(getUserSelector);
  const brands = useSelector(getBrandSelector);
  const [selectedImage, setSelectedImage] = React.useState<string>('image1');
  const [selectedBrand, setSelectedBrand] = React.useState<any>([]);
  const [brandLabel, setBrandLabel] = React.useState<string>('Select Brand');
  const [openCameraModal, setOpenCameraModal] = React.useState<boolean>(false);
  const [previewImage, setPreviewImage] = React.useState<ImageResult>();
  const [form, setForm] = useState<IAddProduct>(() => ({
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
    user_id: -1,
    brand_id: -1,
    quantity: '1',
    price: '',
    product_name: '',
    product_description: '',
    error: '',
  }));
  const addProductData = useSelector(getaddProductelector);
  const addProductPending = useSelector(getPendingSelector);
  const addProductError = useSelector(getErrorSelector);

  useEffect(() => {
    if (addProductData && addProductData.product_name) {
      setMessage('product successfully inserted');
      dispatch(fetchProductsAddClear());
      setForm(() => ({
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
        user_id: -1,
        brand_id: -1,
        quantity: '1',
        price: '',
        product_name: '',
        product_description: '',
        error: '',
      }));
      setPreviewImage({} as any);
      setSelectedBrand([]);
      setBrandLabel("Select Brand");
      goBack();
    }
  }, [addProductData]);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (previewImage && previewImage.uri) {
      setForm(() => ({ ...form, [selectedImage]: previewImage }));
    }
  }, [previewImage]);

  useEffect(() => {
    if (brands.length === 0 && user) {
      dispatch(fetchBrandListRequest({ user_id: user.id }));
    }
  }, [brands.length === 0]);

  const goBack = () => {
    navigation.goBack();
  };

  const incrDecreaseQuantity = (name: string) => {
    switch (name) {
      case 'plus':
        setForm(() => ({
          ...form,
          quantity: (Number(form.quantity) + 1).toString(),
        }));
        break;
      case 'minus':
        if (Number(form.quantity) > 1) {
          setForm(() => ({
            ...form,
            quantity: (Number(form.quantity) - 1).toString(),
          }));
          break;
        }
      default:
        break;
    }
  };

  const renderSelectText = (text: string) => {
    return <Text style={{}}>{text}</Text>;
  };

  const onSelectedItemObjectsChange = (col: any) => {
    setSelectedBrand([col[0]] as any);
    setForm(() => ({
      ...form,
      brand_id: col[0].id,
      error: '',
    }));
    setBrandLabel(col[0].brand_name);
  };

  const addImageTag = (
    setSelectImage: any,
    image_number: number,
    image: ImageResult | undefined
  ) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectImage('image' + image_number.toString());
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

  const showCameraModal = () => {
    setOpenCameraModal(true);
  };

  const handleSubmit = async () => {
    if (form.product_name.length === 0) {
      setForm(() => ({ ...form, error: 'Product Name is Required' }));
      return;
    } else if (form.quantity.length === 0) {
      setForm(() => ({ ...form, error: 'Quantity is Required' }));
      return;
    } else if (form.price.length === 0) {
      setForm(() => ({ ...form, error: 'Price is Required' }));
      return;
    } else if (selectedBrand && selectedBrand.length === 0) {
      setForm(() => ({ ...form, error: 'Brand is required' }));
      return;
    }
    const data = {
      product_name: form.product_name,
      price: form.price,
      quantities: form.quantity,
      product_des: form.product_description,
      brand_id: selectedBrand[0].id,
      user_id: user && user.id,
    };
    if (form.image1 && form.image1.base64 !== '') {
      data['image1'] = `data:image/jpeg;base64,${form.image1.base64},`;
    }
    if (form.image2 && form.image2.base64 !== '') {
      data['image2'] = `data:image/jpeg;base64,${form.image2.base64},`;
    }
    if (form.image3 && form.image3.base64 !== '') {
      data['image3'] = `data:image/jpeg;base64,${form.image3.base64},`;
    }
    dispatch(fetchProductsAddRequest(data));
    setVisible(true);
  };

  const onChange = (name: string, value: any) => {
    if (name) {
      setForm(() => ({ ...form, [name]: value, error: '' }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.titleWelcomeText}>Add Product</Text>
        </View>
        <Text style={styles.titleSignText}>
          Fill all required information *
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          marginVertical: 10,
          width: '98%',
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
            onPress={showCameraModal}
          >
            {previewImage && previewImage.base64 ? (
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
          {addImageTag(setSelectedImage, 1, form.image1)}
          {addImageTag(setSelectedImage, 2, form.image2)}
          {addImageTag(setSelectedImage, 3, form.image3)}
        </View>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.fieldsView}>
          <View style={styles.inputFieldsMainView}>
            <Text style={styles.labelText}>Product Name*</Text>
            <View style={styles.inputFieldSubView}>
              <TextInputNative
                onChangeText={(e) => onChange('product_name', e)}
                value={form.product_name}
                defaultValue={form.product_name}
                placeholder="Product Name"
                style={styles.inputField}
              />
            </View>
          </View>
          <View style={styles.inputFieldsMainView}>
            <Text style={styles.labelText}>Quantity</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
                width: '98%',
              }}
            >
              <View
                style={{
                  ...styles.inputFieldSubView,
                  width: '70%',
                }}
              >
                <TextInputNative
                  onChangeText={(e) => onChange('quantity', e)}
                  value={form.quantity}
                  defaultValue={form.quantity}
                  placeholder="Quantity"
                  style={styles.inputField}
                  keyboardType="decimal-pad"
                />
              </View>
              <View
                style={{
                  width: '25%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                }}
              >
                <TouchableOpacity onPress={() => incrDecreaseQuantity('plus')}>
                  <MaterialCommunityIcons
                    name="plus-box"
                    color="#5460E0"
                    size={45}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrDecreaseQuantity('minus')}>
                  <MaterialCommunityIcons
                    name="minus-box"
                    color="#5460E0"
                    size={45}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputFieldsMainView}>
            <Text style={styles.labelText}>Price*</Text>
            <View style={styles.inputFieldSubView}>
              <TextInputNative
                onChangeText={(e) => onChange('price', e)}
                value={form.price}
                defaultValue={form.price}
                placeholder="Price"
                style={styles.inputField}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <View style={styles.inputFieldsMainView}>
            <Text style={styles.labelText}>Brand*</Text>
            <View style={styles.inputFieldSubView}>
              <SectionedMultiSelect
                displayKey="brand_name"
                icons={icons}
                IconRenderer={() => <MaterialCommunityIcons />}
                items={brands.length > 0 ? brands : []}
                uniqueKey="id"
                subKey="children"
                alwaysShowSelectText
                renderSelectText={() => renderSelectText(brandLabel)}
                showChips={false}
                showDropDowns={true}
                selectChildren={true}
                readOnlyHeadings={false}
                onSelectedItemsChange={() => {}}
                selectedItems={selectedBrand}
                onSelectedItemObjectsChange={onSelectedItemObjectsChange}
                colors={{ primary: '#27428B' }}
                expandDropDowns
                modalWithSafeAreaView
                single
                hideConfirm
                showCancelButton={false}
                modalWithTouchable
                searchPlaceholderText="Search"
              />
            </View>
          </View>
          <View style={styles.inputFieldsMainView}>
            <Text style={styles.labelText}>Product Description</Text>
            <View style={{ ...styles.inputFieldSubView, height: 100 }}>
              <TextInputNative
                onChangeText={(e) => onChange('product_description', e)}
                value={form.product_description}
                defaultValue={form.product_description}
                placeholder="Product Description"
                style={styles.inputField}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '95%',
              marginLeft: '15%',
            }}
          >
            {form.error && form.error?.length > 0 ? (
              <Text style={{ color: 'red', fontSize: 13, textAlign: 'left' }}>
                {form.error}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={{ ...styles.inputFieldsMainView, marginBottom: 70 }}>
            <View style={styles.UpdateProfileButtonView}>
              {addProductPending ? (
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
                    Add Product
                  </Text>
                </MaterialButton>
              )}
            </View>
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
      <CameraBottomSheet
        openModal={openCameraModal}
        closeModal={setOpenCameraModal}
        setSelectedImage={setPreviewImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
    marginTop: Constants.statusBarHeight,
  },
  titleContainer: {
    height: 120,
    width: '99%',
    alignSelf: 'center',
    borderBottomRightRadius: 50,
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
  inputFieldsMainView1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: '11%',
    marginTop: '2%',
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
  UpdateProfileButtonView: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  UpdateProfileButton: {
    width: '85%',
    padding: '1.8%',
    borderRadius: 20,
    backgroundColor: '#5460E0',
  },
  UpdateProfileButtonText: {
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
