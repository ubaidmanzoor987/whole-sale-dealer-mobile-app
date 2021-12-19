import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userAutoLogin} from '@app/store/user/login/actions'

import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// store.subscribe(()=>{
//     console.log(store.getState(), 'current state');
// });

// Run the saga
sagaMiddleware.run(rootSaga);

// const getAsyncStorage = () => {
//     return (dispatch)=>{
//         AsyncStorage.getItem('user')
//         .then(res=>{
//             if(res){
//                 let user = JSON.parse(res);
//                 dispatch(userAutoLogin(user));
//             }
//         })
//     }
// }
// store.dispatch(getAsyncStorage());
// AsyncStorage.getItem('user')
// .then(res=>{
//     if(res){
//         let user = JSON.parse(res) as any;
//         console.log('store disatch', user);
        
//         store.dispatch(userAutoLogin(user))
//     }
// })
export default store;
