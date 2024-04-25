import 'react-native-get-random-values';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ErrorMessage, Field, Formik} from 'formik';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import useAxios from '../hooks/useAxios';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import homeFormStore from '../stores/homeFormStore';
import CustomSwitch from '../components/forms/CustomSwitch';
import {COLORS} from '../constants/theme';
import {requestLocationPermission} from '../helpers/permissions';
import {getCurrentPosition} from '../helpers/geolocation';
import {useMutation} from 'react-query';
import FormError from '../components/forms/FormError';
import {showErrorToast} from '../helpers/toast';

const initialValues = ({
  name = '',
  address = '',
  isMain = false,
  latitude = '',
  longitude = '',
} = {}) => ({name, address, isMain, latitude, longitude});

const homeSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  address: Yup.string().required('La dirección es requerida'),
  isMain: Yup.boolean().required('Seleccione si es hogar principal'),
  latitude: Yup.number().required('La ubicación es requerida'),
});

const LocationGetter = ({value, onLocation}) => {
  const {mutate, isLoading} = useMutation(
    async () => {
      const isLocationAllowed = await requestLocationPermission();

      if (!isLocationAllowed) {
        throw new Error('Permiso de ubicación denegado.');
      }

      const position = await getCurrentPosition();

      return {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
    },
    {
      onSuccess: data => onLocation?.(data),
      onError: error =>
        showErrorToast({
          title: 'Permisos de ubicación',
          description: error.message,
        }),
    },
  );

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={mutate}
      disabled={isLoading}>
      <EvilIcons name="location" size={30} />
      {isLoading ? (
        <Text>Obteniendo ubicación...</Text>
      ) : value ? (
        <Text>
          Coordenadas: {value.lat.toFixed(4)}, {value.long.toFixed(4)}
        </Text>
      ) : (
        <Text>Obtener ubicación</Text>
      )}
    </TouchableOpacity>
  );
};

const NewHomeScreen = ({navigation, route}) => {
  const editMode = route.params?.editMode ?? false;

  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);
  const home = homeFormStore(state => state.home);

  const [{loading: createHomeLoading}, createHome] = useAxios(
    {url: '/v1/homes', method: 'POST'},
    {manual: true},
  );

  useEffect(() => {
    setIsLoading(createHomeLoading);
  }, [createHomeLoading]);

  const handleSubmit = async values => {
    await createHome({
      data: {
        id: home.id,
        inhabitants: home.inhabitants,
        ...values,
      },
    });

    navigation.navigate('HomeMenuScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <SectionTitle
          text={editMode ? 'Editar Hogar' : 'Nuevo Hogar'}
          style={{marginBottom: 10}}
        />

        <Formik
          initialValues={initialValues(home)}
          onSubmit={handleSubmit}
          validationSchema={homeSchema}>
          {({values, handleSubmit, handleChange, setFieldValue}) => (
            <>
              <Field
                label={'Nombre'}
                name="name"
                showFormikError
                as={InputField}
              />

              <Field
                label={'Dirección'}
                name="address"
                showFormikError
                as={InputField}
              />

              <View style={styles.switchContainer}>
                <Text>Hogar Principal</Text>
                <CustomSwitch
                  value={values.isMain}
                  size="sm"
                  trackBarActiveColor={COLORS.success}
                  trackBarInactiveColor={'#c91212'}
                  name="isMain"
                  onChange={handleChange}
                />
              </View>

              <LocationGetter
                value={
                  values.latitude && values.longitude
                    ? {lat: values.latitude, long: values.longitude}
                    : null
                }
                onLocation={coords => {
                  setFieldValue('latitude', coords.lat);
                  setFieldValue('longitude', coords.long);
                }}
              />
              <ErrorMessage name={'latitude'} component={FormError} />

              <View style={styles.buttoncontainer}>
                <CustomButton
                  label="Confirmar"
                  onPress={handleSubmit}
                  buttonColor="#DA215D"
                  textColor="white"
                  width={'100%'}
                  height={50}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default NewHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    marginVertical: 60,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
