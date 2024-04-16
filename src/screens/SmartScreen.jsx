import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import changeModeIcon from '../assets/change-mode-icon.png';
import clockIcon from '../assets/clock-icon.png';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import RangeSlider from '../components/forms/RangeSlider';
import ModeButton from '../components/ModeButton';
import CustomSwitch from '../components/forms/CustomSwitch';
import {
  MQTT_DEVICE_MODES,
  MQTT_MODE_TO_SCREEN,
  MQTT_TOPICS,
} from '../constants/mqttTopics';
import CalefonOnOffText from '../components/ui/CalefonOnOffText';
import useModeScreen from '../hooks/useModeScreen';
import {COLORS} from '../constants/theme';
import Slider from '../components/slider/Slider';
import {useAuth} from '../context/AuthContext';
import {Formik} from 'formik';
import {number, object} from 'yup';
import {useMutation} from 'react-query';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import {createMeasurementConfig} from '../API/profile';
import {v4 as uuid} from 'uuid';

const validatioSchema = object().shape({
  maxKWHPerMonth: number().required('Ingrese el limite de kWh'),
  maxArsPerMonth: number().required('Ingrese el limite de ars'),
});

const allowedModes = [
  MQTT_DEVICE_MODES.POWER,
  MQTT_DEVICE_MODES.ECHO,
  MQTT_DEVICE_MODES.TEMPERATURE,
];

const SmartScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {user, updateUserMeasurementConfig} = useAuth();

  const startLoading = useLoadingOverlayStore(state => state.startLoading);
  const stopLoading = useLoadingOverlayStore(state => state.stopLoading);

  const {
    subscriptionValue: temperature,
    targetValue: targetTemperature,
    updateTargetValue: setTargetTemperature,
    isDeviceOn,
    updateSysState,
  } = useModeScreen({
    mode: MQTT_DEVICE_MODES.SMART,
    deviceId,
    topicToSubscribe: MQTT_TOPICS.TEMPERATURE,
    topicToPublish: MQTT_TOPICS.TARGET_SMART,
    onModeChange: useCallback(mode => {
      if (allowedModes.includes(mode)) {
        navigation.replace(MQTT_MODE_TO_SCREEN[mode], {deviceId, deviceName});
      }
    }, []),
  });

  const {
    mutate: createMeasurementConfigMutation,
    isLoading: createMeasurementConfigMutationIsLoading,
  } = useMutation(createMeasurementConfig, {
    onMutate: startLoading,
    onSettled: stopLoading,
  });

  const handleSubmit = (values, helpers) => {
    createMeasurementConfigMutation(
      {
        id: user.measurementConfig?.id ?? uuid(),
        ...values,
      },
      {
        onSettled: () => helpers.setSubmitting(false),
        onSuccess: (_, variables) => updateUserMeasurementConfig(variables),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <SectionTitle text={deviceName} style={{marginBottom: 10}} />

        <RangeSlider
          value={targetTemperature}
          title="MODO SMART"
          subTitleValue={temperature}
          subTitle={'Temperatura ambiente:'}
          unit="C°"
          max={35}
          onNewValue={setTargetTemperature}
          onMinus={setTargetTemperature}
          onPlus={setTargetTemperature}
        />

        <View style={{alignItems: 'center'}}>
          <CalefonOnOffText isDeviceOn={isDeviceOn} />

          <CustomSwitch
            value={isDeviceOn}
            onChange={e => updateSysState(e.target.value)}
          />
        </View>

        <View style={{marginBottom: 30, marginTop: 30}}>
          <ModeButton
            small
            icon={changeModeIcon}
            title={'Cambiar de modo'}
            style={{marginBottom: 15}}
            onPress={() => navigation.navigate('ModesScreen')}
          />
          <ModeButton
            small
            icon={clockIcon}
            title={'Programar horario'}
            redBg
            onPress={() =>
              navigation.navigate('AlarmScreen', {deviceId, deviceName})
            }
          />
        </View>

        <Formik
          initialValues={{
            maxKWHPerMonth: user.measurementConfig?.maxKWHPerMonth ?? 0,
            maxArsPerMonth: user.measurementConfig?.maxArsPerMonth ?? 0,
          }}
          validatioSchema={validatioSchema}
          onSubmit={handleSubmit}
          enableReinitialize>
          {({values, setFieldValue, dirty, handleSubmit}) => (
            <View style={{paddingBottom: 20}}>
              <View style={styles.limitTitleContainer}>
                <Text style={styles.limitTitle}>Límite de consumo por mes</Text>
                {dirty && (
                  <TouchableOpacity
                    style={styles.limitSave}
                    onPress={handleSubmit}
                    disabled={createMeasurementConfigMutationIsLoading}>
                    <Text style={styles.limitSaveText}>Guardar</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={[styles.limitContainer, {marginBottom: 30}]}>
                <Slider
                  style={{marginRight: 10}}
                  min={0}
                  max={3000}
                  low={values.maxKWHPerMonth}
                  onChange={useCallback(
                    value => setFieldValue('maxKWHPerMonth', value),
                    [],
                  )}
                  disabled={createMeasurementConfigMutationIsLoading}
                />
                <Text style={styles.limitText}>
                  {values.maxKWHPerMonth} KW/H
                </Text>
              </View>

              <View style={styles.limitContainer}>
                <Slider
                  style={{marginRight: 10}}
                  min={0}
                  max={4000}
                  low={values.maxArsPerMonth}
                  onChange={useCallback(
                    value => setFieldValue('maxArsPerMonth', value),
                    [],
                  )}
                  disabled={createMeasurementConfigMutationIsLoading}
                />
                <Text style={styles.limitText}>
                  {values.maxArsPerMonth} ARS
                </Text>
              </View>
            </View>
          )}
        </Formik>
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
    flex: 1,
  },
  limitContainer: {flexDirection: 'row', alignItems: 'center'},
  limitTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 35,
  },
  limitTitle: {color: COLORS.black},
  limitSave: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  limitSaveText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  limitText: {width: 73, textAlign: 'right'},
});

export default SmartScreen;
