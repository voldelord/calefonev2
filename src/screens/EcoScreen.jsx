import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import changeModeIcon from '../assets/change-mode-icon.png';
import crownIcon from '../assets/crown-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';
import CustomSwitch from '../components/forms/CustomSwitch';
import {MQTT_DEVICE_MODES, MQTT_MODE_TO_SCREEN} from '../constants/mqttTopics';
import CalefonOnOffText from '../components/ui/CalefonOnOffText';
import useModeScreen from '../hooks/useModeScreen';

const allowedModes = [
  MQTT_DEVICE_MODES.TEMPERATURE,
  MQTT_DEVICE_MODES.TEMPERATURE,
];

const EcoScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {
    subscriptionValue: temperature,
    targetValue: targetTemperature,
    updateTargetValue: setTargetTemperature,
    isDeviceOn,
    updateSysState,
  } = useModeScreen({
    mode: MQTT_DEVICE_MODES.ECHO,
    deviceId,
    topicToSubscribe: 'temperature',
    topicToPublish: 'target_eco',
    onModeChange: useCallback(mode => {
      if (allowedModes.includes(mode)) {
        navigation.replace(MQTT_MODE_TO_SCREEN[mode], {deviceId, deviceName});
      }
    }, []),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <SectionTitle text={deviceName} style={{marginBottom: 10}} />

        <RangeSlider
          value={targetTemperature}
          title="MODO ECO"
          subTitleValue={temperature}
          subTitle={'Temperatura ambiente:'}
          unit="C°"
          max={35}
          onNewValue={setTargetTemperature}
          onMinus={setTargetTemperature}
          onPlus={setTargetTemperature}
        />

        <View style={{alignItems: 'center'}}>
          <CalefonOnOffText isDeviceOn={isDeviceOn} />

          <CustomSwitch
            value={isDeviceOn}
            onChange={e => updateSysState(e.target.value)}
          />
        </View>

        <View style={{marginBottom: 30, marginTop: 30}}>
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
      </ScrollView>
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

export default EcoScreen;
