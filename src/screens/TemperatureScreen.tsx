import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModeComponent from '../components/ModeComponent';

const TemperatureScreen = () => {
  return (
    <View>
      <ModeComponent
        value="20,00 Cº"
        title="MODO TEMPERATURA"
        parraph="Temperatura actual: 20.00 c°"
        toggle="Calefon"
      />
    </View>
  );
};

export default TemperatureScreen;

const styles = StyleSheet.create({});
