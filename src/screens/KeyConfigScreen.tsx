import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
const {width, height} = Dimensions.get('window');
const KeyConfigScreen = () => {
  const handleLoginPress = () => {
    console.log('ConfirmScreen');
  };
  return (
    <View style={[styles.container, {width, height}]}>
      <Text style={styles.title}>
        Introducir el código de configuración del dispositivo matter
      </Text>
      <Text style={styles.parraph}>
        Aplicable únicamente a un dispositivo matter. Buscar el código de
        configuración en el dispositivo, embalaje o en el manual
      </Text>
      <View style={styles.inputcontainer}>
        <InputField
          label={'Introduzca el código del dispositivo'}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Siguiente"
          onPress={handleLoginPress}
          buttonColor="#DA215D"
          textColor="white"
          width={250}
          height={50}
        />
      </View>
    </View>
  );
};

export default KeyConfigScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    marginHorizontal: 20,
    marginTop: 80,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parraph: {
    marginHorizontal: 20,
    marginTop: 80,
    textAlign: 'justify',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 200,
  },
  inputcontainer: {
    marginTop: 80,
  },
});
