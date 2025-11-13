import React from 'react';
import { useFonts } from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { DrawerProvider } from './src/context/DrawerContext';
import { ScenariProvider } from './src/context/ScenariContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Manrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Oppure uno splash screen
  }

  return (
    <DrawerProvider>
      <ScenariProvider>
        <AppNavigator />
      </ScenariProvider>
    </DrawerProvider>
  );
}