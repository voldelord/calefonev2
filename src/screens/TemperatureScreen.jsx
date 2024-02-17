import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSwitch from 'react-native-custom-switch-new';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import {useFocusEffect} from '@react-navigation/native';
import {hostIp} from '../helpers/createAxios';
import {useAuth} from '../context/AuthContext';
import RangeSlider from '../components/forms/RangeSlider';

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
          subTitleValue={temperature}
          onChange={e => setTargetTemperature(e.target.value)}
        />

        <View style={{alignItems: 'center', marginTop: 40}}>
          <Text style={{fontSize: 18, color: COLORS.black, marginBottom: 10}}>
            Calefón apagado
          </Text>
          {/* <Switch
            trackColor={{false: '#767577', true: '#DA215D'}}
            // thumbColor={isSwitchOn1 ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            // onValueChange={toggleSwitch1}
            // value={isSwitchOn1}
            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
          /> */}
          <CustomSwitch />
        </View>
      </View>
      {/* <ModeComponent
        value="20,00 Cº"
        title="MODO TEMPERATURA"
        parraph="Temperatura actual: 20.00 c°"
        toggle="Calefon"
      /> */}
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
  },
});

export default TemperatureScreen;
