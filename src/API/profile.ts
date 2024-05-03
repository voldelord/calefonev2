import {axios} from '../helpers/createAxios';

export const createProfile = async (data: {
  id: string;
  fullName: string;
  nickName: string;
  birthDate: Date;
  phoneNumber: string;
}) => {
  await axios.post('/v1/auth/customer-profiles', data);
};

export const createMeasurementConfig = async (data: {
  id: string;
  maxKWHPerMonth: number;
  maxArsPerMonth: number;
}) => {
  await axios.post('/v1/profile/measurement-config', data);
};
