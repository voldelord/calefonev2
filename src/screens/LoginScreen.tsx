import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Field, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import logo from '../assets/logo.jpg';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons'; // importa Ionicons
import google from '../assets/google.png';
import {useAuth} from '../context/AuthContext';

interface Props extends NativeStackScreenProps<any, any> {}

const initialValues = () => ({email: '', password: ''});

type FormValues = ReturnType<typeof initialValues>;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ingresar un email válido')
    .required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuth()!;

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    if (
      values.email !== 'customer@temptech.com' ||
      values.password !== 'password'
    ) {
      helpers.setErrors({email: 'Credenciales Incorrectas.'});
      return;
    }

    await login({
      token: 'the_token',
      user: {email: values.email, name: 'Pedro Perez'},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={logo} />
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}>
        {({handleSubmit}) => (
          <>
            <Text style={styles.parraph}>Iniciar Sesion</Text>
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
              label={'Password'}
              name="password"
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              inputType="password"
              as={InputField}
            />
            <BouncyCheckbox
              style={styles.checkbox}
              size={20}
              fillColor="green"
              unfillColor="#FFFFFF"
              text="Estoy deacuerdo con la Politica de Privacidad, Acuerdo del Usuario y Politica de Privacidad Infantil"
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                fontFamily: 'JosefinSans-Regular',
                fontSize: 10,
                textAlign: 'justify',
                marginRight: 10,
                marginBottom: 10,
              }}
              onPress={(isChecked: boolean) => {}}
            />

            <View style={styles.buttoncontainer}>
              <CustomButton
                label="Iniciar Sesion"
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

      <View style={styles.imagecentercontainer}>
        <Image style={styles.imagecenter} source={google} />
      </View>
      <View>
        <Text style={styles.textfooter}>Ya eres Usuario? Inicia Sesión</Text>
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
    marginHorizontal: 30,
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
  checkbox: {
    marginHorizontal: 20,
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
    padding: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
export default LoginScreen;
