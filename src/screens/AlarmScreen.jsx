import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/layout/Header';
import SectionTitle from '../components/typography/SectionTitle';
import {COLORS} from '../constants/theme';
import DeviceSchedule from '../components/DeviceSchedule';
import {useQuery} from 'react-query';
import {getDeviceSchedules} from '../API/deviceSchedules';
import LoadingView from '../components/ui/LoadingView';

const AlarmScreen = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceName = route.params.deviceName;

  const {data: schedules, isLoading: schedulesIsLoading} = useQuery(
    ['device-schedules', deviceId],
    () => getDeviceSchedules(deviceId),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.titleSection}>
          <SectionTitle text={deviceName} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('NewAlarmScreen', {deviceId, deviceName})
            }>
            <Entypo name="plus" style={styles.addButtonIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.schedules}>
          {schedulesIsLoading ? (
            <LoadingView />
          ) : (
            <FlatList
              ItemSeparatorComponent={<View style={{height: 15}} />}
              data={schedules?.items ?? []}
              renderItem={({item}) => (
                <DeviceSchedule schedule={item} onToggle={console.log} />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  addButtonIcon: {
    fontSize: 28,
    color: COLORS.primary,
  },
  schedules: {
    marginTop: 20,
  },
});

export default AlarmScreen;
