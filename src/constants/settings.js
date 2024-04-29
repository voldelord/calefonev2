import {HOST_IP, API_URL, MQTT_HOST} from '@env';

export const SETTINGS = Object.freeze({
  hostIp: HOST_IP,
  apiUrl: API_URL,
  mqttOptions: {
    host: MQTT_HOST,
    port: 8884,
    path: '/ws',
  },
  maxDistanceFromHomeInMeters: 50,
});
