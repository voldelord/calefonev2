import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import useHomes from '../hooks/useHomes';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import homeFormStore from '../stores/homeFormStore';
import {COLORS} from '../constants/theme';

const MainIcon = () => (
  <AntDesign
    name="checkcircleo"
    style={{
      fontSize: 25,
      color: COLORS.white,
      position: 'absolute',
      top: 12,
      right: 12,
    }}
  />
);

const HomeMenuScreen = ({navigation}) => {
  const {user} = useAuth();
  const clearHome = homeFormStore(state => state.clearHome);
  const updateHome = homeFormStore(state => state.updateHome);

  const {homes, getHomes} = useHomes({
    params: {
      filters: [{field: 'inhabitants', operator: 'contains', value: user?.id}],
    },
  });

  const noHomes = homes.length === 0;

  useFocusEffect(
    useCallback(() => {
      getHomes();
    }, [user?.id]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <SectionTitle text={'Hogares'} />

        {homes.map(home => (
          <TouchableOpacity
            key={home.id}
            style={styles.home}
            onPress={() => {
              updateHome(home);

              navigation.navigate('ScenariosScreen', {
                homeId: home.id,
                homeName: home.name,
              });
            }}>
            {/* {home.isMain && <MainIcon />} */}
            <Text style={styles.homeTitle}>{home.name}</Text>
            <Text style={styles.homeAddress}>{home.address}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            clearHome();

            navigation.navigate('NewHomeScreen');
          }}>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={30} color="#DA215D" />
          </View>
          {noHomes && <Text>No tenés ninguna casa registrada</Text>}
          <Text style={styles.parraph}>Agrega una Casa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeMenuScreen;

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
  iconnotifications: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
  },
  home: {
    backgroundColor: '#DA215D',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  homeTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  homeAddress: {
    // fontSize: 10,
    fontStyle: 'italic',
    color: 'white',
  },
});
