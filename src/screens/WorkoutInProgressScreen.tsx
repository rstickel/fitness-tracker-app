import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList, Exercise, Set, Workout } from '../types';
import AppButton from '../components/common/AppButton';
import AppText from '../components/common/AppText';
import ExerciseSetRow from '../components/ExerciseSetRow';
import { useWorkout } from '../context/WorkoutContext';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type WorkoutInProgressScreenProps = StackScreenProps<AppStackParamList, 'WorkoutInProgress'>;

const WorkoutInProgressScreen: React.FC<WorkoutInProgressScreenProps> = ({ route, navigation }) => {
  const { addWorkout, updateWorkout } = useWorkout();
  const initialWorkout = route.params.workout;
  const [currentWorkout, setCurrentWorkout] = useState<Workout>(initialWorkout);

  useEffect(() => {
    navigation.setOptions({ title: currentWorkout.name });
  }, [currentWorkout.name, navigation]);

  const handleAddSet = (exerciseId: string) => {
    setCurrentWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSet: Set = { id: Date.now().toString(), reps: '', weight: '', completed: false };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  const handleUpdateSet = (exerciseId: string, setId: string, field: 'reps' | 'weight' | 'completed', value: string | boolean) => {
    setCurrentWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map((set) => {
            if (set.id === setId) {
              return { ...set, [field]: value };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  const handleRemoveSet = (exerciseId: string, setId: string) => {
    setCurrentWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.filter((set) => set.id !== setId);
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  const finishWorkout = () => {
    Alert.alert(
      'Finish Workout',
      'Are you sure you want to finish this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Finish',
          onPress: () => {
            const completedWorkout = { ...currentWorkout, completed: true, date: new Date().toISOString() };
            addWorkout(completedWorkout); // Add the completed workout to the global state
            navigation.popToTop(); // Go back to home screen
            Alert.alert('Workout Completed', `${currentWorkout.name} has been saved to your history.`);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText style={styles.workoutName}>{currentWorkout.name}</AppText>
        <AppText style={styles.workoutDate}>Date: {new Date(currentWorkout.date).toLocaleDateString()}</AppText>

        {currentWorkout.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <AppText style={styles.exerciseName}>{exercise.name}</AppText>
            <View style={styles.setHeaders}>
              <AppText style={styles.setHeader}>Set</AppText>
              <AppText style={styles.setHeader}>Weight (kg)</AppText>
              <AppText style={styles.setHeader}>Reps</AppText>
              <View style={styles.setHeaderEmpty} />
            </View>
            {exercise.sets.map((set, index) => (
              <ExerciseSetRow
                key={set.id}
                set={set}
                index={index}
                onUpdate={(field, value) => handleUpdateSet(exercise.id, set.id, field, value)}
                onRemove={() => handleRemoveSet(exercise.id, set.id)}
              />
            ))}
            <AppButton
              title="Add Set"
              onPress={() => handleAddSet(exercise.id)}
              type="secondary"
              style={styles.addSetButton}
              textStyle={styles.addSetButtonText}
            />
          </View>
        ))}

        <AppButton
          title="Finish Workout"
          onPress={finishWorkout}
          style={styles.finishButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  workoutName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  workoutDate: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  setHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  setHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.textSecondary,
    fontSize: 13,
  },
  setHeaderEmpty: {
    width: 30, // For the delete icon column
  },
  addSetButton: {
    marginTop: 15,
    backgroundColor: Colors.secondary,
    borderWidth: 0, // Override secondary default border
  },
  addSetButtonText: {
    color: Colors.white,
  },
  finishButton: {
    marginTop: 30,
    backgroundColor: Colors.success,
  },
});

export default WorkoutInProgressScreen;
