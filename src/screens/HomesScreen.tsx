import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/layout/Header';

interface Props extends NativeStackScreenProps<any, any> {}

const HomesScreen = ({navigation}: Props) => {
  const handleButtonPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity
        style={styles.myhouse}
        onPress={() => navigation.navigate('AddScenaryScreen')}>
        <Text style={styles.myparraph}>My House</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('NewHomeScreen')}>
        <View style={styles.iconContainer}>
          <Icon name="plus" size={20} color="#DA215D" />
        </View>
        <Text>No tenés ninguna casa registrada</Text>
        <Text style={styles.parraph}>Agrega una Casaasdfasdf</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomesScreen;

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
    backgroundColor: '#DA215D',
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
});
