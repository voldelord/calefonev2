import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import logo from '../assets/15.png';
import CustomModal from '../components/CustomModal';
import Header from '../components/layout/Header';

const SearchDevicesScreen = ({navigation}) => {
  const handleLoginPress = () => {
    console.log('ConfirmScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.parraph}>
            Reúne aquí los dispositivos que uses con mayor frecuencia
          </Text>
        </View>
        <CustomModal />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchDevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  parraph: {
    maxWidth: 250,
    textAlign: 'center',
    marginTop: 40,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});
