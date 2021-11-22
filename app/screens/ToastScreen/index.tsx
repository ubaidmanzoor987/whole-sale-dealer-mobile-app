import React from 'react';
import SnackBar from 'react-native-snackbar-component';

interface Props {
  message?: string;
}

export default function ToastScreen(props: Props) {
  return (
    <SnackBar
      visible={true}
      textMessage={props.message}
      autoHidingTime={2}
    />
  );
}
