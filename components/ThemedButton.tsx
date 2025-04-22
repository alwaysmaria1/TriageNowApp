import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export type ThemedButtonProps = {
  /** Function to call on press */
  onPress: () => void;
  /** Button label */
  title: string;
  /** Optional container style override */
  style?: ViewStyle;
  /** Optional text style override */
  textStyle?: TextStyle;
  /** Disables the button when true */
  disabled?: boolean;
  /** Determines the style variant of the button */
  variant?:
    | 'default'
    | 'grey'
    | 'destructive'
    | 'outline'
    | 'immediate'
    | 'delayed'
    | 'minor'
    | 'expectant';
};

export function ThemedButton({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  variant = 'default',
}: ThemedButtonProps) {
  let buttonStyle;
  let textColor;

  // Choose styles based on the variant
  switch (variant) {
    case 'grey':
      buttonStyle = styles.greyButton;
      textColor = '#333333';
      break;
    case 'destructive':
      buttonStyle = styles.destructiveButton;
      textColor = '#FFFFFF';
      break;
    case 'outline':
      buttonStyle = styles.outlineButton;
      textColor = '#007AFF';
      break;
    case 'immediate':
      // Light pink background
      buttonStyle = styles.immediateButton;
      textColor = '#000000';
      break;
    case 'delayed':
      // Light yellow background
      buttonStyle = styles.delayedButton;
      textColor = '#000000';
      break;
    case 'minor':
      // Light green background
      buttonStyle = styles.minorButton;
      textColor = '#000000';
      break;
    case 'expectant':
      // Light gray background
      buttonStyle = styles.expectantButton;
      textColor = '#000000';
      break;
    default:
      buttonStyle = styles.defaultButton;
      textColor = '#FFFFFF';
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyle,
        style,
        { opacity: disabled ? 0.5 : pressed ? 0.7 : 1 },
      ]}
    >
      <ThemedText style={[styles.buttonText, { color: textColor }, textStyle]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destructiveButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // New triage variants:
  immediateButton: {
    backgroundColor: '#ffcdd2', // Light pink
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delayedButton: {
    backgroundColor: '#fff9c4', // Light yellow
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minorButton: {
    backgroundColor: '#dcedc8', // Light green
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expectantButton: {
    backgroundColor: '#eeeeee', // Light gray
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});


