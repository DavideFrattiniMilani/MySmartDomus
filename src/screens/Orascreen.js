import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const OraScreen = ({ navigation, route }) => {
  const { oraInizio: initialOraInizio = '08:00', oraFine: initialOraFine = '18:00' } = route.params || {};
  const [oraInizio, setOraInizio] = useState(initialOraInizio);
  const [oraFine, setOraFine] = useState(initialOraFine);
  const [soloInizio, setSoloInizio] = useState(false);
  
  const { isDark } = useTheme();     
  const COLORS = getColors(isDark);     

  const handleSave = () => {
    navigation.navigate('CreaScenario', {
      villaId: route.params.villaId,
      selectedDays: route.params.selectedDays,
      oraInizio,
      oraFine,
      soloInizio,
      selectedDevices: route.params.selectedDevices,
      nome: route.params.nome,
      selectedIcon: route.params.selectedIcon,
      scenario: route.params.scenario,
    });
  };


  // Generate time options (ogni 15 minuti)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const h = String(hour).padStart(2, '0');
        const m = String(minute).padStart(2, '0');
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const TimePickerRow = ({ label, value, onChange, disabled = false }) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
      <View>
      <TouchableOpacity
        style={[
          styles.timeInputButton,
          {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          disabled && styles.timeInputButtonDisabled
        ]}
        onPress={() => !disabled && setShowPicker(!showPicker)}
        disabled={disabled}
      >
        <Text style={[styles.timeLabel, { color: COLORS.textSecondary }]}>{label}</Text>
        <Text style={[styles.timeValue, { color: COLORS.primary }]}>{value}</Text>
        <Icon name="u_angle-down1" size={20} color={disabled ? COLORS.textSecondary : COLORS.primary} />
      </TouchableOpacity>

        {showPicker && (
        <ScrollView
          style={[styles.timePickerScroll, {
            backgroundColor: COLORS.cardBackground,
            borderColor: COLORS.primary
          }]}
          showsVerticalScrollIndicator={true}
        >
            {timeOptions.map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
                value === time && styles.timeOptionSelected,
              ]}
              onPress={() => {
                onChange(time);
                setShowPicker(false);
              }}
            >
              <Text
                style={[
                  styles.timeOptionText,
                  { color: COLORS.textPrimary },
                  value === time && { fontWeight: '600', color: COLORS.primary },
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
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
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Ora</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Solo Inizio Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setSoloInizio(!soloInizio)}
        >
        <View
          style={[
            styles.checkbox,
            { borderColor: COLORS.textSecondary },
            soloInizio && styles.checkboxSelected,
          ]}
        >
          {soloInizio && (
            <Ionicons name="checkmark" size={16} color={COLORS.textPrimary} />
          )}
        </View>
        <Text style={[styles.checkboxLabel, { color: COLORS.textPrimary }]}>Imposta solo l'inizio</Text>
        </TouchableOpacity>

        {/* Time Pickers */}
        <View style={styles.timePickersContainer}>
          <TimePickerRow
            label="Dalle"
            value={oraInizio}
            onChange={setOraInizio}
          />

          <TimePickerRow
            label="Alle"
            value={oraFine}
            onChange={setOraFine}
            disabled={soloInizio}
          />
        </View>

        {/* Info */}
        <View style={[styles.infoBox, { borderColor: COLORS.primary }]}>
          <Text style={[styles.infoText, { color: COLORS.textPrimary }]}>
            {soloInizio
              ? 'Lo scenario si attiva solo all\'ora impostata'
              : `Lo scenario è attivo dalle ${oraInizio} alle ${oraFine}`}
          </Text>
        </View>

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
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
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  timePickersContainer: {
    gap: 16,
    marginBottom: 24,
  },
  timeInputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
  },
  timeInputButtonDisabled: {
    opacity: 0.5,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  timePickerScroll: {
    borderRadius: 12,
    maxHeight: 300,
    marginTop: 8,
    borderWidth: 1,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  timeOptionSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  timeOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
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

export default OraScreen;