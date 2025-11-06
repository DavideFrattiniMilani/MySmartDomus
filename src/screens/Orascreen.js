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
import { COLORS } from '../constants/colors';

const OraScreen = ({ navigation, route }) => {
  const { oraInizio: initialOraInizio = '08:00', oraFine: initialOraFine = '18:00' } = route.params || {};
  const [oraInizio, setOraInizio] = useState(initialOraInizio);
  const [oraFine, setOraFine] = useState(initialOraFine);
  const [soloInizio, setSoloInizio] = useState(false);

const handleSave = () => {
  navigation.navigate('CreaScenario', {
    ...route.params,
    oraInizio,
    oraFine,
    soloInizio,
  });
};


  // Generate time options (every 15 minutes)
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
          style={[styles.timeInputButton, disabled && styles.timeInputButtonDisabled]}
          onPress={() => !disabled && setShowPicker(!showPicker)}
          disabled={disabled}
        >
          <Text style={styles.timeLabel}>{label}</Text>
          <Text style={styles.timeValue}>{value}</Text>
          <Ionicons name="chevron-down" size={20} color={disabled ? COLORS.textSecondary : COLORS.primary} />
        </TouchableOpacity>

        {showPicker && (
          <ScrollView
            style={styles.timePickerScroll}
            showsVerticalScrollIndicator={true}
          >
            {timeOptions.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
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
                    value === time && styles.timeOptionTextSelected,
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ora</Text>
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
              soloInizio && styles.checkboxSelected,
            ]}
          >
            {soloInizio && (
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Imposta solo l'inizio</Text>
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
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            {soloInizio
              ? 'Lo scenario si attiva solo all\'ora impostata'
              : `Lo scenario è attivo dalle ${oraInizio} alle ${oraFine}`}
          </Text>
        </View>

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
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.white,
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
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeInputButtonDisabled: {
    opacity: 0.5,
  },
  timeLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  timeValue: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  timePickerScroll: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    maxHeight: 300,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  timeOptionSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  timeOptionText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  timeOptionTextSelected: {
    fontWeight: '600',
    color: COLORS.primary,
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
    borderColor: COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
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

export default OraScreen;