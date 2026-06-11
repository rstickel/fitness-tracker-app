import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import AppText from './common/AppText';
import { Workout } from '../types';
import { Colors } from '../constants/Colors';
import { formatDate } from '../utils/DateUtils';

interface WorkoutSummaryCardProps {
  workout: Workout;
  onPress: () => void;
}

const WorkoutSummaryCard: React.FC<WorkoutSummaryCardProps> = ({ workout, onPress }) => {
  const exerciseCount = workout.exercises.length;
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <AppText style={styles.title}>{workout.name}</AppText>
      <AppText style={styles.date}>{formatDate(workout.date)}</AppText>
      <View style={styles.detailsRow}>
        <AppText style={styles.detailText}>{exerciseCount} Exercises</AppText>
        <AppText style={styles.detailText}>{totalSets} Sets</AppText>
      </View>
      {/* Optionally show some top exercises */}
      {workout.exercises.slice(0, 2).map((ex, index) => (
        <AppText key={ex.id} style={styles.exerciseName}>
          • {ex.name}
        </AppText>
      ))}
      {exerciseCount > 2 && (
        <AppText style={styles.moreExercisesText}>+ {exerciseCount - 2} more exercises</AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  exerciseName: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 5,
    marginLeft: 5,
  },
  moreExercisesText: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default WorkoutSummaryCard;
