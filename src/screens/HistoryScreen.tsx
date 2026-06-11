import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../types';
import AppText from '../components/common/AppText';
import WorkoutSummaryCard from '../components/WorkoutSummaryCard';
import { useWorkout } from '../context/WorkoutContext';
import { Colors } from '../constants/Colors';

type HistoryScreenProps = StackScreenProps<AppStackParamList, 'History'>;

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { workouts } = useWorkout();

  const completedWorkouts = workouts.filter(w => w.completed).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const renderItem = ({ item }: { item: typeof workouts[0] }) => (
    <WorkoutSummaryCard workout={item} onPress={() => { /* Potentially navigate to a detailed workout view */ }} />
  );

  return (
    <View style={styles.container}>
      {completedWorkouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>No completed workouts yet.</AppText>
          <AppText style={styles.emptySubText}>Start a workout from the home screen!</AppText>
        </View>
      ) : (
        <FlatList
          data={completedWorkouts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingVertical: 20,
  },
  separator: {
    height: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HistoryScreen;
