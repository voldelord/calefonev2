import notifee from '@notifee/react-native';
import {requestLocationPermission} from './permissions';
import {calculateDistance, getCurrentPosition} from './geolocation';
import {SETTINGS} from '../constants/settings';
import {v4 as uuid} from 'uuid';

let channelId: string;

export async function startMonitoring(homeLocation: {
  lat: number;
  long: number;
}) {
  await notifee.requestPermission();

  const isLocationAllowed = await requestLocationPermission();

  if (!isLocationAllowed) {
    return;
  }

  if (!channelId) {
    channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  }

  const position = await getCurrentPosition();

  const location = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  };

  const distance = calculateDistance(location, homeLocation).meters;

  const notificationBody =
    distance > SETTINGS.maxDistanceFromHomeInMeters
      ? `Estás fuera del hogar (a ${Math.round(distance)}m)`
      : 'Estás dentro del hogar';

  await notifee.displayNotification({
    id: uuid(),
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
    data: {
      homeLocation,
    },
  });
}
