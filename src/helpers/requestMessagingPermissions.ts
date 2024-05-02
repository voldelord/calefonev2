import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

async function requestUserPermissionIOS() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

async function requestUserPermissionAndroid() {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  return result === RESULTS.GRANTED;
}

export async function requestUserPermission() {
  const cb =
    Platform.OS === 'android'
      ? requestUserPermissionAndroid
      : requestUserPermissionIOS;

  return await cb();
}
