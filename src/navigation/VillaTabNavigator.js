import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

// Import schermate
import VillaDetailScreen from '../screens/VillaDetailScreen';
import AmbientiScreen from '../screens/AmbientiScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AssistenzaScreen from '../screens/AssistenzaScreen';

const Tab = createBottomTabNavigator();

const VillaTabNavigator = ({ route }) => {
  const { villa } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.inputBorder,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={VillaDetailScreen}
        initialParams={{ villa }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'HOME',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent().reset({
              index: 0,
              routes: [{ name: 'HomeCase' }],
            });
          },
        })}
      />
      
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ villa }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          tabBarLabel: 'DASHBOARD',
        }}
      />
      
      <Tab.Screen
        name="Ambienti"
        component={AmbientiScreen}
        initialParams={{ villa, villaId: villa.id }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          tabBarLabel: 'AMBIENTI',
        }}
      />
      
      <Tab.Screen
        name="Assistenza"
        component={AssistenzaScreen}
        initialParams={{ villa }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
          tabBarLabel: 'ASSISTENZA',
        }}
      />
    </Tab.Navigator>
  );
};

export default VillaTabNavigator;