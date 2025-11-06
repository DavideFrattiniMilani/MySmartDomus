
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Funzione di login MOCK (senza backend per ora)
  const handleLogin = () => {
    // Validazione base
    if (!email || !password) {
      alert('Inserisci email e password');
      return;
    }

    // Simula chiamata API con loading
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Vai alla schermata Home (lista case)
      navigation.navigate('HomeCase');
    }, 1500); // Simula 1.5 secondi di attesa
  };

  const handleForgotPassword = () => {
    alert('Funzionalità "Recupera Password" - Da implementare');
  };

  const handleRegister = () => {
    alert('Funzionalità "Registrati" - Da implementare');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo in alto */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <Ionicons name="home" size={32} color={COLORS.primary} />
            <Ionicons
              name="wifi"
              size={16}
              color={COLORS.primary}
              style={styles.wifiIcon}
            />
          </View>
          <Text style={styles.logoText}>MySmart Domus</Text>
        </View>

        {/* Titolo e sottotitolo */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Inserisci le credenziali</Text>
        </View>

        {/* Form di login */}
        <View style={styles.formContainer}>
          {/* Input Email */}
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Input Password */}
          <View style={styles.inputSpacing}>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              showPasswordToggle={true}
            />
          </View>

          {/* Link password dimenticata */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              Hai dimenticato la password?
            </Text>
          </TouchableOpacity>

          {/* Bottone Accedi */}
          <View style={styles.buttonSpacing}>
            <CustomButton
              title="Accedi"
              onPress={handleLogin}
              loading={loading}
            />
          </View>

          {/* Separatore */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>oppure</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Link Registrati */}
          <TouchableOpacity
            style={styles.registerContainer}
            onPress={handleRegister}
          >
            <Text style={styles.registerText}>Registrati</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIconContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wifiIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  formContainer: {
    flex: 1,
  },
  inputSpacing: {
    marginTop: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  buttonSpacing: {
    marginTop: 8,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.inputBorder,
  },
  separatorText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginHorizontal: 16,
  },
  registerContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registerText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});

export default LoginScreen;