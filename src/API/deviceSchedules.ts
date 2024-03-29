import {axios} from '../helpers/createAxios';

export const deviceSchedules = async (deviceId: string) => {
  const res = await axios.get(`/v1/devices/${deviceId}/device-schedules`);

  return res.data;
};
