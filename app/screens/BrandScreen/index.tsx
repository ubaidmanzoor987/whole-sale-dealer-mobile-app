import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import EditScreenInfo from '@app/screens/EditScreen';
import { Text, View } from '@app/screens/Themed';
import { getDataSelector } from '@app/store/user/login/selector';

export default function BrandScreen() {
  const [brands, setBrands] = useState([]);
  const user = useSelector(getDataSelector);
  useSelector
  useEffect(()=>{
    console.log(user, "user");
    
    axios.post('/brands/shopkeeper/list_brands',{
      user_id: user?.shopkeeper_id
    })
    .then(res=>{
      console.log(res);
    })
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brand Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>sdasdasd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
