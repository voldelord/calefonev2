import React, {useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppStackList from './src/navigation/AppStackList';
import {Appearance} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import LoadingOverlay from './src/components/ui/LoadingOverlay';

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <AuthProvider>
      <AlertNotificationRoot theme="light">
        <AppStackList />
        <LoadingOverlay />
      </AlertNotificationRoot>
    </AuthProvider>
  );
};

export default App;
