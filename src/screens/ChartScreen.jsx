import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import ChartComponent from '../components/ChartComponent';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';

const ChartScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />

      <View style={[styles.content, styles.contentPadding]}>
        <SectionTitle text={deviceName} />
        <ChartComponent deviceId={deviceId} />
      </View>
    </SafeAreaView>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentPadding: {
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
});
