import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {useAuth} from '../context/AuthContext';
import AppBottomTabs from './AppBottomTabs';

const AppStackList = () => {
  const {isAuthenticated} = useAuth()!;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppBottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppStackList;
