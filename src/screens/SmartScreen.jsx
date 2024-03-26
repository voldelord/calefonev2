import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import changeModeIcon from '../assets/change-mode-icon.png';
import clockIcon from '../assets/clock-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';
import CustomSwitch from '../components/forms/CustomSwitch';
import {
  MQTT_DEVICE_MODES,
  MQTT_MODE_TO_SCREEN,
  MQTT_TOPICS,
} from '../constants/mqttTopics';
import CalefonOnOffText from '../components/ui/CalefonOnOffText';
import useModeScreen from '../hooks/useModeScreen';
import {COLORS} from '../constants/theme';
import Slider from '../components/slider/Slider';

const allowedModes = [
  MQTT_DEVICE_MODES.POWER,
  MQTT_DEVICE_MODES.ECHO,
  MQTT_DEVICE_MODES.TEMPERATURE,
];

const SmartScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const [kwLimit, setKwLimit] = useState(0);
  const [arsLimit, setArsLimit] = useState(0);

  const {
    subscriptionValue: temperature,
    targetValue: targetTemperature,
    updateTargetValue: setTargetTemperature,
    isDeviceOn,
    updateSysState,
  } = useModeScreen({
    mode: MQTT_DEVICE_MODES.SMART,
    deviceId,
    topicToSubscribe: MQTT_TOPICS.TEMPERATURE,
    topicToPublish: MQTT_TOPICS.TARGET_SMART,
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
          title="MODO TEMPERATURA"
          subTitleValue={temperature}
          subTitle={'Temperatura actual:'}
          unit="C°"
          max={35}
          onChange={e => setTargetTemperature(e.target.value)}
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
            icon={clockIcon}
            title={'Programar horario'}
            redBg
          />
        </View>

        <View style={{paddingBottom: 20}}>
          <Text style={styles.limitTitle}>Límite de consumo por mes</Text>

          <View style={[styles.limitContainer, {marginBottom: 30}]}>
            <Slider
              style={{marginRight: 10}}
              min={0}
              max={3000}
              low={kwLimit}
              onChange={setKwLimit}
            />
            <Text style={styles.limitText}>{kwLimit} KW/H</Text>
          </View>

          <View style={styles.limitContainer}>
            <Slider
              style={{marginRight: 10}}
              min={0}
              max={4000}
              low={arsLimit}
              onChange={setArsLimit}
            />
            <Text style={styles.limitText}>{arsLimit} ARS</Text>
          </View>
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
  limitContainer: {flexDirection: 'row', alignItems: 'center'},
  limitTitle: {color: COLORS.black, marginBottom: 20},
  limitText: {width: 73, textAlign: 'right'},
});

export default SmartScreen;
