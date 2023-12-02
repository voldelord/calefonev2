import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack'; // Import the necessary type

// Import ModeComponent and its Props interface
import ModeComponent, {
  Props as ModeComponentProps,
} from '../components/ModeComponent';

// Define the type for SmartScreen props including navigation and route
type SmartScreenProps = NativeStackScreenProps<any, any>;

const SmartScreen: React.FC<SmartScreenProps> = ({navigation, route}) => {
  // Define the props expected by ModeComponent
  const modeComponentProps: ModeComponentProps = {
    value: '20,00 Cº',
    title: 'MODO SMART',
    paragraph: 'Temperatura actual: 20.00 c°',
    toggle: 'Calefon',
    showSlider: true,
    navigation, // Pass navigation to ModeComponent
    route, // Pass route to ModeComponent
  };

  return (
    <View>
      <ModeComponent {...modeComponentProps} />
    </View>
  );
};

export default SmartScreen;

const styles = StyleSheet.create({});
