import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toggle from 'react-native-toggle-element';
import changeModeIcon from '../assets/change-mode-icon.png';
import crownIcon from '../assets/crown-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';
import useMqttController from '../hooks/useMqttController';

const TemperatureScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {
    value: temperature,
    targetValue: targetTemperature,
    setTargetValueDebounced: setTargetTemperature,
    isDeviceOn,
    updateSysState,
  } = useMqttController({
    deviceId,
    topicToSubscribe: 'temperature',
    topicToPublish: 'target_temperature',
  });

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
          max={35}
          onChange={e => setTargetTemperature(e.target.value)}
        />

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: COLORS.black, marginBottom: 10}}>
            Calefón apagado
          </Text>

          <Toggle
            value={isDeviceOn}
            onPress={updateSysState}
            trackBar={{
              activeBackgroundColor: COLORS.primary,
              inActiveBackgroundColor: '#dddddd',
              borderWidth: 7,
              width: 80,
              height: 40,
              radius: 25,
            }}
            thumbButton={{
              inActiveBackgroundColor: COLORS.white,
              activeBackgroundColor: COLORS.white,
              width: 42,
              height: 42,
            }}
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
