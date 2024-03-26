const HOST_IP = '192.168.1.116';
// const BASE_HOST = '54.207.97.89';

export const SETTINGS = Object.freeze({
  hostIp: HOST_IP,
  apiUrl: `http://${HOST_IP}:3000/api`,
  mqttOptions: {
    host: HOST_IP,
    port: 8883,
    path: '/ws',
  },
});
