import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSwitch from 'react-native-custom-switch-new';
import changeModeIcon from '../assets/change-mode-icon.png';
import crownIcon from '../assets/crown-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import {useFocusEffect} from '@react-navigation/native';
import {hostIp} from '../helpers/createAxios';
import {useAuth} from '../context/AuthContext';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const options = {
  host: hostIp,
  port: 8883,
  path: '/ws',
};

const TemperatureScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;
  const {token} = useAuth();
  const client = useRef(null);
  const [temperature, setTemperature] = useState(0);
  const [targetTemperature, setTargetTemperature] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useFocusEffect(
    useCallback(() => {
      client.current = new Paho.MQTT.Client(
        options.host,
        options.port,
        options.path,
        token,
      );

      client.current.onConnectionLost = function (responseObject) {
        console.log('onConnectionLost');
        console.log(responseObject.errorMessage);
        setIsConnected(false);
      };
      client.current.onMessageArrived = function (message) {
        console.log('onMessageArrived');
        const parsedMessage = JSON.parse(message.payloadString);
        console.log(parsedMessage);
        setTemperature(parsedMessage.value);
      };

      client.current.connect({
        onSuccess: function (...args) {
          console.log('onSuccess');
          console.log(...args);
          client.current.subscribe(`${deviceId}/temperature`, {qos: 0});
          setIsConnected(true);
        },
        userName: deviceId,
        useSSL: false,
        timeout: 3,
        onFailure: function (...args) {
          console.log('onFailure');
          console.log(...args);
        },
      });

      () => {
        client.current?.disconnect();
      };
    }, [deviceId, token]),
  );

  // useEffect(() => {
  //   if (isConnected) {
  //     client.current?.send(`${deviceId}/target_temperature`, JSON.stringify({value: targetTemperature}));
  //   }
  // }, [targetTemperature, client.current, isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <SectionTitle text={deviceName} style={{marginBottom: 10}} />

        <RangeSlider
          value={targetTemperature}
          title="MODO TEMPERATURA"
          subTitleValue={temperature}
          subTitle={'Temperatura actual:'}
          unit="C°"
          onChange={e => setTargetTemperature(e.target.value)}
        />

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: COLORS.black, marginBottom: 10}}>
            Calefón apagado
          </Text>
          <CustomSwitch
            buttonPadding={7}
            buttonWidth={28}
            switchWidth={80}
            switchBackgroundColor={'#DDD'}
            onSwitchBackgroundColor={COLORS.primary}
          />
        </View>

        <View style={{marginTop: 'auto', marginBottom: 30}}>
          <ModeButton
            small
            icon={changeModeIcon}
            title={'Cambiar de modo'}
            style={{marginBottom: 15}}
            onPress={() => navigation.navigate('ModesScreen')}
          />
          <ModeButton
            small
            icon={crownIcon}
            title={'Desbloquear programar horario'}
            withGradient
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default TemperatureScreen;
