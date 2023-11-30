import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GaugeSVG from '@nassim99/react-native-gauge';

const value = 40; // 40% of the gauge. min=0 max=100
const UserProfileScreen = () => {
  return (
    <GaugeSVG
      size={150}
      insideTextColor={'purple'}
      gaugeColor={'black'}
      gaugeValueColor={'blue'}
      gaugeStroke={3}
      gaugeValueStroke={3.5}
      value={value}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text>{value}</Text>
      </View>
    </GaugeSVG>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
