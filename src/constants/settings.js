const HOST_IP = '192.168.1.116';
// const HOST_IP = '54.207.97.89';

export const SETTINGS = Object.freeze({
  hostIp: HOST_IP,
  apiUrl: `http://${HOST_IP}:3000/api`,
  mqttOptions: {
    host: HOST_IP,
    port: 8883,
    path: '/ws',
  },
  maxDistanceFromHomeInMeters: 50,
});
