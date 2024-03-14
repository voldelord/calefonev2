import {axios} from '../helpers/createAxios';

export const createController = async (data: {
  id: string;
  description: string;
  deviceId: string;
  environmentId: string;
}) => {
  await axios.post('/v1/controllers', data);
};
