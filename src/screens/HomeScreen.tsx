import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import login from '../assets/home1.png';
import login2 from '../assets/home2.png';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SIZES} from '../constants/theme';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const HomeScreen = ({navigation}: Props) => {
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
      description: 'Crea un clima más sano y confortable en tu hogar.',
      image: login2,
    },
  ];
  const [showHomePage, setShowHomePage] = useState(false);
  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 80,
                  height: 250,
                }}
                resizeMode="contain"
              />
              <Text style={styles.parraph}>{item.description}</Text>
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
              <Text style={styles.parraph}>No eres usuario Registrate</Text>
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
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 100,
    backgroundColor: '#6C6CDD',
  },
  title: {
    fontFamily: 'ShareTechMono',
  },
  containerbutton: {
    marginTop: 40,
  },
  containertabbutton: {
    marginTop: 20,
  },
  parraph: {
    marginTop: 20,
    color: 'white',
    fontFamily: 'ShareTechMono',
  },
});
export default HomeScreen;
