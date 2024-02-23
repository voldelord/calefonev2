import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/layout/Header';
import useHomeEnvironments from '../hooks/useHomeEnvironments';
import {useFocusEffect} from '@react-navigation/native';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import useAxios from '../hooks/useAxios';
import {showConfirmationAlert} from '../helpers/alerts';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import TitleOptions from '../components/TitleOptions';

const ScenariosScreen = ({navigation, route}) => {
  const homeId = route.params.homeId;
  const homeName = route.params.homeName;

  const setIsLoadingOverlay = useLoadingOverlayStore(
    state => state.setIsLoading,
  );
  const {environments, getEnvironments} = useHomeEnvironments({homeId});

  const [{loading: deleteHomeLoading}, deleteHome] = useAxios(
    {
      method: 'delete',
      url: `/v1/homes/${homeId}`,
    },
    {manual: true},
  );

  const noEnvironments = environments.length === 0;

  useFocusEffect(
    useCallback(() => {
      getEnvironments();
    }, []),
  );

  useEffect(() => {
    setIsLoadingOverlay(deleteHomeLoading);
  }, [deleteHomeLoading]);

  const handleDeletePressed = () => {
    showConfirmationAlert({
      title: 'Eliminar hogar',
      message: `¿Estas seguro de eliminar "${homeName}" y todo su contenido?`,
      okButtonPress: async () => {
        await deleteHome();

        navigation.goBack();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.titleSection}>
          <SectionTitle text={homeName} />

          <TitleOptions
            onDeletePress={handleDeletePressed}
            deleteDisabled={deleteHomeLoading}
          />
        </View>

        {environments.map(environment => (
          <TouchableOpacity
            key={environment.id}
            style={styles.myhouse}
            onPress={() =>
              navigation.navigate('DevicesScreen', {
                homeId,
                environmentId: environment.id,
                environmentName: environment.name,
              })
            }>
            <Icon
              name="home"
              size={80}
              color="rgba(255,255,255,0.2)"
              style={styles.bedIcon}
            />
            <Text style={styles.myparraph}>{environment.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('NewScenaryScreen', {homeId})}>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={30} color="#DA215D" />
          </View>
          {noEnvironments && <Text>No tenés ninguna ambiente registrado</Text>}
          <Text style={styles.parraph}>Agrega un ambiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScenariosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  titleSection: {flexDirection: 'row', alignItems: 'center'},
  titleOption: {paddingHorizontal: 5, alignItems: 'center'},
  titleOptionIcon: {fontSize: 22, color: COLORS.black},
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
    backgroundColor: '#6C6CDD',
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
  bedIcon: {
    position: 'absolute',
    opacity: 0.8,
  },
});
