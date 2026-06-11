import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { WorkoutProvider } from './src/context/WorkoutContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <WorkoutProvider>
        <AppNavigator />
      </WorkoutProvider>
    </SafeAreaProvider>
  );
}
