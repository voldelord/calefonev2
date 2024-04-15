import {axios} from '../helpers/createAxios';

export const getHomes = async ({
  params,
}: {params?: Record<string, any>} = {}) => {
  const res = await axios.get('/v1/homes', {
    params,
  });

  return res.data;
};

export const getMainHome = async (userId: string) => {
  const {homes} = await getHomes({
    params: {
      filters: [
        {field: 'customerId', operator: '=', value: userId},
        {field: 'isMain', operator: '=', value: 1},
      ],
      limit: 1,
    },
  });

  return homes[0] ?? null;
};
