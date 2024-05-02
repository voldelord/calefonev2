import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {Field, Formik} from 'formik';
import {object, string} from 'yup';
import CustomDatePicker from '../components/forms/CustomDatePicker';
import {useMutation} from 'react-query';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import {createProfile} from '../API/profile';
import {v4 as uuid} from 'uuid';
import {useAuth} from '../context/AuthContext';
import {showErrorToast, showSuccessToast} from '../helpers/toast';
import extractErrorMessage from '../helpers/extractErrorMessage';

const validationSchema = object().shape({
  fullName: string().required('El nombre es requerido'),
  nickName: string().required('El nickname es requerido'),
  birthDate: string().required('La fecha de nacimiento es requerida'),
  phoneNumber: string().required('El teléfono es requerido'),
});

const EditProfileScreen = ({navigation}) => {
  const {user, updateUserProfile} = useAuth();
  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);

  const {mutate} = useMutation(createProfile, {
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onSuccess: (_, profileData) => {
      updateUserProfile(profileData);

      showSuccessToast({
        title: 'Editar Perfil',
        description: 'Perfil actualizado!',
      });
    },
    onError: error =>
      showErrorToast({
        title: 'Editar Perfil',
        description: extractErrorMessage(error),
      }),
  });

  const handleSubmit = (data, helpers) => {
    mutate(
      {
        id: uuid(),
        ...data,
      },
      {
        onSettled: () => helpers.setSubmitting(false),
        onSuccess: () => helpers.resetForm(),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <SectionTitle text={'Editar Perfil'} />

        <Formik
          initialValues={{
            fullName: user.profile?.fullName || '',
            nickName: user.profile?.nickName || '',
            birthDate: user.profile ? new Date(user.profile.birthDate) : '',
            phoneNumber: user.profile?.phoneNumber || '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <View style={{marginTop: 20}}>
              <Field
                label={'Nombre Completo'}
                name="fullName"
                showFormikError
                as={InputField}
              />
              <Field
                label={'NickName'}
                name="nickName"
                showFormikError
                as={InputField}
              />
              <Field
                name="birthDate"
                placeholder="Fecha de nacimiento"
                showFormikError
                as={CustomDatePicker}
              />
              <Field
                label={'Numero de Telefono'}
                name="phoneNumber"
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
    </SafeAreaView>
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
