import { createStackNavigator } from '@react-navigation/stack';
import ModesScreen from '../screens/ModesScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import PowerScreen from '../screens/PowerScreen';
import EcoScreen from '../screens/EcoScreen';
import ChartScreen from '../screens/ChartScreen';
import SmartScreen from '../screens/SmartScreen';
import AllNotificationsScreens from '../screens/AllNotificationsScreens';

const Stack = createStackNavigator();

const DeviceControlStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ModesScreen' component={ModesScreen} />
            <Stack.Screen name='TemperatureScreen' component={TemperatureScreen} />
            <Stack.Screen name='PowerScreen' component={PowerScreen} />
            <Stack.Screen name='EcoScreen' component={EcoScreen} />
            <Stack.Screen name='ChartScreen' component={ChartScreen} />
            <Stack.Screen name='SmartScreen' component={SmartScreen} />
            <Stack.Screen name='AllNotificationsScreens' component={AllNotificationsScreens} />
        </Stack.Navigator>
    )
}

export default DeviceControlStack;