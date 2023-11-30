import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeMenuScreen from '../screens/HomeMenuScreen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ModesScreen from '../screens/ModesScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeMenuScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ModesScreen') {
            iconName = focused ? 'cog' : 'eco';
          } else if (route.name === 'UserProfileScreen') {
            iconName = focused ? 'leaf' : 'account-circle';
          }

          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#B5206A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {display: 'flex'}, // Puedes ajustar otros estilos aquí
      })}>
      <Tab.Screen name="HomeMenuScreen" component={HomeMenuScreen} />
      <Tab.Screen name="ModesScreen" component={ModesScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};
