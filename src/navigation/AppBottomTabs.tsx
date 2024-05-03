import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import homeBlack from '../assets/home_black.png';
import homePink from '../assets/home_pink.png';
import leafBlack from '../assets/leaf_black.png';
import {Image} from 'react-native';
import leafPink from '../assets/leaf_pink.png';
import accountBlack from '../assets/account_black.png';
import accountPink from '../assets/account_pink.png';
import DeviceControlStack from './DeviceControlStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const AppBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let icon;

          if (route.name === 'HomeStack') {
            icon = focused ? homePink : homeBlack;
          } else if (route.name === 'DeviceControlStack') {
            icon = focused ? leafPink : leafBlack;
          } else if (route.name === 'AccountStack') {
            icon = focused ? accountPink : accountBlack;
          }

          return <Image source={icon} style={{width: 25, height: 25}} />;
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="DeviceControlStack" component={DeviceControlStack} />
      <Tab.Screen name="AccountStack" component={AccountStack} />
    </Tab.Navigator>
  );
};

export default AppBottomTabs;
