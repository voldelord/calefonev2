import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModeComponent from '../components/ModeComponent';

const PowerScreen = () => {
  return (
    <View>
      <ModeComponent
        value="600 W"
        title="MODO POTENCIA"
        parraph="Temperatura actual: 20.00 c°"
        toggle="Calefon"
      />
    </View>
  );
};

export default PowerScreen;

const styles = StyleSheet.create({});
