import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends NativeStackScreenProps<any, any> {}

const ScenariosScreen = ({navigation}: Props) => {
  const handleButtonPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.myhouse}
        onPress={() => navigation.navigate('SearchDevicesScreen')}>
        <Icon
          name="home"
          size={80}
          color="rgba(255,255,255,0.2)"
          style={styles.bedIcon}
        />
        <Text style={styles.myparraph}>Habitacion Principal</Text>
      </TouchableOpacity>
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

export default ScenariosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 20,
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
  myhouse: {
    backgroundColor: '#6C6CDD',
    borderRadius: 20,
    width: 300,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  myparraph: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  bedIcon: {
    position: 'absolute',
    opacity: 0.8,
  },
});
