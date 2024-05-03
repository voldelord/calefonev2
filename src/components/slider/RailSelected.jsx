import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/theme';

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.blue,
  },
});
