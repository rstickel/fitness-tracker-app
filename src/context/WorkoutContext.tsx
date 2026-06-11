import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Workout } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  clearAllWorkouts: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const WORKOUTS_STORAGE_KEY = '@fitness_tracker_workouts';

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load workouts from AsyncStorage on app start
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
      } catch (error) {
        console.error('Failed to load workouts from storage', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadWorkouts();
  }, []);

  // Save workouts to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveWorkouts = async () => {
        try {
          await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
        } catch (error) {
          console.error('Failed to save workouts to storage', error);
        }
      };
      saveWorkouts();
    }
  }, [workouts, isLoaded]);

  const addWorkout = (newWorkout: Workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  const updateWorkout = (updatedWorkout: Workout) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) => (workout.id === updatedWorkout.id ? updatedWorkout : workout))
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id));
  };

  const clearAllWorkouts = () => {
    setWorkouts([]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, updateWorkout, deleteWorkout, clearAllWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
