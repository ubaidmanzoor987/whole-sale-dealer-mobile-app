import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  Alert,
  Button,
  CheckBox,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { DataTable, Provider, Modal, Portal, Button as MaterialButton, Avatar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@app/screens/Themed';
import { getDataSelector } from '@app/store/user/login/selector'
import { IUser } from '@app/store/user/login/types';

export default function ProfileScreen() {
  const [brands, setBrands] = useState([]);

  const user = useSelector(getDataSelector);
  const [form , setForm] = useState<IUser>(()=>({
    user_name: user ? user.user_name: '',
    shop_name: user ? user.shop_name: '',
    owner_name: user ? user.owner_name: '',
    owner_phone_no: user ? user.owner_phone_no: '',
    shop_phone_no1: user ? user.shop_phone_no1: '',
    shop_phone_no2: user ? user.shop_phone_no2: '',
    loc_long: user ? user.loc_long: '',
    loc_lat: user ? user.loc_lat: '',
    address: user ? user.address: '',
    image: user ? user.image: '',
    email: user ? user.email: '',
    id: user ? user.id: 0,
    token: user ? user.token: '',
  }));
  const [isPending, setIsPending] = useState(false);

  useEffect(()=>{
    console.log(user, "user");
    
    // axios.post('/brands/shopkeeper/list_brands',{
    //   user_id: user?.shopkeeper_id
    // })
    // .then(res=>{
    //   console.log(res);
    // })
  },[])

  const handleSubmit = () => {

  }
  const handleEdit = () => {

  }
  const handleDelete = () => {
    Alert.alert(
      "Warning",
      "Are you sure!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => console.log("OK Pressed") }
      ]
    );

  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleWelcomeText}>Profile</Text>
            {/* <View style={{ display: 'flex' }}> */}
                <TouchableOpacity style={{...styles.titleWelcomeText, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%', marginRight:'5%' }}>
                    <MaterialCommunityIcons name="logout" size={45} color="black" />
                    <Text style={{ color: 'black' }}>Logout</Text>
                </TouchableOpacity>
                {/* <MaterialButton
                    style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                    icon={() => (
                    <MaterialCommunityIcons name="logout" size={45} color="black" />
                    )}
                    mode="contained"
                    onPress={handleSubmit}
                >
                    <Text style={{ color: 'black' }}>Update Profile</Text>
                </MaterialButton> */}
            {/* </View>             */}
        </View>
        {/* <Text style={styles.titleSignText}>List of all brands</Text> */}
      </View>
      <View style={styles.fieldsView}>
        <TouchableOpacity>
            <Avatar.Image size={150} source={require('@app/assets/images/main.jpeg')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldsView}>
      <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Email*</Text>
          <View
            style={{
              ...styles.inputFieldSubView
            }}
          >
            <TextInputNative
              onChangeText={()=>console.log('pressed')}
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
                onChangeText={()=>{console.log()}}
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
                onChangeText={()=>console.log()}
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
          <Text style={styles.labelText}>Password*</Text>
          <View
            style={{
              ...styles.inputFieldSubView,
            }}
          >
            <TextInputNative
              onChangeText={()=>console.log()}
              placeholder="Enter Your Passwod"
              secureTextEntry={true}
              style={{ width: '80%', marginLeft: '5%' }}
              maxLength={15}
            />
          </View>
        </View>
        <View style={styles.inputFieldsMainView}>
          {/* <Text style={styles.labelText}>Search</Text> */}
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
                // icon={() => (
                // <Ionicons name="add" size={20} color="white" />
                // )}
                mode="contained"
                onPress={handleSubmit}
            >
                <Text style={styles.UpdateProfileButtonText}>Update Profile</Text>
            </MaterialButton>
            )}
        </View>
        {/* <Text style={{ color: 'red', fontSize: 13 }}>
            {form.error}
        </Text> */}
        </View>
        {/* {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <></>
        )} */}
        {/* <View style={styles.UpdateProfileButtonView}>
          {isPending ? (
            <ActivityIndicator
              size="large"
              color="#5460E0"
              style={styles.activitIndicator}
            />
          ) : (
            <Button
              style={styles.UpdateProfileButton}
              mode="contained"
              onPress={handleLogin}
            >
              <Text style={styles.UpdateProfileButtonText}>Submit</Text>
            </Button>
          )}
        </View> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
    height: '100%',
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
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "flex-start",
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
