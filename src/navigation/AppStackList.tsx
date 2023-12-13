import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {useAuth} from '../context/AuthContext';
import {StackNavigator} from './StackNavigator';

const AppStackList = () => {
  const {isAuthenticated} = useAuth()!;

  return (
    <NavigationContainer>
      {isAuthenticated ? <StackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppStackList;
