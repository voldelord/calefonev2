import 'react-native-get-random-values';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {v4 as uuid} from 'uuid';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import * as Yup from 'yup';
import {Field, Formik} from 'formik';
import useAxios from '../hooks/useAxios';

const initialValues = () => ({deviceId: ''});

const deviceSchema = Yup.object().shape({
  deviceId: Yup.string().required('El código es requerido'),
});

const KeyConfigScreen = ({navigation, route}) => {
  const environmentId = route.params.environmentId;

  const [_, createController] = useAxios(
    {url: '/v1/controllers', method: 'POST'},
    {manual: true},
  );

  const handleSubmit = async (values, helpers) => {
    try {
      await createController({
        data: {
          id: uuid(),
          deviceId: values.deviceId,
          description: '',
          environmentId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>
          Introducir el código de configuración del dispositivo matter
        </Text>
        <Text style={styles.parraph}>
          Aplicable únicamente a un dispositivo matter. Buscar el código de
          configuración en el dispositivo, embalaje o en el manual
        </Text>

        <Formik
          initialValues={initialValues()}
          onSubmit={handleSubmit}
          validationSchema={deviceSchema}>
          {({handleSubmit}) => (
            <>
              <View style={styles.inputcontainer}>
                <Field
                  label={'Introduzca el código del dispositivo'}
                  name="deviceId"
                  showFormikError
                  as={InputField}
                />
              </View>
              <View style={styles.buttoncontainer}>
                <CustomButton
                  label="Siguiente"
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

export default KeyConfigScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parraph: {
    marginTop: 20,
    textAlign: 'justify',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  inputcontainer: {
    marginTop: 40,
  },
});
