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
import {ErrorMessage, Formik} from 'formik';
import {getDaysTextFromRecurrence} from '../constants/day-mapping';
import DatePicker from 'react-native-date-picker';
import {format, isAfter, parse} from 'date-fns';
import {array, boolean, object, string} from 'yup';
import FormError from '../components/forms/FormError';
import {parseFrom24hTime} from '../helpers/dateParsers';
import {useMutation, useQueryClient} from 'react-query';
import {useLoadingOverlayStore} from '../stores/loadingOverlayStore';
import {
  createDeviceSchedule,
  deleteDeviceSchedule,
} from '../API/deviceSchedules';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import useDeviceScheduleFormStore, {
  initialDeviceSchedule,
} from '../stores/deviceScheduleFormStore';
import {showConfirmationAlert} from '../helpers/alerts';

const validationSchema = object().shape({
  recurrence: array()
    .min(1, 'Debe seleccionar al menos un día')
    .required('Seleccione en que diás se repite'),
  startTime: string().required('Seleccione una hora de inicio'),
  endTime: string()
    .required('Seleccione una hora de fin')
    .test(
      'is-greater',
      'La hora de fin debe ser mayor a la hora de inicio',
      (value, ctx) => {
        if (!ctx.parent.startTime) {
          return true;
        }

        const baseDate = new Date();
        const parsedStartTime = parseFrom24hTime(
          ctx.parent.startTime,
          baseDate,
        );
        const parsedEndTime = parseFrom24hTime(value, baseDate);

        return isAfter(parsedEndTime, parsedStartTime);
      },
    ),
  isActive: boolean().required('Active o desactive la alarma'),
});

const NewAlarmScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;
  const editMode = route.params.editMode ?? false;

  const setIsLoading = useLoadingOverlayStore(state => state.setIsLoading);
  const queryClient = useQueryClient();

  const deviceSchedule = useDeviceScheduleFormStore(
    state => state.deviceSchedule,
  );

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

  const {mutateAsync: createScheduleMutation} = useMutation(
    data => createDeviceSchedule(data),
    {
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: () => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Programación creada!',
          textBody: 'Se ha programado el encendido y apagado del dispositivo.',
        });
        queryClient.invalidateQueries('device-schedules');
        navigation.goBack();
      },
    },
  );

  const {mutate: deleteScheduleMutation} = useMutation(
    data => deleteDeviceSchedule(deviceSchedule.id),
    {
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false),
      onSuccess: () => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Programación eliminada!',
          textBody: 'Se elimino una programación de dispositivo.',
        });
        queryClient.invalidateQueries('device-schedules');
        navigation.goBack();
      },
    },
  );

  const handleSubmit = async values => {
    await createScheduleMutation({
      ...values,
      id: deviceSchedule.id,
      deviceId,
      recurrence: values.recurrence.map(Number),
    });
  };

  const handleDelete = () => {
    showConfirmationAlert({
      title: 'Eliminar programación',
      message: '¿Está seguro?',
      okButtonPress: deleteScheduleMutation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <SectionTitle
          text={editMode ? 'Editar Programación' : 'Nuevo Programación'}
        />

        <Formik
          initialValues={initialDeviceSchedule(deviceSchedule)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({values, handleChange, handleSubmit, setFieldValue, errors}) => (
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

              <ErrorMessage component={FormError} name="recurrence" />
              <ErrorMessage component={FormError} name="startTime" />
              <ErrorMessage component={FormError} name="endTime" />
              <ErrorMessage component={FormError} name="isActive" />

              {editMode && (
                <CustomButton
                  label="Eliminar Programación"
                  onPress={handleDelete}
                  buttonColor={COLORS.lightGrey}
                  textColor={COLORS.primary}
                  width={'100%'}
                  height={50}
                />
              )}
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
                title="Hora de fin"
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
