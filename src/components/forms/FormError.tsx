import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/theme';

const FormError = ({children}: React.PropsWithChildren) => (
  <Text style={styles.error}>{children}</Text>
);

const styles = StyleSheet.create({
  error: {
    marginTop: 8,
    fontStyle: 'italic',
    color: COLORS.error,
  },
});

export default FormError;
