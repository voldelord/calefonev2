import {createStackNavigator} from '@react-navigation/stack';
import HomeMenuScreen from '../screens/HomeMenuScreen';
import NewHomeScreen from '../screens/NewHomeScreen';
import HomesScreen from '../screens/HomesScreen';
import AddScenaryScreen from '../screens/AddScenaryScreen';
import NewScenaryScreen from '../screens/NewScenaryScreen';
import ScenariosScreen from '../screens/ScenariosScreen';
import SearchDevicesScreen from '../screens/SearchDevicesScreen';
import AllNotificationsScreens from '../screens/AllNotificationsScreens';
import ModesConetionScreen from '../screens/ModesConetionScreen';
import KeyConfigScreen from '../screens/KeyConfigScreen';
import ComRequestScreen from '../screens/ComRequestScreen';
import WirelessDeviceScreen from '../screens/WirelessDeviceScreen';
import DevicesScreen from '../screens/DevicesScreen';
import SearchBLEDevicesScreen from '../screens/SearchBLEDevicesScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMenuScreen" component={HomeMenuScreen} />
      <Stack.Screen name="NewHomeScreen" component={NewHomeScreen} />
      <Stack.Screen name="HomesScreen" component={HomesScreen} />
      <Stack.Screen name="AddScenaryScreen" component={AddScenaryScreen} />
      <Stack.Screen name="NewScenaryScreen" component={NewScenaryScreen} />
      <Stack.Screen name="ScenariosScreen" component={ScenariosScreen} />
      <Stack.Screen
        name="SearchDevicesScreen"
        component={SearchDevicesScreen}
      />
      <Stack.Screen
        name="AllNotificationsScreens"
        component={AllNotificationsScreens}
      />
      <Stack.Screen
        name="ModesConetionScreen"
        component={ModesConetionScreen}
      />
      <Stack.Screen name="KeyConfigScreen" component={KeyConfigScreen} />
      <Stack.Screen name="ComRequestScreen" component={ComRequestScreen} />
      <Stack.Screen
        name="WirelessDeviceScreen"
        component={WirelessDeviceScreen}
      />
      <Stack.Screen name="DevicesScreen" component={DevicesScreen} />
      <Stack.Screen name="SearchBLEDevicesScreen" component={SearchBLEDevicesScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
