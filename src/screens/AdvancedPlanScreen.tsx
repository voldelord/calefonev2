import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import perfil from '../assets/profile.png';
import plans from '../assets/descount.png';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
const AdvancedPlanScreen = ({navigation}: Props) => {
  const handleLoginPress = () => {
    navigation.navigate('AdvancedModesScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={perfil} style={styles.imagenPerfil} />
      <Text style={styles.nombreUsuario}>Franco Dueck</Text>
      <Image source={plans} style={styles.imagenplans} />
      <Text style={styles.parraph}>
        La suscripción se renueva automáticamente por el mismo precio (USD 9,99)
        al vencimento. Si no desea continuar con la suscripción automática, ...
      </Text>
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
          label="Aceptar y Pagar"
          onPress={handleLoginPress}
          buttonColor="#CDCCCC"
          textColor="black"
          width={250}
          height={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imagenPerfil: {
    width: 200,
    height: 200,
    borderRadius: 75,
  },
  imagenplans: {
    width: 400,
    resizeMode: 'contain',
  },
  nombreUsuario: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  checkbox: {
    marginHorizontal: 20,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  parraph: {
    justifyContent: 'center',
    textAlign: 'justify',
    marginBottom: 10,
  },
});

export default AdvancedPlanScreen;
