import {createContext, useEffect, useRef} from 'react';
import {requestLocationPermission} from '../helpers/permissions';
import notifee from '@notifee/react-native';
import {SETTINGS} from '../constants/settings';
import {calculateDistance, getCurrentPosition} from '../helpers/geolocation';
import {v4} from 'uuid';
import {showConfirmationAlert} from '../helpers/alerts';

const GeolocationContext = createContext(null);

const HOME_LOCATION = {lat: 37.3595, long: -121.9141};

export const GeolocationProvider = ({children}) => {
  async function startMonitoring() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const isLocationAllowed = await requestLocationPermission();

    if (!isLocationAllowed) {
      return;
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const position = await getCurrentPosition();

    const location = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    const distance = calculateDistance(location, HOME_LOCATION).meters;

    const notificationBody =
      distance > SETTINGS.maxDistanceFromHomeInMeters
        ? `Estás fuera del hogar (a ${Math.round(distance)}m)`
        : 'Estás dentro del hogar';

    // Display a notification
    await notifee.displayNotification({
      id: v4(),
      title: 'Monitoreo de ubicación.',
      body: notificationBody,
      android: {
        channelId,
        asForegroundService: true,
        actions: [
          {
            title: 'Detener',
            pressAction: {
              id: 'stop',
            },
          },
        ],
      },
    });
  }

  useEffect(() => {
    showConfirmationAlert({
      title: 'Monitoreo de ubicación.',
      message: '¿Deseas que se le notifique cuando salga del hogar?',
      okButtonPress: startMonitoring,
    });
  }, []);

  return (
    <GeolocationContext.Provider value={null}>
      {children}
    </GeolocationContext.Provider>
  );
};
