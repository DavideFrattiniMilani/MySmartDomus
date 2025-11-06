// src/components/CustomButton.js

import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomButton = ({ 
  title,           // Testo del bottone
  onPress,         // Funzione da eseguire al click
  loading = false, // Mostra loading spinner
  disabled = false // Disabilita bottone
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (disabled || loading) && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8} // Opacità quando premi
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 56, // Altezza minima per tocco facile
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryDark,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default CustomButton;