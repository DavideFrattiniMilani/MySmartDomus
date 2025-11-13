import React, { useState } from 'react';
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
import Icon from '../components/Icon';

const GiorniScreen = ({ navigation, route }) => {
  const { selectedDays: initialDays } = route.params || {};
  const [selectedDays, setSelectedDays] = useState(initialDays || []);

  const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSelectAll = () => {
    if (selectedDays.length === giorni.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays([...giorni]);
    }
  };

const handleSave = () => {
  navigation.navigate('CreaScenario', {
    ...route.params,
    selectedDays,
  });
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="u_angle-left" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giorni</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select All */}
        <TouchableOpacity
          style={styles.selectAllButton}
          onPress={handleSelectAll}
        >
          <View
            style={[
              styles.checkbox,
              selectedDays.length === giorni.length && styles.checkboxSelected,
            ]}
          >
            {selectedDays.length === giorni.length && (
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            )}
          </View>
          <Text style={styles.selectAllText}>Tutti i giorni</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Days List */}
        {giorni.map(day => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayItem,
              selectedDays.includes(day) && styles.dayItemSelected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <View
              style={[
                styles.checkbox,
                selectedDays.includes(day) && styles.checkboxSelected,
              ]}
            >
              {selectedDays.includes(day) && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.dayLabel}>{day}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Conferma</Text>
        </TouchableOpacity>
      </View>
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
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayLabel: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  selectAllText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.background,
  },
});

export default GiorniScreen;