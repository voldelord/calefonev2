import React, {useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppStackList from './src/navigation/AppStackList';
import {Appearance} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <AuthProvider>
      <AlertNotificationRoot theme="light">
        <AppStackList />
      </AlertNotificationRoot>
    </AuthProvider>
  );
};

export default App;
