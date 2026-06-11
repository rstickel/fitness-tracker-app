import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../types';
import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type SettingsScreenProps = StackScreenProps<AppStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const handleClearData = () => {
    // Implement logic to clear all workout data (e.g., from AsyncStorage or context)
    // For now, it's a placeholder
    alert('Feature not implemented: Clear data');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <AppText style={styles.settingText}>App Version</AppText>
        <AppText style={styles.settingValue}>1.0.0</AppText>
      </View>

      <View style={styles.settingItem}>
        <AppText style={styles.settingText}>Units</AppText>
        <TouchableOpacity style={styles.settingValueContainer} onPress={() => alert('Feature not implemented: Change units')}>
          <AppText style={styles.settingValue}>Metric (kg)</AppText>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AppButton
        title="Clear All Data"
        onPress={handleClearData}
        type="danger"
        style={styles.clearDataButton}
      />

      <AppText style={styles.footerText}>© 2023 Fitness Tracker App</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingText: {
    fontSize: 18,
    color: Colors.text,
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginRight: 5,
  },
  clearDataButton: {
    marginTop: 30,
    backgroundColor: Colors.danger,
  },
  footerText: {
    marginTop: 'auto',
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textSecondary,
    paddingBottom: 20,
  },
});

export default SettingsScreen;
