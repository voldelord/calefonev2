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
import CardGradient from '../components/CardGradient';

const AdvancedPlanScreen = () => {
  const smartPress = () => {
    console.log('SmartScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={perfil} style={styles.imagenPerfil} />
      <Text style={styles.nombreUsuario}>Franco Dueck</Text>
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
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
});

export default AdvancedPlanScreen;
