// src/context/ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

const ThemeContext = createContext();

// Hook per usare il context facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve essere usato dentro ThemeProvider');
  }
  return context;
};

// Key per AsyncStorage
const THEME_STORAGE_KEY = '@app_theme';

// Temi disponibili
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.DARK); // Default: scuro
  const [isLoading, setIsLoading] = useState(true);

  // Carica tema salvato all'avvio
  useEffect(() => {
    loadTheme();
  }, []);

  // Aggiorna StatusBar quando cambia tema
  useEffect(() => {
    StatusBar.setBarStyle(
      theme === THEMES.LIGHT ? 'dark-content' : 'light-content',
      true
    );
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Errore caricamento tema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cambia tema
  const toggleTheme = async () => {
    try {
      const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Errore salvataggio tema:', error);
      throw error;
    }
  };

  // Imposta tema specifico
  const setThemeMode = async (newTheme) => {
    try {
      if (newTheme !== THEMES.DARK && newTheme !== THEMES.LIGHT) {
        throw new Error('Tema non valido');
      }
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Errore impostazione tema:', error);
      throw error;
    }
  };

  const value = {
    theme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    isLoading,
    toggleTheme,
    setThemeMode,
    THEMES,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};