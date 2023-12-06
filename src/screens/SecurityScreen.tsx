import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const SecurityScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('UserProfileScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Perfil</Text>
      <InputField
        label={'Constraseña'}
        inputType="password"
        fieldButtonLabel={'Forgot?'}
        fieldButtonFunction={() => {}}
      />
      <InputField
        label={'Nueva Contraseña'}
        inputType="password"
        fieldButtonLabel={'Forgot?'}
        fieldButtonFunction={() => {}}
      />
      <InputField
        label={'Confirmar Contraseña'}
        inputType="password"
        fieldButtonLabel={'Forgot?'}
        fieldButtonFunction={() => {}}
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

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
