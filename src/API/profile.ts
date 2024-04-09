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
