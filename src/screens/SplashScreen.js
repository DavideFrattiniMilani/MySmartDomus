import React from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
            {/* Logo in alto a sinistra */}
            <View style={styles.logoSection}>
              <Image 
                source={require('../../assets/logo-box-color.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
              </View>

            {/* Testi e bottone in basso */}
            <View style={styles.bottomSection}>
              <Text style={styles.logoText}>MySmart Domus</Text>
              <Text style={styles.tagline}>La tua casa in un'app</Text>
              <Text style={styles.subtitle}>
                Gestisci la tua casa in qualsiasi momento, ovunque.
              </Text>
              
              {/* Bottone */}
              <View style={styles.buttonContainer}>
                <CustomButton 
                  title="Inizia" 
                  onPress={handleStart}
                />
              </View>
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
    paddingTop: 60,
    paddingBottom: 50,
    justifyContent: 'space-between', // ✅ Spazio tra logo (alto) e testi (basso)
  },
  logoSection: {
    // ✅ Logo in alto a sinistra
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0,
  },
  bottomSection: {
    // ✅ Testi e bottone in basso
    width: '100%',
  },
  tagline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 32, // ✅ Spazio prima del bottone
  },
  buttonContainer: {
    width: '100%',
  },
});

export default SplashScreen;