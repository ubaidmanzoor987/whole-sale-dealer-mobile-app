import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Button, } from 'react-native-paper';

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

const ViewEditProduct: React.FC<Props> = React.forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const brand = useSelector(getBrandSelector);
  const isPending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);
  const user = useSelector(getDataSelector);
  const [updatePending, setUpdatePending] = useState<boolean>(false);

  const [form, setForm] = useState<AddBrand>(() => ({
    own_brand: 'false',
    brand_name: '',
    error: '',
    user_id: -1,
  }));

  useEffect(() => {
    if (error && error.length > 0) {
      setForm(() => ({
        ...form,
        error,
      }));
    }
  }, [error]);

  useEffect(() => {
    if (_.isEdit === true && _.row?.brand_name) {
      setForm({
        ...form,
        brand_name: _.row.brand_name,
        own_brand: _.row.own_brand,
        brand_id: _.row.id,
      });
    } else {
      setForm({
        own_brand: 'false',
        brand_name: '',
        error: '',
        user_id: -1,
        brand_id: undefined,
      });
    }
  }, [_.isEdit, _.row]);

  useEffect(() => {
    if (brand && brand.brand_name) {
      dispatch(fetchBrandListRequest({ user_id: user && user.id }));
      setForm({
        own_brand: 'false',
        brand_name: '',
        error: '',
        user_id: -1,
      });
      _.closeSheet();
      dispatch(fetchBrandCreateClear());
    }
  }, [brand]);

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
        dispatch(fetchBrandListRequest({ user_id: user && user.id }));
        setUpdatePending(false);
        setForm({
          own_brand: 'false',
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

  return (
    <>
      <Modalize ref={ref} modalHeight={Dimensions.get('screen').height / 1.11}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleWelcomeText}>
              {_.isEdit === false ? 'View Product' : 'Edit Product'}
            </Text>
            <Text style={styles.titleSignText}>Product Details.</Text>
          </View>
          <ScrollView contentContainerStyle={styles.fieldsView}>
            <View style={styles.inputFieldsMainView}>
              <View>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    source={{
                      uri: 'https://media.istockphoto.com/photos/cardboard-box-isolated-on-white-background-with-clipping-path-picture-id1282219840?b=1&k=20&m=1282219840&s=170667a&w=0&h=FAo7lLqh8cmjPzAmXMjnsVx-fZxBn1iEmchcAH_jQTw=',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '95%',
                  display: 'flex',
                  marginLeft: 10,
                  marginVertical: 10,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: '20%',
                    borderColor: 'lightgrey',
                  }}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    source={{
                      uri: 'https://media.istockphoto.com/photos/cardboard-box-isolated-on-white-background-with-clipping-path-picture-id1282219840?b=1&k=20&m=1282219840&s=170667a&w=0&h=FAo7lLqh8cmjPzAmXMjnsVx-fZxBn1iEmchcAH_jQTw=',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: '20%',
                    borderColor: 'lightgrey',
                    marginLeft: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    source={{
                      uri: 'https://media.istockphoto.com/photos/cardboard-box-isolated-on-white-background-with-clipping-path-picture-id1282219840?b=1&k=20&m=1282219840&s=170667a&w=0&h=FAo7lLqh8cmjPzAmXMjnsVx-fZxBn1iEmchcAH_jQTw=',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: '20%',
                    borderColor: 'lightgrey',
                    marginLeft: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    source={{
                      uri: 'https://media.istockphoto.com/photos/cardboard-box-isolated-on-white-background-with-clipping-path-picture-id1282219840?b=1&k=20&m=1282219840&s=170667a&w=0&h=FAo7lLqh8cmjPzAmXMjnsVx-fZxBn1iEmchcAH_jQTw=',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.labelText}>Product Name</Text>
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
              <View>
                <Text style={styles.labelText}>Quantity</Text>
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
              <View>
                <Text style={styles.labelText}>Price</Text>
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
              <View>
                <Text style={styles.labelText}>Product Description</Text>
                <View style={{...styles.inputFieldSubView, height:100}}>
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
          </ScrollView>
        </View>
      </Modalize>
    </>
  );
});

export default ViewEditProduct;

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
});
