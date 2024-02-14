import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import useControllers from '../hooks/useControllers';
import { useFocusEffect } from '@react-navigation/native';

const DevicesScreen = ({navigation, route}) => {
  const environmentId = route.params.environmentId;
  const environmentName = route.params.environmentName;

  const {controllers, getControllers} = useControllers({params: {
    filters: [{field: 'environmentId', operator: '=', value: environmentId}]
  }});

  const noControllers = controllers.length === 0;

  useFocusEffect(
    useCallback(() => {
      getControllers();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <SectionTitle text={environmentName} />

        {controllers.map((controller, i) => (
          <TouchableOpacity
            key={controller.id}
            style={styles.myhouse}
            onPress={() => navigation.navigate('AddScenaryScreen')}>
            <Text style={styles.myparraph}>Dispositivo {i + 1}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate('SearchBLEDevicesScreen', {environmentId})
          }>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={30} color="#DA215D" />
          </View>
          {noControllers && <Text>No tenés ningun dispositivo registrado</Text>}
          <Text style={styles.parraph}>Agrega un nuevo dispositivo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#ededed',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowOpacity: 50,
  },
  parraph: {
    fontWeight: 'bold',
  },
  myhouse: {
    backgroundColor: '#DA215D',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  myparraph: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
