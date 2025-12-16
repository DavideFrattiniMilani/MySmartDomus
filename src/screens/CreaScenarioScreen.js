// src/screens/CreaScenarioScreen.js

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
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { useScenari } from '../context/ScenariContext';

const CreaScenarioScreen = ({ navigation, route }) => {
  const { villaId, scenario } = route.params;
  const { addScenario, updateScenario } = useScenari();
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  // 🔥 MODALITÀ: Edit se scenario esiste, altrimenti Create
  const isEditMode = !!scenario;

  // State inizializzato con dati scenario (se edit) o vuoti (se create)
  const [nome, setNome] = useState(scenario?.nome || '');
  const [selectedIcon, setSelectedIcon] = useState(scenario?.icon || scenario?.tipo || 'u_brightness-low');
  const [selectedDays, setSelectedDays] = useState(scenario?.giorni || []);
  const [oraInizio, setOraInizio] = useState(scenario?.oraInizio || '08:00');
  const [oraFine, setOraFine] = useState(scenario?.oraFine || '18:00');
  const [selectedDevices, setSelectedDevices] = useState(scenario?.dispositivi || []);
  const [soloInizio, setSoloInizio] = useState(scenario?.soloInizio || false);

  const iconOptions = [
    { nome: 'u_brightness-low', label: 'Sole' },
    { nome: 'u_moon', label: 'Luna' },
    { nome: 'u_bag-alt', label: 'Lavoro' },
    { nome: 'u_glass-martini', label: 'Festa' },
    { nome: 'u_dumbbell', label: 'Sport' },
    { nome: 'u_star', label: 'Compleanni' },
    { nome: 'u_utensils', label: 'Barbecue' },
    { nome: 'u_trophy', label: 'Fitness' },
  ];

  React.useEffect(() => {
    if (!route.params) return;

    // Aggiorna state quando torni da Giorni/Ora/Ambiente
    if (route.params.selectedDays !== undefined) {
      setSelectedDays(route.params.selectedDays);
    }
    if (route.params.oraInizio !== undefined) {
      setOraInizio(route.params.oraInizio);
    }
    if (route.params.oraFine !== undefined) {
      setOraFine(route.params.oraFine);
    }
    if (route.params.soloInizio !== undefined) {
      setSoloInizio(route.params.soloInizio);
    }
    if (route.params.selectedDevices !== undefined) {
      setSelectedDevices(route.params.selectedDevices);
    }

      if (route.params.nome !== undefined) {
    setNome(route.params.nome);
    }
    if (route.params.selectedIcon !== undefined) {
      setSelectedIcon(route.params.selectedIcon);
    }
    }, [route.params]);

  const handleSalva = () => {
    if (!nome.trim()) {
      alert('Inserisci un nome per lo scenario');
      return;
    }

    const scenarioData = {
      nome,
      tipo: selectedIcon,
      icon: selectedIcon,
      giorni: selectedDays,
      oraInizio,
      oraFine,
      dispositivi: selectedDevices,
      soloInizio,
    };

    if (isEditMode) {
      // 🔥 MODALITÀ EDIT: Aggiorna scenario esistente
      updateScenario(villaId, scenario.id, scenarioData);
    } else {
      // 🔥 MODALITÀ CREATE: Crea nuovo scenario
      addScenario(villaId, scenarioData);
    }

    // 🔥 RESET STACK: Torna pulito a VillaDetail
    navigation.reset({
      index: 0,
      routes: [
        { 
          name: 'VillaTabs', 
          params: { villa: { id: villaId } }
        }
      ],
    });
  };

  const handleNavigateOra = () => {
    navigation.navigate('Ora', {
      villaId,
      oraInizio,
      oraFine,
      soloInizio,
      selectedDays,
      selectedDevices,
      nome,
      selectedIcon,
      scenario: isEditMode ? scenario : null,
      isEditMode,
    });
  };

  const handleNavigateGiorni = () => {
    navigation.navigate('Giorni', {
      villaId,
      selectedDays,
      oraInizio,
      oraFine,
      soloInizio,
      selectedDevices,
      nome,
      selectedIcon,
      scenario: isEditMode ? scenario : null,
      isEditMode,
    });
  };

  const handleNavigateAmbiente = () => {
    navigation.navigate('AmbienteRegolazion', {
      villaId,
      selectedDays,
      oraInizio,
      oraFine,
      soloInizio,
      selectedDevices,
      nome,
      selectedIcon,
      scenario: isEditMode ? scenario : null,
      isEditMode,
    });
  };

  const handleBack = () => {
    if (isEditMode) {
      // Se in edit, torna a ScenariList
      navigation.reset({
        index: 1,
        routes: [
          { name: 'VillaTabs', params: { villa: { id: villaId } } },
          { name: 'ScenariList', params: { villaId } }
        ],
      });
    } else {
      // Se in create, torna a VillaDetail
      navigation.reset({
        index: 0,
        routes: [
          { name: 'VillaTabs', params: { villa: { id: villaId } } }
        ],
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="u_angle-left" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {/* 🔥 TITOLO DINAMICO */}
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>
          {isEditMode ? 'Modifica scenario' : 'Crea nuovo scenario'}
        </Text>
        
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Nome Scenario */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: COLORS.textPrimary }]}>Nome scenario</Text>
          <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
            Abbina un nome allo scenario
          </Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: COLORS.cardBackground,
              color: COLORS.textPrimary,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}
            placeholder="Nome"
            placeholderTextColor={COLORS.textSecondary}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Icona */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: COLORS.textPrimary }]}>Icona</Text>
          <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
            Scegli un'icona da associare
          </Text>
          <View style={styles.iconsGrid}>
            {iconOptions.map(icon => (
              <TouchableOpacity
                key={icon.nome}
                style={[
                  styles.iconOption,
                  {
                    backgroundColor: COLORS.cardBackground,
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  },
                  selectedIcon === icon.nome && styles.iconOptionSelected,
                ]}
                onPress={() => setSelectedIcon(icon.nome)}
              >
                <Icon
                  name={icon.nome}
                  size={28}
                  color={selectedIcon === icon.nome ? COLORS.textPrimary : COLORS.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Giorni */}
        <TouchableOpacity
          style={[styles.navigationSection, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}
          onPress={handleNavigateGiorni}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={[styles.sectionLabel, { color: COLORS.textPrimary }]}>Giorni</Text>
              <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
                Scegli i giorni della settimana
              </Text>
            </View>
            <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
          </View>
          {selectedDays.length > 0 && (
            <View style={[styles.selectedDaysBox, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.27)' : 'rgba(0, 0, 0, 0.1)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <Text style={[styles.selectedDaysText, { color: COLORS.textPrimary }]}>
                {selectedDays.join(', ')}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Ora */}
        <TouchableOpacity
          style={[styles.navigationSection, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}
          onPress={handleNavigateOra}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={[styles.sectionLabel, { color: COLORS.textPrimary }]}>Ora</Text>
              <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
                Scegli l'ora di inizio e fine
              </Text>
            </View>
            <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
          </View>
          <View style={[styles.timeDisplay, {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.27)' : 'rgba(0, 0, 0, 0.1)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <Text style={[styles.timeDisplayText, { color: COLORS.textPrimary }]}>
              {soloInizio ? `Solo alle ${oraInizio}` : `${oraInizio} - ${oraFine}`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Ambiente e Regolazione */}
        <TouchableOpacity
          style={[styles.navigationSection, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}
          onPress={handleNavigateAmbiente}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={[styles.sectionLabel, { color: COLORS.textPrimary }]}>
                Ambiente e regolazione
              </Text>
              <Text style={[styles.sectionDescription, { color: COLORS.textSecondary }]}>
                Scegli gli ambienti e gli oggetti da gestire
              </Text>
            </View>
            <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
          </View>
          {selectedDevices.length > 0 && (
            <View style={styles.selectedDevicesContainer}>
              {selectedDevices.map((device, index) => (
                <View 
                  key={`${device.ambienteName}-${device.luceId || device.luceName}-${index}`}
                  style={[styles.selectedDeviceBox, {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.27)' : 'rgba(0, 0, 0, 0.1)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }]}
                >
                  <Text style={[styles.selectedDeviceText, { color: COLORS.textPrimary }]}>
                    {device.ambienteName} - {device.luceName}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottone Salva */}
      <View style={[styles.footer, {
        backgroundColor: COLORS.background,
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }]}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSalva}
          activeOpacity={0.8}
        >
          {/* 🔥 TESTO BOTTONE DINAMICO */}
          <Text style={styles.saveButtonText}>
            {isEditMode ? 'Salva modifiche' : 'Crea scenario'}
          </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    marginBottom: 12,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  iconOption: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
  },
  iconOptionSelected: {
    backgroundColor: '#FFA74F',
    borderWidth: 2,
    borderColor: '#FFA74F',
  },
  navigationSection: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  selectedDaysBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  selectedDaysText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeDisplay: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  timeDisplayText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  selectedDevicesContainer: {
    gap: 8,
  },
  selectedDeviceBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  selectedDeviceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 120,
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

export default CreaScenarioScreen;