import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVillaData, getVideocamere, getAntintrusione } from '../data';
import { COLORS } from '../constants/colors';
import WeatherWidget from '../components/WeatherWidget';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import IntrusionCard from '../components/IntrusionCard';
import { useDrawer } from '../context/DrawerContext';
import { useScenari } from '../context/ScenariContext';

const VillaDetailScreen = ({ navigation, route }) => {
  const { openDrawer } = useDrawer();
  
  // Dati villa
  const villaParam = route?.params?.villa;
  const villaId = villaParam?.id || 1;
  const villaData = getVillaData(villaId);

  // Recupera dati dalla struttura dati
  const cameras = getVideocamere(villaId);
  const antintrusione = getAntintrusione(villaId);
  const [porte, setPorte] = useState(antintrusione?.porte || []);
  const meteo = villaData?.meteo || { temperatura: '22°C', data: '14 feb 2025' };

  // Scenari dal context
  const { getScenari, toggleScenario } = useScenari();
  const scenari = getScenari(villaId);

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifiche');
  };

  const handleProfilePress = () => {
    alert('Profilo utente - Da implementare');
  };

  const handleWeatherPress = () => {
    alert('Cambia casa o modifica parametri - Da implementare');
  };

  const handleVideoCamereSeeAll = () => {
    alert('Vedi tutte le videocamere - Da implementare');
  };

  const handleIntrusioneSeeAll = () => {
    alert('Vedi tutte le porte - Da implementare');
  };

  const handleTogglePorta = (portaId) => {
    setPorte((prevPorte) =>
      prevPorte.map((porta) =>
        porta.id === portaId ? { ...porta, attivo: !porta.attivo } : porta
      )
    );
  };

  const handleScenariSeeAll = () => {
    navigation.navigate('ScenariList', { villaId });
  };

  const handleToggleScenario = (scenarioId) => {
    toggleScenario(villaId, scenarioId);
  };

  const handleCreateScenario = () => {
    navigation.navigate('CreaScenario', { villaId });
  };

  const getScenarioIcon = (tipo) => {
    const iconMap = {
      giorno: 'sunny',
      notte: 'moon',
      lavoro: 'briefcase',
      festa: 'wine',
      sport: 'barbell',
      compleanni: 'gift',
      barbecue: 'restaurant',
    };
    return iconMap[tipo] || 'settings';
  };

  // Prendi solo i primi 3 scenari per la preview
  const scenariPreview = scenari.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={28} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{villaData.nome}</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                style={styles.avatarImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenuto scrollabile */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Widget Meteo */}
        <WeatherWidget
          villa={villaData}
          temperatura={meteo.temperatura}
          data={meteo.data}
          onPress={handleWeatherPress}
        />

        {/* Sezione Videocamere */}
        <SectionHeader
          title="Videocamere"
          onSeeAll={handleVideoCamereSeeAll}
        />
        <VideoCard cameras={cameras} />

        {/* Sezione Antintrusione */}
        <IntrusionCard
          title="Antintrusione"
          porte={porte}
          onSeeAll={handleIntrusioneSeeAll}
          onTogglePorta={handleTogglePorta}
        />

        {/* Sezione Scenari Principali */}
        <SectionHeader 
          title="Scenari principali" 
          onSeeAll={handleScenariSeeAll}
        />
        <View style={styles.scenariContainer}>
          {scenariPreview.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={[
                styles.scenarioCard,
                scenario.attivo && styles.scenarioCardActive,
              ]}
              onPress={() => handleToggleScenario(scenario.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={getScenarioIcon(scenario.tipo)}
                size={24}
                color={scenario.attivo ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={styles.scenarioCardText}>{scenario.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottone Crea Scenario */}
        <TouchableOpacity
          style={styles.createScenarioButton}
          onPress={handleCreateScenario}
          activeOpacity={0.8}
        >
          <Text style={styles.createScenarioButtonText}>Crea nuovo scenario</Text>
        </TouchableOpacity>

        {/* Spazio in basso */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  notificationBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  scenariContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  scenarioCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scenarioCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  scenarioCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  createScenarioButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  createScenarioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default VillaDetailScreen;