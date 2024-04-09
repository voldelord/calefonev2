import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../constants/theme';

const RangeSlider = ({
  value,
  name,
  onChange,
  onNewValue,
  onMinus,
  onPlus,
  step = 1,
  title,
  subTitle,
  subTitleValue,
  unit,
  min = 0,
  max = 100,
}) => {
  const handleChange = useCallback(
    _value => {
      onChange?.({target: {name, value: _value}});

      if (_value === value) {
        return;
      }

      onNewValue?.(_value);
    },
    [onChange, name, value, onNewValue],
  );

  const handleMinusPress = useCallback(() => {
    const newValue = value - step;

    if (newValue >= min) {
      onMinus?.(newValue);
    }
  }, [onMinus, value, step, min]);

  const handlePlusPress = useCallback(() => {
    const newValue = value + step;

    if (newValue <= max) {
      onPlus?.(newValue);
    }
  }, [onPlus, value, step, max]);

  return (
    <View style={styles.rangePickerContainer}>
      <RadialSlider
        min={min}
        max={max}
        radius={150}
        value={value}
        subTitle=""
        unit={unit}
        thumbColor="#ffffff"
        thumbBorderWidth={1}
        thumbRadius={22}
        thumbBorderColor="#ddd"
        sliderWidth={22}
        linearGradient={[
          {offset: '0%', color: '#87F0AB'},
          {offset: '50%', color: '#E2DCA0'},
          {offset: '100%', color: '#FEA2AD'},
        ]}
        valueStyle={{
          fontSize: 48,
          color: COLORS.black,
          fontWeight: 'normal',
        }}
        unitStyle={{fontSize: 48, color: COLORS.black}}
        openingRadian={Math.PI / 2}
        isHideLines={true}
        isHideMarkerLine={true}
        isHideButtons={true}
        isHideTailText={true}
        isHideTitle={true}
        onChange={handleChange}
      />

      <View style={styles.rangePickerBottomSection}>
        <View style={styles.rangePickerButtonContainer}>
          <TouchableOpacity
            style={styles.rangePickerButton}
            onPress={handleMinusPress}>
            <FontAwesome5 name="minus" style={styles.rangePickerButtonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rangePickerButton}
            onPress={handlePlusPress}>
            <FontAwesome5 name="plus" style={styles.rangePickerButtonIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <Text style={styles.subTitleValue}>
            {subTitleValue} {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rangePickerContainer: {
    alignItems: 'center',
  },
  rangePickerBottomSection: {
    width: '100%',
    position: 'absolute',
    top: 200,
    alignItems: 'center',
  },
  rangePickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 322,
  },
  rangePickerButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rangePickerButtonIcon: {
    fontSize: 18,
    color: COLORS.primary,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  subTitle: {fontSize: 18, color: COLORS.black, marginRight: 5},
  subTitleValue: {fontSize: 18, color: COLORS.primary},
});

export default RangeSlider;
