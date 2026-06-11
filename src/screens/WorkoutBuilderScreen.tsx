import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList, Exercise, Workout } from '../types';
import AppButton from '../components/common/AppButton';
import AppText from '../components/common/AppText';
import AppInput from '../components/common/AppInput';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWorkout } from '../context/WorkoutContext';

type WorkoutBuilderScreenProps = StackScreenProps<AppStackParamList, 'WorkoutBuilder'>;

const WorkoutBuilderScreen: React.FC<WorkoutBuilderScreenProps> = ({ navigation }) => {
  const { addWorkout } = useWorkout();
  const [workoutName, setWorkoutName] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([{ id: '1', name: '', sets: [] }]);
  const [newExerciseName, setNewExerciseName] = useState<string>('');

  const addExerciseField = () => {
    if (newExerciseName.trim() === '') return;
    setExercises((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newExerciseName.trim(), sets: [] },
    ]);
    setNewExerciseName('');
  };

  const removeExerciseField = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const startWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Validation Error', 'Please enter a workout name.');
      return;
    }
    if (exercises.length === 0 || exercises.every(ex => !ex.name.trim())) {
      Alert.alert('Validation Error', 'Please add at least one exercise.');
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName.trim(),
      date: new Date().toISOString(),
      exercises: exercises.filter(ex => ex.name.trim()).map(ex => ({ ...ex, name: ex.name.trim() })), // Ensure valid exercises
      completed: false,
    };
    
    // The actual logging of sets/reps will happen in WorkoutInProgressScreen
    // For now, we navigate with the workout structure.
    navigation.navigate('WorkoutInProgress', { workout: newWorkout });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText style={styles.title}>Create New Workout</AppText>

        <AppInput
          placeholder="Workout Name (e.g., Upper Body Focus)"
          value={workoutName}
          onChangeText={setWorkoutName}
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
        />

        <AppText style={styles.sectionTitle}>Exercises</AppText>
        {exercises.length === 0 ? (
          <AppText style={styles.noExercisesText}>No exercises added yet.</AppText>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.exerciseItem}>
                <AppInput
                  value={item.name}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].name = text;
                    setExercises(updatedExercises);
                  }}
                  placeholder={`Exercise ${index + 1} Name`}
                  style={styles.exerciseInput}
                  placeholderTextColor={Colors.textSecondary}
                />
                <TouchableOpacity onPress={() => removeExerciseField(item.id)} style={styles.removeButton}>
                  <Ionicons name="close-circle" size={24} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false} // Disable FlatList scrolling to allow ScrollView to handle it
          />
        )}

        <View style={styles.addExerciseRow}>
          <AppInput
            placeholder="New Exercise Name"
            value={newExerciseName}
            onChangeText={setNewExerciseName}
            style={styles.newExerciseInput}
            placeholderTextColor={Colors.textSecondary}
            onSubmitEditing={addExerciseField}
          />
          <AppButton title="Add" onPress={addExerciseField} style={styles.addButton} />
        </View>

        <AppButton
          title="Start Workout Session"
          onPress={startWorkout}
          style={styles.startButton}
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: Colors.text,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: Colors.cardBackground,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: Colors.text,
  },
  noExercisesText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 15,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: Colors.cardBackground,
  },
  removeButton: {
    padding: 5,
  },
  addExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  newExerciseInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: Colors.cardBackground,
  },
  addButton: {
    width: 80,
    height: 48, // Match input height roughly
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    marginTop: 30,
  },
});

export default WorkoutBuilderScreen;
