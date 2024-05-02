import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const requestLocationPermissionAndroid = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    return result === RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
};

async function requestLocationPermissionIOS() {
  const result = await Geolocation.requestAuthorization('always');

  return result === 'granted';
}

export async function requestLocationPermission() {
  const cb =
    Platform.OS === 'android'
      ? requestLocationPermissionAndroid
      : requestLocationPermissionIOS;

  return await cb();
}

export const requestBackgroundLocationPermission = async () => {
  try {
    const result = await request(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    );

    return result === RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
};
