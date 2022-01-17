import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

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

interface Props {
  isLoading?: boolean;
}
export const EmptyContainer = ({ isLoading }: Props) => (
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
    {isLoading === true ? (
      <ActivityIndicator size="large" color="#27428B" />
    ) : (
      <>
        <MaterialCommunityIcons name="recycle-variant" size={50} />
        <Text>No Data to display</Text>
      </>
    )}
  </View>
);
