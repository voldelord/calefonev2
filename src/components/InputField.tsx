import React, {ReactElement, ReactNode} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface InputFieldProps {
  label: string;
  icon: ReactElement;
  inputType: 'password' | 'text'; // Asumo que solo hay dos tipos posibles
  fieldButtonLabel: string;
  fieldButtonFunction: () => void;
}

const InputField = ({
  label,
  icon,
  inputType,
  fieldButtonLabel,
  fieldButtonFunction,
}: InputFieldProps): ReactElement => {
  return (
    <View style={styles.inputContainer}>
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          style={styles.input}
          secureTextEntry={true}
        />
      ) : (
        <TextInput placeholder={label} style={styles.input} />
      )}
    </View>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    marginRight: 40,
    marginLeft: 40,
    alignItems: 'center',
  } as ViewStyle,
  input: {
    flex: 1,
    paddingVertical: 0,
    marginHorizontal: 50,
    marginLeft: 8,
  } as TextStyle,
  buttonText: {
    color: '#AD40AF',
    fontWeight: '700',
  } as TextStyle,
};

export default InputField;
