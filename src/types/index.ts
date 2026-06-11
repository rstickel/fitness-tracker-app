import { NavigatorScreenParams } from '@react-navigation/native';

export type AppStackParamList = {
  Home: undefined;
  WorkoutBuilder: undefined;
  WorkoutInProgress: { workout: Workout }; // Pass the initial workout structure
  History: undefined;
  Settings: undefined;
  // Add more screens here as needed
};

export interface Set {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  name: string;
  date: string; // ISO date string
  exercises: Exercise[];
  completed: boolean; // Indicates if the workout session was finished
}
