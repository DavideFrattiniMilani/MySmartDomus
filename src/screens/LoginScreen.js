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
    Image,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Inserisci email e password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('HomeCase');
    }, 1500);
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
        {/* Logo in alto - piccolo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Image 
              source={require('../../assets/logo-box-color.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>MySmart Domus</Text>
          </View>
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
    marginBottom: 60, // ✅ Più spazio sotto il logo
  },
  logoRow: {
    flexDirection: 'row', // ✅ Logo e testo in riga
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 50,  // ✅ Logo piccolo
    height: 50,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0,
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