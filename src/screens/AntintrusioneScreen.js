// src/screens/AntintrusioneScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { getAntintrusione } from '../data';

const AntintrusioneScreen = ({ navigation, route }) => {
  const { villaId } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  // Dati antintrusione
  const antintrusioneData = getAntintrusione(villaId);
  const [sistemaAttivo, setSistemaAttivo] = useState(antintrusioneData?.attivo || true);
  const [porte, setPorte] = useState(antintrusioneData?.porte || []);

  // Statistiche
  const porteAttive = porte.filter(p => p.attivo).length;
  const porteDisattive = porte.filter(p => !p.attivo).length;

  const handleToggleSistema = (value) => {
    if (!value) {
      // Disattivazione sistema completo → Conferma
      Alert.alert(
        'Disattiva sistema antintrusione',
        'Sei sicuro di voler disattivare completamente il sistema di antintrusione?\n\nTutte le porte non saranno più protette.',
        [
          {
            text: 'Annulla',
            style: 'cancel',
          },
          {
            text: 'Disattiva tutto',
            style: 'destructive',
            onPress: () => {
              setSistemaAttivo(false);
              // Disattiva anche tutte le porte
              setPorte(porte.map(p => ({ ...p, attivo: false })));
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Attivazione sistema → Diretta
      setSistemaAttivo(true);
    }
  };

  const handleTogglePorta = (portaId) => {
    const porta = porte.find(p => p.id === portaId);
    
    if (!porta) return;

    if (porta.attivo) {
      // Disattivazione singola porta → Conferma
      Alert.alert(
        'Conferma disattivazione',
        `Sei sicuro di voler disattivare l'antintrusione per "${porta.nome}"?\n\nLa porta non sarà più protetta dal sistema di sicurezza.`,
        [
          {
            text: 'Annulla',
            style: 'cancel',
          },
          {
            text: 'Disattiva',
            style: 'destructive',
            onPress: () => {
              setPorte(porte.map(p => 
                p.id === portaId ? { ...p, attivo: false } : p
              ));
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Attivazione singola porta → Diretta
      setPorte(porte.map(p => 
        p.id === portaId ? { ...p, attivo: true } : p
      ));
    }
  };

  const handleAttivatutte = () => {
    Alert.alert(
      'Attiva tutte le porte',
      'Vuoi attivare l\'antintrusione per tutte le porte?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Attiva tutto',
          onPress: () => {
            setSistemaAttivo(true);
            setPorte(porte.map(p => ({ ...p, attivo: true })));
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>
          Antintrusione
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Card Stato Sistema */}
        <View style={[styles.statusCard, {
          backgroundColor: COLORS.cardBackground,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }]}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Icon 
                name={sistemaAttivo ? "u_shield-check" : "u_shield-slash"} 
                size={32} 
                color={sistemaAttivo ? '#34C759' : '#FF3B30'} 
              />
            </View>
            <View style={styles.statusInfo}>
              <Text style={[styles.statusTitle, { color: COLORS.textPrimary }]}>
                Sistema antintrusione
              </Text>
              <Text style={[styles.statusSubtitle, { 
                color: sistemaAttivo ? '#34C759' : '#FF3B30' 
              }]}>
                {sistemaAttivo ? 'Attivo' : 'Disattivo'}
              </Text>
            </View>
            <Switch
              value={sistemaAttivo}
              onValueChange={handleToggleSistema}
              trackColor={{ 
                false: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', 
                true: '#34C759' 
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Statistiche */}
          {sistemaAttivo && (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: '#34C759' }]} />
                <Text style={[styles.statText, { color: COLORS.textPrimary }]}>
                  {porteAttive} Attive
                </Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statDot, { backgroundColor: '#FF3B30' }]} />
                <Text style={[styles.statText, { color: COLORS.textPrimary }]}>
                  {porteDisattive} Disattive
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Sezione Porte */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
              Porte protette
            </Text>
            {sistemaAttivo && porteDisattive > 0 && (
              <TouchableOpacity onPress={handleAttivatutte}>
                <Text style={[styles.sectionAction, { color: COLORS.primary }]}>
                  Attiva tutte
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Lista Porte */}
          <View style={styles.porteList}>
            {porte.map((porta) => (
              <TouchableOpacity
                key={porta.id}
                style={[styles.portaCard, {
                  backgroundColor: COLORS.cardBackground,
                  borderColor: porta.attivo 
                    ? 'rgba(52, 199, 89, 0.3)' 
                    : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }]}
                onPress={() => sistemaAttivo && handleTogglePorta(porta.id)}
                activeOpacity={sistemaAttivo ? 0.7 : 1}
                disabled={!sistemaAttivo}
              >
                {/* Icona Lucchetto */}
                <View style={[styles.portaIcon, {
                  backgroundColor: porta.attivo 
                    ? 'rgba(52, 199, 89, 0.15)' 
                    : 'rgba(255, 59, 48, 0.15)'
                }]}>
                  <Icon
                    name={porta.attivo ? 'u_lock-alt' : 'u_lock-open-alt'}
                    size={20}
                    color={porta.attivo ? '#34C759' : '#FF3B30'}
                  />
                </View>

                {/* Info Porta */}
                <View style={styles.portaInfo}>
                  <Text style={[styles.portaNome, { 
                    color: sistemaAttivo ? COLORS.textPrimary : COLORS.textSecondary 
                  }]}>
                    {porta.nome}
                  </Text>
                  <Text style={[styles.portaStatus, { 
                    color: porta.attivo ? '#34C759' : '#FF3B30' 
                  }]}>
                    {porta.attivo ? 'Protetta' : 'Non protetta'}
                  </Text>
                </View>

                {/* Badge Stato */}
                <View style={[
                  styles.badge,
                  porta.attivo ? styles.badgeActive : styles.badgeInactive
                ]}>
                  <View style={[
                    styles.badgeDot,
                    porta.attivo ? styles.badgeDotActive : styles.badgeDotInactive
                  ]} />
                  <Text style={[styles.badgeText, { color: COLORS.textPrimary }]}>
                    {porta.attivo ? 'Attivo' : 'Disattivo'}
                  </Text>
                </View>

                {/* Chevron */}
                {sistemaAttivo && (
                  <Icon name="u_angle-right" size={20} color={COLORS.textSecondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Box */}
        {!sistemaAttivo && (
          <View style={[styles.infoBox, {
            backgroundColor: isDark ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 59, 48, 0.15)',
            borderColor: '#FF3B30'
          }]}>
            <Icon name="u_exclamation-triangle" size={20} color="#FF3B30" />
            <Text style={[styles.infoText, { color: COLORS.textPrimary }]}>
              Il sistema di antintrusione è disattivato. La tua casa non è protetta. 
              Attiva il sistema per proteggere le porte.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  statusCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '500',
  },
  porteList: {
    gap: 12,
  },
  portaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 2,
  },
  portaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portaInfo: {
    flex: 1,
  },
  portaNome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  portaStatus: {
    fontSize: 13,
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default AntintrusioneScreen;