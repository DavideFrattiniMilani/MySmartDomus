import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const NotificationCard = ({ notification, onPress }) => {
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
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icona a sinistra */}
      <View style={[styles.iconContainer, { backgroundColor: style.iconBg }]}>
        <Ionicons name={style.icon} size={24} color={style.iconColor} />
      </View>

      {/* Contenuto */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {notification.description}
        </Text>
        {notification.link && (
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.link}>{notification.link} →</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Timestamp */}
      <Text style={styles.timestamp}>{notification.timestamp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default NotificationCard;