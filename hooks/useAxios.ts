import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV_VAR } from '@app/utils/environments';
import { IUser } from '@app/store/user/login/types';


const instance = axios.create({
    baseURL: ENV_VAR.baseUrl,
  });

  instance.interceptors.request.use(async function (config) {

    const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
    let user = {} as IUser;
    if(jsonValue !== ''){
        user = JSON.parse(jsonValue);
        config.headers['x-access-tokens'] = user?.token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export default instance;







