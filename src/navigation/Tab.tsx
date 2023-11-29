import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeMenuScreen from '../screens/HomeMenuScreen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ModesScreen from '../screens/ModesScreen';

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
            iconName = focused ? 'cog' : 'leaf-outline';
          } else if (route.name === 'Calefon') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'exit' : 'exit-outline';
          }

          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#B5206A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {display: 'flex'}, // Puedes ajustar otros estilos aquí
      })}>
      <Tab.Screen name="HomeMenuScreen" component={HomeMenuScreen} />
      <Tab.Screen name="ModesScreen" component={ModesScreen} />
    </Tab.Navigator>
  );
};
