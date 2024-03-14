import 'react-native-get-random-values';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import useAxios from '../hooks/useAxios';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import homeFormStore from '../stores/homeFormStore';

const initialValues = ({name = '', address = ''} = {}) => ({name, address});

const homeSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  address: Yup.string().required('La dirección es requerida'),
});

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
          {({handleSubmit}) => (
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
});
