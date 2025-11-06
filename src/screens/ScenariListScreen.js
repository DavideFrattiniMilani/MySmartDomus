import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useScenari } from '../context/ScenariContext';

const ScenariListScreen = ({ navigation, route }) => {
  const { villaId } = route.params;
  const { getScenari, toggleScenario } = useScenari();
  const scenari = getScenari(villaId);

  const getScenarioIcon = (tipo) => {
    const iconMap = {
      giorno: 'sunny',
      notte: 'moon',
      lavoro: 'briefcase',
      festa: 'wine',
      sport: 'barbell',
      compleanni: 'gift',
      barbecue: 'restaurant',
    };
    return iconMap[tipo] || 'settings';
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

  const renderScenarioItem = (scenario) => (
    <TouchableOpacity
      key={scenario.id}
      style={styles.scenarioItem}
      activeOpacity={0.7}
    >
      <View style={styles.scenarioContent}>
        <View style={styles.scenarioIcon}>
          <Ionicons
            name={getScenarioIcon(scenario.tipo)}
            size={28}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.scenarioInfo}>
          <Text style={styles.scenarioName}>{scenario.nome}</Text>
          <Text style={styles.scenarioTime}>
            Tutti i giorni | {scenario.oraInizio} - {scenario.oraFine}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => handleScenarioPress(scenario.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.toggle,
            scenario.attivo && styles.toggleActive,
          ]}
        >
          <View
            style={[
              styles.toggleThumb,
              scenario.attivo && styles.toggleThumbActive,
            ]}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scenari</Text>
        <TouchableOpacity onPress={handleCreaScenario}>
          <Ionicons name="add" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scenari Preimpostati */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scenari preimpostati</Text>
          {scenariPreimpostati.map(scenario => renderScenarioItem(scenario))}
        </View>

        {/* Scenari Creati */}
        {scenariCreati.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scenari creati</Text>
            {scenariCreati.map(scenario => renderScenarioItem(scenario))}
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
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
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
    color: COLORS.white,
    marginBottom: 12,
  },
  scenarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
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
    color: COLORS.white,
    marginBottom: 4,
  },
  scenarioTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  toggleButton: {
    padding: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ScenariListScreen;