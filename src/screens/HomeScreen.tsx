import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../types';
import AppButton from '../components/common/AppButton';
import AppText from '../components/common/AppText';
import WorkoutSummaryCard from '../components/WorkoutSummaryCard';
import { useWorkout } from '../context/WorkoutContext';
import { Colors } from '../constants/Colors';

type HomeScreenProps = StackScreenProps<AppStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { workouts } = useWorkout();
  const recentWorkouts = workouts.slice(0, 3); // Display up to 3 most recent workouts

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText style={styles.greeting}>Welcome back!</AppText>

        <AppButton
          title="Start New Workout"
          onPress={() => navigation.navigate('WorkoutBuilder')}
          style={styles.mainButton}
        />

        <AppText style={styles.sectionTitle}>Recent Workouts</AppText>
        {recentWorkouts.length === 0 ? (
          <AppText style={styles.noDataText}>No workouts logged yet. Start your first workout!</AppText>
        ) : (
          recentWorkouts.map((workout) => (
            <WorkoutSummaryCard key={workout.id} workout={workout} onPress={() => { /* Navigate to workout details */ }} />
          ))
        )}

        <View style={styles.buttonGroup}>
          <AppButton
            title="View History"
            onPress={() => navigation.navigate('History')}
            type="secondary"
            style={styles.secondaryButton}
          />
          <AppButton
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            type="secondary"
            style={styles.secondaryButton}
          />
        </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
  },
  mainButton: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: Colors.text,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonGroup: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondaryButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default HomeScreen;
