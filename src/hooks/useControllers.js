import {useEffect, useState} from 'react';
import useAxios from './useAxios';

const useControllers = ({params} = {}) => {
  const [controllers, setControllers] = useState([]);

  const [{data, loading}, getControllers] = useAxios({
    method: 'GET',
    url: '/v1/controllers',
    params
  }, {manual: true});

  useEffect(() => {
    if (data) {
      setControllers(data.items);
    }
  }, [data]);

  return {
    controllers,
    loading,
    getControllers,
  };
};

export default useControllers;
