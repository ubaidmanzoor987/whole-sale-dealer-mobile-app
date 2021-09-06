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
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { fetchUserRequest } from '@app/store/auth/actions';
import { Image, Text, View } from '@app/screens/Themed';

import {
  getErrorSelector,
  getPendingSelector,
  getUserSelector,
  getMessageSelector,
} from '@app/store/auth/selector';
import { RootStackParamList } from '@app/navigation/NavigationTypes';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [focusUserName, setFocusUserName] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [focusEmail, setFocusEmail] = useState<boolean>(false);
  const [focusShopName, setFocusShopName] = useState<boolean>(false);

  const [usertype, setUserType] = useState<string>('shop_keeper');

  const userData = useSelector(getUserSelector);
  const isPending = useSelector(getPendingSelector);
  const errorMessageServer = useSelector(getErrorSelector);
  const message = useSelector(getMessageSelector);

  let userNameFocusField = null as any;
  let passwordFocusField = null as any;
  let passwordUserNameField = null as any;
  let passwordShopNameField = null as any;

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
        const result = JSON.parse(jsonValue);
        console.log('mount login screen');
        // if (result.type === 'success') {
        //   const data = {
        //     email: result.user.email,
        //     displayName: result.user.givenName + ' ' + result.user.familyName,
        //     givenName: result.user.givenName,
        //     familyName: result.user.familyName,
        //     googleId: result.user.id,
        //     imageUrl: result.user.photoUrl,
        //   } as requestUser;
        //   dispatch(fetchUserRequest(data));
        // }
      } catch (e) {
        // error reading value
      }
    };
    getData();

    if (message == 'Login Successfully') {
      navigation.navigate('Home');
      return;
    }
  }, [message]);

  useEffect(() => {
    if (errorMessageServer) {
      setErrorMessage(errorMessageServer);
    }
  }, [errorMessageServer]);

  const handleLogin = async () => {
    if (username.length !== 0 && password.length !== 0) {
      const data = {
        user_name: username,
        password: password,
        user_type: usertype,
      };
      dispatch(fetchUserRequest(data));
      const user_type = JSON.stringify(usertype);
      await AsyncStorage.setItem('user_type', user_type);
    } else if (username.length === 0) {
      setErrorMessage('User Name is Required');
    } else if (password.length === 0) {
      setErrorMessage('Password is Required');
    }
  };

  const validate = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const returnval = expression.test(String(email).toLowerCase());
    console.log(returnval);
    return returnval;
  };

  const handleEmail = (text: string) => {
    if (text.length === 0) {
      setErrorMessageEmail('Email is Required ');
    } else if (validate(text) === false) {
      setErrorMessageEmail('Invalid Email Address');
    } else {
      setErrorMessageEmail('');
      setEmail(text);
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

  const handleShopName = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Password is Required ');
    } else {
      setErrorMessage('');
      setShopName(text);
    }
  };

  const toggleFocusPassword = () => {
    setFocusUserName(false);
    setFocusPassword(true);
  };

  const handleUsername = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('User Name is Required ');
    } else {
      setErrorMessage('');
      setUsername(text);
    }
  };

  const TitleWidget = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.titleWelcomeText}>New Account!</Text>
      <Text style={styles.titleSignText}>Sign Up and get Started</Text>
    </View>
  );
  console.log(focusUserName);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TitleWidget />
      <View style={styles.fieldsView}>
        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Email</Text>
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
          {errorMessageEmail ? (
            <Text style={styles.errorText}>{errorMessageEmail}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.inputFieldsMainView1}>
          <View
            style={{
              width: '46%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'transparent',
            }}
          >
            <Text style={styles.labelText}>User Name</Text>
            <View
              style={{
                ...styles.inputFieldSubView1,
                borderColor: focusUserName ? 'blue' : 'black',
              }}
            >
              <TextInputNative
                ref={(input) => {
                  userNameFocusField = input;
                }}
                onFocus={toggleFocusUserName}
                onChangeText={handleUsername}
                placeholder="Enter User name"
                onSubmitEditing={setfocusPassword}
                style={styles.inputField}
                multiline={true}
                maxLength={20}
              />
            </View>
          </View>
          <View
            style={{
              width: '52%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'transparent',
            }}
          >
            <Text style={styles.labelText}>Shop Name</Text>
            <View
              style={{
                ...styles.inputFieldSubView1,
                borderColor: focusShopName ? 'blue' : 'black',
              }}
            >
              <TextInputNative
                onFocus={toggleFocusShopName}
                onChangeText={handleShopName}
                placeholder="Enter Shop Name"
                onSubmitEditing={setfocusPassword}
                style={styles.inputField}
                maxLength={15}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Password</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
              borderColor: focusPassword ? 'blue' : 'black',
            }}
          >
            <TextInputNative
              ref={(input) => {
                passwordFocusField = input;
              }}
              onFocus={toggleFocusPassword}
              onChangeText={handlePassoword}
              placeholder="Enter Your Passwod"
              onSubmitEditing={handleLogin}
              secureTextEntry={!visiblePass}
              style={{ width: '80%', marginLeft: '5%' }}
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
        <Button
          style={styles.signupButton}
          icon={() => <FontAwesome name="users" size={15} color="#5460E0" />}
          mode="contained"
          onPress={handleLogin}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Button>
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
    marginTop: '5%',
    backgroundColor: 'transparent',
  },
  inputFieldsMainView: {
    marginLeft: '5%',
    width: '100%',
    backgroundColor: 'transparent',
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
    height: 40,
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
    height: 40,
    borderWidth: 1,
  },
  icons: {
    paddingTop: '2%',
    paddingRight: '4%',
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
  },
  loginButtonText: {
    fontSize: 13,
    color: 'white',
  },
  signupButton: {
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: '8%',
    borderColor: 'grey',
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
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: 'red',
    paddingLeft: '8%',
    fontSize: 12,
    marginTop: '-4%',
  },
});
