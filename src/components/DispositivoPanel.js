import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '../constants/colors';

const { height } = Dimensions.get('window');
const PANEL_HEIGHT = height * 0.5; // 50% altezza schermo

const DispositivoPanel = ({ visible, onClose, device }) => {
  const slideAnim = useRef(new Animated.Value(PANEL_HEIGHT)).current;
  
  // State per dispositivi (mock - in futuro da backend)
  const [intensita, setIntensita] = useState(75);
  const [subDevices, setSubDevices] = useState([
    { id: 1, nome: 'Lampada a parete', attivo: true },
    { id: 2, nome: 'Lampada da terra', attivo: true },
  ]);

  useEffect(() => {
    if (visible) {
      // Apri panel (slide su)
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      // Chiudi panel (slide giù)
      Animated.timing(slideAnim, {
        toValue: PANEL_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Gestione swipe giù per chiudere
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5; // Solo swipe verso il basso
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Swipe sufficiente per chiudere
          onClose();
        } else {
          // Torna in posizione aperta
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const toggleSubDevice = (id) => {
    setSubDevices((prev) =>
      prev.map((dev) =>
        dev.id === id ? { ...dev, attivo: !dev.attivo } : dev
      )
    );
  };

  if (!device) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Overlay scuro */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Panel */}
        <Animated.View
          style={[
            styles.panel,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Handle per swipe */}
          <View style={styles.handle} />

          {/* Contenuto */}
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Luci</Text>
              <Text style={styles.subtitle}>{device.nome}</Text>
            </View>

            {/* Slider intensità */}
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>
                Intensità {Math.round(intensita)}%
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={intensita}
                onValueChange={(value) => setIntensita(Math.round(value))}  // ← Arrotonda a intero
                step={1}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.inputBorder}
                thumbTintColor={COLORS.primary}
              />
            </View>

            {/* Lista sotto-dispositivi con toggle */}
            <View style={styles.subDevicesContainer}>
              {subDevices.map((subDevice) => (
                <View key={subDevice.id} style={styles.subDeviceRow}>
                  <Text style={styles.subDeviceName}>{subDevice.nome}</Text>
                  
                  {/* Toggle switch */}
                  <TouchableOpacity
                    style={[
                      styles.toggle,
                      subDevice.attivo && styles.toggleActive,
                    ]}
                    onPress={() => toggleSubDevice(subDevice.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.View
                      style={[
                        styles.toggleThumb,
                        subDevice.attivo && styles.toggleThumbActive,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  panel: {
    height: PANEL_HEIGHT,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.inputBorder,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  subDevicesContainer: {
    gap: 16,
  },
  subDeviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  subDeviceName: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: COLORS.inputBackground,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: COLORS.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});

export default DispositivoPanel;