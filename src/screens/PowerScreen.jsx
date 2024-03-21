import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import changeModeIcon from '../assets/change-mode-icon.png';
import crownIcon from '../assets/crown-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';
import useMqttController from '../hooks/useMqttController';
import CustomSwitch from '../components/forms/CustomSwitch';
import {MQTT_DEVICE_MODES} from '../constants/mqttTopics';
import {useFocusEffect} from '@react-navigation/native';
import CalefonOnOffText from '../components/ui/CalefonOnOffText';

const PowerScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {
    value: power,
    targetValue: targetPower,
    setTargetValueDebounced: setTargetPower,
    isDeviceOn,
    updateSysState,
    canSendMessage,
    changeMode,
  } = useMqttController({
    deviceId,
    topicToSubscribe: 'power',
    topicToPublish: 'target_power',
  });

  useFocusEffect(
    useCallback(() => {
      if (canSendMessage) {
        changeMode(MQTT_DEVICE_MODES.POWER);
      }
    }, [changeMode, canSendMessage]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <SectionTitle text={deviceName} style={{marginBottom: 10}} />

        <RangeSlider
          value={targetPower}
          title="MODO POTENCIA"
          subTitleValue={power}
          subTitle={'Potencia actual:'}
          unit="W"
          max={10}
          onChange={e => setTargetPower(e.target.value)}
        />

        <View style={{alignItems: 'center'}}>
          <CalefonOnOffText isDeviceOn={isDeviceOn} />

          <CustomSwitch
            value={isDeviceOn}
            onChange={e => updateSysState(e.target.value)}
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

export default PowerScreen;
