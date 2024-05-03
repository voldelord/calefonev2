import {useEffect, useState} from 'react';
import useAxios from './useAxios';

const useHomes = ({params} = {}) => {
  const [homes, setHomes] = useState([]);

  const [{data, loading}, getHomes] = useAxios(
    {
      url: '/v1/homes',
      params,
    },
    {manual: true},
  );

  useEffect(() => {
    if (data) {
      setHomes(data.homes);
    }
  }, [data]);

  return {
    homes,
    loading,
    getHomes,
  };
};

export default useHomes;
