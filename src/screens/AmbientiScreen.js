import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from '../components/Icon';
import { COLORS } from '../constants/colors';
import RoomCard from '../components/RoomCard';
import FloorDropdown from '../components/FloorDropdown';
import { getVillaData, getPiani } from '../data';

const AmbientiScreen = ({ navigation, route }) => {
  const villaId = route?.params?.villaId || 1;
  
  // Recupera dati villa
  const villaData = getVillaData(villaId);
  const floors = getPiani(villaId);
  
  const [selectedFloor, setSelectedFloor] = useState(floors[0] || 'Piano terra');

  // Filtra ambienti per piano selezionato
  const ambientiPiano = villaData?.ambienti.filter(
    (ambiente) => ambiente.piano === selectedFloor
  ) || [];

  // Converti dispositivi.luci in array per RoomCard (compatibilità)
  const stanzeFiltrate = ambientiPiano.map(ambiente => ({
    ...ambiente,
    dispositivi: ambiente.dispositivi.luci || []
  }));

  const handleRoomPress = (room) => {
    navigation.navigate('Stanza', { room });
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifiche');
  };

  const handleProfilePress = () => {
    alert('Profilo utente');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.iconButton}
        >
          <Icon name="u_arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Ambienti</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={styles.iconButton}
          >
            <Icon name="u_bell" size={24} color={COLORS.white} />
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

      {/* Contenuto */}
      <View style={styles.content}>
        {/* Dropdown Piano */}
        <FloorDropdown
          floors={floors}
          selectedFloor={selectedFloor}
          onSelectFloor={setSelectedFloor}
        />

        {/* Lista Stanze */}
        <FlatList
          data={stanzeFiltrate}
          renderItem={({ item }) => (
            <RoomCard room={item} onPress={() => handleRoomPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="u_home-alt" size={24} color={COLORS.white} />
              <Text style={styles.emptyText}>
                Nessuna stanza in questo piano
              </Text>
            </View>
          }
        />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
});

export default AmbientiScreen;