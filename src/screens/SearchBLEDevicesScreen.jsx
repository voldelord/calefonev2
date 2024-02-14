import {
  ESPProvisionManager,
  ESPSecurity,
  ESPTransport,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import ReactNativeModal from 'react-native-modal';
import {COLORS} from '../constants/theme';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import useAxios from '../hooks/useAxios';

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
    }

    doSearch();
  }, []);

  useEffect(() => {
    searchDevices();
  }, []);

  const handleDevicePressed = async device => {
    await device.connect('abcd1234');

    try {
      setLoadingWifiList(true);
      setSelectedDevice(device);

      const wifiList = await device.scanWifiList();

      setWifiList(wifiList);
      setLoadingWifiList(false);
    } catch (e) {
      console.error(e);
      device.disconnect();
    }
  };

  const handleWifiPasswordConfirmed = async () => {
    if (!selectedDevice) {
      setSelectedWifi(null);
      return;
    }

    try {
      await selectedDevice.provision(selectedWifi.ssid, "2023apamateS");
      // await selectedDevice.provision(selectedWifi.ssid, wifiPassword);

      const espResponse = JSON.parse(
        await selectedDevice.sendData(
          'custom-data',
          JSON.stringify({mqttServer: 'test.com'}),
        ),
      );

      console.log(espResponse);
    } catch (e) {
      console.error(e);
    } finally {
      selectedDevice.disconnect();
      setSelectedWifi(null);
      setSelectedDevice(null);
      setWifiPassword("");
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

            {devices.map(device => (
              <TouchableOpacity
                key={device.name}
                onPress={() => handleDevicePressed(device)}
                style={styles.device}>
                <Ionicons
                  name="hardware-chip-outline"
                  style={styles.deviceIcon}
                />
                <Text style={styles.deviceText}>{device.name}</Text>
                <Entypo name="chevron-small-right" style={styles.deviceIcon} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <ReactNativeModal isVisible={!!selectedDevice} style={{margin: 0}}>
        <View style={{backgroundColor: COLORS.white, flex: 1}}>
          <Header
            onBackPress={() => setSelectedDevice(null)}
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
    paddingVertical: 5,
  },
  deviceIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  deviceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
