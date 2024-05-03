import {createStackNavigator} from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import AdvancedPlanScreen from '../screens/AdvancedPlanScreen';
import AllNotificationsScreens from '../screens/AllNotificationsScreens';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SecurityScreen from '../screens/SecurityScreen';

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AdvancedPlanScreen" component={AdvancedPlanScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen
        name="AllNotificationsScreens"
        component={AllNotificationsScreens}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
