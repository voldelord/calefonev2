import 'react-native-get-random-values';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import useAxios from '../hooks/useAxios';

const initialValues = () => ({name: '', address: ''});

const homeSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  address: Yup.string().required('La dirección es requerida'),
});

const NewHomeScreen = ({navigation}) => {
  const [_, createHome] = useAxios(
    {url: '/v1/homes', method: 'POST'},
    {manual: true},
  );

  const handleSubmit = async values => {
    await createHome({
      data: {
        id: uuid(),
        ...values,
      },
    });

    navigation.navigate('HomeMenuScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <SectionTitle text={'Nuevo Hogar'} style={{marginBottom: 10}} />

        <Formik
          initialValues={initialValues()}
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
                  width={250}
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
