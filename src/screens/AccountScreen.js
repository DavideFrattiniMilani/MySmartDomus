// src/screens/AccountScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../constants/colors';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 

const AccountScreen = ({ navigation }) => {
  const { 
    profileImage, 
    email, 
    updateProfileImage, 
    resetToDefaultImage,
    logout,
    DEFAULT_AVATAR
  } = useUser();

  // Hook per il tema
  const { isDark, toggleTheme } = useTheme();
  const COLORS = getColors(isDark);

  const isDefaultAvatar = profileImage === DEFAULT_AVATAR;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permessi necessari',
        'Per cambiare la foto profilo è necessario accedere alla galleria.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      try {
        await updateProfileImage(result.assets[0].uri);
      } catch (error) {
        Alert.alert('Errore', 'Impossibile salvare la foto profilo');
      }
    }
  };

  const removeProfileImage = () => {
    Alert.alert(
      'Usa avatar predefinito',
      'Vuoi tornare all\'avatar predefinito?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Conferma',
          onPress: async () => {
            try {
              await resetToDefaultImage();
            } catch (error) {
              Alert.alert('Errore', 'Impossibile ripristinare l\'avatar predefinito');
            }
          },
        },
      ]
    );
  };

  const requestPasswordChange = () => {
    Alert.alert(
      'Richiesta cambio password',
      'Sei sicuro di voler richiedere il cambio password? Verrà inviata una mail all\'amministratore.',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Invia richiesta',
          onPress: () => {
            Alert.alert(
              'Richiesta inviata',
              'La tua richiesta di cambio password è stata presa in carico. Riceverai una email con le istruzioni.',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Esci',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert('Errore', 'Impossibile effettuare il logout');
            }
          },
        },
      ]
    );
  };

  //  Handler per cambio tema
  const handleThemeToggle = async () => {
    try {
      await toggleTheme();
    } catch (error) {
      Alert.alert('Errore', 'Impossibile cambiare tema');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Account</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sezione Foto Profilo */}
        <View style={[styles.profileSection, { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }]}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.avatar} 
            />
            
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarActions}>
            <TouchableOpacity
              style={[styles.avatarActionButton, { backgroundColor: COLORS.cardBackground }]}
              onPress={pickImage}
            >
              <Ionicons name="images-outline" size={20} color={COLORS.primary} />
              <Text style={[styles.avatarActionText, { color: COLORS.primary }]}>Cambia foto</Text>
            </TouchableOpacity>

            {!isDefaultAvatar && (
              <TouchableOpacity
                style={[styles.avatarActionButton, { backgroundColor: COLORS.cardBackground }]}
                onPress={removeProfileImage}
              >
                <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
                <Text style={[styles.avatarActionText, { color: COLORS.primary }]}>
                  Avatar predefinito
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Sezione Informazioni Account */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>Informazioni Account</Text>

          {/* Email */}
          <View style={[styles.infoCard, { 
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>Email</Text>
                <Text style={[styles.infoValue, { color: COLORS.textPrimary }]}>{email}</Text>
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={[styles.infoCard, { 
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <View style={styles.infoRow}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>Password</Text>
                <Text style={[styles.infoValue, { color: COLORS.textPrimary }]}>••••••••</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.changePasswordButton, { 
                borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}
              onPress={requestPasswordChange}
            >
              <Text style={[styles.changePasswordText, { color: COLORS.primary }]}>
                Richiedi cambio password
              </Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferenze */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>Preferenze</Text>

          {/* Tema */}
          <View style={[styles.infoCard, { 
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <View style={styles.infoRow}>
              <Ionicons 
                name={isDark ? "moon" : "sunny"} 
                size={22} 
                color={COLORS.primary} 
              />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                  Aspetto
                </Text>
                <Text style={[styles.infoValue, { color: COLORS.textPrimary }]}>
                  {isDark ? 'Tema Scuro' : 'Tema Chiaro'}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#767577', true: COLORS.primary }}
                thumbColor={COLORS.white}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        </View>

        {/* Bottone Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Esci dall'account</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF9800',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9800',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1C1C1E',
  },
  avatarActions: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  avatarActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default AccountScreen;