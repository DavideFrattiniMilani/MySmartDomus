import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const WeatherWidget = ({ villa, temperatura, data, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {/* Miniatura casa */}
      <Image
        source={{ uri: villa.immagine }}
        style={styles.thumbnail}
      />

      {/* Info meteo */}
      <View style={styles.infoContainer}>
        <View style={styles.weatherRow}>
          <Ionicons name="thermometer-outline" size={18} color={COLORS.primary} />
          <Text style={styles.temperatura}>{temperatura}</Text>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} style={styles.calendarIcon} />
          <Text style={styles.data}>{data}</Text>
        </View>
        <Text style={styles.subtitle}>Cambia casa o modifica i parametri</Text>
      </View>

      {/* Icona freccia */}
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  temperatura: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 4,
    marginRight: 12,
  },
  calendarIcon: {
    marginRight: 4,
  },
  data: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default WeatherWidget;