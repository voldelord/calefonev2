import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends NativeStackScreenProps<any, any> {}

const AddScenaryScreen = ({navigation}: Props) => {
  const handleButtonPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('NewScenaryScreen')}>
        <View style={styles.iconContainer}>
          <Icon name="plus" size={20} color="#DA215D" />
        </View>
        <Text>Agregar Ambiente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScenaryScreen;

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
});
