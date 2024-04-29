import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {debounce} from 'lodash';
import {useAuth} from './AuthContext';
import {SETTINGS} from '../constants/settings';
import {useDeviceStore} from '../stores/device-store';
import {MQTT_TOPICS} from '../constants/mqttTopics';

const MqttContext = createContext(null);

export const MqttProvider = ({children}) => {
  const {token} = useAuth();
  const client = useRef(null);
  const subscribers = useRef(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const deviceId = useDeviceStore(state => state.deviceId);

  useEffect(() => {
    if (token) {
      client.current = new Paho.MQTT.Client(
        SETTINGS.mqttOptions.host,
        SETTINGS.mqttOptions.port,
        SETTINGS.mqttOptions.path,
        token,
      );

      client.current.onConnectionLost = function (responseObject) {
        console.log('onConnectionLost');
        console.log(responseObject.errorMessage);
        setIsConnected(false);
      };

      client.current.onMessageArrived = function (message) {
        const topic = message.destinationName;
        let parsedMessage = {};

        try {
          parsedMessage = JSON.parse(message.payloadString);
        } catch (e) {}

        const {from} = parsedMessage;
        const isFromDevice = from === 'device';

        if (!isFromDevice) {
          return;
        }

        subscribers.current.get(topic)?.(parsedMessage);
      };

      if (deviceId) {
        client.current.connect({
          userName: deviceId,
          useSSL: true,
          timeout: 3,
          reconnect: true,
          onSuccess: function () {
            console.log('onSuccess');

            Object.keys(MQTT_TOPICS).forEach(key => {
              const topic = `${deviceId}/${MQTT_TOPICS[key]}`;

              client.current.subscribe(topic, {qos: 1});
            });

            setIsConnected(true);
          },
          onFailure: function (...args) {
            console.log('onFailure');
            console.log(...args);
            setIsConnected(false);
          },
        });
      }
    }

    () => {
      Object.keys(MQTT_TOPICS).forEach(key => {
        const topic = `${deviceId}/${MQTT_TOPICS[key]}`;
        client.current?.unsubscribe(topic);
      });
      client.current?.disconnect();
    };
  }, [token, deviceId]);

  const subscribe = useCallback((topic, callback) => {
    subscribers.current.set(topic, callback);
  }, []);

  const unsubscribe = useCallback((topic, callback) => {
    subscribers.current.delete(topic, callback);
  }, []);

  const sendMessage = useCallback(
    (topic, value) => {
      if (isConnected && client.current) {
        client.current.send(topic, JSON.stringify({value, from: 'app'}));
      }
    },
    [isConnected, client.current],
  );

  const sendMessageDebounced = useCallback(
    debounce(sendMessage, 700, {maxWait: '800'}),
    [sendMessage],
  );

  return (
    <MqttContext.Provider
      value={{subscribe, unsubscribe, sendMessage, sendMessageDebounced}}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttClient = () => useContext(MqttContext);
