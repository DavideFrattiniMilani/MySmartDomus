import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { useScenari } from '../context/ScenariContext';

const ScenariListScreen = ({ navigation, route }) => {
  const { villaId } = route.params;
  const { getScenari, toggleScenario } = useScenari();
  const scenari = getScenari(villaId);
  
  const { isDark } = useTheme();      
  const COLORS = getColors(isDark);     

const getScenarioIcon = (tipo) => {
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

  const renderScenarioItem = (scenario) => (
      <TouchableOpacity
        key={scenario.id}
        style={[styles.scenarioItem, {
          backgroundColor: COLORS.cardBackground,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }]}
        activeOpacity={0.7}
      >
      <View style={styles.scenarioContent}>
        <View style={styles.scenarioIcon}>
        <Icon
          name={getScenarioIcon(scenario.tipo)}
          size={28}
          color={COLORS.primary}
        />
        </View>
        <View style={styles.scenarioInfo}>
        <Text style={[styles.scenarioName, { color: COLORS.textPrimary }]}>{scenario.nome}</Text>
        <Text style={[styles.scenarioTime, { color: COLORS.textSecondary }]}>
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
            { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' },
            scenario.attivo && styles.toggleActive,
          ]}
        >
          <View
            style={[
              styles.toggleThumb,
              { backgroundColor: COLORS.textPrimary },
              scenario.attivo && styles.toggleThumbActive,
            ]}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
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
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>Scenari preimpostati</Text>
          {scenariPreimpostati.map(scenario => renderScenarioItem(scenario))}
        </View>

        {/* Scenari Creati */}
        {scenariCreati.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>Scenari creati</Text>
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
    marginBottom: 4,
  },
  scenarioTime: {
    fontSize: 12,
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
  toggleActive: {
    backgroundColor: '#FFA74F',
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
  bottomSpacer: {
    height: 100,
  },
});

export default ScenariListScreen;