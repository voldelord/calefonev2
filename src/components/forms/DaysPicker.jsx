import {StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/theme';
import LeftRightRow from '../ui/LeftRightRow';
import {DAY_MAPPING} from '../../constants/day-mapping';
import CustomButton from '../CustomButton';
import {useState} from 'react';

const DaysPicker = ({isOpen, initialDays = [], onSubmit}) => {
  const [selectedDays, setSelectedDays] = useState(initialDays);

  const handleDayClick = day => {
    setSelectedDays(days =>
      days.includes(day)
        ? days.filter(_day => _day !== day)
        : [...days, day].sort(),
    );
  };

  const handleSubmit = () => {
    onSubmit?.(selectedDays);
  };

  return (
    <ReactNativeModal isVisible={isOpen}>
      <View>
        <View style={styles.root}>
          {Object.keys(DAY_MAPPING).map(key => (
            <LeftRightRow
              key={key}
              left={DAY_MAPPING[key]}
              right={
                selectedDays.includes(key) ? (
                  <AntDesign name="check" style={styles.checkIcon} />
                ) : null
              }
              noSeparator={key === 6}
              onPress={() => handleDayClick(key)}
            />
          ))}
        </View>
        <CustomButton
          label="Aceptar"
          onPress={handleSubmit}
          buttonColor={COLORS.primary}
          textColor="white"
          width={'100%'}
          height={50}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 24,
  },
});

export default DaysPicker;
