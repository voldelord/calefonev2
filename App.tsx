import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppStackList from './src/navigation/AppStackList';

const App = () => {
  return (
    <AuthProvider>
      <AppStackList />
    </AuthProvider>
  );
};

export default App;
