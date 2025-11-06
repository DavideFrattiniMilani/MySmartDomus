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
import { getAmbienti, getPiani } from '../data';

const AmbienteRegolazionScreen = ({ navigation, route }) => {
  const { villaId, selectedDevices: initialDevices = [] } = route.params || {};
  const [selectedDevices, setSelectedDevices] = useState(initialDevices);
  
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambiente e regolazione</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dropdown Piano */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={styles.dropdownButtonText}>{selectedPiano}</Text>
            <Ionicons
              name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              {piani.map(piano => (
                <TouchableOpacity
                  key={piano}
                  style={[
                    styles.dropdownItem,
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
                      selectedPiano === piano && styles.dropdownItemTextSelected,
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
                <Text style={styles.ambienteSectionTitle}>{ambiente.nome}</Text>

                {/* Luci dell'Ambiente */}
                {ambiente.dispositivi?.luci && ambiente.dispositivi.luci.length > 0 && (
                  <View style={styles.luciList}>
                    {ambiente.dispositivi.luci.map(luce => (
                      <TouchableOpacity
                        key={luce.id}
                        style={[
                          styles.luceItem,
                          isDeviceSelected(ambiente.id, luce.id) && styles.luceItemSelected,
                        ]}
                        onPress={() => toggleDevice(ambiente.id, luce.id, luce.nome, ambiente.nome)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            isDeviceSelected(ambiente.id, luce.id) && styles.checkboxSelected,
                          ]}
                        >
                          {isDeviceSelected(ambiente.id, luce.id) && (
                            <Ionicons name="checkmark" size={14} color={COLORS.white} />
                          )}
                        </View>
                        <Text style={styles.luceName}>{luce.nome}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Se non ha luci */}
                {(!ambiente.dispositivi?.luci || ambiente.dispositivi.luci.length === 0) && (
                  <Text style={styles.noDevices}>Nessuna luce in questo ambiente</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {ambientiPerPiano.length === 0 && (
          <Text style={styles.noAmbientes}>Nessun ambiente in questo piano</Text>
        )}

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
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  dropdownMenu: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.white,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  ambientiSection: {
    gap: 20,
  },
  ambienteGroup: {
    marginBottom: 12,
  },
  ambienteSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 10,
    paddingHorizontal: 4,
    textTransform: 'capitalize',
  },
  luciList: {
    gap: 8,
  },
  luceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  luceItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  luceName: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  noDevices: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
  noAmbientes: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 32,
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

export default AmbienteRegolazionScreen;