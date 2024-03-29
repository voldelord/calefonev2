import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {View} from 'react-native';
import {COLORS} from '../constants/theme';
import CustomButton from '../components/CustomButton';
import CustomSwitch from '../components/forms/CustomSwitch';
import DaysPicker from '../components/forms/DaysPicker';
import LeftRightRow from '../components/ui/LeftRightRow';
import useDisclosure from '../hooks/useDisclosure';
import {Formik} from 'formik';
import {getDaysTextFromRecurrence} from '../constants/day-mapping';
import DatePicker from 'react-native-date-picker';
import {format, parse} from 'date-fns';

const NewAlarmScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {
    isOpen: daysPickerIsOpen,
    onOpen: daysPickerOnOpen,
    onClose: daysPickerOnClose,
  } = useDisclosure();

  const {
    isOpen: startTimePickerIsOpen,
    onOpen: startTimePickerOnOpen,
    onClose: startTimePickerOnClose,
  } = useDisclosure();

  const {
    isOpen: endTimePickerIsOpen,
    onOpen: endTimePickerOnOpen,
    onClose: endTimePickerOnClose,
  } = useDisclosure();

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <SectionTitle text={deviceName} />

        <Formik
          initialValues={{
            recurrence: [],
            startTime: '',
            endTime: '',
            isActive: false,
          }}
          onSubmit={handleSubmit}>
          {({values, handleChange, handleSubmit, setFieldValue}) => (
            <>
              <View style={styles.scheduleForm}>
                <LeftRightRow
                  left="Repetir"
                  right={
                    getDaysTextFromRecurrence(values.recurrence) ||
                    'Seleccione un día'
                  }
                  onPress={daysPickerOnOpen}
                />
                <LeftRightRow
                  left="Hora de inicio"
                  right={
                    values.startTime.substring(0, 5) || 'Seleccione la hora'
                  }
                  onPress={startTimePickerOnOpen}
                />
                <LeftRightRow
                  left="Hora de fin"
                  right={values.endTime.substring(0, 5) || 'Seleccione la hora'}
                  onPress={endTimePickerOnOpen}
                />
                <LeftRightRow
                  left="Activar"
                  right={
                    <CustomSwitch
                      value={values.isActive}
                      size="sm"
                      trackBarActiveColor={COLORS.success}
                      trackBarInactiveColor={'#c91212'}
                      name="isActive"
                      onChange={handleChange}
                    />
                  }
                  noSeparator
                />
              </View>

              <CustomButton
                label="Eliminar Programación"
                //   onPress={handleSubmit}
                buttonColor={COLORS.lightGrey}
                textColor={COLORS.primary}
                width={'100%'}
                height={50}
              />
              <CustomButton
                label="Programar Horario"
                onPress={handleSubmit}
                buttonColor="#DA215D"
                textColor="white"
                width={'100%'}
                height={50}
              />

              <DaysPicker
                isOpen={daysPickerIsOpen}
                onSubmit={days => {
                  setFieldValue('recurrence', days);
                  daysPickerOnClose();
                }}
              />

              <DatePicker
                modal
                mode="time"
                title="Hora de inicio"
                confirmText="Aceptar"
                cancelText="Cancelar"
                open={startTimePickerIsOpen}
                date={
                  values.startTime
                    ? parse(values.startTime, 'HH:mm:ss', new Date())
                    : new Date()
                }
                onConfirm={date => {
                  startTimePickerOnClose();
                  setFieldValue('startTime', format(date, 'HH:mm:ss'));
                }}
                onCancel={startTimePickerOnClose}
                is24hourSource="locale"
                locale="es"
              />

              <DatePicker
                modal
                mode="time"
                title="Hora de inicio"
                confirmText="Aceptar"
                cancelText="Cancelar"
                open={endTimePickerIsOpen}
                date={
                  values.endTime
                    ? parse(values.endTime, 'HH:mm:ss', new Date())
                    : new Date()
                }
                onConfirm={date => {
                  endTimePickerOnClose();
                  setFieldValue('endTime', format(date, 'HH:mm:00'));
                }}
                onCancel={endTimePickerOnClose}
                is24hourSource="locale"
                locale="es"
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scheduleForm: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
  },
});

export default NewAlarmScreen;
