import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV_VAR } from '@app/utils/environments';


const instance = axios.create({
    baseURL: ENV_VAR.baseUrl,
  });

  instance.interceptors.request.use(async function (config) {

    // console.log(config);
    
    const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
    let user = null;
    if(jsonValue){
        user = JSON.parse(jsonValue);
    }
    // let user = "123";
    console.log(user, 'lkjljljl');
    
    // if(user != ''){
    //     config.headers['x-access-tokens'] = user.token;
    // }
   
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export default instance;







