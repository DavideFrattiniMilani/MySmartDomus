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
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import Icon from '../components/Icon';

const GiorniScreen = ({ navigation, route }) => {
  const { selectedDays: initialDays } = route.params || {};
  const [selectedDays, setSelectedDays] = useState(initialDays || []);
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

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
  <View style={[styles.container, { backgroundColor: COLORS.background }]}>
    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Giorni</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select All */}
        <TouchableOpacity
          style={[styles.selectAllButton, {
            backgroundColor: COLORS.cardBackground,
            borderColor: COLORS.primary
          }]}
          onPress={handleSelectAll}
        >
        <View
          style={[
            styles.checkbox,
            { borderColor: COLORS.textSecondary },
            selectedDays.length === giorni.length && styles.checkboxSelected,
          ]}
        >
          {selectedDays.length === giorni.length && (
            <Ionicons name="checkmark" size={16} color={COLORS.textPrimary} />
          )}
        </View>
        <Text style={[styles.selectAllText, { color: COLORS.textPrimary }]}>Tutti i giorni</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={[styles.divider, { 
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
        }]} />

        {/* Days List */}
        {giorni.map(day => (
        <TouchableOpacity
          key={day}
          style={[
            styles.dayItem,
            {
              backgroundColor: COLORS.cardBackground,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            selectedDays.includes(day) && styles.dayItemSelected,
          ]}
          onPress={() => toggleDay(day)}
        >
          <View
            style={[
              styles.checkbox,
              { borderColor: COLORS.textSecondary },
              selectedDays.includes(day) && styles.checkboxSelected,
            ]}
          >
            {selectedDays.includes(day) && (
              <Ionicons name="checkmark" size={16} color={COLORS.textPrimary} />
            )}
          </View>
          <Text style={[styles.dayLabel, { color: COLORS.textPrimary }]}>{day}</Text>
        </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Button */}
      <View style={[styles.footer, {
        backgroundColor: COLORS.background,
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }]}>
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
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  dayItemSelected: {
    borderColor: '#FFA74F',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#FFA74F',
    borderColor: '#FFA74F',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  saveButton: {
    backgroundColor: '#FFA74F',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default GiorniScreen;