import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { Button as MaterialButton, Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@app/screens/Themed';
import { getDataSelector } from '@app/store/user/login/selector';
import { IUser } from '@app/store/user/login/types';
import { logoutUser, updateUser } from '@app/utils/apis';
import CameraScreenSheet from '@app/screens/MediaScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  fetchUserLoginClear,
  userAutoLogin,
} from '@app/store/user/login/actions';
import { ImageResult } from 'expo-image-manipulator';
import { ENV_VAR } from '@app/utils/environments';

export interface option {
  title: string;
  customButtons: {
    name: string;
    title: string;
  }[];
  storageOptions: {
    skipBackup: boolean;
    path: string;
  };
  mediaType: string;
}

export default function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const user = useSelector(getDataSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState<String>('');
  const [profileImgUrl, setProfileImgUrl] = React.useState<String | undefined>(
    ''
  );

  const [previewImage, setPreviewImage] = React.useState<ImageResult>();

  const [openCameraModal, setOpenCameraModal] = React.useState<boolean>(false);

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

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (user) {
      const data = {
        user_name: user.user_name,
        shop_name: user.shop_name,
        owner_name: user.owner_name,
        owner_phone_no: user.owner_phone_no,
        shop_phone_no1: user.shop_phone_no1,
        shop_phone_no2: user.shop_phone_no2,
        loc_long: user.loc_long,
        loc_lat: user.loc_lat,
        address: user.address,
        image: {
          uri: ENV_VAR.baseUrl + user.image,
          height: -1,
          width: -1,
          base64: user.imageb64,
        },
        email: user.email,
        id: user.id,
        token: user.token,
        imageb64: user.imageb64,
      } as any;
      setForm(data);
    }
  }, []);

  useEffect(() => {
    if (
      previewImage &&
      previewImage.uri &&
      previewImage.uri !== form['image']['uri']
    ) {
      setForm(() => ({ ...form, ['image']: previewImage }));
      // setIsUpdatedImage();
    }
  }, [previewImage]);

  const handleSubmit = async () => {
    const data = { ...form };
    console.log("data", form.image)
    if (form.image && form.image.base64 && form.image.base64 !== '') {
      data['imagebase64'] = `data:image/jpeg;base64,${form.image.base64},`;
      // data['isImage1Update'] = isImage1Update;
    }else {
      delete data['image'];
    }
    setIsPending(true);
    const res = await updateUser(data);
    if (res.message) {
      setVisible(true);
      setMessage(res.message);
      setIsPending(false);
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(res.data));
      dispatch(userAutoLogin(res.data));
      setIsError(false);
    } else if (res.error) {
      setVisible(true);
      setMessage("Failed to update");
      setIsError(true);
      setIsPending(false);
    }
  };

  const handleLogout = async () => {
    const res = await logoutUser({ user_id: user && user.id });
    AsyncStorage.removeItem('user');
    dispatch(fetchUserLoginClear());
    if (res.message) {
      setVisible(true);
      setMessage(res.message);
    } else if (res.error) {
      setVisible(true);
      setMessage(res.message);
      setIsError(true);
    }
    navigation.navigate('Root');
  };

  const showCameraModal = () => {
    setOpenCameraModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.titleWelcomeText}>Personal Info</Text>
          <TouchableOpacity
            style={{
              ...styles.titleWelcomeText,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1%',
              marginRight: '5%',
            }}
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={45} color="black" />
            <Text style={{ color: 'black' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldsView}>
        <TouchableOpacity
          onPress={showCameraModal}
          style={{ borderWidth: 1, borderColor: 'grey' }}
        >
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
                resizeMode: 'contain',
                borderWidth: 1,
                borderColor: 'lightgrey',
              }}
              source={require('@app/assets/images/sampleImage.png')}
            />
          )}
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
            <Text style={styles.labelText}>User Name*</Text>
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
                editable={false}
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
          <View style={{ ...styles.inputFieldsMainView, marginBottom: 70 }}>
            <View style={styles.UpdateProfileButtonView}>
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
      <CameraScreenSheet
        openModal={openCameraModal}
        closeModal={setOpenCameraModal}
        setSelectedImage={setPreviewImage}
      />
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
