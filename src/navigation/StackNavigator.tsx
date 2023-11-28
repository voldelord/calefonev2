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
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
      <Stack.Screen
        name="SearchDevicesScreen"
        component={SearchDevicesScreen}
      />
    </Stack.Navigator>
  );
};
