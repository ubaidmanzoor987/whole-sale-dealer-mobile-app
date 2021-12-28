import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@app/screens/Themed';
import { ENV_VAR } from '@app/utils/environments';

interface Props {
  ref: React.Ref<any>;
  navigation?: any;
  closeSheet?: any;
  row?: any;
  isEdit?: boolean;
}

const AddBrandBottomSheet: React.FC<Props> = React.forwardRef((_, ref) => {
 
  const [form, setForm] = useState<any>(() => ({
    user_name: '',
    shop_name: '',
    owner_name: '',
    owner_phone_no: '',
    shop_phone_no1: '',
    shop_phone_no2: '',
    loc_long: '',
    loc_lat: '',
    address: '',
    image: {
      uri: '',
      height: -1,
      width: -1,
      base64: '',
    },
    email: '',
    id: -1,
    token: '',
    imageb64: '',
  }));

  useEffect(()=>{
    const data = {
      user_name: _.row.user_name,
      shop_name: _.row.shop_name,
      owner_name: _.row.owner_name,
      owner_phone_no: _.row.owner_phone_no,
      shop_phone_no1: _.row.shop_phone_no1,
      shop_phone_no2: _.row.shop_phone_no2,
      loc_long: _.row.loc_long,
      loc_lat: _.row.loc_lat,
      address: _.row.address,
      image: {
        uri: ENV_VAR.baseUrl + _.row.image,
        height: -1,
        width: -1,
        base64: _.row.imageb64,
      },
      email: _.row.email,
      id: _.row.id,
      token: _.row.token,
      imageb64: _.row.imageb64,
    } as any;
    setForm(data);
  },[])
 
  return (
    <>
      <Modalize ref={ref} modalHeight={Dimensions.get('screen').height / 1.2}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleWelcomeText}>
              {form.user_name}
            </Text>
            <Text style={styles.titleSignText}>
              {form.email}
            </Text>
          </View>
          <View style={styles.fieldsView}>
              {form.image && form.image.uri && form.image.base64 ? (
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                  }}
                  source={{ uri: form.image.uri }}
                />
              ) : (
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                    borderWidth: 3,
                    borderColor: "lightgrey"
                  }}
                  source={require('@app/assets/images/sampleImage.png')}
                />
              )}
            
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
                    onChangeText={(e) => setForm(() => ({ ...form, email: e }))}
                    value={form.email}
                    defaultValue={form.email}
                    placeholder="Enter Email"
                    style={styles.inputField}
                    editable={false}
                  />
                </View>
              </View>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>User Name</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    placeholder="User Name"
                    style={{ width: '80%', marginLeft: '5%' }}
                    maxLength={50}
                    defaultValue={form.user_name}
                    value={form.user_name}
                    // editable={false}
                  />
                </View>
              </View>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Shop Name*</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) => setForm(() => ({ ...form, shop_name: e }))}
                    placeholder="Enter Name"
                    style={{ width: '80%', marginLeft: '5%' }}
                    maxLength={50}
                    defaultValue={form.shop_name}
                  />
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
                    value={form.owner_name}
                    defaultValue={form.owner_name}
                  />
                </View>
              </View>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Owner Mobile Number</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) =>
                      setForm(() => ({ ...form, owner_phone_no: e }))
                    }
                    placeholder="Enter Number"
                    keyboardType="numeric"
                    style={{ width: '80%', marginLeft: '5%' }}
                    value={form.owner_phone_no}
                    defaultValue={form.owner_phone_no}
                  />
                </View>
              </View>
              <View style={styles.inputFieldsMainView}>
                <Text style={styles.labelText}>Shop Phone Number</Text>
                <View
                  style={{
                    ...styles.inputFieldSubView,
                  }}
                >
                  <TextInputNative
                    onChangeText={(e) =>
                      setForm(() => ({ ...form, shop_phone_no1: e }))
                    }
                    placeholder="Enter Number"
                    keyboardType="numeric"
                    style={{ width: '80%', marginLeft: '5%' }}
                    value={form.shop_phone_no1}
                    defaultValue={form.shop_phone_no1}
                  />
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
                    value={form.address}
                    defaultValue={form.address}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
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
    padding: 0,
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
    height: '13%',
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
  labelValue: {
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    color: 'black',
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
