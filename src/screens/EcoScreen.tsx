import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModeComponent from '../components/ModeComponent';

const EcoScreen = () => {
  return (
    <View>
      <ModeComponent
        value="20,00 Cº"
        title="MODO ECO"
        parraph="Temperatura actual: 20.00 c°"
        toggle="Calefon"
      />
    </View>
  );
};

export default EcoScreen;

const styles = StyleSheet.create({});
