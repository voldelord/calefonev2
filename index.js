import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {calculateDistance} from './src/helpers/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {SETTINGS} from './src/constants/settings';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

let watchId;

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
    if (typeof watchId !== 'undefined') {
      Geolocation.clearWatch(watchId);
    }

    await notifee.stopForegroundService();
  }
});

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    watchId = Geolocation.watchPosition(
      async position => {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };

        const distance = calculateDistance(
          location,
          notification.data.homeLocation,
        ).meters;

        const notificationBody =
          distance > SETTINGS.maxDistanceFromHomeInMeters
            ? `Estás fuera del hogar (a ${Math.round(distance)}m)`
            : 'Estás dentro del hogar';

        await notifee.displayNotification({
          id: notification.id,
          title: notification.title,
          body: notificationBody,
          data: {
            ...notification.data,
          },
          android: {
            ...notification.android,
          },
        });
      },
      async error => {
        console.error('watchPosition error + ', error.message);
        await notifee.stopForegroundService();
      },
      {enableHighAccuracy: true},
    );

    notifee.onForegroundEvent(async ({type, detail}) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
        if (typeof watchId !== 'undefined') {
          Geolocation.clearWatch(watchId);
        }

        await notifee.stopForegroundService();
      }
    });
  });
});

AppRegistry.registerComponent(appName, () => App);
