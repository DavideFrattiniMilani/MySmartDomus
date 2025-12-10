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
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import NotificationCard from '../components/NotificationCard';
import Icon from '../components/Icon';

const NotificheScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('tutte');
  
  const { isDark } = useTheme();        
  const COLORS = getColors(isDark);     

  // DATI MOCK - Notifiche simulate
const [notifiche] = useState([
  // ===== ALLARMI =====
  {
    id: 1,
    type: 'alert',
    title: 'Movimento rilevato - Ingresso principale',
    description: 'Il sensore antintrusione ha rilevato un movimento all\'ingresso principale di Villa Mann.',
    link: null,
    timestamp: '5 min fa',
    category: 'allarmi',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Connessione videocamera persa',
    description: 'La videocamera del giardino di Villa Mann non risponde. Verifica la connessione internet.',
    link: null,
    timestamp: '45 min fa',
    category: 'allarmi',
  },
  // ===== AVVISI =====
  {
    id: 3,
    type: 'warning',
    title: 'Aggiornamento sistema disponibile',
    description: 'È disponibile un nuovo aggiornamento per il sistema domotico. Aggiorna per ricevere nuove funzionalità e miglioramenti.',
    link: null,
    timestamp: '1 ora fa',
    category: 'avvisi',
  },
  {
    id: 4,
    type: 'warning',
    title: 'Scenario "Buongiorno" completato',
    description: 'Lo scenario "Buongiorno" è stato attivato con successo alle 07:00.',
    link: null,
    timestamp: '3 ore fa',
    category: 'avvisi',
  },
]);

  // Filtra notifiche in base al tab selezionato
  const notificheFiltrate =
    selectedTab === 'tutte'
      ? notifiche
      : notifiche.filter((n) => n.category === selectedTab);

  // Conta notifiche per tipo (per badge)
  const allarmiCount = notifiche.filter((n) => n.category === 'allarmi').length;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate('ImpostazioniNotifiche');
  };

return (
  <View style={[styles.container, { backgroundColor: COLORS.background }]}>
    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
          <Icon name="u_arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Notifiche</Text>

        <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
          <Icon name="u_setting" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { 
          borderBottomColor: COLORS.inputBorder 
        }]}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'tutte' && styles.tabActive]}
          onPress={() => setSelectedTab('tutte')}
        >
          <Text
            style={[
              styles.tabText,
              { color: COLORS.textSecondary },
              selectedTab === 'tutte' && { color: COLORS.primary },
            ]}
          >
            TUTTE
          </Text>
          {selectedTab === 'tutte' && <View style={[styles.tabIndicator, { backgroundColor: COLORS.primary }]} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'avvisi' && styles.tabActive]}
          onPress={() => setSelectedTab('avvisi')}
        >
          <Text
            style={[
              styles.tabText,
              { color: COLORS.textSecondary },
              selectedTab === 'avvisi' && { color: COLORS.primary },
            ]}
          >
            AVVISI
          </Text>
          {selectedTab === 'avvisi' && <View style={[styles.tabIndicator, { backgroundColor: COLORS.primary }]} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'allarmi' && styles.tabActive]}
          onPress={() => setSelectedTab('allarmi')}
        >
          <View style={styles.tabWithBadge}>
          <Text
            style={[
              styles.tabText,
              { color: COLORS.textSecondary },
              selectedTab === 'allarmi' && { color: COLORS.primary },
            ]}
          >
            ALLARMI
          </Text>
            {allarmiCount > 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.primary }]}>
              <Text style={[styles.badgeText, { color: COLORS.textPrimary }]}>{allarmiCount}</Text>
            </View>
            )}
          </View>
          {selectedTab === 'allarmi' && <View style={[styles.tabIndicator, { backgroundColor: COLORS.primary }]} />}
        </TouchableOpacity>
      </View>

      {/* Lista Notifiche */}
      <FlatList
        data={notificheFiltrate}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
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
          <Text style={[styles.emptyText, { color: COLORS.textSecondary }]}>Nessuna notifica</Text>
        </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
    letterSpacing: 0.5,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    width: '60%',
  },
  tabWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
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
    marginTop: 16,
  },
});

export default NotificheScreen;