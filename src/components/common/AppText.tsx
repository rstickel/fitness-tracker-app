import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface AppTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const AppText: React.FC<AppTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'System',
  },
});

export default AppText;
