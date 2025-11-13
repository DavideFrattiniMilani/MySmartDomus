import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { COLORS } from '../constants/colors';

const RoomCard = ({ room, onPress }) => {
  // Mappa icone per tipo dispositivo
const getDeviceIcon = (tipo) => {
  const iconMap = {
    luce: 'u_lightbulb',
    termostato: 'u_temperature-three-quarter',
    sensore: 'u_wifi',
    presa: 'u_power',
    condizionatore: 'u_temperature-three-quarter',
    tapparella: 'u_blinds',
    telecamera: 'u_webcam',
    lucchetto: 'u_lock-alt',
  };
  return iconMap[tipo] || 'u_power';
};

  // Icona meteo per la stanza
  const getWeatherIcon = () => {
    return 'u_temperature-three-quarter'; // Mock - in futuro dinamico
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: room.immagine }}
        style={styles.backgroundImage}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          {/* Badge nome stanza + temperatura */}
          <View style={styles.header}>
          <View style={styles.nameBadge}>
            <Icon name="u_temperature-three-quarter" size={16} color={COLORS.white} />
            <Text style={styles.roomName}>{room.nome}</Text>
          </View>
            <Text style={styles.temperatura}>{room.temperatura}</Text>
          </View>

          {/* Icone dispositivi in basso */}
          <View style={styles.devicesContainer}>
            {room.dispositivi.slice(0, 4).map((dispositivo, index) => (
              <View key={index} style={styles.deviceIcon}>
              <Icon
                name={getDeviceIcon(dispositivo.tipo)}
                size={20}
                color={COLORS.white}
              />
              </View>
            ))}
            {room.dispositivi.length > 4 && (
              <View style={styles.deviceIcon}>
                <Text style={styles.moreDevices}>+{room.dispositivi.length - 4}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  roomName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  temperatura: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  devicesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreDevices: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default RoomCard;