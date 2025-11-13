import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { COLORS } from '../constants/colors';

const ScenariCard = ({ scenari, onToggleScenario, onCreateNew }) => {
  // Mappa icone per tipo scenario
const getScenarioIcon = (tipo) => {
  switch (tipo) {
    case 'giorno':
      return 'u_brightness-low';
    case 'notte':
      return 'u_moon';
    case 'lavoro':
      return 'u_book';
    default:
      return 'u_home-alt';
  }
};

  return (
    <View style={styles.container}>
      {/* Griglia scenari */}
      <View style={styles.grid}>
        {scenari.map((scenario) => (
          <TouchableOpacity
            key={scenario.id}
            style={styles.scenarioCard}
            onPress={() => onToggleScenario(scenario.id)}
            activeOpacity={0.7}
          >
            {/* Icona */}
            <View style={styles.iconContainer}>
              <Icon
                name={getScenarioIcon(scenario.tipo)}
                size={28}
                color={COLORS.white}
              />
            </View>

            {/* Nome scenario */}
            <Text style={styles.scenarioName}>{scenario.nome}</Text>

            {/* Toggle switch */}
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
        ))}
      </View>

      {/* Bottone crea nuovo scenario */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={onCreateNew}
        activeOpacity={0.7}
      >
        <Text style={styles.createButtonText}>Crea nuovo scenario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  scenarioCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  createButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default ScenariCard;