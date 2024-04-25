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
import useAxios from '../hooks/useAxios';
import {showConfirmationAlert} from '../helpers/alerts';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import TitleSection from '../components/TitleSection';
import useScenaryFormStore from '../stores/scenaryFormStore';
import HomeQRModal from '../components/homes/HomeQRModal';
import useDisclosure from '../hooks/useDisclosure';

const ScenariosScreen = ({navigation, route}) => {
  const homeId = route.params.homeId;
  const homeName = route.params.homeName;

  const {
    isOpen: qrModalIsOpen,
    onOpen: qrModalOnOpen,
    onClose: qrModalOnClose,
  } = useDisclosure();
  const setIsLoadingOverlay = useLoadingOverlayStore(
    state => state.setIsLoading,
  );
  const crearScenary = useScenaryFormStore(state => state.crearScenary);
  const updateScenary = useScenaryFormStore(state => state.updateScenary);
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

  const handleAddScenaryPress = () => {
    crearScenary();

    navigation.navigate('NewScenaryScreen', {homeId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <TitleSection
          title={homeName}
          onDeletePress={handleDeletePressed}
          deleteDisabled={deleteHomeLoading}
          onEditPress={() => {
            navigation.navigate('NewHomeScreen', {
              editMode: true,
            });
          }}
          onQrPressed={qrModalOnOpen}
        />

        {environments.map(environment => (
          <TouchableOpacity
            key={environment.id}
            style={styles.myhouse}
            onPress={() => {
              updateScenary(environment);

              navigation.navigate('DevicesScreen', {
                homeId,
                environmentId: environment.id,
                environmentName: environment.name,
              });
            }}>
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
          onPress={handleAddScenaryPress}>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={30} color="#DA215D" />
          </View>
          {noEnvironments && <Text>No tenés ninguna ambiente registrado</Text>}
          <Text style={styles.parraph}>Agrega un ambiente</Text>
        </TouchableOpacity>
      </ScrollView>

      <HomeQRModal
        homeId={homeId}
        homeName={homeName}
        isOpen={qrModalIsOpen}
        onBackPress={qrModalOnClose}
      />
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
