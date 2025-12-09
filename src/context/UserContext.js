// src/context/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

// Hook per usare il context facilmente
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve essere usato dentro UserProvider');
  }
  return context;
};

// Keys per AsyncStorage
const STORAGE_KEYS = {
  PROFILE_IMAGE: '@user_profile_image',
  EMAIL: '@user_email',
};

// Avatar di default (quello attuale di Home)
const DEFAULT_AVATAR = 'https://i.pravatar.cc/100?img=12';

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
  const [email, setEmail] = useState('user@example.com');
  const [isLoading, setIsLoading] = useState(true);

  // Carica dati da AsyncStorage all'avvio
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE);
      const savedEmail = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);

      if (savedImage) {
        setProfileImage(savedImage);
      }
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } catch (error) {
      console.error('Errore caricamento dati utente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Aggiorna foto profilo
  const updateProfileImage = async (imageUri) => {
    try {
      if (imageUri) {
        // Salva nuova immagine
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, imageUri);
        setProfileImage(imageUri);
      } else {
        // Rimuovi immagine e usa default
        await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
        setProfileImage(DEFAULT_AVATAR);
      }
    } catch (error) {
      console.error('Errore salvataggio foto profilo:', error);
      throw error;
    }
  };

  // Reset a immagine di default
  const resetToDefaultImage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
      setProfileImage(DEFAULT_AVATAR);
    } catch (error) {
      console.error('Errore reset foto profilo:', error);
      throw error;
    }
  };

  // Aggiorna email (per futuro)
  const updateEmail = async (newEmail) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, newEmail);
      setEmail(newEmail);
    } catch (error) {
      console.error('Errore salvataggio email:', error);
      throw error;
    }
  };

  // Logout - pulisce tutto
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.PROFILE_IMAGE,
        STORAGE_KEYS.EMAIL,
      ]);
      setProfileImage(DEFAULT_AVATAR);
      setEmail('user@example.com');
    } catch (error) {
      console.error('Errore logout:', error);
      throw error;
    }
  };

  const value = {
    // Dati
    profileImage,
    email,
    isLoading,
    
    // Funzioni
    updateProfileImage,
    resetToDefaultImage,
    updateEmail,
    logout,
    
    // Costanti utili
    DEFAULT_AVATAR,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};