import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants/theme';

const RangeSlider = ({value, name, onChange, step = 1, subTitleValue}) => {
  const handleChange = value => {
    onChange?.({target: {name, value}});
  };

  const onMinusPress = () => {
    // TODO: VALIDATE MINUS
    onChange?.({target: {name, value: value - step}});
  };

  const onPlusPress = () => {
    // TODO: VALIDATE PLUS
    onChange?.({target: {name, value: value + step}});
  };

  return (
    <View style={styles.rangePickerContainer}>
      <RadialSlider
        min={0}
        max={200}
        radius={150}
        value={value}
        subTitle=""
        unit="C°"
        thumbColor="#ffffff"
        thumbBorderWidth={1}
        thumbRadius={25}
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
        // buttonContainerStyle={{
        //   backgroundColor: 'tomato',
        //   width: '100%',
        //   justifyContent: 'space-between',
        //   margin: 0,
        // }}
        // subTitleStyle={{backgroundColor: 'blue', width: '100%', margin: 0}}
        onChange={handleChange}
      />

      <View style={styles.rangePickerBottomSection}>
        <View style={styles.rangePickerButtonContainer}>
          <TouchableOpacity
            style={styles.rangePickerButton}
            onPress={onMinusPress}>
            <FontAwesome5 name="minus" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rangePickerButton}
            onPress={onPlusPress}>
            <FontAwesome5 name="plus" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>MODO POTENCIA</Text>

        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Temperatura actual:</Text>
          <Text style={styles.subTitleValue}>{subTitleValue} C°</Text>
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
    top: 190,
  },
  rangePickerButtonContainer: {
    flexDirection: 'row',
    padding: 11,
    justifyContent: 'space-between',
  },
  rangePickerButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
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
