import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/theme';

const TitleOptionButton = ({style, disabled, onPress, icon, IconProvider}) => (
  <TouchableOpacity
    style={[styles.titleOption, style]}
    onPress={onPress}
    disabled={disabled}>
    <IconProvider name={icon} style={styles.titleOptionIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  titleSection: {flexDirection: 'row', alignItems: 'center'},
  titleOption: {paddingHorizontal: 5, alignItems: 'center'},
  titleOptionIcon: {fontSize: 22, color: COLORS.black},
});

export default TitleOptionButton;
