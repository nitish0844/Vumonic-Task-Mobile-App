import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import ShowAlert from '../ShowAlert';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  let authStatus;
  if (Platform.OS == 'android') {
    authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else {
    authStatus = await messaging().requestPermission();
  }
  // const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
    authStatus === 'granted';

  if (enabled) {
    console.log('Authorization status:enable', authStatus);
    getFcmToken();
  } else {
    console.log('Authorization status:unenable', authStatus);
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('the old token:', fcmToken);
    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('new fcm token', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
          // dispatch(getdeviceTokenRequest());
        }
      } catch (error) {
        console.log('fcm token error', error);
        ShowAlert(error.message);
      }
    } else {
      if (fcmToken) {
        // dispatch(getdeviceTokenRequest());
      }
    }
  } catch (error) {
    console.log('====================================');
    console.log('fcm issue', error);
    console.log('====================================');
  }
};
