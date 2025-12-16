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
import Icon from '../components/Icon';
import { getVillaData, getVideocamere, getAntintrusione } from '../data';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import WeatherWidget from '../components/WeatherWidget';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import IntrusionCard from '../components/IntrusionCard';
import { useDrawer } from '../context/DrawerContext';
import { useScenari } from '../context/ScenariContext';
import { useUser } from '../context/UserContext';

const VillaDetailScreen = ({ navigation, route }) => {
  //const { openDrawer } = useDrawer();
  const { isDark } = useTheme();        
  const COLORS = getColors(isDark);
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
  const { profileImage } = useUser();
  const scenari = getScenari(villaId);

  {/*const handleMenuPress = () => {
    openDrawer();
  };*/}

  const handleNotificationPress = () => {
    navigation.navigate('Notifiche');
  };

  const handleProfilePress = () => {
    navigation.navigate('Account');
  };

  const handleWeatherPress = () => {
    alert('In arrivo prossimamente');
  };

  const handleVideoCamereSeeAll = () => {
    alert('In arrivo prossimamente');
  };

  const handleIntrusioneSeeAll = () => {
    navigation.navigate('Antintrusione', { villaId });
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
    // Se è già un'icona (inizia con 'u_'), usala direttamente
    if (tipo && tipo.startsWith('u_')) {
      return tipo;
    }
    
    // Altrimenti mappa i tipi vecchi
    const iconMap = {
      giorno: 'u_brightness-low',
      notte: 'u_moon',
      lavoro: 'u_book',
      festa: 'u_glass-martini',
      sport: 'u_dumbbell',
      compleanni: 'u_star',
      barbecue: 'u_utensils',
    };
    return iconMap[tipo] || 'u_setting';
  };
  // Prendi solo i primi 3 scenari per la preview
  const scenariPreview = scenari.slice(0, 3);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        {/*<TouchableOpacity onPress={handleMenuPress} style={styles.iconButton}>
          <Icon name="u_bars" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>*/}
          <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: profileImage }}
                style={styles.avatarImage}
              />
            </View>
          </TouchableOpacity>
          
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>{villaData.nome}</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={styles.iconButton}
          >
            <Icon name="u_bell" size={24} color={COLORS.textPrimary} />
            <View style={[styles.notificationBadge, { borderColor: COLORS.background }]}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Assistenza', { villa: villaData })}
            style={styles.iconButton}
          >
            <Icon name="u_question-circle" size={24} color={COLORS.textPrimary} />
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
                {
                  backgroundColor: COLORS.cardBackground,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                },
                scenario.attivo && styles.scenarioCardActive,
              ]}
              onPress={() => handleToggleScenario(scenario.id)}
              activeOpacity={0.7}
            >
              <Icon
                name={getScenarioIcon(scenario.tipo)}
                size={24}
                color={scenario.attivo ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={[styles.scenarioCardText, { color: COLORS.textPrimary }]}>{scenario.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottone Crea Scenario */}
        <TouchableOpacity
          style={[styles.createScenarioButton, { borderColor: COLORS.primary }]}
          onPress={handleCreateScenario}
          activeOpacity={0.8}
        >
          <Text style={[styles.createScenarioButtonText, { color: COLORS.primary }]}>Crea nuovo scenario</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFA74F',
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
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  scenarioCardActive: {
    borderColor: '#FFA74F',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  scenarioCardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  createScenarioButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  createScenarioButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default VillaDetailScreen;