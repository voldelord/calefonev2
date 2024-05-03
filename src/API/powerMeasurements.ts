import {axios} from '../helpers/createAxios';

export const getPowerMeasurements = async (deviceId: string) => {
  const res = await axios.get(`/v1/measurements/${deviceId}/power`);

  return res.data;
};
