import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import logo from '../assets/15.png';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
const SearchDevicesScreen = () => {
  const handleLoginPress = () => {
    console.log('ConfirmScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.image} />
      </View>
      <Text style={styles.parraph}>
        Reúne aquí los dispositivos que uses con mayor frecuencia
      </Text>
      <CustomModal />
    </View>
  );
};

export default SearchDevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  parraph: {
    maxWidth: 250,
    textAlign: 'center',
    marginTop: 40,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});
