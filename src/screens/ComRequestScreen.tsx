import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import calefone from '../assets/6.png';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const {width, height} = Dimensions.get('window');

interface Props extends NativeStackScreenProps<any, any> {}
const ComRequestScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('WirelessDeviceScreen');
  };
  return (
    <View style={[styles.container, {width, height}]}>
      <Text style={styles.title}>
        Por favor establezca la comunicación con el dispositivo
      </Text>
      <Text style={styles.parraph}>
        Ejemplo: debe seguir los pasos a continuación
      </Text>
      <View>
        <Image style={styles.image} source={calefone} />
      </View>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Siguiente"
          onPress={handleLoginPress}
          buttonColor="#DA215D"
          textColor="white"
          width={300}
          height={50}
        />
      </View>
    </View>
  );
};

export default ComRequestScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    marginHorizontal: 20,
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  parraph: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 15,
  },
  image: {
    resizeMode: 'contain',
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 100,
  },
});
