import {createStackNavigator} from '@react-navigation/stack';
import HomeMenuScreen from '../screens/HomeMenuScreen';
import NewHomeScreen from '../screens/NewHomeScreen';
import AddScenaryScreen from '../screens/AddScenaryScreen';
import NewScenaryScreen from '../screens/NewScenaryScreen';
import ScenariosScreen from '../screens/ScenariosScreen';
import AllNotificationsScreens from '../screens/AllNotificationsScreens';
import ModesConetionScreen from '../screens/ModesConetionScreen';
import KeyConfigScreen from '../screens/KeyConfigScreen';
import DevicesScreen from '../screens/DevicesScreen';
import DeviceOptionsScreen from '../screens/DeviceOptionsScreen';
import SearchBLEDevicesScreenV2 from '../screens/SearchBLEDevicesScreenV2';
import HomeQrScanner from '../screens/HomeQrScanner';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMenuScreen" component={HomeMenuScreen} />
      <Stack.Screen name="NewHomeScreen" component={NewHomeScreen} />
      <Stack.Screen name="AddScenaryScreen" component={AddScenaryScreen} />
      <Stack.Screen name="NewScenaryScreen" component={NewScenaryScreen} />
      <Stack.Screen name="ScenariosScreen" component={ScenariosScreen} />
      <Stack.Screen
        name="AllNotificationsScreens"
        component={AllNotificationsScreens}
      />
      <Stack.Screen
        name="ModesConetionScreen"
        component={ModesConetionScreen}
      />
      <Stack.Screen name="KeyConfigScreen" component={KeyConfigScreen} />
      <Stack.Screen name="DevicesScreen" component={DevicesScreen} />
      <Stack.Screen
        name="DeviceOptionsScreen"
        component={DeviceOptionsScreen}
      />
      <Stack.Screen
        name="SearchBLEDevicesScreen"
        component={SearchBLEDevicesScreenV2}
      />
      <Stack.Screen name="HomeQrScanner" component={HomeQrScanner} />
    </Stack.Navigator>
  );
};

export default HomeStack;
