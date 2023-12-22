import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const NewScenaryScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('ScenariosScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nuevo ambiente</Text>
      <InputField label={'Nomber'} name="name" />
      <InputField label={'Direccion'} name="address" />
      <InputField label={'Localidad'} name="location" />
      <InputField label={'M3'} name="m3" />
      <InputField label={'Input'} name="input" />
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

export default NewScenaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
