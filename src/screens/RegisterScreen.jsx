import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {v4 as uuid} from 'uuid';
import CustomButton from '../components/CustomButton';
import logo from '../assets/logo-full.png';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import google from '../assets/google.png';
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik} from 'formik';
import FormError from '../components/forms/FormError';
import useAxios from '../hooks/useAxios';
import extractErrorMessage from '../helpers/extractErrorMessage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const initialValues = () => ({
  email: '',
  password: '',
  passwordConfirmation: '',
  acceptTermsOfService: false,
});

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ingresar un email válido')
    .required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar la contraseña'),
  acceptTermsOfService: Yup.boolean().isTrue(
    'Debes aceptar la política de privacidad',
  ),
});

const RegisterScreen = ({navigation}) => {
  const [{loading: registerLoading}, register] = useAxios(
    {
      method: 'POST',
      url: '/v1/auth/register',
    },
    {manual: true},
  );

  const handleSubmit = async data => {
    if (registerLoading) {
      return;
    }

    try {
      await register({
        data: {
          ...data,
          id: uuid(),
        },
      });

      navigation.navigate('LoginScreen', {
        email: data.email,
        password: data.password,
        doLogin: true,
      });
    } catch (e) {
      const errorMessage = extractErrorMessage(e);

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: errorMessage,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={logo} />
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.parraph}>Registro</Text>

        <Formik
          initialValues={initialValues()}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}>
          {({handleSubmit, values, setFieldValue}) => (
            <>
              <Field
                label={'Email'}
                name="email"
                icon={
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                showFormikError
                as={InputField}
              />

              <Field
                label={'Contraseña'}
                name="password"
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                showFormikError
                inputType="password"
                as={InputField}
              />

              <Field
                label={'Confirmar Contraseña'}
                name="passwordConfirmation"
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                showFormikError
                inputType="password"
                as={InputField}
              />

              <BouncyCheckbox
                isChecked={values.acceptTermsOfService}
                size={20}
                fillColor="green"
                unfillColor="#FFFFFF"
                text="Estoy deacuerdo con la Politica de Privacidad, Acuerdo del Usuario y Politica de Privacidad Infantil"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{
                  fontSize: 10,
                  textAlign: 'justify',
                  textDecorationLine: 'none',
                }}
                onPress={isChecked =>
                  setFieldValue('acceptTermsOfService', isChecked)
                }
              />

              <ErrorMessage
                name={'acceptTermsOfService'}
                component={FormError}
              />

              <View style={styles.buttoncontainer}>
                <CustomButton
                  label="Confirmar"
                  onPress={handleSubmit}
                  buttonColor="#DA215D"
                  textColor="white"
                  width={'100%'}
                  height={50}
                  disabled={registerLoading}
                />
              </View>
            </>
          )}
        </Formik>
      </View>

      <View style={styles.imagecentercontainer}>
        <Image style={styles.imagecenter} source={google} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.textfooter}>Ya eres Usuario?</Text>
        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: '#DA215D', marginLeft: 5}}>Inicia Sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  parraph: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  imagecentercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 40,
  },
  imagecenter: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  textfooter: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
export default RegisterScreen;
