// src/components/NotificationCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const NotificationCard = ({ notification }) => {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  // Determina icona e colore in base al tipo
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'message':
        return {
          icon: 'chatbubble-outline',
          iconBg: '#4A9EFF',
          iconColor: '#FFFFFF',
        };
      case 'alert':
        return {
          icon: 'alert-circle-outline',
          iconBg: '#FF6B6B',
          iconColor: '#FFFFFF',
        };
      case 'warning':
        return {
          icon: 'warning-outline',
          iconBg: '#FFB020',
          iconColor: '#FFFFFF',
        };
      default:
        return {
          icon: 'notifications-outline',
          iconBg: COLORS.primary,
          iconColor: '#FFFFFF',
        };
    }
  };

  const style = getNotificationStyle(notification.type);

  return (
    <View style={[styles.card, { backgroundColor: COLORS.cardBackground }]}>
      {/* Icona a sinistra */}
      <View style={[styles.iconContainer, { backgroundColor: style.iconBg }]}>
        <Ionicons name={style.icon} size={24} color={style.iconColor} />
      </View>

      {/* Contenuto */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: COLORS.textPrimary }]} numberOfLines={2}>
          {notification.title}
        </Text>
        <Text style={[styles.description, { color: COLORS.textSecondary }]}>
          {notification.description}
        </Text>
        {notification.link && (
          <Text style={[styles.link, { color: COLORS.primary }]}>
            {notification.link}
          </Text>
        )}
      </View>

      {/* Timestamp */}
      <Text style={[styles.timestamp, { color: COLORS.textSecondary }]}>
        {notification.timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    minHeight: 80, // ← Altezza minima
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0, // ← Non si riduce mai
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
    flexShrink: 0, // ← Non si riduce mai
  },
});

export default NotificationCard;