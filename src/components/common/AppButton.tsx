import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  type = 'primary',
  disabled = false,
}) => {
  const buttonStyles = [styles.button, styles[type], disabled && styles.disabled, style];
  const textStyles = [styles.buttonText, styles[`${type}Text`], textStyle];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  primaryText: {
    color: Colors.white,
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  secondaryText: {
    color: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  dangerText: {
    color: Colors.white,
  },
  success: {
    backgroundColor: Colors.success,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  successText: {
    color: Colors.white,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
  },
});

export default AppButton;
