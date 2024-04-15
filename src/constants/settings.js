import {HOST_IP, API_URL} from '@env';

export const SETTINGS = Object.freeze({
  hostIp: HOST_IP,
  apiUrl: API_URL,
  mqttOptions: {
    host: HOST_IP,
    port: 8883,
    path: '/ws',
  },
  maxDistanceFromHomeInMeters: 50,
});
