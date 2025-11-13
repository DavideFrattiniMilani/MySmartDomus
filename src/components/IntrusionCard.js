import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { COLORS } from '../constants/colors';

const IntrusionCard = ({ title, porte, onSeeAll, onTogglePorta }) => {
  return (
    <View style={styles.container}>
      {/* Header con titolo e link */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>Vedi tutte →</Text>
        </TouchableOpacity>
      </View>

      {/* Lista porte */}
      <View style={styles.porteContainer}>
        {porte.map((porta) => (
          <TouchableOpacity
            key={porta.id}
            style={styles.portaRow}
            onPress={() => onTogglePorta && onTogglePorta(porta.id)}
            activeOpacity={0.7}
          >
            {/* Icona lucchetto */}
            <View style={styles.iconContainer}>
              <Icon
                name={porta.attivo ? 'u_lock-alt' : 'u_lock-open-alt'}
                size={18}
                color={COLORS.white}
              />
            </View>

            {/* Nome porta */}
            <Text style={styles.portaNome}>{porta.nome}</Text>

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
              <Text style={styles.badgeText}>
                {porta.attivo ? 'Attivo' : 'Disattivo'}
              </Text>
            </View>

            {/* Chevron */}
<Icon name="u_angle-right" size={20} color={COLORS.white} />
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
    color: COLORS.white,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  porteContainer: {
    gap: 8,
  },
  portaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portaNome: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.white,
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
    color: COLORS.white,
  },
});

export default IntrusionCard;