import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VillaTabNavigator from './VillaTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeCaseScreen from '../screens/HomeCaseScreen';
import NotificheScreen from '../screens/NotificheScreen';
import AmbientiScreen from '../screens/AmbientiScreen';
import StanzaScreen from '../screens/StanzaScreen';
import ImpostazioniScreen from '../screens/ImpostazioniScreen';
import ScenariListScreen from '../screens/ScenariListScreen';
import CreaScenarioScreen from '../screens/CreaScenarioScreen';
import GiorniScreen from '../screens/Giorniscreen';
import OraScreen from '../screens/Orascreen';
import AmbienteRegolazionScreen from '../screens/Ambienteregolazionscreen';
import AccountScreen from '../screens/AccountScreen';
import DrawerMenu from '../components/DrawerMenu';
import { useDrawer } from '../context/DrawerContext';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import ImpostazioniNotificheScreen from '../screens/ImpostazioniNotificheScreen';
import AntintrusioneScreen from '../screens/AntintrusioneScreen';

const Stack = createNativeStackNavigator();

// Componente drawer wrapper
const DrawerWrapper = () => {
  const { drawerVisible, closeDrawer } = useDrawer();
  const navigation = useNavigation();

  return (
    <DrawerMenu 
      navigation={navigation}
      visible={drawerVisible}
      onClose={closeDrawer}
    />
  );
};

// Componente navigazione
const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{ animation: 'fade' }}
      />
      
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      
      <Stack.Screen 
        name="HomeCase" 
        component={HomeCaseScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Notifiche" 
        component={NotificheScreen}
      />
      <Stack.Screen 
        name="VillaTabs" 
        component={VillaTabNavigator}
      />
      <Stack.Screen 
        name="Ambienti" 
        component={AmbientiScreen}
      />
      <Stack.Screen 
        name="Stanza" 
        component={StanzaScreen}
      />
      <Stack.Screen 
        name="Impostazioni" 
        component={ImpostazioniScreen}
      />
      <Stack.Screen 
        name="ImpostazioniNotifiche" 
        component={ImpostazioniNotificheScreen}
      />

      {/* Schermata Account */}
      <Stack.Screen 
        name="Account" 
        component={AccountScreen}
      />

      {/* Schermata Antintrusione */}
      <Stack.Screen 
        name="Antintrusione" 
        component={AntintrusioneScreen}
      />

      {/* Scenari Routes */}
      <Stack.Screen 
        name="ScenariList" 
        component={ScenariListScreen}
      />
      <Stack.Screen 
        name="CreaScenario" 
        component={CreaScenarioScreen}
      />
      <Stack.Screen 
        name="Giorni" 
        component={GiorniScreen}
      />
      <Stack.Screen 
        name="Ora" 
        component={OraScreen}
      />
      <Stack.Screen 
        name="AmbienteRegolazion" 
        component={AmbienteRegolazionScreen}
      />
    </Stack.Navigator>
  );
};

// Root component con la navigazione
const RootNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationStack />
      <DrawerWrapper />
    </View>
  );
};

// App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;