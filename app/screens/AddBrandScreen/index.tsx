import React, { useState, useEffect } from 'react';
import { StyleSheet,
    TextInput as TextInputNative,
    TouchableOpacity,
    ActivityIndicator,
    CheckBox,
    Alert,
    Platform, } from 'react-native';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import EditScreenInfo from '@app/screens/EditScreen';
import { getDataSelector } from '@app/store/user/login/selector';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from '@app/screens/Themed';
import { Button } from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';


export interface AddBrand {
    brand_name: string;
    own_brand: boolean;
}

export default function BrandScreen() {
  const [brands, setBrands] = useState([]);
  const user = useSelector(getDataSelector);
  const [isPending, setIsPending] = useState<Boolean>(false);
  const [form, setForm] = useState<AddBrand>(()=>({
      own_brand: false,
      brand_name: ''
  }));
  
  const handleSubmit = async () => {
    // let data = form;
    // console.log(user);
    setIsPending(true);
    let data = form;
    data['user_id'] = user?.id;
    try{
        await axios.post('/brands/shopkeeper/insert_brands', data);
        setForm(()=>({
            own_brand: false,
            brand_name: ''
        }))
        Alert.alert(
            "Success",
            "Brand is added successfully"
          );
    }catch(e: any){
        console.log(e);
    }
    setIsPending(false);

    // axios.post('/brands/shopkeeper/insert_brands',form)
    // .then(res=>{console.log(res)
    // }).catch((e: any)=>{console.log(e.message)});
    // console.log(form);
  } 
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Brands</Text>
        <Text style={styles.titleSignText}>Fill required information for add new brand.</Text>
      </View>
      <View style={styles.fieldsView}>
        <View style={styles.inputFieldsMainView}>
          <Text style={styles.labelText}>Brand Name</Text>
          <View style={styles.inputFieldSubView}
          >
            {/* <FontAwesome
              name="user"
              size={24}
              style={{ paddingTop: '3%', paddingHorizontal: '3%' }}
            /> */}
            <TextInputNative
              placeholder="Enter Brand Name"
              style={{ width: '85%', paddingLeft: '5%' }}
              maxLength={15}
              onChangeText={(text:string)=>{setForm(()=>({...form, brand_name: text}))}}
              value={form.brand_name}
            />
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={form.own_brand}
            onValueChange={(value: boolean)=>{setForm(()=>({...form, own_brand: value}))}}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Own Brand</Text>
        </View>
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
              icon={() => (
                <Ionicons name="add" size={20} color="white" />
              )}
              mode="contained"
              onPress={handleSubmit}
            >
              <Text style={styles.loginButtonText}>Add Brand</Text>
            </Button>
          )}
        </View>
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
  });
