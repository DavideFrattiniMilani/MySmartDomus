// src/screens/StanzaScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import Icon from '../components/Icon';

const { width, height } = Dimensions.get('window');

const StanzaScreen = ({ navigation, route }) => {
  const { room } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  
  // Converti dispositivi da nuovo formato a vecchio (se necessario)
  const dispositivi = room.dispositivi?.luci || room.dispositivi || [];
  
  // State per gestire on/off delle luci
  const [luci, setLuci] = useState(dispositivi);

  const handleToggleLuce = (luceId) => {
    setLuci(prevLuci =>
      prevLuci.map(luce =>
        luce.id === luceId
          ? { ...luce, attivo: !luce.attivo, intensita: !luce.attivo ? 75 : 0 }
          : luce
      )
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    alert('Impostazioni stanza - Da implementare');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Foto stanza fullscreen */}
      <ImageBackground
        source={{ uri: room.immagine }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay leggero */}
        <View style={styles.overlay}>
          {/* Header trasparente in alto */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
              <View style={styles.iconButtonBg}>
                <Icon name="u_arrow-left" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{room.nome}</Text>

            <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
              <View style={styles.iconButtonBg}>
                <Icon name="u_setting" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Spacer per pushare le luci in basso */}
          <View style={{ flex: 1 }} />

          {/* Icone luci in fila orizzontale in basso */}
          <View style={styles.bottomOverlay}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.luciScrollContainer}
            >
              {luci.map((luce) => (
                <TouchableOpacity
                  key={luce.id}
                  style={styles.luceCard}
                  onPress={() => handleToggleLuce(luce.id)}
                  activeOpacity={0.7}
                >
                  {/* Icona lampadina */}
                  <View style={[
                    styles.luceIcon,
                    { backgroundColor: luce.attivo ? '#FFA74F' : 'rgba(128, 128, 128, 0.8)' }
                  ]}>
                    <Icon
                      name="u_lightbulb"
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>

                  {/* Stato ON/OFF */}
                  <Text style={styles.luceStatus}>
                    {luce.attivo ? 'ON' : 'OFF'}
                  </Text>

                  {/* Nome luce abbreviato */}
                  <Text style={styles.luceNome} numberOfLines={2}>
                    {luce.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 4,
  },
  iconButtonBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bottomOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    paddingVertical: 16,
    paddingBottom: 32, // Extra padding per safe area
  },
  luciScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  luceCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    gap: 6,
  },
  luceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  luceStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  luceNome: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default StanzaScreen;