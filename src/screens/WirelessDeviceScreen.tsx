import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const {width, height} = Dimensions.get('window');
interface Props extends NativeStackScreenProps<any, any> {}

const WirelessDeviceScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('DevicesScreen');
  };
  return (
    <View style={[styles.container, {width, height}]}>
      <Text style={styles.title}>
        Por favor establezca el dispositivo en modo de emparejamiento
      </Text>
      <Text style={styles.parraph}>
        Elija una red WiFi de 2.4 Ghz para emparejar e introduzca la contraseña
      </Text>
      <Text style={styles.parraph}>
        Si tu red WiFi de 2.4 Ghz comparten el mismo SSID te recomendamos
        cambiar la configuración de tu router o probar un modo de emparejamiento
        compatible
      </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="WiFi - 5Ghz"
          placeholderTextColor={'grey'}
        />
        <TextInput
          style={styles.input}
          placeholder="WiFi - 2Ghz"
          placeholderTextColor={'grey'}
        />
      </View>
      <Text style={styles.alert}>Solicitud de Permiso para Acceder</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor={'grey'}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Siguiente"
          onPress={handleLoginPress}
          buttonColor="#DA215D"
          textColor="white"
          width={350}
          height={50}
        />
      </View>
    </View>
  );
};

export default WirelessDeviceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    marginHorizontal: 30,
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  parraph: {
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  input: {
    height: 60,
    margin: 12,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#DADADA',
    marginBottom: 10,
    marginTop: 20,
  },
  alert: {
    alignSelf: 'center',
    marginTop: 20,
  },
  buttoncontainer: {
    alignItems: 'center',
  },
});
