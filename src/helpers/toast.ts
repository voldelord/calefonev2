import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const showSuccessToast = (data: {title: string; description: string}) =>
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: data.title,
    textBody: data.description,
  });

export const showErrorToast = (data: {title: string; description: string}) =>
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: data.title,
    textBody: data.description,
  });
