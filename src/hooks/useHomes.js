import {useEffect, useState} from 'react';
import useAxios from './useAxios';

const useHomes = () => {
  const [homes, setHomes] = useState([]);

  const [{data, loading}, getHomes] = useAxios('/v1/homes', {manual: true});

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
