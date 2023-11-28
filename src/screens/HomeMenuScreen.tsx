import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends NativeStackScreenProps<any, any> {}

const HomeMenuScreen = ({navigation}: Props) => {
  const handleButtonPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('NewHomeScreen')}>
        <View style={styles.iconContainer}>
          <Icon name="plus" size={20} color="#DA215D" />
        </View>
        <Text>No tenés ninguna casa registrada</Text>
        <Text style={styles.parraph}>Agrega una Casa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMenuScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    width: 300,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    shadowOpacity: 50,
  },
  parraph: {
    fontWeight: 'bold',
  },
});
