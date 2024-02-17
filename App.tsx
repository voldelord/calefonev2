import React, { useEffect } from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppStackList from './src/navigation/AppStackList';
import { Appearance } from 'react-native';

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <AuthProvider>
      <AppStackList />
    </AuthProvider>
  );
};

export default App;
