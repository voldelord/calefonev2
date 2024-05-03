import {useEffect, useState} from 'react';
import useAxios from './useAxios';

const useHomeEnvironments = ({homeId}) => {
  const [environments, setEnvironments] = useState([]);

  const [{data, loading}, getEnvironments] = useAxios(
    `/v1/homes/${homeId}/environments`,
    {manual: true},
  );

  useEffect(() => {
    if (data) {
      setEnvironments(data.items);
    }
  }, [data]);

  return {
    environments,
    loading,
    getEnvironments,
  };
};

export default useHomeEnvironments;
