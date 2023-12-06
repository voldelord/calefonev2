import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends NativeStackScreenProps<any, any> {}
const ModesScreen = ({navigation}: Props) => {
  const temperaturePress = () => {
    navigation.navigate('TemperatureScreen');
  };
  const powerPress = () => {
    navigation.navigate('PowerScreen');
  };
  const ecoPress = () => {
    navigation.navigate('EcoScreen');
  };
  const energyPress = () => {
    navigation.navigate('ChartScreen');
  };
  const smartPress = () => {
    navigation.navigate('SmartScreen');
  };
  const handleLoginPress = () => {
    console.log('ChartScreen');
  };
  const onPress = () => {
    navigation.navigate('AllNotificationsScreens');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.iconnotifications}>
        <Icon name="bell" size={30} color="black" />
      </TouchableOpacity>
      <CustomButton
        label="Modo Temperatura"
        onPress={temperaturePress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="thermometer-quarter"
      />
      <CustomButton
        label="Modo Potencia"
        onPress={powerPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="arrow-up"
      />
      <CustomButton
        label="Modo Eco"
        onPress={ecoPress}
        buttonColor="#ECECEC"
        textColor="black"
        width={300}
        height={50}
        icon="podcast"
      />
      <CustomButton
        label="Ahorro de Energia"
        onPress={energyPress}
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
        onPress={smartPress}
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconnotifications: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
  },
});
