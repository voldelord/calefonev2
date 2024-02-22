import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {Field, Formik} from 'formik';

const EditProfileScreen = ({navigation}) => {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <SectionTitle text={'Editar Perfil'} />

        <Formik
          initialValues={{
            name: '',
            nickname: '',
            birthdate: '',
            email: '',
            phone: '',
            sex: '',
          }}
          onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <View style={{marginTop: 20}}>
              <Field
                label={'Nombre Completo'}
                name="name"
                showFormikError
                as={InputField}
              />
              <Field
                label={'NickName'}
                name="nickname"
                showFormikError
                as={InputField}
              />
              <Field
                label={'Fecha de Nacimiento'}
                name="birthdate"
                showFormikError
                as={InputField}
              />
              <Field
                label={'Email'}
                name="email"
                showFormikError
                as={InputField}
              />
              <Field
                label={'Numero de Telefono'}
                name="phone"
                showFormikError
                as={InputField}
              />
              <Field
                label={'Sexo'}
                name="sex"
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
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 25,
  },
  buttoncontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
