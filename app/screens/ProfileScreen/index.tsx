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
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUserLoginClear } from '@app/store/user/login/actions';

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

  const [form, setForm] = useState<IUser>(() => ({
    user_name: '',
    shop_name: '',
    owner_name: '',
    owner_phone_no: '',
    shop_phone_no1: '',
    shop_phone_no2: '',
    loc_long: '',
    loc_lat: '',
    address: '',
    image: '',
    email: '',
    id: -1,
    token: '',
  }));

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setForm(() => ({
      ...form,
      ...user,
    }));
  }, []);

  const handleSubmit = async () => {
    const res = await updateUser(form);
    console.log("res", res);
    if (res.message) {
      setVisible(true);
      setMessage(res.message);
    } else if (res.error) {
      setVisible(true);
      setMessage(res.message);
      setIsError(true);
    }
  };

  const askForPermission = async () => {
    const permissionResult = await Camera.requestCameraPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 'ok');
      return false;
    }
    return true;
  };

  const getImageFromCamera = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
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
      setProfileImgUrl(`data:image/jpeg;base64,${processedImage.base64}`);
      setSelectedImage(processedImage.base64);
      const data = {
        image: `data:image/jpeg;base64,${processedImage.base64}`,
        user_id: form.id,
        email: form.email,
        shop_name: form.email,
      };
      const res = await updateUser(data);
      if (res.message) {
        setVisible(true);
        setMessage(res.message);
      } else if (res.error) {
        setVisible(true);
        setMessage(res.message);
        setIsError(true);
      }
    } catch (ex) {
      console.log('Exception in processImage', ex);
    }
  };

  const handleLogout = async () => {
    if (user && user.id) {
      const res = await logoutUser({ user_id: user.id });
      if (res.message) {
        AsyncStorage.removeItem("user");
        dispatch(fetchUserLoginClear());
        setVisible(true);
        setMessage(res.message);
        navigation.navigate("Root");
      } else if (res.error) {
        setVisible(true);
        setMessage(res.message);
        setIsError(true);
      }
    }
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
        <TouchableOpacity onPress={getImageFromGallery}>
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain',
              borderWidth: 1,
              borderColor: 'lightgrey',
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
                onChangeText={(e) => setForm(() => ({ ...form, email: e }))}
                value={form.email}
                defaultValue={form.email}
                placeholder="Enter Email"
                style={styles.inputField}
              />
            </View>
          </View>
          <View style={styles.inputFieldsMainView1}>
            <View style={styles.userNameView}>
              <Text style={styles.labelText}>User Name*</Text>
              <View
                style={{
                  ...styles.inputFieldSubView1,
                }}
              >
                <TextInputNative
                  placeholder="Enter User name"
                  value={form.user_name}
                  defaultValue={form.user_name}
                  style={{ marginLeft: '11%' }}
                  maxLength={15}
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
                  value={form.owner_phone_no}
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
    height: '15%',
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
