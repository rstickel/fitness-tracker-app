import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppInput from './common/AppInput';
import AppText from './common/AppText';
import { Set } from '../types';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ExerciseSetRowProps {
  set: Set;
  index: number;
  onUpdate: (field: 'reps' | 'weight' | 'completed', value: string | boolean) => void;
  onRemove: () => void;
}

const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({ set, index, onUpdate, onRemove }) => {
  const toggleCompletion = () => {
    onUpdate('completed', !set.completed);
  };

  return (
    <View style={[styles.setRow, set.completed && styles.completedSetRow]}>
      <AppText style={[styles.setNumber, set.completed && styles.completedText]}>{index + 1}</AppText>
      <AppInput
        value={set.weight}
        onChangeText={(text) => onUpdate('weight', text)}
        placeholder="Weight"
        keyboardType="numeric"
        style={[styles.input, set.completed && styles.completedInput]}
        placeholderTextColor={set.completed ? Colors.textSecondary : Colors.gray}
      />
      <AppInput
        value={set.reps}
        onChangeText={(text) => onUpdate('reps', text)}
        placeholder="Reps"
        keyboardType="numeric"
        style={[styles.input, set.completed && styles.completedInput]}
        placeholderTextColor={set.completed ? Colors.textSecondary : Colors.gray}
      />
      <TouchableOpacity onPress={toggleCompletion} style={styles.checkButton}>
        <Ionicons name={set.completed ? "checkmark-circle" : "ellipse-outline"} size={24} color={set.completed ? Colors.success : Colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={22} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: Colors.borderLight,
    borderWidth: 1,
  },
  completedSetRow: {
    backgroundColor: Colors.lightGray,
    opacity: 0.7,
  },
  setNumber: {
    width: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.text,
  },
  completedText: {
    color: Colors.textSecondary,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: 6,
    fontSize: 15,
    textAlign: 'center',
  },
  completedInput: {
    backgroundColor: Colors.borderLight,
  },
  checkButton: {
    padding: 5,
    marginLeft: 5,
  },
  removeButton: {
    padding: 5,
    marginLeft: 5,
  },
});

export default ExerciseSetRow;
