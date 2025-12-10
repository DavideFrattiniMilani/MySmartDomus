// src/screens/ImpostazioniNotificheScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const STORAGE_KEY = '@notification_preferences';

const ImpostazioniNotificheScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  // Stati
  const [notifichePushAttive, setNotifichePushAttive] = useState(true);
  const [notificheAvvisi, setNotificheAvvisi] = useState(true);
  const [notificheAllarmi, setNotificheAllarmi] = useState(true);
  const [modalitaNonDisturbare, setModalitaNonDisturbare] = useState(false);
  const [oraInizio, setOraInizio] = useState('22:00');
  const [oraFine, setOraFine] = useState('07:00');
  const [loading, setLoading] = useState(true);

  // Time picker states
  const [showPickerInizio, setShowPickerInizio] = useState(false);
  const [showPickerFine, setShowPickerFine] = useState(false);

  // Genera opzioni orario (ogni 15 minuti)
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

  // Carica preferenze all'avvio
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setNotifichePushAttive(prefs.notifichePushAttive ?? true);
        setNotificheAvvisi(prefs.notificheAvvisi ?? true);
        setNotificheAllarmi(prefs.notificheAllarmi ?? true);
        setModalitaNonDisturbare(prefs.modalitaNonDisturbare ?? false);
        setOraInizio(prefs.oraInizio ?? '22:00');
        setOraFine(prefs.oraFine ?? '07:00');
      }
    } catch (error) {
      console.error('Errore caricamento preferenze:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalva = async () => {
    try {
      const preferences = {
        notifichePushAttive,
        notificheAvvisi,
        notificheAllarmi,
        modalitaNonDisturbare,
        oraInizio,
        oraFine,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      alert('Impostazioni salvate con successo!');
      navigation.goBack();
    } catch (error) {
      console.error('Errore salvataggio preferenze:', error);
      alert('Errore nel salvataggio delle impostazioni');
    }
  };

  // Time Picker Component
  const TimePicker = ({ value, onChange, visible, onClose, label }) => {
    if (!visible) return null;

    return (
      <View style={[styles.timePickerOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.timePickerContainer, { backgroundColor: COLORS.cardBackground }]}>
          <View style={styles.timePickerHeader}>
            <Text style={[styles.timePickerTitle, { color: COLORS.textPrimary }]}>
              {label}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="u_times" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.timePickerScroll}
            showsVerticalScrollIndicator={true}
          >
            {timeOptions.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  {
                    borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  },
                  value === time && styles.timeOptionSelected,
                ]}
                onPress={() => {
                  onChange(time);
                  onClose();
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
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: COLORS.textPrimary }}>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>
          Impostazioni notifiche
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Sezione Notifiche Push */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
            Notifiche Push
          </Text>
          <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
            Ricevi notifiche sul tuo dispositivo
          </Text>

          <View style={[styles.settingRow, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <View style={styles.settingInfo}>
              <Icon name="u_bell" size={20} color={COLORS.textPrimary} />
              <Text style={[styles.settingLabel, { color: COLORS.textPrimary }]}>
                Abilita notifiche push
              </Text>
            </View>
            <Switch
              value={notifichePushAttive}
              onValueChange={setNotifichePushAttive}
              trackColor={{ 
                false: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', 
                true: COLORS.primary 
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Sezione Tipi di Notifiche (visibile solo se push attive) */}
        {notifichePushAttive && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
              Tipi di notifiche
            </Text>
            <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
              Scegli quali notifiche ricevere
            </Text>

            {/* Avvisi */}
            <View style={[styles.settingRow, {
              backgroundColor: COLORS.cardBackground,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <View style={styles.settingInfo}>
                <Icon name="u_info-circle" size={20} color={COLORS.warning600} />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: COLORS.textPrimary }]}>
                    Avvisi
                  </Text>
                  <Text style={[styles.settingSubtext, { color: COLORS.textSecondary }]}>
                    Notifiche informative
                  </Text>
                </View>
              </View>
              <Switch
                value={notificheAvvisi}
                onValueChange={setNotificheAvvisi}
                trackColor={{ 
                  false: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', 
                  true: COLORS.primary 
                }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Allarmi */}
            <View style={[styles.settingRow, {
              backgroundColor: COLORS.cardBackground,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <View style={styles.settingInfo}>
                <Icon name="u_exclamation-triangle" size={20} color={COLORS.error600} />
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingLabel, { color: COLORS.textPrimary }]}>
                    Allarmi
                  </Text>
                  <Text style={[styles.settingSubtext, { color: COLORS.textSecondary }]}>
                    Notifiche di sicurezza
                  </Text>
                </View>
              </View>
              <Switch
                value={notificheAllarmi}
                onValueChange={setNotificheAllarmi}
                trackColor={{ 
                  false: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', 
                  true: COLORS.primary 
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        )}

        {/* Sezione Non Disturbare (visibile solo se push attive) */}
        {notifichePushAttive && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
              Non disturbare
            </Text>
            <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
              Disattiva le notifiche in una fascia oraria
            </Text>

            {/* Toggle Non Disturbare */}
            <View style={[styles.settingRow, {
              backgroundColor: COLORS.cardBackground,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <View style={styles.settingInfo}>
                <Icon name="u_moon" size={20} color={COLORS.textPrimary} />
                <Text style={[styles.settingLabel, { color: COLORS.textPrimary }]}>
                  Modalità non disturbare
                </Text>
              </View>
              <Switch
                value={modalitaNonDisturbare}
                onValueChange={setModalitaNonDisturbare}
                trackColor={{ 
                  false: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', 
                  true: COLORS.primary 
                }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Fascia oraria (visibile solo se non disturbare attivo) */}
            {modalitaNonDisturbare && (
              <View style={[styles.timeRangeContainer, {
                backgroundColor: COLORS.cardBackground,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <Text style={[styles.timeRangeLabel, { color: COLORS.textSecondary }]}>
                  Fascia oraria silenziosa
                </Text>
                
                <View style={styles.timeRow}>
                  <View style={styles.timeItem}>
                    <Text style={[styles.timeLabel, { color: COLORS.textSecondary }]}>
                      Dalle
                    </Text>
                    <TouchableOpacity 
                      style={[styles.timeButton, {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        borderColor: COLORS.primary
                      }]}
                      onPress={() => setShowPickerInizio(true)}
                    >
                      <Text style={[styles.timeValue, { color: COLORS.primary }]}>
                        {oraInizio}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Icon name="u_arrow-right" size={20} color={COLORS.textSecondary} />

                  <View style={styles.timeItem}>
                    <Text style={[styles.timeLabel, { color: COLORS.textSecondary }]}>
                      Alle
                    </Text>
                    <TouchableOpacity 
                      style={[styles.timeButton, {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        borderColor: COLORS.primary
                      }]}
                      onPress={() => setShowPickerFine(true)}
                    >
                      <Text style={[styles.timeValue, { color: COLORS.primary }]}>
                        {oraFine}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.infoBox, {
                  backgroundColor: isDark ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 152, 0, 0.15)',
                  borderColor: COLORS.primary
                }]}>
                  <Icon name="u_info-circle" size={16} color={COLORS.primary} />
                  <Text style={[styles.infoText, { color: COLORS.textPrimary }]}>
                    Durante questa fascia oraria non riceverai notifiche
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Info aggiuntiva */}
        {!notifichePushAttive && (
          <View style={[styles.warningBox, {
            backgroundColor: isDark ? 'rgba(233, 162, 59, 0.1)' : 'rgba(233, 162, 59, 0.15)',
            borderColor: COLORS.warning600
          }]}>
            <Icon name="u_exclamation-triangle" size={20} color={COLORS.warning600} />
            <Text style={[styles.warningText, { color: COLORS.textPrimary }]}>
              Con le notifiche disattivate, non riceverai aggiornamenti importanti sulla sicurezza della tua casa
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Button */}
      <View style={[styles.footer, {
        backgroundColor: COLORS.background,
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
          onPress={handleSalva}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salva impostazioni</Text>
        </TouchableOpacity>
      </View>

      {/* Time Pickers */}
      <TimePicker
        value={oraInizio}
        onChange={setOraInizio}
        visible={showPickerInizio}
        onClose={() => setShowPickerInizio(false)}
        label="Seleziona ora inizio"
      />

      <TimePicker
        value={oraFine}
        onChange={setOraFine}
        visible={showPickerFine}
        onClose={() => setShowPickerFine(false)}
        label="Seleziona ora fine"
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  timeRangeContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 4,
  },
  timeRangeLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeItem: {
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
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
  // Time Picker Styles
  timePickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  timePickerContainer: {
    width: '85%',
    maxHeight: '70%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timePickerScroll: {
    maxHeight: 400,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  timeOptionSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  timeOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ImpostazioniNotificheScreen;