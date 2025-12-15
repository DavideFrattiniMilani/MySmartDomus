// src/screens/ScenariListScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { useScenari } from '../context/ScenariContext';

const ScenariListScreen = ({ navigation, route }) => {
  const { villaId } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  const { getScenari, toggleScenario, deleteScenario } = useScenari();
  const scenari = getScenari(villaId);

  const getScenarioIcon = (tipo) => {
    // Se è un'icona specifica (da iconOptions), usala direttamente
    if (tipo && tipo.startsWith('u_')) {
      return tipo;
    }
    
    // Altrimenti mappa i tipi vecchi
    const iconMap = {
      giorno: 'u_brightness-low',
      notte: 'u_moon',
      lavoro: 'u_book',
      festa: 'u_glass-martini',
      sport: 'u_dumbbell',
      compleanni: 'u_star',
      barbecue: 'u_utensils',
    };
    return iconMap[tipo] || 'u_setting';
  };

  // Separa scenari preimpostati da quelli creati
  const scenariPreimpostati = scenari.filter(s => ['giorno', 'notte', 'lavoro'].includes(s.tipo));
  const scenariCreati = scenari.filter(s => !['giorno', 'notte', 'lavoro'].includes(s.tipo));

  const handleScenarioPress = (scenarioId) => {
    toggleScenario(villaId, scenarioId);
  };

  const handleCreaScenario = () => {
    navigation.navigate('CreaScenario', { villaId });
  };

  const handleModificaScenario = (scenario) => {
    // Naviga a CreaScenario in modalità edit
    navigation.navigate('CreaScenario', { 
      villaId,
      scenario,  // Passando scenario, attiva modalità edit
    });
  };

  const handleEliminaScenario = (scenario) => {
    Alert.alert(
      'Elimina scenario',
      `Sei sicuro di voler eliminare lo scenario "${scenario.nome}"?\n\nQuesta azione non può essere annullata.`,
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            deleteScenario(villaId, scenario.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderScenarioItem = (scenario, isPreimpostato = false) => (
    <View
      key={scenario.id}
      style={[styles.scenarioItem, { 
        backgroundColor: COLORS.cardBackground,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }]}
    >
      <TouchableOpacity
        style={styles.scenarioContent}
        activeOpacity={0.7}
        onPress={() => handleScenarioPress(scenario.id)}
      >
        <View style={[styles.scenarioIcon, {
          backgroundColor: isDark ? 'rgba(255, 152, 0, 0.15)' : 'rgba(255, 152, 0, 0.1)'
        }]}>
          <Icon
            name={getScenarioIcon(scenario.tipo || scenario.icon)}
            size={28}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.scenarioInfo}>
          <Text style={[styles.scenarioName, { color: COLORS.textPrimary }]}>
            {scenario.nome}
          </Text>
          <Text style={[styles.scenarioTime, { color: COLORS.textSecondary }]}>
            {scenario.giorni && scenario.giorni.length > 0 
              ? scenario.giorni.join(', ') 
              : 'Tutti i giorni'} | {scenario.oraInizio} - {scenario.oraFine}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Pulsanti Azioni */}
      <View style={styles.actionsContainer}>
        {/* Toggle ON/OFF */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleScenarioPress(scenario.id)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.toggle,
              { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)' },
              scenario.attivo && { backgroundColor: COLORS.primary },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                { backgroundColor: COLORS.white },
                scenario.attivo && styles.toggleThumbActive,
              ]}
            />
          </View>
        </TouchableOpacity>

        {/* Pulsanti Modifica/Elimina (solo per scenari creati) */}
        {!isPreimpostato && (
          <View style={styles.editDeleteButtons}>
            {/* Modifica */}
            <TouchableOpacity
              style={[styles.iconButton, {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              }]}
              onPress={() => handleModificaScenario(scenario)}
              activeOpacity={0.7}
            >
              <Icon name="u_edit" size={18} color={COLORS.primary} />
            </TouchableOpacity>

            {/* Elimina */}
            <TouchableOpacity
              style={[styles.iconButton, {
                backgroundColor: 'rgba(255, 59, 48, 0.1)'
              }]}
              onPress={() => handleEliminaScenario(scenario)}
              activeOpacity={0.7}
            >
              <Icon name="u_trash-alt" size={18} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Scenari</Text>
        <TouchableOpacity onPress={handleCreaScenario}>
          <Icon name="u_plus" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scenari Preimpostati */}
        {scenariPreimpostati.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
              Scenari preimpostati
            </Text>
            {scenariPreimpostati.map(scenario => renderScenarioItem(scenario, true))}
          </View>
        )}

        {/* Scenari Creati */}
        {scenariCreati.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
              Scenari creati
            </Text>
            {scenariCreati.map(scenario => renderScenarioItem(scenario, false))}
          </View>
        )}

        {/* Empty State */}
        {scenariCreati.length === 0 && scenariPreimpostati.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="u_layer-group" size={64} color={COLORS.textSecondary} />
            <Text style={[styles.emptyText, { color: COLORS.textSecondary }]}>
              Nessuno scenario creato
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreaScenario}
            >
              <Text style={styles.createButtonText}>Crea il tuo primo scenario</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Spazio per bottom nav */}
      <View style={styles.bottomSpacer} />
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  scenarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  scenarioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scenarioIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  scenarioTime: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleButton: {
    padding: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  editDeleteButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#FFA74F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ScenariListScreen;