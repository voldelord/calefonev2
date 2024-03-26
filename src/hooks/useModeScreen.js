import {useCallback, useState} from 'react';
import {useMqttClient} from '../context/MqttContext';
import {useFocusEffect} from '@react-navigation/native';
import {MQTT_TOPICS} from '../constants/mqttTopics';

const useModeScreen = ({
  mode,
  deviceId,
  topicToSubscribe,
  topicToPublish,
  onModeChange,
}) => {
  const subscriptionTopic = `${deviceId}/${topicToSubscribe}`;
  const targetTopic = `${deviceId}/${topicToPublish}`;
  const sysStateTopic = `${deviceId}/${MQTT_TOPICS.ON_OFF}`;
  const modeTopic = `${deviceId}/${MQTT_TOPICS.MODE}`;
  const refreshTopic = `${deviceId}/${MQTT_TOPICS.REFRESH}`;

  const [subscriptionValue, setSubscriptionValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const {subscribe, unsubscribe, sendMessage, sendMessageDebounced} =
    useMqttClient();
  const [isDeviceOn, setIsDeviceOn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      subscribe(subscriptionTopic, msg => setSubscriptionValue(msg.value));
      subscribe(targetTopic, msg => setTargetValue(msg.value));

      subscribe(sysStateTopic, msg => setIsDeviceOn(Boolean(msg.value)));

      subscribe(modeTopic, msg => {
        onModeChange?.(msg.value);
      });

      sendMessage(refreshTopic, 1);
      sendMessage(modeTopic, mode);

      return () => {
        unsubscribe(subscriptionTopic);
        unsubscribe(targetTopic);
        unsubscribe(sysStateTopic);
        unsubscribe(modeTopic);
      };
    }, [subscribe, unsubscribe, deviceId, onModeChange, mode]),
  );

  const updateTargetValue = useCallback(
    value => {
      const targetTemperatureTopic = `${deviceId}/${MQTT_TOPICS.TARGET_TEMPERATURE}`;
      sendMessageDebounced(targetTemperatureTopic, value);
    },
    [sendMessageDebounced, deviceId],
  );

  const updateSysState = useCallback(
    isDeviceOn => {
      const sysStateTopic = `${deviceId}/${MQTT_TOPICS.ON_OFF}`;
      sendMessage(sysStateTopic, isDeviceOn);
    },
    [sendMessage, deviceId],
  );

  const changeMode = useCallback(
    mode => {
      sendMessage(modeTopic, mode);
    },
    [sendMessage, modeTopic],
  );

  return {
    subscriptionValue,
    targetValue,
    updateTargetValue,
    isDeviceOn,
    updateSysState,
    changeMode,
  };
};

export default useModeScreen;
