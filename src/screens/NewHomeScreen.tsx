import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const NewHomeScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('HomesScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Home</Text>
      <InputField label={'Name'} inputType="text" />
      <InputField label={'Direccion'} inputType="password" />
      <InputField label={'Localidad'} inputType="text" />
      <InputField label={'M3'} inputType="number" />
      <InputField label={'input'} inputType="password" />
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
    </View>
  );
};

export default NewHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    marginVertical: 60,
  },
});
