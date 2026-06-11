import React from 'react';
import { TextInput, StyleSheet, StyleProp, ViewStyle, TextInputProps } from 'react-native';
import { Colors } from '../../constants/Colors';

interface AppInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

const AppInput: React.FC<AppInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={Colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default AppInput;
