import React, { useEffect } from 'react';
import { View, Text, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Constants } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageResult } from 'expo-image-manipulator';

interface Props {
  openModal: boolean;
  setSelectedImage: any;
  closeModal: any;
}

export default function MediaScreen({
  setSelectedImage,
  openModal,
  closeModal,
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const askForPermission = async () => {
    const permissionResult = await Camera.requestCameraPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 'ok');
      return false;
    }
    return true;
  };

  useEffect(() => {
    setVisible(openModal);
  }, [openModal]);

  const getImageFromCamera = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
  };

  const getImageFromGallery = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      const galleryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });
      if (!galleryImage.cancelled) {
        processImage(galleryImage.uri);
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
  };

  const processImage = async (imageUri) => {
    try {
      let processedImage = (await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 400 } }],
        { format: 'jpeg' as any, base64: true }
      )) as ImageResult;
      // setSelectedImage(`data:image/jpeg;base64,${processedImage.base64}`);
      setSelectedImage(processedImage);
      hideModal();
    } catch (ex) {
      console.log('Exception in processImage', ex);
    }
  };

  const hideModal = () => {
    setVisible(false);
    closeModal(false);
  };

  return (
    <Modal
      isVisible={visible}
      onDismiss={hideModal}
      style={{
        backgroundColor: 'lightgrey',
        marginVertical: '70%',
      }}
      animationIn="slideInUp"
      onBackdropPress={hideModal}
    >
      <TouchableOpacity
        onPress={hideModal}
        style={{ width: '100%', alignItems: 'flex-end' }}
      >
        <MaterialCommunityIcons name="close" size={20} />
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={getImageFromCamera}
          style={{
            width: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons name="camera" size={60} />
          <Text style={{ textAlign: 'center' }}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getImageFromGallery}
          style={{
            width: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons name="image-edit" size={60} />
          <Text style={{ textAlign: 'center' }}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
