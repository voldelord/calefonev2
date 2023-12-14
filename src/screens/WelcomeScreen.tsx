import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import login from '../assets/home1.png';
import login2 from '../assets/home2.png';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SIZES} from '../constants/theme';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import logo from '../assets/recurso1.png';

interface Props extends NativeStackScreenProps<any, any> {}
const WelcomeScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };
  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const slides = [
    {
      id: 1,
      description: 'Crea un clima más sano y confortable en tu hogar.',
      image: login,
    },
    {
      id: 2,
      description:
        'Ahorra energía caldeando y climatizando tu casa de manera inteligente.',
      image: login2,
    },
  ];

  return (
    <AppIntroSlider
      data={slides}
      showNextButton={false}
      showDoneButton={false}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <Image
              source={logo}
              style={{
                width: 250,
                height: 150,
              }}
              resizeMode="center"
            />
            <Image
              source={item.image}
              style={{
                width: SIZES.width - 80,
                height: 250,
              }}
              resizeMode="contain"
            />
            <Text style={[styles.parraph, styles.caption]}>
              {item.description}
            </Text>
            <View style={styles.containerbutton}>
              <CustomButton
                label="Iniciar Sesión"
                onPress={handleLoginPress}
                buttonColor="white"
                textColor="#DA215D"
                width={280}
                height={50}
              />
            </View>
            <Text style={styles.parraph}>¿No eres usuario?</Text>
            <View style={styles.containertabbutton}>
              <CustomButton
                label="Registrarse"
                onPress={handleRegisterPress}
                buttonColor="#8C8CEA"
                textColor="white"
                width={200}
                height={50}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#6C6CDD',
  },
  title: {
    fontFamily: 'ShareTechMono',
  },
  containerbutton: {
    marginTop: 30,
  },
  containertabbutton: {
    marginTop: 20,
  },
  parraph: {
    marginTop: 20,
    color: 'white',
    fontFamily: 'ShareTechMono',
    textAlign: 'center',
  },
  caption: {
    paddingHorizontal: 45,
  },
});
export default WelcomeScreen;
