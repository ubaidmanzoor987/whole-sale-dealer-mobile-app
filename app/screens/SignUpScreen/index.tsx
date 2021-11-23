import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { fetchUserCreateRequest } from '@app/store/user/register/actions';
import { Image, Text, View } from '@app/screens/Themed';

import {
  getErrorSelector,
  getPendingSelector,
  getDataSelector,
  getMessageSelector,
} from '@app/store/user/register/selector';
import { RootStackParamList } from '@app/navigation/NavigationTypes';
import { Switch } from 'react-native-paper';
import ToastScreen from '@app/screens/ToastScreen';

function SignUpScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const dispatch = useDispatch();
  const isPending = useSelector(getPendingSelector);
  const errorMessageServer = useSelector(getErrorSelector);
  const data = useSelector(getDataSelector);

  const [user_name, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [shop_name, setShopName] = useState<string>('');
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [focusUserName, setFocusUserName] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [focusEmail, setFocusEmail] = useState<boolean>(false);
  const [focusShopName, setFocusShopName] = useState<boolean>(false);
  const [user_type, setUserType] = useState<string>('shop_keeper');
  const [visibleToast, setVisibleToast] = useState<boolean>(false);

  let userNameFocusField = null as any;
  let passwordFocusField = null as any;
  let shopNameFocusField = null as any;

  useEffect(() => {
    if (errorMessageServer && errorMessageServer.length > 0) {
      setErrorMessage(errorMessageServer);
    }
  }, [errorMessageServer]);

  useEffect(() => {
    if (data && data.user_name) {
      setUsername('');
      setPassword('');
      setEmail('');
      setShopName('');
      navigation.navigate('LogIn');
    }
  }, [data]);

  const handleLogin = () => {
    navigation.navigate('LogIn');
  };

  const handleSignUp = () => {
    if (email.length === 0) {
      setErrorMessage('Email is Required.');
    } else if (
      user_name.length === 0 ||
      user_name.length < 5 ||
      user_name.length > 15
    ) {
      setErrorMessage(
        'User Name is required and must between 5 to 15 characters. '
      );
    } else if (
      password.length === 0 ||
      password.length < 5 ||
      password.length > 15
    ) {
      setErrorMessage(
        'Password is required and must between 5 to 15 characters. '
      );
    } else if (
      shop_name.length === 0 ||
      shop_name.length < 5 ||
      shop_name.length > 30
    ) {
      setErrorMessage(
        'Shop Name is required and must between 5 to 30 characters'
      );
    }
    if (
      errorMessage.length === 0 &&
      user_name.length >= 5 &&
      user_name.length <= 15 &&
      password.length >= 5 &&
      password.length <= 15 &&
      shop_name.length >= 5 &&
      shop_name.length <= 30
    ) {
      const reqObj = {
        user_name,
        shop_name,
        email,
        password,
        user_type,
      };
      dispatch(fetchUserCreateRequest(reqObj));
    }
  };

  const validate = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const returnval = expression.test(String(email).toLowerCase());
    return returnval;
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn) {
      setUserType('shop_keeper');
    } else {
      setUserType('customer');
    }
  };

  const togglePass = () => {
    setVisiblePass(!visiblePass);
  };

  const setfocusPassword = () => {
    passwordFocusField.focus();
  };

  const setfocusUsername = () => {
    userNameFocusField.focus();
  };

  const setfocusShopNamefield = () => {
    shopNameFocusField.focus();
  };

  const toggleFocusEmail = () => {
    setFocusEmail(true);
    setFocusUserName(false);
    setFocusPassword(false);
    setFocusShopName(false);
  };

  const toggleFocusUserName = () => {
    setFocusUserName(true);
    setFocusEmail(false);
    setFocusPassword(false);
    setFocusShopName(false);
  };

  const toggleFocusShopName = () => {
    setFocusUserName(false);
    setFocusEmail(false);
    setFocusPassword(false);
    setFocusShopName(true);
  };

  const toggleFocusPassword = () => {
    setFocusUserName(false);
    setFocusEmail(false);
    setFocusPassword(true);
    setFocusShopName(false);
  };

  const handleEmail = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Email is Required ');
    } else if (validate(text) === false) {
      setErrorMessage('Invalid Email Address');
    } else {
      setErrorMessage('');
      setEmail(text);
    }
  };

  const handleUsername = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('User Name is Required ');
    } else {
      setErrorMessage('');
      setUsername(text);
    }
  };

  const handlePassoword = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Password is Required ');
    } else {
      setErrorMessage('');
      setPassword(text);
    }
  };

  const handleShopName = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Password is Required ');
    } else {
      setErrorMessage('');
      setShopName(text);
    }
  };

  const TitleWidget = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.titleWelcomeText}>New Account!</Text>
      <Text style={styles.titleSignText}>Sign Up and get Started</Text>
    </View>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TitleWidget />
      <View style={styles.fieldsView}>
        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Email*</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
              borderColor: focusEmail ? '#5460E0' : 'black',
            }}
          >
            <TextInputNative
              onFocus={toggleFocusEmail}
              onChangeText={handleEmail}
              placeholder="Enter Email"
              onSubmitEditing={setfocusUsername}
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
                borderColor: focusUserName ? '#5460E0' : 'black',
              }}
            >
              <TextInputNative
                ref={(input) => {
                  userNameFocusField = input;
                }}
                onFocus={toggleFocusUserName}
                onChangeText={handleUsername}
                placeholder="Enter User name"
                onSubmitEditing={setfocusShopNamefield}
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
                borderColor: focusShopName ? '#5460E0' : 'black',
              }}
            >
              <TextInputNative
                ref={(input) => {
                  shopNameFocusField = input;
                }}
                onFocus={toggleFocusShopName}
                onChangeText={handleShopName}
                placeholder="Enter Shop Name"
                onSubmitEditing={setfocusPassword}
                style={{ marginLeft: '11%' }}
                maxLength={30}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Password*</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
              borderColor: focusPassword ? '#5460E0' : 'black',
            }}
          >
            <TextInputNative
              ref={(input) => {
                passwordFocusField = input;
              }}
              onFocus={toggleFocusPassword}
              onChangeText={handlePassoword}
              placeholder="Enter Your Passwod"
              onSubmitEditing={handleSignUp}
              secureTextEntry={!visiblePass}
              style={{ width: '80%', marginLeft: '5%' }}
              maxLength={15}
            />
            <MaterialCommunityIcons
              name={visiblePass ? 'eye' : 'eye-off'}
              size={24}
              style={styles.icons}
              onPress={togglePass}
            />
          </View>
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <></>
        )}
        <View style={styles.clientView}>
          <Text style={styles.clientViewText}>Sign Up As Client</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            thumbColor="#5460E0"
          />
        </View>
        {isPending ? (
          <ActivityIndicator
            size="large"
            color="#5460E0"
            style={styles.activitIndicator}
          />
        ) : (
          <Button
            style={styles.signupButton}
            icon={() => <FontAwesome name="users" size={15} color="#5460E0" />}
            mode="contained"
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Button>
        )}

        <View style={styles.socialView}>
          <TouchableOpacity style={styles.socialTouchable}>
            <Image
              source={require('@app/assets/images/google.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialTouchable}>
            <Image
              source={require('@app/assets/images/fb.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity>
              <Image
                source={require('@app/assets/images/apple.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Button
          style={styles.loginButton}
          icon={() => (
            <MaterialCommunityIcons name="login" size={20} color="white" />
          )}
          mode="contained"
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Button>
      {/* {visibleToast && <ToastScreen message="Successfully Sign Up" />} */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default React.memo(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
    height: '100%',
    marginTop: Constants.statusBarHeight,
  },
  titleContainer: {
    height: '20%',
    width: '99%',
    alignSelf: 'center',
    borderBottomRightRadius: 80,
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
    backgroundColor: 'transparent',
  },
  inputFieldsMainView: {
    marginLeft: '5%',
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: '2%',
  },
  inputFieldsMainView1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginLeft: '11%',
    marginTop: '2%',
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
    height: 45,
    borderWidth: 1,
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
  icons: {
    paddingTop: '2%',
    paddingRight: '4%',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
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
    marginTop: '5%',
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
    paddingTop: '5%',
  },
  loginButton: {
    width: '85%',
    borderRadius: 20,
    backgroundColor: '#5460E0',
    padding: '2%',
    marginTop: '10%',
  },
  loginButtonText: {
    fontSize: 13,
    color: 'white',
  },
  signupButton: {
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: '6%',
    borderColor: 'grey',
    padding: '2%',
  },
  signUpButtonText: {
    fontSize: 13,
    color: '#5460E0',
  },
  activitIndicator: {
    width: '60%',
    padding: '2%',
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
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
});
