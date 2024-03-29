import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/theme';
import CustomSwitch from './forms/CustomSwitch';
import {DAY_MAPPING} from '../constants/day-mapping';

const DeviceSchedule = ({style, schedule, onToggle}) => {
  const daysText = schedule.recurrence
    .sort()
    .map(day => DAY_MAPPING[day])
    .join(', ');

  return (
    <View style={[styles.root, style]}>
      <View style={styles.scheduleRoot}>
        <Pressable style={styles.hourRoot}>
          <Text style={styles.hour}>
            {schedule.startTime.substring(0, 5)} -{' '}
          </Text>
          <Text style={styles.hour}>{schedule.endTime.substring(0, 5)}</Text>
        </Pressable>
        <CustomSwitch
          size="sm"
          value={schedule.isActive}
          onChange={onToggle}
          containerStyle={styles.scheduleToggle}
        />
      </View>
      <Text style={styles.days}>{daysText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  scheduleRoot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourRoot: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 20,
  },
  hour: {
    fontSize: 32,
    fontWeight: '500',
    color: COLORS.black,
  },
  scheduleToggle: {
    marginLeft: 'auto',
  },
  days: {
    fontSize: 12,
    marginRight: 5,
    fontStyle: 'italic',
  },
});

export default DeviceSchedule;
