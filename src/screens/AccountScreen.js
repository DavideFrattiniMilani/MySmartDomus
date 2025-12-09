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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useUser } from '../context/UserContext';

const AccountScreen = ({ navigation }) => {
  // Usa il context invece di useState locale
  const { 
    profileImage, 
    email, 
    updateProfileImage, 
    resetToDefaultImage,
    logout,
    DEFAULT_AVATAR
  } = useUser();

  // Determina se sta usando l'avatar di default
  const isDefaultAvatar = profileImage === DEFAULT_AVATAR;

  // Funzione per scegliere foto dalla galleria
  const pickImage = async () => {
    // Richiedi permessi per la galleria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permessi necessari',
        'Per cambiare la foto profilo è necessario accedere alla galleria.'
      );
      return;
    }

    // Apri la galleria
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

  // Funzione per rimuovere foto e usare avatar default
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

  // Funzione per richiedere cambio password
  const requestPasswordChange = () => {
    Alert.alert(
      'Richiesta cambio password',
      'Sei sicuro di voler richiedere il cambio password? Verrà inviata una mail all\'amministratore.',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Invia richiesta',
          onPress: () => {
            // TODO: Implementare invio email all'admin
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

  // Funzione per logout
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

  return (
    <View style={styles.container}>
      {/* Header con bottone indietro */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sezione Foto Profilo */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.avatar} 
            />
            
            {/* Bottone per modificare foto */}
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Bottoni gestione foto */}
          <View style={styles.avatarActions}>
            <TouchableOpacity
              style={styles.avatarActionButton}
              onPress={pickImage}
            >
              <Ionicons name="images-outline" size={20} color={COLORS.primary} />
              <Text style={styles.avatarActionText}>Cambia foto</Text>
            </TouchableOpacity>

            {!isDefaultAvatar && (
              <TouchableOpacity
                style={styles.avatarActionButton}
                onPress={removeProfileImage}
              >
                <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
                <Text style={styles.avatarActionText}>
                  Avatar predefinito
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Sezione Informazioni Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informazioni Account</Text>

          {/* Email (sola lettura) */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email}</Text>
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Password</Text>
                <Text style={styles.infoValue}>••••••••</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={requestPasswordChange}
            >
              <Text style={styles.changePasswordText}>Richiedi cambio password</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </TouchableOpacity>
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

        {/* Spazio in basso */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
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
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
    borderColor: COLORS.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
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
    backgroundColor: COLORS.cardBackground,
  },
  avatarActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
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