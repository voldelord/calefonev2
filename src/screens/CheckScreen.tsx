import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import animation from '../constants/animation.json';
import CustomButton from '../components/CustomButton';
import logo from '../assets/recurso1.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const CheckScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('HomeMenuScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.animationcontainer}>
        <LottieView
          style={{width: 300, height: 300}}
          source={animation}
          autoPlay
          loop
        />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>Verifica tu correo</Text>
        <Text style={styles.parraph}>
          Recibiras por correo electrónico un enlace para verificar tu cuenta
        </Text>
      </View>
      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Abrir Correo Electronico"
          onPress={handleLoginPress}
          buttonColor="#FFFFFF"
          textColor="#6C6CDD"
          width={250}
          height={50}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logoImage} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DA215D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationcontainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textcontainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
  },
  parraph: {
    fontSize: 15,
    maxWidth: 300,
    color: 'white',
    marginBottom: 40,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
export default CheckScreen;
