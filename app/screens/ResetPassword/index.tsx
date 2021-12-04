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
import { fetchUserLoginRequest } from '@app/store/user/login/actions';
import { Image, Text, View } from '@app/screens/Themed';

import {
  getErrorSelector,
  getPendingSelector,
  getDataSelector,
  getMessageSelector,
} from '@app/store/user/login/selector';
import { RootStackParamList } from '@app/navigation/NavigationTypes';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'native-base';

function ResetScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [focusUserName, setFocusUserName] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);

  //Confirm Password
  const [focusConfrimPassword, setFocusConfirmPassword] = useState<boolean>(false);
  const [confrimPassword, setConfrimPassword] = useState<String>('');
  const [visibleConfrimPassword, setVisibleConfirmPassword] = useState<boolean>(false);
  const [ConfirmPassword, setConfirmPassword] = useState<string>('');

  const [usertype, setUserType] = useState<string>('shop_keeper');

  const userData = useSelector(getDataSelector);
  const isPending = useSelector(getPendingSelector);
  const errorMessageServer = useSelector(getErrorSelector);
  const message = useSelector(getMessageSelector);

  let passwordFocusField = null as any;
  let ConfirmPasswordFocusField = null as any;

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
        const result = JSON.parse(jsonValue);
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

  const handleSubmit = async () => {
    if (confrimPassword.length !== 0 && password.length !== 0) {
      const data = {
        user_name: username,
        password: password,
        user_type: usertype,
      };
      dispatch(fetchUserLoginRequest(data));
      const user_type = JSON.stringify(usertype);
      await AsyncStorage.setItem('user_type', user_type);
    } else if(confrimPassword.length === 0 && password.length === 0){
      setErrorMessage(`New Password is Required \n Confirm Password is Required`);
    } else if (confrimPassword.length === 0) {
      setErrorMessage('Confirm Password is Required');
    } else if (password.length === 0) {
      setErrorMessage('Password is Required');
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

  const handleConfirmPassoword = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Confirm Password is Required ');
    } else {
      setErrorMessage('');
      setConfirmPassword(text);
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
  
  const toggleConfirmPass = () => {
    setVisibleConfirmPassword(!visibleConfrimPassword);
  };
  const setfocusPassword = () => {
    passwordFocusField.focus();
  };
  const setfocusConfirmPassword = () => {
    ConfirmPasswordFocusField.focus()
  }

  const toggleFocusUserName = () => {
    setFocusUserName(true);
    setFocusPassword(false);
  };

  const toggleFocusPassword = () => {
    setFocusUserName(false);
    setFocusPassword(true);
    setFocusConfirmPassword(false);
  };

  const toggleFocusConfirmPassword = () => {
    setFocusPassword(false);
    setFocusConfirmPassword(true);
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Welcome!</Text>
        <Text style={styles.titleSignText}>Reset Password</Text>
      </View>
      <View style={styles.fieldsView}>
        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>New Password</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
              borderColor: focusPassword ? 'blue' : 'black',
            }}
          >
            <MaterialCommunityIcons
              name="lock"
              size={24}
              style={{ paddingTop: '3%', paddingHorizontal: '3%' }}
            />
            <TextInputNative
              ref={(input) => {
                passwordFocusField = input;
              }}
              onFocus={toggleFocusPassword}
              onChangeText={handlePassoword}
              placeholder="Enter Your Passwod"
              onSubmitEditing={setfocusConfirmPassword}
              secureTextEntry={!visiblePass}
              style={{ width: '80%' }}
              maxLength={15}
            />
            <MaterialCommunityIcons
              name={visiblePass ? 'eye' : 'eye-off'}
              size={20}
              style={styles.icons}
              onPress={togglePass}
            />
          </View>
        </View>
        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>New Password</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
              borderColor: focusPassword ? 'blue' : 'black',
            }}
          >
            <MaterialCommunityIcons
              name="lock"
              size={24}
              style={{ paddingTop: '3%', paddingHorizontal: '3%' }}
            />
            <TextInputNative
              ref={(input) => {
                ConfirmPasswordFocusField = input;
              }}
              onFocus={toggleFocusConfirmPassword}
              onChangeText={handleConfirmPassoword}
              placeholder="Enter Your Confirm Passwod"
              onSubmitEditing={handleSubmit}
              secureTextEntry={!visibleConfrimPassword}
              style={{ width: '80%' }}
              maxLength={15}
            />
            <MaterialCommunityIcons
              name={visibleConfrimPassword ? 'eye' : 'eye-off'}
              size={20}
              style={styles.icons}
              onPress={toggleConfirmPass}
            />
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <></>
        )}
        {/* <View style={styles.clientView}>
          <Text style={styles.clientViewText}>Switch To Client</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            thumbColor="#5460E0"
          />
        </View> */}
        <View style={styles.loginButtonView}>
          {isPending ? (
            <ActivityIndicator
              size="large"
              color="#5460E0"
              style={styles.activitIndicator}
            />
          ) : (
            <Button
              style={styles.loginButton}
              // icon={() => (
              //   <MaterialCommunityIcons name="forget" size={20} color="white" />
              // )}
              mode="contained"
              onPress={handleSubmit}
            >
              <Text style={styles.loginButtonText}>Change Password</Text>
            </Button>
          )}
        </View>
        {/* <View style={styles.forgotView}>
          <Text style={{ textDecorationLine: 'underline', color: '#5460E0' }}>
            Forgot Password
          </Text>
        </View> */}
        {/* <View style={styles.socialView}>
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
        </View> */}
        {/* <Button
          style={styles.signupButton}
          icon={() => <FontAwesome name="users" size={15} color="#5460E0" />}
          mode="contained"
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Button> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default React.memo(ResetScreen);

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
});
