import {
  ESPDevice,
  ESPWifiList,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {useQuery} from 'react-query';
import requestLocationAndBLuetoothPermissions from '../helpers/requestLocationAndBLuetoothPermissions';
import {useState} from 'react';
import {findDevices, getWifiListForDevice} from '../helpers/BLEDevices';

const useBLEDevices = () => {
  const [selectedDevice, setSelectedDevice] = useState<ESPDevice | null>(null);
  const [selectedWifiNetwork, setSelectedWifiNetwork] =
    useState<ESPWifiList | null>(null);

  const {
    data: devices,
    isLoading: devicesIsLoading,
    isError: devicesIsError,
    refetch: deviceRefetch,
  } = useQuery(
    'devices',
    async () => {
      await requestLocationAndBLuetoothPermissions();

      return await findDevices();
    },
    {retry: false},
  );

  const {
    data: wifiNetworks,
    isLoading: wifiNetworksIsLoading,
    isError: wifiNetworksIsError,
  } = useQuery(['deviceWifiNetworks', selectedDevice], {
    queryFn: async () => {
      if (!selectedDevice) {
        return [];
      }

      return await getWifiListForDevice(selectedDevice);
    },
    enabled: !!selectedDevice,
  });

  return {
    selectedDevice,
    setSelectedDevice,
    devices,
    devicesIsLoading,
    devicesIsError,
    deviceRefetch,
    wifiNetworks,
    wifiNetworksIsLoading,
    wifiNetworksIsError,
    selectedWifiNetwork,
    setSelectedWifiNetwork,
  };
};

export default useBLEDevices;
