import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import NotificationCard from '../components/NotificationCard';

const NotificheScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('tutte');

  // DATI MOCK - Notifiche simulate
  const [notifiche] = useState([
    {
      id: 1,
      type: 'message',
      title: 'Lorem ipsum dolor sit amet consectetur',
      description:
        'Lorem ipsum dolor sit amet consectetur. Diam ac sit aliquam suspendisse.',
      link: 'Lorem ipsum',
      timestamp: '2 ore fa',
      category: 'tutte',
    },
    {
      id: 2,
      type: 'alert',
      title: 'Lorem ipsum dolor sit amet consectetur',
      description:
        'Lorem ipsum dolor sit amet consectetur. Diam ac sit aliquam suspendisse.',
      link: 'Lorem ipsum',
      timestamp: '2 ore fa',
      category: 'allarmi',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Lorem ipsum dolor sit amet consectetur',
      description:
        'Lorem ipsum dolor sit amet consectetur. Diam ac sit aliquam suspendisse.',
      link: 'Lorem ipsum',
      timestamp: '2 ore fa',
      category: 'avvisi',
    },
    {
      id: 4,
      type: 'message',
      title: 'Lorem ipsum dolor sit amet consectetur',
      description:
        'Lorem ipsum dolor sit amet consectetur. Diam ac sit aliquam suspendisse.',
      link: 'Lorem ipsum',
      timestamp: '2 ore fa',
      category: 'tutte',
    },
    {
      id: 5,
      type: 'alert',
      title: 'Lorem ipsum dolor sit amet consectetur',
      description:
        'Lorem ipsum dolor sit amet consectetur. Diam ac sit aliquam suspendisse.',
      link: 'Lorem ipsum',
      timestamp: '5 ore fa',
      category: 'allarmi',
    },
  ]);

  // Filtra notifiche in base al tab selezionato
  const notificheFiltrate =
    selectedTab === 'tutte'
      ? notifiche
      : notifiche.filter((n) => n.category === selectedTab);

  // Conta notifiche per tipo (per badge)
  const allarmiCount = notifiche.filter((n) => n.category === 'allarmi').length;

  const handleNotificationPress = (notification) => {
    alert(`Notifica cliccata: ${notification.title}`);
    // Futuro: navigazione o apertura dettaglio
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    alert('Impostazioni notifiche - Da implementare');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifiche</Text>

        <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'tutte' && styles.tabActive]}
          onPress={() => setSelectedTab('tutte')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'tutte' && styles.tabTextActive,
            ]}
          >
            TUTTE
          </Text>
          {selectedTab === 'tutte' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'avvisi' && styles.tabActive]}
          onPress={() => setSelectedTab('avvisi')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'avvisi' && styles.tabTextActive,
            ]}
          >
            AVVISI
          </Text>
          {selectedTab === 'avvisi' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'allarmi' && styles.tabActive]}
          onPress={() => setSelectedTab('allarmi')}
        >
          <View style={styles.tabWithBadge}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'allarmi' && styles.tabTextActive,
              ]}
            >
              ALLARMI
            </Text>
            {allarmiCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{allarmiCount}</Text>
              </View>
            )}
          </View>
          {selectedTab === 'allarmi' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Lista Notifiche */}
      <FlatList
        data={notificheFiltrate}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Nessuna notifica</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabActive: {
    // Tab attivo
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    width: '60%',
    backgroundColor: COLORS.primary,
  },
  tabWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    backgroundColor: COLORS.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
});

export default NotificheScreen;