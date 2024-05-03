import {axios} from '../helpers/createAxios';

export const getDeviceSchedules = async (deviceId: string) => {
  const res = await axios.get(`/v1/devices/${deviceId}/device-schedules`);

  return res.data;
};

export const createDeviceSchedule = async (data: {
  id: string;
  startTime: string;
  endTime: string;
  recurrence: number[];
  deviceId: string;
}) => {
  await axios.post('/v1/device-schedules', data);
};

export const deleteDeviceSchedule = async (scheduleId: string) => {
  await axios.delete(`/v1/device-schedules/${scheduleId}`);
};
