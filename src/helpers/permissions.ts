import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    return result === RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
};

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
