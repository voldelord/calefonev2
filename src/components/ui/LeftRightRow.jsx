import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/theme';

const LeftRightRow = ({left, right, noSeparator, onPress}) => (
  <Pressable
    style={[styles.alarmRow, {borderBottomWidth: noSeparator ? 0 : 1}]}
    onPress={onPress}>
    <Text style={styles.alarmText} numberOfLines={1}>
      {left}
    </Text>
    <Text style={[styles.alarmText, {maxWidth: 220}]} numberOfLines={1}>
      {right}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    height: 45,
  },
  alarmText: {
    fontWeight: '500',
    color: COLORS.black,
  },
});

export default LeftRightRow;
