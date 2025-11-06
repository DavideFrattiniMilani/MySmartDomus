import React from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';

const SplashScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Immagine di sfondo */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay scuro */}
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Logo centrale grande */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIconContainer}>
                <Ionicons name="home" size={80} color={COLORS.primary} />
                <Ionicons 
                  name="wifi" 
                  size={40} 
                  color={COLORS.primary} 
                  style={styles.wifiIcon}
                />
              </View>
              <Text style={styles.logoText}>MySmart Domus</Text>
              <Text style={styles.tagline}>La tua casa in un'app</Text>
              <Text style={styles.subtitle}>
                Gestisci la tua casa in qualsiasi momento, ovunque.
              </Text>
            </View>

            {/* Bottone in basso */}
            <View style={styles.buttonContainer}>
              <CustomButton 
                title="Inizia" 
                onPress={handleStart}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoIconContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 159, 90, 0.1)',
    borderRadius: 60,
  },
  wifiIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: '85%',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default SplashScreen;