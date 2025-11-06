import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import DispositivoPanel from '../components/DispositivoPanel';

const { width, height } = Dimensions.get('window');

const StanzaScreen = ({ navigation, route }) => {
  const { room } = route.params;
  // Converti dispositivi da nuovo formato a vecchio (se necessario)
  const dispositivi = room.dispositivi?.luci || room.dispositivi || [];
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);


  // Posiziona dispositivi sulla foto (distribuiti automaticamente)
  const devicePositions = dispositivi.slice(0, 7).map((disp, index) => ({
    ...disp,
    top: `${15 + (index * 12)}%`,
    left: index % 2 === 0 ? '30%' : '70%',
  }));

  const getDeviceIcon = (tipo) => {
    const iconMap = {
      luce: 'bulb',
      termostato: 'thermometer',
      sensore: 'radio-button-on',
      presa: 'power',
      condizionatore: 'snow',
      tapparella: 'albums',
      telecamera: 'videocam',
      lucchetto: 'lock-closed',
    };
    return iconMap[tipo] || 'ellipse';
  };

  const handleDevicePress = (device) => {
    setSelectedDevice(device);
    setPanelVisible(true);
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
        {/* Overlay scuro leggero */}
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
              <View style={styles.iconButtonBg}>
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{room.nome}</Text>

            <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
              <View style={styles.iconButtonBg}>
                <Ionicons name="settings-outline" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Dispositivi posizionati sulla foto */}
          <View style={styles.devicesContainer}>
            {devicePositions.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={[
                  styles.deviceIcon,
                  {
                    top: device.top,
                    left: device.left,
                    right: device.right,
                  },
                ]}
                onPress={() => handleDevicePress(device)}
                activeOpacity={0.7}
              >
                <View style={styles.deviceIconInner}>
                  <Ionicons
                    name={getDeviceIcon(device.tipo)}
                    size={24}
                    color={COLORS.white}
                  />
                </View>
                {/* Pulse animation per device attivo */}
                <View style={styles.devicePulse} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* Panel regolazione dispositivo */}
      <DispositivoPanel
        visible={panelVisible}
        onClose={() => setPanelVisible(false)}
        device={selectedDevice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  devicesContainer: {
    flex: 1,
    position: 'relative',
  },
  deviceIcon: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    // Centra l'icona rispetto alla posizione
    marginLeft: -28,
    marginTop: -28,
  },
  deviceIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
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
  devicePulse: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
  },
});

export default StanzaScreen;