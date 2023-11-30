import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const ModesScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('RangeScreen');
  };
  return (
    <View style={styles.container}>
      <CustomButton
        label="Modo Temperatura"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="thermometer-quarter"
      />
      <CustomButton
        label="Modo Potencia"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="arrow-up"
      />
      <CustomButton
        label="Modo Eco"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="podcast"
      />
      <CustomButton
        label="Ahorro de Energia"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="bolt"
      />
      <CustomButton
        label="Indicadores Ambientales"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="info"
      />
      <CustomButton
        label="Plan Avanzado"
        onPress={handleLoginPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="unlock-alt"
      />
    </View>
  );
};

export default ModesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
