// src/components/IntrusionCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from './Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const IntrusionCard = ({ title, porte, onSeeAll, onTogglePorta }) => {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  const handlePortaPress = (porta) => {
    // Se la porta è attiva (attivare = OK senza conferma)
    if (!porta.attivo) {
      // Attivazione diretta, nessuna conferma richiesta
      onTogglePorta && onTogglePorta(porta.id);
    } else {
      // Disattivazione → Richiedi conferma
      Alert.alert(
        'Conferma disattivazione',
        `Sei sicuro di voler disattivare l'antintrusione per "${porta.nome}"?`,
        [
          {
            text: 'Annulla',
            style: 'cancel',
          },
          {
            text: 'Disattiva',
            style: 'destructive',
            onPress: () => {
              onTogglePorta && onTogglePorta(porta.id);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con titolo e link */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.textPrimary }]}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={[styles.seeAllText, { color: COLORS.primary }]}>Vedi tutte →</Text>
        </TouchableOpacity>
      </View>

      {/* Lista porte */}
      <View style={styles.porteContainer}>
        {porte.map((porta) => (
          <TouchableOpacity
            key={porta.id}
            style={[styles.portaRow, { backgroundColor: COLORS.cardBackground }]}
            onPress={() => handlePortaPress(porta)}
            activeOpacity={0.7}
          >
            {/* Icona lucchetto */}
            <View style={[styles.iconContainer, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }]}>
              <Icon
                name={porta.attivo ? 'u_lock-alt' : 'u_lock-open-alt'}
                size={18}
                color={COLORS.textPrimary}
              />
            </View>

            {/* Nome porta */}
            <Text style={[styles.portaNome, { color: COLORS.textPrimary }]}>{porta.nome}</Text>

            {/* Badge stato */}
            <View
              style={[
                styles.badge,
                porta.attivo ? styles.badgeActive : styles.badgeInactive,
              ]}
            >
              <View
                style={[
                  styles.badgeDot,
                  porta.attivo ? styles.badgeDotActive : styles.badgeDotInactive,
                ]}
              />
              <Text style={[styles.badgeText, { color: COLORS.textPrimary }]}>
                {porta.attivo ? 'Attivo' : 'Disattivo'}
              </Text>
            </View>

            {/* Chevron */}
            <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  porteContainer: {
    gap: 8,
  },
  portaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portaNome: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  badgeActive: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
  },
  badgeInactive: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeDotActive: {
    backgroundColor: '#34C759',
  },
  badgeDotInactive: {
    backgroundColor: '#FF3B30',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default IntrusionCard;