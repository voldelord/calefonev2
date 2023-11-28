import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import CheckScreen from '../screens/CheckScreen';
import {Tabs} from './Tab';
import NewHomeScreen from '../screens/NewHomeScreen';
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
    </Stack.Navigator>
  );
};
