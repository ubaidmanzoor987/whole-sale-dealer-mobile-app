import React from 'react';
import { Text, View } from 'react-native';

export function Config() {
  const ENV_NAME = 'development' as 'development' | 'production';
  if (ENV_NAME === 'production') {
    return {
      clientId:
        '984919890336-1e2982lmg8faeha9h63d17t4utlon121.apps.googleusercontent.com',
      baseUrl: 'http://192.168.1.13:5000/api/',
    };
  } else {
    return {
      clientId:
        '984919890336-jjfhq7oceu2qlhir0l5mdrhodj79386v.apps.googleusercontent.com',
      baseUrl: 'http://192.168.1.13:5000/api/',
    };
  }
}

export const EmptyContainer = () => (
  <View
    style={{
      borderWidth: 0.5,
      borderRadius: 10,
      marginHorizontal: '1%',
      marginVertical: '5%',
      height: 500,
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text>Ooops! No Data to Display.</Text>
  </View>
);
