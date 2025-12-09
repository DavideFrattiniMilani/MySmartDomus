import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { useDrawer } from '../context/DrawerContext';
 import Icon from '../components/Icon';
 import { useUser } from '../context/UserContext';

const HomeCaseScreen = ({ navigation }) => {
const { openDrawer } = useDrawer();
const { profileImage } = useUser();

const handleMenuPress = () => {
  openDrawer();
};
  const [ville] = useState([
    {
      id: 1,
      nome: 'Apt Viale Majno',
      indirizzo: 'Viale Majno, 43, Milano',
      immagine: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      badges: ['Appartamento', 'Palestra'],
      antintrusione: true,
      tvcc: true,
    },
    {
      id: 2,
      nome: 'Villa Mann',
      indirizzo: 'Via Sporini, 1B, Forte dei Marmi',
      immagine: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      badges: ['Villa', 'Piscina'],
      antintrusione: true,
      tvcc: true,
    },
    {
      id: 3,
      nome: 'Villa Plan Gorret',
      indirizzo: 'Via Donzelli, 33, Courmayeur',
      immagine: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      badges: ['Edificio', '5 livelli'],
      antintrusione: true,
      tvcc: true,
    },
  ]);

  const handleVillaPress = (villa) => {
    navigation.navigate('VillaTabs', { villa });
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifiche');
  };

  const handleProfilePress = () => {
    navigation.navigate('Account');
  };

  const renderVillaCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleVillaPress(item)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.immagine }}
        style={styles.cardImage}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          {/* Badges in alto */}
          <View style={styles.badgesContainer}>
            {item.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>

          {/* Info villa in basso */}
          <View style={styles.villaInfo}>
            <Text style={styles.villaName}>{item.nome}</Text>
            <Text style={styles.villaAddress}>{item.indirizzo}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Sezione stati sotto la card */}
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Icon name="u_lock-alt" size={16} color={COLORS.white} />
          <Text style={styles.statusLabel}>Antintrusione</Text>
          <View style={[styles.statusBadge, styles.statusActive]}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Attivo</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <Icon name="u_webcam" size={16} color={COLORS.white} />
          <Text style={styles.statusLabel}>TVCC</Text>
          <View style={[styles.statusBadge, styles.statusActive]}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Attivo</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.iconButton}>
        <Icon name="u_bars" size={28} color={COLORS.white} />
      </TouchableOpacity>

        <Text style={styles.headerTitle}>Scegli una casa</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleNotificationPress} style={styles.iconButton}>
            <Icon name="u_bell" size={24} color={COLORS.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: profileImage }}
                style={styles.avatarImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista ville */}
      <FlatList
        data={ville}
        renderItem={renderVillaCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBackground,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  villaInfo: {
    gap: 4,
  },
  villaName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  villaAddress: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusActive: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default HomeCaseScreen;