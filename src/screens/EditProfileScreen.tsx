import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const EditProfileScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('UserProfileScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Perfil</Text>
      <InputField
        label={'Nombre Completo'}
        name='name'
        inputType="text"
      />
      <InputField
        label={'NickName'}
        name='nickname'
        inputType="password"
      />
      <InputField
        label={'Fecha de Nacimiento'}
        name='birthdate'
        inputType="text"
      />
      <InputField
        label={'Email'}
        name='email'
        inputType="text"
      />
      <InputField
        label={'Numero de Telefono'}
        name='phone'
        inputType="text"
      />
      <InputField
        label={'Sexo'}
        name='sex'
        inputType="text"
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
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    marginVertical: 60,
  },
});
