import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomInput = ({
  placeholder,           // Testo placeholder (es: "Email")
  value,                 // Valore corrente dell'input
  onChangeText,          // Funzione chiamata quando cambia il testo
  secureTextEntry = false, // true per password (nasconde testo)
  keyboardType = 'default', // Tipo tastiera (email, numeric, ecc.)
  autoCapitalize = 'none',  // Maiuscole automatiche
  showPasswordToggle = false, // Mostra icona occhio per password
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      
      {/* Icona occhio per mostrare/nascondere password */}
      {showPasswordToggle && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={COLORS.inputPlaceholder}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative', // Per posizionare l'icona occhio
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }], // Centra verticalmente
    padding: 4, // Area tocco più grande
  },
});

export default CustomInput;