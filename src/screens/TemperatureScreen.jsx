import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/layout/Header';
import Slider from '@react-native-community/slider';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';

const TemperatureScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <SectionTitle text={deviceName} style={{marginBottom: 10}} />

        <View style={styles.rangePickerContainer}>
          <View style={styles.rangePickerValueContainer}>
            <Text style={styles.rangePickerTitle}>MODO TEMPERATURA</Text>
            <Text style={styles.rangePickerValue}>20,00 C°</Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#87F0AB"
            maximumTrackTintColor="#FEA2AD"
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
          <Text style={{fontSize: 18, color: COLORS.black}}>Temperatura actual: </Text>
          <Text style={{fontSize: 18, color: COLORS.primary}}>20,00 C°</Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 40}}>
          <Text style={{fontSize: 18, color: COLORS.black, marginBottom: 10}}>Calefón apagado</Text>
          <Switch
            trackColor={{false: '#767577', true: '#DA215D'}}
            // thumbColor={isSwitchOn1 ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            // onValueChange={toggleSwitch1}
            // value={isSwitchOn1}
            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
          />
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
    paddingHorizontal: 15,
  },
  rangePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rangePickerValueContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  rangePickerValue: {
    fontSize: 48,
    color: COLORS.black,
  },
  rangePickerTitle: {
    color: COLORS.black,
    fontSize: 18,
    marginBottom: 15,
  },
});

export default TemperatureScreen;
