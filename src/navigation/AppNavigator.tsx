import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
import WorkoutInProgressScreen from '../screens/WorkoutInProgressScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { AppStackParamList } from '../types';
import { Colors } from '../constants/Colors';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false, // For iOS
          contentStyle: { backgroundColor: Colors.background }, // For Android
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Fitness Tracker' }}
        />
        <Stack.Screen
          name="WorkoutBuilder"
          component={WorkoutBuilderScreen}
          options={{ title: 'Build Workout' }}
        />
        <Stack.Screen
          name="WorkoutInProgress"
          component={WorkoutInProgressScreen}
          options={{ title: 'Workout Session' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'Workout History' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
