import {
  ESPDevice,
  ESPWifiList,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {useMutation, useQuery} from 'react-query';
import requestLocationAndBLuetoothPermissions from '../helpers/requestLocationAndBLuetoothPermissions';
import {useState} from 'react';
import {findDevices} from '../helpers/BLEDevices';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import {SETTINGS} from '../constants/settings';
import {Platform} from 'react-native';

type UseBLEDevicesArgs = {
  onDeviceSelected?: () => void;
};

const useBLEDevices = ({onDeviceSelected}: UseBLEDevicesArgs = {}) => {
  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);
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
      if (Platform.OS === 'android') {
        await requestLocationAndBLuetoothPermissions();
      }

      return await findDevices();
    },
    {retry: false, cacheTime: 0},
  );

  const {mutate: connectDevice} = useMutation(
    async (device: ESPDevice) => {
      await device.connect('abcd1234', null, 'wifiprov');
    },
    {
      onSuccess: onDeviceSelected,
    },
  );

  const {mutate: provisionEsp} = useMutation(
    async ({
      device,
      ssid,
      password,
      createController,
    }: {
      device: ESPDevice;
      ssid: string;
      password: string;
      createController: (deviceId: string) => Promise<void>;
    }) => {
      const deviceId = (
        await device.sendData(
          'custom-data',
          JSON.stringify({
            mqttServer: `mqtts://${SETTINGS.mqttOptions.host}:8883`,
          }),
        )
      ).replaceAll('\0', '');

      await createController(deviceId);

      await device.provision(ssid, password);
    },
    {
      onMutate: () => setIsLoading(true),
      onSettled: () => {
        setIsLoading(false);
        selectedDevice?.disconnect();
      },
      onError: (error: any) => {
        console.log(error?.response?.data || error.message);
      },
    },
  );

  const {
    data: wifiNetworks,
    isError: wifiNetworksIsError,
    isLoading: wifiNetworksIsLoading,
  } = useQuery(['deviceWifiNetworks', selectedDevice], {
    queryFn: async () => {
      if (!selectedDevice) {
        throw new Error('No device selected');
      }

      return await selectedDevice.scanWifiList();
    },
    enabled: !!selectedDevice?.connected,
    retry: false,
  });

  return {
    selectedDevice,
    setSelectedDevice,
    devices,
    devicesIsLoading,
    devicesIsError,
    deviceRefetch,
    wifiNetworks,
    wifiNetworksIsError,
    wifiNetworksIsLoading,
    selectedWifiNetwork,
    setSelectedWifiNetwork,
    connectDevice,
    provisionEsp,
  };
};

export default useBLEDevices;
