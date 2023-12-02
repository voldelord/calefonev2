import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import CheckScreen from '../screens/CheckScreen';
import {Tabs} from './Tab';
import NewHomeScreen from '../screens/NewHomeScreen';
import HomesScreen from '../screens/HomesScreen';
import AddScenaryScreen from '../screens/AddScenaryScreen';
import NewScenaryScreen from '../screens/NewScenaryScreen';
import ScenariosScreen from '../screens/ScenariosScreen';
import SearchDevicesScreen from '../screens/SearchDevicesScreen';
import ModesConetionScreen from '../screens/ModesConetionScreen';
import KeyConfigScreen from '../screens/KeyConfigScreen';
import ComRequestScreen from '../screens/ComRequestScreen';
import WirelessDeviceScreen from '../screens/WirelessDeviceScreen';
import DevicesScreen from '../screens/DevicesScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import PowerScreen from '../screens/PowerScreen';
import EcoScreen from '../screens/EcoScreen';
import ChartScreen from '../screens/ChartScreen';
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
      <Stack.Screen name="CheckScreen" component={CheckScreen} />
      <Stack.Screen name="HomeMenuScreen" component={Tabs} />
      <Stack.Screen name="NewHomeScreen" component={NewHomeScreen} />
      <Stack.Screen name="HomesScreen" component={HomesScreen} />
      <Stack.Screen name="AddScenaryScreen" component={AddScenaryScreen} />
      <Stack.Screen name="NewScenaryScreen" component={NewScenaryScreen} />
      <Stack.Screen name="ScenariosScreen" component={ScenariosScreen} />
      <Stack.Screen name="KeyConfigScreen" component={KeyConfigScreen} />
      <Stack.Screen name="ComRequestScreen" component={ComRequestScreen} />
      <Stack.Screen name="DevicesScreen" component={DevicesScreen} />

      <Stack.Screen
        name="WirelessDeviceScreen"
        component={WirelessDeviceScreen}
      />
      <Stack.Screen
        name="ModesConetionScreen"
        component={ModesConetionScreen}
      />
      <Stack.Screen
        name="SearchDevicesScreen"
        component={SearchDevicesScreen}
      />
      <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} />
      <Stack.Screen name="PowerScreen" component={PowerScreen} />
      <Stack.Screen name="EcoScreen" component={EcoScreen} />
      <Stack.Screen name="ChartScreen" component={ChartScreen} />
    </Stack.Navigator>
  );
};
