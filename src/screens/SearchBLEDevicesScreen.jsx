import {
  ESPProvisionManager,
  ESPSecurity,
  ESPTransport,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';
import SectionTitle from '../components/typography/SectionTitle';
import {v4 as uuid} from 'uuid';
import Header from '../components/layout/Header';
import ReactNativeModal from 'react-native-modal';
import {COLORS} from '../constants/theme';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import useAxios from '../hooks/useAxios';
import { hostIp } from '../helpers/createAxios';

const requestPermissions = async () => {
  try {
    const result = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]);

    return (
      result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED &&
      result[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED &&
      result[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED
    );
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const SearchBLEDevicesScreen = ({navigation, route}) => {
  const environmentId = route.params.environmentId;

  const [loadingDevices, setLoadingDevices] = useState(true);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [wifiList, setWifiList] = useState([]);
  const [loadingWifiList, setLoadingWifiList] = useState(true);
  const [selectedWifi, setSelectedWifi] = useState(null);
  const [wifiPassword, setWifiPassword] = useState('');
  const [showWifiModal, setShowWifiModal] = useState(false);

  const [{loading: loadingCreateController}, createController] = useAxios(
    {
      method: 'POST',
      url: '/v1/controllers',
    },
    {manual: true},
  );

  const searchDevices = useCallback(async () => {
    const doSearch = async () => {
      setLoadingDevices(true);

      await requestPermissions();

      setDevices([]);

      try {
        const devices = await ESPProvisionManager.searchESPDevices(
          'PROV_',
          ESPTransport.ble,
          ESPSecurity.secure,
        );

        setDevices(devices);
      } finally {
        setLoadingDevices(false);
      }
    };

    doSearch();
  }, []);

  useEffect(() => {
    searchDevices();
  }, []);

  const handleDevicePressed = device => {
    setSelectedDevice(selectedDevice === device ? null : device);
  };

  const handleRegisterEspPress = async () => {
    if (!selectedDevice) {
      return;
    }

    await selectedDevice.connect('abcd1234', null, 'wifiprov');

    try {
      const deviceId = await selectedDevice.sendData(
        'custom-data',
        JSON.stringify({mqttServer: `${hostIp}:1883`}),
      );
      console.log({deviceId});

      await createController({
        data: {
          id: uuid(),
          description: selectedDevice.name,
          deviceId: deviceId.replaceAll('\0', ''),
          environmentId,
        },
      });

      Alert.alert("Calefon agregado");
    } catch (e) {
      console.error(e);
      console.error(e.response?.data);
    } finally {
      selectedDevice.disconnect();
    }
  };

  const handleScanWifiPressed = async () => {
    if (!selectedDevice) {
      return;
    }

    await selectedDevice.connect('abcd1234', null, 'wifiprov');

    try {
      setLoadingWifiList(true);
      setShowWifiModal(true);

      const wifiList = await selectedDevice.scanWifiList();

      setWifiList(wifiList);
      setLoadingWifiList(false);
    } catch (e) {
      console.error(e);
      // selectedDevice.disconnect();
    }
  };

  const handleWifiPasswordConfirmed = async () => {
    if (!selectedDevice) {
      setSelectedWifi(null);
      return;
    }

    try {
      // await selectedDevice.provision(selectedWifi.ssid, '2023apamateS');
      await selectedDevice.provision(selectedWifi.ssid, wifiPassword);
      Alert.alert("Credenciales enviadas");
    } catch (e) {
      console.error(e);
    } finally {
      selectedDevice.disconnect();
      setSelectedWifi(null);
      setShowWifiModal(false);
      setWifiPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loadingDevices}
            onRefresh={searchDevices}
          />
        }>
        {loadingDevices ? (
          <View style={{paddingVertical: 25}}>
            <Text
              style={{fontSize: 18, fontStyle: 'italic', textAlign: 'center'}}>
              Buscando dispositivos...
            </Text>
          </View>
        ) : (
          <View>
            <SectionTitle text={'Dispositivos'} style={{marginBottom: 10}} />

            {devices.map((device, i) => (
              <View
                key={device.name}
                style={[
                  styles.device,
                  {borderBottomWidth: i === devices.length - 1 ? 0 : 1},
                ]}>
                {selectedDevice === device ? (
                  <>
                    <TouchableOpacity
                      style={[styles.deviceOptionBtn, {marginRight: 5}]}
                      onPress={handleScanWifiPressed}>
                      <Text>Escanear WIFI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deviceOptionBtn}
                      onPress={handleRegisterEspPress}>
                      <Text>Registrar calefon</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Ionicons
                      name="hardware-chip-outline"
                      style={styles.deviceIcon}
                    />
                    <Text style={styles.deviceText}>{device.name}</Text>
                  </>
                )}
                <TouchableOpacity
                  onPress={() => handleDevicePressed(device)}
                  style={{marginLeft: 'auto'}}>
                  <Ionicons
                    name={
                      selectedDevice === device
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    style={[styles.deviceIcon, {marginRight: 0}]}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <ReactNativeModal isVisible={showWifiModal} style={{margin: 0}}>
        <View style={{backgroundColor: COLORS.white, flex: 1}}>
          <Header
            onBackPress={() => setShowWifiModal(false)}
            hideNotificationIcon
            title="Redes WIFI"
          />

          {loadingWifiList ? (
            <View style={{paddingVertical: 25}}>
              <Text
                style={{
                  fontSize: 18,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}>
                Buscando redes WIFI...
              </Text>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={{marginVertical: 5}}>Seleccione una red WIFI</Text>

              <ScrollView>
                {wifiList.map((wifi, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.device}
                    onPress={() => setSelectedWifi(wifi)}>
                    <Ionicons name="wifi" style={styles.deviceIcon} />
                    <Text style={styles.deviceText}>{wifi.ssid}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={!!selectedWifi} style={{margin: 0}}>
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
          }}>
          <Header
            onBackPress={() => setSelectedWifi(null)}
            hideNotificationIcon
            title="Contraseña del WIFI"
          />
          <View style={styles.content}>
            <View
              style={{flexDirection: 'row', marginBottom: 10, marginTop: 40}}>
              <Text>Ingrese la contraseña para</Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}>
                {selectedWifi?.ssid}
              </Text>
            </View>
            <InputField
              label={'Contraseña'}
              name="password"
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              inputType="password"
              value={wifiPassword}
              onChange={e => setWifiPassword(e.target.value)}
            />

            <CustomButton
              label="Aceptar"
              onPress={handleWifiPasswordConfirmed}
              buttonColor="#DA215D"
              textColor="white"
              width={'100%'}
              height={50}
            />
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default SearchBLEDevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#ededed',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowOpacity: 50,
  },
  parraph: {
    fontWeight: 'bold',
  },
  myhouse: {
    backgroundColor: '#DA215D',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  myparraph: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  device: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#ddd',
  },
  deviceIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  deviceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceOptionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
