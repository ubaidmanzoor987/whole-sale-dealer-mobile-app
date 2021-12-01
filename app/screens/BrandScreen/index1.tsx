import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput as TextInputNative,
  Alert,
  Button,
  CheckBox
} from 'react-native';
import Constants from 'expo-constants';
import { DataTable, Provider, Modal, Portal, Button as MaterialButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Text, View } from '@app/screens/Themed';
import { getDataSelector } from '@app/store/user/login/selector'

export default function BrandScreen() {
  const [brands, setBrands] = useState([]);

  const user = useSelector(getDataSelector);
  const [form , setForm] = useState(()=>({
    isShow: false,
    brand_name: '',
    own_brand: false,
    user_id: '',
    error:''
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
        <Text style={styles.titleWelcomeText}>Brands</Text>
        <Text style={styles.titleSignText}>List of all brands</Text>
      </View>
      <View style={styles.fieldsView}>
        <View style={styles.inputFieldsMainView}>
          {/* <Text style={styles.labelText}>Search</Text> */}
          <View
            style={{
              ...styles.inputFieldSubView,
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              style={{ paddingTop: '3%', paddingHorizontal: '3%' }}
            />
            <TextInputNative
              onChangeText={(e)=>console.log(e)}
              placeholder="Search by brand name"
              style={{ width: '85%' }}
              keyboardType="email-address"
              // maxLength={15}
            />
          </View>
        </View>
        <View style={{ width: '100%', height: 'auto', backgroundColor: '#fff', marginHorizontal: 'auto' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Brand Name</Text></DataTable.Title>
            <DataTable.Title><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Own Brand</Text></DataTable.Title>
            <DataTable.Title><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Action</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell><Text style={{ fontSize: 14 }}>Frozen yogurt</Text></DataTable.Cell>
            <DataTable.Cell><Text style={{ fontSize: 14 }}>Yes</Text></DataTable.Cell>
            <DataTable.Cell>
              <Button
                title="EDIT"
                onPress={()=>{setForm(()=>({...form, isShow: true}))}}
              />
              <Button
                title="DELETE"
                color="#dc3545"
                onPress={handleDelete}
              />
              {/* <Button mode="contained" onPress={()=>{Alert.alert('called')}} >
                EDIT
              </Button>
              <Button mode="contained" compact={true} onPress={()=>{Alert.alert('called')}}>
                DELETE
              </Button> */}
            </DataTable.Cell>
          </DataTable.Row>

        </DataTable>
        </View>
        {/* {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <></>
        )} */}
        {/* <View style={styles.loginButtonView}>
          {isPending ? (
            <ActivityIndicator
              size="large"
              color="#5460E0"
              style={styles.activitIndicator}
            />
          ) : (
            <Button
              style={styles.loginButton}
              mode="contained"
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Submit</Text>
            </Button>
          )}
        </View> */}
      </View>
      <Provider>
          <Portal>
            <Modal visible={form.isShow} onDismiss={()=>{setForm(()=>({...form, isShow: false}))}} style={{ width: '80%', backgroundColor: 'white', padding: 20, height: '50%' }}>
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
                      onChangeText={(text: string) => { setForm(() => ({ ...form, brand_name: text })) }}
                      value={form.brand_name}
                    />
                  </View>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={form.own_brand}
                    onValueChange={(value: boolean) => { setForm(() => ({ ...form, own_brand: value })) }}
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
                    <MaterialButton
                      style={styles.loginButton}
                      icon={() => (
                        <Ionicons name="add" size={20} color="white" />
                      )}
                      mode="contained"
                      onPress={handleSubmit}
                    >
                      <Text style={styles.loginButtonText}>Update Brand</Text>
                    </MaterialButton>
                  )}
                </View>
                <Text style={{ color: 'red', fontSize: 13 }}>
                    {form.error}
                </Text>
              </View>
            </Modal>
          </Portal>
        </Provider>
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
