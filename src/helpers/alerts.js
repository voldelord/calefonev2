import {Alert} from 'react-native';

export function showConfirmationAlert({
  title = '',
  message = '',
  cancelButtonText = 'Cancelar',
  onCancelPress,
  okButtonText = 'Aceptar',
  okButtonPress,
} = {}) {
  Alert.alert(title, message, [
    {
      text: cancelButtonText,
      onPress: onCancelPress,
      style: 'cancel',
    },
    {
      text: okButtonText,
      onPress: okButtonPress,
    },
  ]);
}
