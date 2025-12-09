import React, { useState } from 'react';
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
import { getAmbienti, getPiani } from '../data';

const AmbienteRegolazionScreen = ({ navigation, route }) => {
  const { villaId, selectedDevices: initialDevices = [] } = route.params || {};
  const [selectedDevices, setSelectedDevices] = useState(initialDevices);
  const { isDark } = useTheme();     
  const COLORS = getColors(isDark);   
  
  // Recupera piani dalla villa
  const piani = getPiani(villaId);
  
  // Piano terra come default
  const defaultPiano = piani.find(p => p.includes('terra')) || piani[0];
  const [selectedPiano, setSelectedPiano] = useState(defaultPiano);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ambienti = getAmbienti(villaId);
  
  // Filtra ambienti per piano selezionato
  const ambientiPerPiano = ambienti.filter(a => a.piano === selectedPiano);

  const toggleDevice = (ambienteId, luceId, luceName, ambienteName) => {
    setSelectedDevices(prev => {
      const exists = prev.find(d => d.ambienteId === ambienteId && d.luceId === luceId);
      if (exists) {
        return prev.filter(d => !(d.ambienteId === ambienteId && d.luceId === luceId));
      } else {
        return [
          ...prev,
          {
            ambienteId,
            ambienteName,
            luceId,
            luceName,
          },
        ];
      }
    });
  };

const handleSave = () => {
  navigation.navigate('CreaScenario', {
    ...route.params,
    selectedDevices,
  });
};


  const isDeviceSelected = (ambienteId, luceId) => {
    return selectedDevices.some(d => d.ambienteId === ambienteId && d.luceId === luceId);
  };

return (
  <View style={[styles.container, { backgroundColor: COLORS.background }]}>
    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon  name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Ambiente e regolazione</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dropdown Piano */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.dropdownButton, {
              backgroundColor: COLORS.cardBackground,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={[styles.dropdownButtonText, { color: COLORS.textPrimary }]}>{selectedPiano}</Text>
          <Icon
            name={dropdownOpen ? 'u_angle-up' : 'u_angle-down1'}
            size={20}
            color={COLORS.primary}
          />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={[styles.dropdownMenu, { 
                backgroundColor: COLORS.cardBackground,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
              {piani.map(piano => (
                <TouchableOpacity
                  key={piano}
                  style={[
                    styles.dropdownItem,
                    { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    selectedPiano === piano && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedPiano(piano);
                    setDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      { color: COLORS.textPrimary },
                      selectedPiano === piano && { color: COLORS.primary, fontWeight: '600' },
                    ]}
                  >
                    {piano}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Ambienti per Piano Selezionato */}
        {ambientiPerPiano.length > 0 && (
          <View style={styles.ambientiSection}>
            {ambientiPerPiano.map(ambiente => (
              <View key={ambiente.id} style={styles.ambienteGroup}>
                {/* Titolo Ambiente */}
                <Text style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>{ambiente.nome}</Text>

                {/* Luci dell'Ambiente */}
                {ambiente.dispositivi?.luci && ambiente.dispositivi.luci.length > 0 && (
                  <View style={styles.luciList}>
                    {ambiente.dispositivi.luci.map(luce => (
                    <TouchableOpacity
                      key={luce.id}
                      style={[
                        styles.luceItem,
                        {
                          backgroundColor: COLORS.cardBackground,
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        isDeviceSelected(ambiente.id, luce.id) && styles.luceItemSelected,
                      ]}
                        onPress={() => toggleDevice(ambiente.id, luce.id, luce.nome, ambiente.nome)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            { borderColor: COLORS.textSecondary },
                            isDeviceSelected(ambiente.id, luce.id) && styles.checkboxSelected,
                          ]}
                        >
                          {isDeviceSelected(ambiente.id, luce.id) && (
                            <Icon name="u_check" size={14} color={COLORS.textPrimary} />
                          )}
                        </View>
                        <Text style={[styles.luceName, { color: COLORS.textPrimary }]}>{luce.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Se non ha luci */}
                {(!ambiente.dispositivi?.luci || ambiente.dispositivi.luci.length === 0) && (
                  <Text style={[styles.label, { color: COLORS.textSecondary }]}>Nessuna luce in questo ambiente</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {ambientiPerPiano.length === 0 && (
          <Text style={[styles.noAmbientes, { color: COLORS.textSecondary }]}>
            Nessun ambiente in questo piano
          </Text>
        )}

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
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownMenu: {
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ambientiSection: {
    gap: 20,
  },
  ambienteGroup: {
    marginBottom: 12,
  },
  luciList: {
    gap: 8,
  },
  luceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 12,
  },
  luceItemSelected: {
    borderColor: '#FFA74F',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FFA74F',
    borderColor: '#FFA74F',
  },
  luceName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  noDevices: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
  noAmbientes: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 32,
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

export default AmbienteRegolazionScreen;