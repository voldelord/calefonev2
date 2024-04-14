import React, {useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppStackList from './src/navigation/AppStackList';
import {Appearance} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import LoadingOverlay from './src/components/ui/LoadingOverlay';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MqttProvider} from './src/context/MqttContext';
import {GeolocationProvider} from './src/context/GeolocationContext';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MqttProvider>
          <GeolocationProvider>
            <AlertNotificationRoot theme="light">
              <AppStackList />
              <LoadingOverlay />
            </AlertNotificationRoot>
          </GeolocationProvider>
        </MqttProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
