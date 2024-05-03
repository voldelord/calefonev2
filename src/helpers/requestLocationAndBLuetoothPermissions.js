import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';

const requestLocationAndBLuetoothPermissions = async () => {
  try {
    const result = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]);

    return (
      result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED &&
      result[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED &&
      result[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED
    );
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default requestLocationAndBLuetoothPermissions;
