import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SectionTitle from '../components/typography/SectionTitle';
import Header from '../components/layout/Header';
import {useDeviceStore} from '../stores/device-store';
import ModeButton from '../components/ModeButton';
import {COLORS} from '../constants/theme';
import useAxios from '../hooks/useAxios';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import {useEffect} from 'react';
import {showConfirmationAlert} from '../helpers/alerts';

const DeviceOptionsScreen = ({navigation, route}) => {
  const homeId = route.params.homeId;
  const environmentId = route.params.environmentId;
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;
  const controllerId = route.params.controllerId;

  const setData = useDeviceStore(state => state.setData);

  const setIsLoadingOverlay = useLoadingOverlayStore(
    state => state.setIsLoading,
  );

  const [{loading: deleteControllerLoading}, deleteController] = useAxios(
    {
      method: 'delete',
      url: `/v1/controllers/${controllerId}`,
    },
    {manual: true},
  );

  useEffect(() => {
    setIsLoadingOverlay(deleteControllerLoading);
  }, [deleteControllerLoading]);

  const handleDeletePressed = () => {
    showConfirmationAlert({
      title: 'Eliminar ambiente',
      message: `¿Estas seguro de eliminar "${deviceName}"?`,
      okButtonPress: async () => {
        await deleteController();
        navigation.goBack();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <SectionTitle text={deviceName} />

        <ModeButton
          title={'Seleccionar'}
          style={{marginBottom: 15}}
          renderIcon={() => (
            <MaterialCommunityIcons
              size={32}
              color={COLORS.primary}
              name="chip"
            />
          )}
          onPress={() => {
            setData({homeId, environmentId, deviceId});

            navigation.navigate('DeviceControlStack', {
              screen: 'ModesScreen',
            });
          }}
        />
        <ModeButton
          title={'Eliminar'}
          renderIcon={() => (
            <MaterialCommunityIcons
              size={32}
              color={COLORS.primary}
              name="trash-can-outline"
            />
          )}
          onPress={handleDeletePressed}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default DeviceOptionsScreen;
