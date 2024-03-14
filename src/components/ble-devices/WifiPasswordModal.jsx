import {StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/theme';
import Header from '../layout/Header';
import InputField from '../InputField';
import CustomButton from '../CustomButton';
import {Field, Formik} from 'formik';
import {object, string} from 'yup';

const validationSchema = object({
  password: string()
    .min(8, 'Debe ingresar un mínimo de 8 caracteres')
    .required('La contraseña es requerida'),
});

const WifiPasswordModal = ({isOpen, onBackPress, ssid, onSubmit}) => {
  return (
    <ReactNativeModal isVisible={isOpen} style={styles.modal}>
      <View style={styles.container}>
        <Header
          onBackPress={onBackPress}
          hideNotificationIcon
          title="Contraseña del WIFI"
        />

        <View style={styles.content}>
          <Formik
            initialValues={{password: ''}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleSubmit}) => (
              <>
                <View style={styles.title}>
                  <Text>Ingrese la contraseña para</Text>
                  <Text style={styles.ssid}>{ssid}</Text>
                </View>

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
                  inputType="password"
                  showFormikError
                  as={InputField}
                />

                <CustomButton
                  label="Aceptar"
                  onPress={handleSubmit}
                  buttonColor="#DA215D"
                  textColor="white"
                  width={'100%'}
                  height={50}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {margin: 0},
  container: {backgroundColor: COLORS.white, flex: 1},
  content: {
    paddingHorizontal: 20,
  },
  title: {flexDirection: 'row', marginVertical: 5},
  ssid: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default WifiPasswordModal;
