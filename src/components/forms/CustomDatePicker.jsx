import DatePicker from 'react-native-date-picker';
import useDisclosure from '../../hooks/useDisclosure';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useCallback} from 'react';
import {formatToDateOnly} from '../../helpers/dateFormatter';
import {ErrorMessage} from 'formik';
import FormError from './FormError';
import {COLORS} from '../../constants/theme';

const CustomDatePickerTrigger = ({text, style}) => {
  return <Text style={[styles.dateOfBirthTrigger, style]}>{text}</Text>;
};

const CustomDatePicker = ({
  title = 'Seleccione la fecha',
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  trigger,
  triggerWrapperStyle,
  mode = 'date',
  value,
  onChange,
  name,
  placeholder = 'Fecha',
  showFormikError = false,
}) => {
  const {isOpen, onToggle} = useDisclosure();

  const finalTrigger = trigger || (
    <CustomDatePickerTrigger
      text={value ? formatToDateOnly(value) : placeholder}
      style={{color: value ? COLORS.black : undefined}}
    />
  );

  const handleConfirm = useCallback(
    date => {
      onToggle();
      onChange({target: {name, value: date}});
    },
    [onChange, name],
  );

  return (
    <>
      <View style={{marginBottom: 25}}>
        <Pressable style={triggerWrapperStyle} onPress={onToggle}>
          {finalTrigger}
        </Pressable>

        {showFormikError && <ErrorMessage name={name} component={FormError} />}
      </View>

      <DatePicker
        modal
        mode={mode}
        title={title}
        confirmText={confirmText}
        cancelText={cancelText}
        open={isOpen}
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={onToggle}
        is24hourSource="locale"
        locale="es"
      />
    </>
  );
};

const styles = StyleSheet.create({
  dateOfBirthTrigger: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
});

export default CustomDatePicker;
