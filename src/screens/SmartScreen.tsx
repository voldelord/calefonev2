import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModeComponent from '../components/ModeComponent';

const SmartScreen = () => {
  return (
    <View>
      <ModeComponent
        value="20,00 Cº"
        title="MODO SMART"
        parraph="Temperatura actual: 20.00 c°"
        toggle="Calefon"
        showSlider={true}
      />
    </View>
  );
};

export default SmartScreen;

const styles = StyleSheet.create({});
