import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Header from '../components/layout/Header';
import tempIcon from '../assets/temp-mode-icon.png';
import powerIcon from '../assets/mode-power-icon.png';
import ecoIcon from '../assets/mode-eco-icon.png';
import saveEnergyIcon from '../assets/save-energy-icon.png';
import envIndicatorsIcon from '../assets/environmental-indicators-icon.png';
import ModeButton from '../components/ModeButton';
import Dropdown from '../components/forms/Dropdown';
import useHomes from '../hooks/useHomes';
import useHomeEnvironments from '../hooks/useHomeEnvironments';
import useControllers from '../hooks/useControllers';
import {useFocusEffect} from '@react-navigation/native';
import {useDeviceStore} from '../stores/device-store';

const ModesScreen = ({navigation}) => {
  const homeId = useDeviceStore(state => state.homeId);
  const environmentId = useDeviceStore(state => state.environmentId);
  const deviceId = useDeviceStore(state => state.deviceId);
  const setData = useDeviceStore(state => state.setData);

  const {homes, loading: homesLoading, getHomes} = useHomes();

  const {
    environments,
    loading: environmentsLoading,
    getEnvironments,
  } = useHomeEnvironments({homeId: homeId});
  const {
    controllers,
    loading: controllersLoading,
    getControllers,
  } = useControllers({
    params: {
      filters: [{field: 'environmentId', operator: '=', value: environmentId}],
    },
  });

  useFocusEffect(
    useCallback(() => {
      getHomes();
    }, []),
  );

  useEffect(() => {
    getEnvironments();
  }, [homeId]);

  useEffect(() => {
    getControllers();
  }, [environmentId]);

  const navigateToScreenWithDevice = screenName => {
    if (!deviceId) {
      return Alert.alert('Seleccione un dispositivo');
    }

    const device = controllers.find(c => c.deviceId === deviceId);

    navigation.navigate(screenName, {
      deviceId: deviceId,
      deviceName:
        device.description || `Dispositivo ${controllers.indexOf(device) + 1}`,
    });
  };

  const powerPress = () => {
    navigation.navigate('PowerScreen');
  };
  const ecoPress = () => {
    navigation.navigate('EcoScreen');
  };
  const energyPress = () => {
    navigation.navigate('ChartScreen');
  };
  const smartPress = () => {
    navigation.navigate('SmartScreen');
  };
  const handleLoginPress = () => {
    console.log('ChartScreen');
  };

  const handleDropdownChange = e => {
    setData(data => ({
      ...data,
      [e.target.name]:
        e.target.name === 'deviceId'
          ? e.target.value.deviceId
          : e.target.value.id,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={[styles.pickerContainer, styles.contentPadding]}>
        <View style={{width: '33.33%'}}>
          <Dropdown
            items={homes}
            defaultValue={homes.find(home => home.id === homeId)}
            defaultButtonText="Hogar"
            disabled={homesLoading}
            buttonTextAfterSelection={home => home.name}
            rowTextForSelection={home => home.name}
            name="homeId"
            onChange={handleDropdownChange}
          />
        </View>
        <View style={{width: '33.33%'}}>
          <Dropdown
            items={environments}
            defaultValue={environments.find(
              environment => environment.id === environmentId,
            )}
            defaultButtonText="Ambiente"
            disabled={environmentsLoading}
            buttonTextAfterSelection={environment => environment.name}
            rowTextForSelection={environment => environment.name}
            name="environmentId"
            onChange={handleDropdownChange}
          />
        </View>
        <View style={{width: '33.33%'}}>
          <Dropdown
            items={controllers}
            defaultValue={controllers.find(
              controller => controller.deviceId === deviceId,
            )}
            defaultButtonText="Dispositivo"
            disabled={controllersLoading}
            buttonTextAfterSelection={(controller, i) =>
              controller.description || `Dispositivo ${i + 1}`
            }
            rowTextForSelection={(controller, i) =>
              controller.description || `Dispositivo ${i + 1}`
            }
            name="deviceId"
            onChange={handleDropdownChange}
          />
        </View>
      </View>

      <ScrollView style={[styles.content, styles.contentPadding]}>
        <ModeButton
          title={'Modo temperatura'}
          icon={tempIcon}
          style={{marginBottom: 20}}
          onPress={() => navigateToScreenWithDevice('TemperatureScreen')}
        />
        <ModeButton
          title={'Modo potencia'}
          icon={powerIcon}
          style={{marginBottom: 20}}
          onPress={powerPress}
        />
        <ModeButton
          title={'Modo ECO'}
          icon={ecoIcon}
          style={{marginBottom: 20}}
          onPress={ecoPress}
        />
        <ModeButton
          title={'Ahorro de energía'}
          icon={saveEnergyIcon}
          style={{marginBottom: 20}}
          onPress={energyPress}
        />
        <ModeButton
          title={'Indicaciones ambientales'}
          icon={envIndicatorsIcon}
          style={{marginBottom: 20}}
          onPress={handleLoginPress}
        />
        <ModeButton title={'Modo Temperatura'} icon={tempIcon} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentPadding: {
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
});
