import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.lightGrey,
  },
});
