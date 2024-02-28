import 'react-native-get-random-values';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import {Field, Formik} from 'formik';
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import SectionTitle from '../components/typography/SectionTitle';
import useAxios from '../hooks/useAxios';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import useScenaryFormStore from '../stores/scenaryFormStore';

const initialValues = ({name = ''} = {}) => ({name});

const scenarySchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
});

const NewScenaryScreen = ({navigation, route}) => {
  const homeId = route.params.homeId;
  const editMode = route.params.editMode ?? false;

  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);
  const scenary = useScenaryFormStore(state => state.scenary);

  const [{loading: createEnvironmentLoading}, createEnvironment] = useAxios(
    {url: `/v1/homes/${homeId}/environments`, method: 'POST'},
    {manual: true},
  );

  useEffect(() => {
    setIsLoading(createEnvironmentLoading);
  }, [createEnvironmentLoading]);

  const handleSubmit = async values => {
    await createEnvironment({
      data: {
        id: scenary.id,
        ...values,
      },
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <SectionTitle
          text={editMode ? 'Editar Ambiente' : 'Nuevo Ambiente'}
          style={{marginBottom: 10}}
        />

        <Formik
          initialValues={initialValues(scenary)}
          onSubmit={handleSubmit}
          validationSchema={scenarySchema}>
          {({handleSubmit}) => (
            <>
              <Field
                label={'Nombre'}
                name="name"
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

export default NewScenaryScreen;

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
