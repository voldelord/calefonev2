import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {COLORS} from '../constants/theme';
import {useQuery} from 'react-query';
import {getPowerMeasurements} from '../API/powerMeasurements';
import LoadingView from './ui/LoadingView';
import {format, parse} from 'date-fns';
const {width} = Dimensions.get('window');

const ChartComponent = ({deviceId}) => {
  const {data, isLoading, isError, error} = useQuery(
    ['powerMeasurements', deviceId],
    () => getPowerMeasurements(deviceId),
  );

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error.message}</Text>
      </View>
    );
  }

  const labels = data.items.map(
    measurement =>
      format(parse(measurement.hour, 'HH:mm:ss', new Date()), 'HH') + ' h',
  );

  const chartData = data.items.map(measurement => measurement.energyConsumed);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.chartTitleContainer}>
          <Text style={styles.title}>Ahorro de energía</Text>
        </View>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={width - 50}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            fillShadowGradientFrom: COLORS.primary,
            fillShadowGradientTo: '#964FAB',
            fillShadowGradientOpacity: 1,
            fillShadowGradientToOpacity: 1,
            color: () => COLORS.black,
            labelColor: () => COLORS.black,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
        />
      </View>
    </View>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    width: width - 30,
  },
  chartTitleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 15,
  },
});
