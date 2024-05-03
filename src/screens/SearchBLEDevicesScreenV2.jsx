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
import BLEDevice from '../components/ble-devices/BLEDevice';
import useBLEDevices from '../hooks/useBLEDevices';
import WifiListModal from '../components/ble-devices/WifiListModal';
import useDisclosure from '../hooks/useDisclosure';
import WifiPasswordModal from '../components/ble-devices/WifiPasswordModal';
import {createController} from '../API/controllers';
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

  const {
    devices,
    devicesIsLoading,
    devicesIsError,
    deviceRefetch,
    selectedDevice,
    setSelectedDevice,
    wifiNetworks,
    wifiNetworksIsLoading,
    selectedWifiNetwork,
    setSelectedWifiNetwork,
    connectDevice,
    provisionEsp,
  } = useBLEDevices({onDeviceSelected: wifiModalOnOpen});

  const handleDevicePress = async device => {
    setSelectedDevice(device);
    connectDevice(device);
  };

  const handleWifiPress = wifiNetwork => {
    setSelectedWifiNetwork(wifiNetwork);
    wifiModalOnClose();
  };

  const handlePasswordModalBackPress = () => {
    setSelectedWifiNetwork(null);
    passwordModalOnClose();
  };

  const handlePasswordSubmit = (values, helpers) => {
    if (!selectedDevice || !selectedWifiNetwork) {
      return;
    }

    provisionEsp(
      {
        device: selectedDevice,
        ssid: selectedWifiNetwork.ssid,
        password: values.password,
        createController: deviceId =>
          createController({
            id: uuid(),
            description: values.name,
            deviceId,
            environmentId,
          }),
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
          if (error.message === 'Provisioning Failed') {
            passwordModalOnClose();
            wifiModalOnClose();

            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Dispositivos',
              textBody: 'Panel calefactor apareado!',
            });

            navigation.goBack();
          }
        },
      },
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

            {devicesIsError || devices.length === 0 ? (
              <Text style={styles.loadingText}>
                No se encontraron dispositivos
              </Text>
            ) : (
              devices?.map((device, i) => (
                <BLEDevice
                  key={device.name}
                  device={device}
                  noBorder={i === devices.length - 1}
                  onPress={() => handleDevicePress(device)}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>

      <WifiListModal
        isOpen={wifiModalIsOpen}
        wifiNetworks={wifiNetworks ?? []}
        onBackPress={wifiModalOnClose}
        onWifiPress={wifi => handleWifiPress(wifi)}
        isLoading={wifiNetworksIsLoading}
        onModalHide={() => {
          if (selectedWifiNetwork) {
            passwordModalOnOpen();
          }
        }}
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
