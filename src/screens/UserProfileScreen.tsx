import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import perfil from '../assets/profile.png';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const opciones = [
  {id: 1, nombre: 'Editar perfil', icono: 'edit', destino: 'EditProfileScreen'},
  {
    id: 2,
    nombre: 'Notificaciones',
    icono: 'bell',
    destino: 'NotificationsScreen',
  },
  {id: 3, nombre: 'Seguridad', icono: 'lock', destino: 'SecurityScreen'},
  {id: 4, nombre: 'Cerrar sesión', icono: 'sign-out', destino: 'HomeScreen'},
];

interface Props extends NativeStackScreenProps<any, any> {}
const UserProfileScreen = ({navigation}: Props) => {
  const smartPress = () => {
    navigation.navigate('AdvancedPlanScreen');
  };
  const notificationsPress = () => {
    navigation.navigate('AdvancedPlanScreen');
  };

  const navigateToScreen = (destino: string) => {
    navigation.navigate(destino);
  };
  const onPress = () => {
    navigation.navigate('AllNotificationsScreens');
  };

  const renderOpcion = ({item}) => (
    <TouchableWithoutFeedback onPress={() => navigateToScreen(item.destino)}>
      <View style={styles.opcionContainer}>
        <Icon name={item.icono} size={20} color="black" />
        <Text style={styles.opcionTexto}>{item.nombre}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.iconnotifications}>
        <Icon name="bell" size={30} color="black" />
      </TouchableOpacity>
      <Image source={perfil} style={styles.imagenPerfil} />
      <Text style={styles.nombreUsuario}>Franco Duek</Text>
      <CustomButton
        label="Plan Avanzado"
        onPress={smartPress}
        buttonColor="#7417C6"
        textColor="white"
        width={300}
        height={50}
        icon="arrow-up"
      />
      <FlatList
        data={opciones}
        renderItem={renderOpcion}
        keyExtractor={item => item.id.toString()}
      />
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
    marginBottom: 16,
  },
  nombreUsuario: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'black',
  },
  opcionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  opcionTexto: {
    marginLeft: 8,
    fontSize: 16,
  },
  iconnotifications: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
  },
});

export default UserProfileScreen;
