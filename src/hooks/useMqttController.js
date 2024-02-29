import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import {useCallback, useRef, useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {hostIp} from '../helpers/createAxios';
import {useFocusEffect} from '@react-navigation/native';
import {MQTT_TOPICS} from '../constants/mqttTopics';
import {debounce} from 'lodash';

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

const useMqttController = ({deviceId, topicToSubscribe, topicToPublish}) => {
  const {token} = useAuth();

  const [value, setValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const [isDeviceOn, setIsDeviceOn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const client = useRef(null);
  const fullSubscriptionTopic = `${deviceId}/${topicToSubscribe}`;
  const fullPublicationTopic = `${deviceId}/${topicToPublish}`;
  const onOffTopic = `${deviceId}/${MQTT_TOPICS.ON_OFF}`;

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

        let parsedMessage = {};

        try {
          parsedMessage = JSON.parse(message.payloadString);
        } catch (e) {}

        const {from, value} = parsedMessage;
        const isFromDevice = from === 'device';

        if (!isFromDevice) {
          return;
        }

        switch (message.destinationName) {
          case onOffTopic:
            setIsDeviceOn(Boolean(value));
            break;
          case fullSubscriptionTopic:
            setValue(value);
            break;
          case fullPublicationTopic:
            setTargetValue(value);
            break;
        }
      };

      client.current.connect({
        onSuccess: function (...args) {
          console.log('onSuccess');
          console.log(...args);
          client.current.subscribe(onOffTopic, {qos: 1});
          client.current.subscribe(fullSubscriptionTopic, {qos: 1});
          client.current.subscribe(fullPublicationTopic, {qos: 1});

          client.current.send(
            `${deviceId}/${MQTT_TOPICS.REFRESH}`,
            JSON.stringify({value: 1, from: 'app'}),
          );

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
    }, [
      deviceId,
      token,
      fullSubscriptionTopic,
      fullPublicationTopic,
      onOffTopic,
    ]),
  );

  const sendMessage = useCallback(
    (topic, value) => {
      if (isConnected && client.current) {
        client.current.send(topic, JSON.stringify({value, from: 'app'}));
      }
    },
    [isConnected, client.current, deviceId],
  );

  const sendTargetValue = useCallback(
    targetValue => {
      sendMessage(fullPublicationTopic, targetValue);
    },
    [sendMessage, fullPublicationTopic],
  );

  const setTargetValueDebounced = useCallback(
    debounce(sendTargetValue, 700, {maxWait: '800'}),
    [sendTargetValue],
  );

  const updateSysState = useCallback(
    isDeviceOn => {
      sendMessage(onOffTopic, isDeviceOn);
    },
    [sendMessage],
  );

  return {
    value,
    targetValue,
    sendTargetValue,
    setTargetValueDebounced,
    isDeviceOn,
    updateSysState,
  };
};

export default useMqttController;
