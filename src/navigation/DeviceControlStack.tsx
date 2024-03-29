import {createStackNavigator} from '@react-navigation/stack';
import ModesScreen from '../screens/ModesScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import PowerScreen from '../screens/PowerScreen';
import EcoScreen from '../screens/EcoScreen';
import ChartScreen from '../screens/ChartScreen';
import SmartScreen from '../screens/SmartScreen';
import AlarmScreen from '../screens/AlarmScreen';

const Stack = createStackNavigator();

const DeviceControlStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ModesScreen" component={ModesScreen} />
      <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} />
      <Stack.Screen name="PowerScreen" component={PowerScreen} />
      <Stack.Screen name="EcoScreen" component={EcoScreen} />
      <Stack.Screen name="ChartScreen" component={ChartScreen} />
      <Stack.Screen name="SmartScreen" component={SmartScreen} />
      <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
    </Stack.Navigator>
  );
};

export default DeviceControlStack;
