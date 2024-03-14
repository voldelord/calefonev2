import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {v4 as uuid} from 'uuid';
import SectionTitle from '../components/typography/SectionTitle';
import Header from '../components/layout/Header';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import BLEDevice from '../components/ble-devices/BLEDevice';
import useBLEDevices from '../hooks/useBLEDevices';
import {useEffect} from 'react';
import WifiListModal from '../components/ble-devices/WifiListModal';
import useDisclosure from '../hooks/useDisclosure';
import WifiPasswordModal from '../components/ble-devices/WifiPasswordModal';
import {useMutation} from 'react-query';
import {createController} from '../API/controllers';
import {provisionDevice, sendServerDataToDevice} from '../helpers/BLEDevices';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const SearchBLEDevicesScreenV2 = ({navigation, route}) => {
  const environmentId = route.params.environmentId;

  const {
    isOpen: wifiModalIsOpen,
    onOpen: wifiModalOnOpen,
    onClose: wifiModalOnClose,
  } = useDisclosure();

  const {
    isOpen: passwordModalIsOpen,
    onOpen: passwordModalOnOpen,
    onClose: passwordModalOnClose,
  } = useDisclosure();

  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);

  const {
    devices,
    devicesIsLoading,
    deviceRefetch,
    selectedDevice,
    setSelectedDevice,
    wifiNetworks,
    wifiNetworksIsLoading,
    selectedWifiNetwork,
    setSelectedWifiNetwork,
  } = useBLEDevices();

  const {mutateAsync} = useMutation(
    async (device, ssid, password) => {
      try {
        setIsLoading(true);

        const deviceId = await sendServerDataToDevice(device);

        await createController({
          id: uuid(),
          description: device.name,
          deviceId,
          environmentId,
        });

        provisionDevice(device, ssid, password);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    {
      onSuccess: () => {
        passwordModalOnClose();
        wifiModalOnClose();

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Dispositivos',
          textBody: 'Panel calefactor apareado!',
        });

        navigation.goBack();
      },
      onError: error => {
        console.log(error?.response?.data || error.message);
      },
    },
  );

  useEffect(() => {
    setIsLoading(wifiNetworksIsLoading);
  }, [wifiNetworksIsLoading]);

  const handleDevicePress = device => {
    setSelectedDevice(device);
    wifiModalOnOpen();
  };

  const handleWifiPress = wifiNetwork => {
    setSelectedWifiNetwork(wifiNetwork);
    wifiModalOnClose();
    passwordModalOnOpen();
  };

  const handlePasswordModalBackPress = () => {
    setSelectedWifiNetwork(null);
    passwordModalOnClose();
    wifiModalOnOpen();
  };

  const handlePasswordSubmit = async (values, helpers) => {
    if (!selectedDevice) {
      return;
    }

    await mutateAsync(
      selectedDevice,
      selectedWifiNetwork.ssid,
      values.password,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={devicesIsLoading}
            onRefresh={deviceRefetch}
          />
        }>
        {devicesIsLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Buscando dispositivos...</Text>
          </View>
        ) : (
          <View>
            <SectionTitle text={'Dispositivos'} style={{marginBottom: 10}} />

            {devices?.map((device, i) => (
              <BLEDevice
                key={device.name}
                device={device}
                noBorder={i === devices.length - 1}
                onPress={() => handleDevicePress(device)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <WifiListModal
        isOpen={wifiModalIsOpen}
        wifiNetworks={wifiNetworks ?? []}
        onBackPress={wifiModalOnClose}
        onWifiPress={wifi => handleWifiPress(wifi)}
      />

      <WifiPasswordModal
        isOpen={passwordModalIsOpen}
        ssid={selectedWifiNetwork?.ssid ?? 'No wifi selected'}
        onBackPress={handlePasswordModalBackPress}
        onSubmit={handlePasswordSubmit}
      />
    </SafeAreaView>
  );
};

export default SearchBLEDevicesScreenV2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  loadingContainer: {paddingVertical: 25, marginTop: 60},
  loadingText: {fontSize: 18, fontStyle: 'italic', textAlign: 'center'},
});
