import {ErrorMessage} from 'formik';
import React, {ReactElement} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import FormError from './forms/FormError';

interface InputFieldProps {
  label: string;
  icon?: ReactElement;
  inputType?: 'password' | 'text'; // Asumo que solo hay dos tipos posibles,
  name: string;
  value?: string;
  onChange?: (e: {target: {value: string; name: string}}) => void;
  showFormikError?: boolean;
}

const InputField = ({
  label,
  icon,
  inputType = 'text',
  value,
  onChange,
  name,
  showFormikError = false,
}: InputFieldProps): ReactElement => {
  const handleChange = (value: string) => {
    onChange?.({target: {value, name}});
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          placeholder={label}
          style={styles.input}
          secureTextEntry={inputType === 'password'}
          value={value}
          onChangeText={handleChange}
        />
      </View>
      {showFormikError && <ErrorMessage name={name} component={FormError} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 25, paddingHorizontal: 30},
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    marginHorizontal: 50,
    marginLeft: 8,
  },
  buttonText: {
    color: '#AD40AF',
    fontWeight: '700',
  },
});

export default InputField;
