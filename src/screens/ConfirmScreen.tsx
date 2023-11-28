import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import logo from '../assets/logo.jpg';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons'; // importa Ionicons
import google from '../assets/google.png';

interface Props extends NativeStackScreenProps<any, any> {}
const ConfirmScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('CheckScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={logo} />
      </View>
      <Text style={styles.parraph}>Contraseña</Text>
      <InputField
        label={'Email'}
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        inputType="password"
      />
      <InputField
        label={'Password'}
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        inputType="password"
      />
      <BouncyCheckbox
        style={styles.checkbox}
        size={20}
        fillColor="green"
        unfillColor="#FFFFFF"
        text="Estoy deacuerdo con la Politica de Privacidad, Acuerdo del Usuario y Politica de Privacidad Infantil"
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 2}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          fontSize: 10,
          textAlign: 'justify',
          marginRight: 10,
          marginBottom: 10,
        }}
        onPress={(isChecked: boolean) => {}}
      />

      <View style={styles.buttoncontainer}>
        <CustomButton
          label="Confirmar"
          onPress={handleLoginPress}
          buttonColor="#DA215D"
          textColor="white"
          width={250}
          height={50}
        />
      </View>

      <View style={styles.imagecentercontainer}>
        <Image style={styles.imagecenter} source={google} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  parraph: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  checkbox: {
    marginHorizontal: 20,
  },
  imagecentercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 40,
  },
  imagecenter: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  textfooter: {
    textAlign: 'center',
    padding: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
export default ConfirmScreen;
