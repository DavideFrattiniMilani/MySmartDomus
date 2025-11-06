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
import { useScenari } from '../context/ScenariContext';
import { getVillaData } from '../data';

const CreaScenarioScreen = ({ navigation, route }) => {
  const { villaId, } = route.params;
  const { addScenario } = useScenari();

  // State del form
  const [nome, setNome] = useState(route.params?.nome || '');
  const [selectedIcon, setSelectedIcon] = useState(route.params?.icon || 'sunny');
  const [selectedDays, setSelectedDays] = useState(route.params?.selectedDays || []);
  const [oraInizio, setOraInizio] = useState(route.params?.oraInizio || '08:00');
  const [oraFine, setOraFine] = useState(route.params?.oraFine || '18:00');
  const [selectedDevices, setSelectedDevices] = useState(route.params?.selectedDevices || []);
  const [soloInizio, setSoloInizio] = useState(route.params?.soloInizio || false);

  const iconOptions = [
    { nome: 'sunny', label: 'Sole' },
    { nome: 'moon', label: 'Luna' },
    { nome: 'briefcase', label: 'Lavoro' },
    { nome: 'wine', label: 'Festa' },
    { nome: 'barbell', label: 'Sport' },
    { nome: 'gift', label: 'Compleanni' },
    { nome: 'restaurant', label: 'Barbecue' },
    { nome: 'fitness', label: 'Fitness' },
  ];

React.useEffect(() => {
  if (!route.params) return;

  setSelectedDays(route.params.selectedDays ?? selectedDays);
  setOraInizio(route.params.oraInizio ?? oraInizio);
  setOraFine(route.params.oraFine ?? oraFine);
  setSoloInizio(
    route.params.soloInizio !== undefined ? route.params.soloInizio : soloInizio
  );
  setSelectedDevices(route.params.selectedDevices ?? selectedDevices);
}, [route.params]);


  const handleCreaScenario = () => {
    if (!nome.trim()) {
      alert('Inserisci un nome per lo scenario');
      return;
    }

    const newScenario = {
      nome,
      tipo: selectedIcon,
      icon: selectedIcon,
      giorni: selectedDays.length > 0 ? selectedDays : [],
      oraInizio,
      oraFine,
      dispositivi: selectedDevices,
      soloInizio,
    };

    addScenario(villaId, newScenario);
    navigation.navigate('VillaTabs', { screen: 'Home' });
  };

const handleNavigateOra = () => {
  navigation.navigate('Ora', {
    villaId,
    oraInizio,
    oraFine,
    soloInizio,
    selectedDays,
    selectedDevices,
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
  });
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity
  onPress={() => {
    navigation.reset({
      index: 0,
      routes: [
        { 
          name: 'VillaTabs', 
          params: { villa: { id: villaId } } 
        }
      ],
    });
  }}
>
  <Ionicons name="chevron-back" size={28} color={COLORS.white} />
</TouchableOpacity>


        <Text style={styles.headerTitle}>Crea nuovo scenario</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Nome Scenario */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Nome scenario</Text>
          <Text style={styles.sectionDescription}>Abbina un nome allo scenario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor={COLORS.textSecondary}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Icona */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Icona</Text>
          <Text style={styles.sectionDescription}>Scegli un'icona da associare</Text>
          <View style={styles.iconsGrid}>
            {iconOptions.map(icon => (
              <TouchableOpacity
                key={icon.nome}
                style={[
                  styles.iconOption,
                  selectedIcon === icon.nome && styles.iconOptionSelected,
                ]}
                onPress={() => setSelectedIcon(icon.nome)}
              >
                <Ionicons
                  name={icon.nome}
                  size={28}
                  color={selectedIcon === icon.nome ? COLORS.white : COLORS.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Giorni */}
        <TouchableOpacity
          style={styles.navigationSection}
          onPress={handleNavigateGiorni}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={styles.sectionLabel}>Giorni</Text>
              <Text style={styles.sectionDescription}>Scegli i giorni della settimana</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </View>
        {selectedDays.length > 0 && (
        <View style={styles.selectedDaysBox}>
            <Text style={styles.selectedDaysText}>
            {selectedDays.join(', ')}
            </Text>
        </View>
        )}
        </TouchableOpacity>

        {/* Ora */}
        <TouchableOpacity
          style={styles.navigationSection}
          onPress={handleNavigateOra}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={styles.sectionLabel}>Ora</Text>
              <Text style={styles.sectionDescription}>Scegli l'ora di inizio e fine</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.timeDisplay}>
            <Text style={styles.timeDisplayText}>
              {soloInizio ? `Solo alle ${oraInizio}` : `${oraInizio} - ${oraFine}`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Ambiente e Regolazione */}
        <TouchableOpacity
          style={styles.navigationSection}
          onPress={handleNavigateAmbiente}
        >
          <View style={styles.navigationHeader}>
            <View>
              <Text style={styles.sectionLabel}>Ambiente e regolazione</Text>
              <Text style={styles.sectionDescription}>Scegli gli ambienti e gli oggetti da gestire</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </View>
        {selectedDevices.length > 0 && (
        <View style={styles.selectedDevicesContainer}>
            {selectedDevices.map((device, index) => (
            <View key={index} style={styles.selectedDeviceBox}>
                <Text style={styles.selectedDeviceText}>
                {device.ambienteName} - {device.luceName}
                </Text>
            </View>
            ))}
        </View>
        )}
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottone Crea */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreaScenario}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>Crea scenario</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
  },
  navigationSection: {
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
selectedDaysBox: {
  backgroundColor: 'rgba(255, 255, 255, 0.27)',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
},
selectedDaysText: {
  fontSize: 14,
  color: COLORS.white,
  fontWeight: '500',
},
timeDisplay: {
  backgroundColor: 'rgba(255, 255, 255, 0.27)',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
},
timeDisplayText: {
  fontSize: 14,
  color: COLORS.white,
  fontWeight: '500',
  textAlign: 'left',
},
  selectedDevicesContainer: {
   gap: 8,
  },
  selectedDeviceBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
    selectedDeviceText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 120,
  },
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.background,
  },
});

export default CreaScenarioScreen;