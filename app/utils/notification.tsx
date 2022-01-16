import { expoPushToken } from './apis';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ExpoNotification() {
  const user = useSelector(getUserSelector);

  const [Token, setToken] = useState('');
  const [notification, setNotification] = useState<any>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  useEffect(() => {
    if (user && user.id && Token === '') {
      registerForPushNotificationsAsync().then(async (token) => {
        setToken(token);
        const res = await expoPushToken({
          expo_push_token: token,
          user_id: user.id,
        });
      });
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
          // TODO What we have to withthe notification
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [user, Token]);

  return null;
}

async function registerForPushNotificationsAsync() {
  let token;
  if (true) {
    //Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Must use physical device for Expo Push Notifications!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
