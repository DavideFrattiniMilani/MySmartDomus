import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

const CasaCard = ({ villa, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: villa.immagine }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {/* Gradient overlay per rendere leggibile il testo */}
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          {/* Badge in alto (piani, garage, piscina) */}
          <View style={styles.badgesContainer}>
            {villa.piani && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{villa.piani} piani</Text>
              </View>
            )}
            {villa.garage && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Garage</Text>
              </View>
            )}
            {villa.piscina && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Piscina</Text>
              </View>
            )}
          </View>

          {/* Informazioni villa in basso */}
          <View style={styles.infoContainer}>
            <Text style={styles.villaName}>{villa.nome}</Text>
            <Text style={styles.villaAddress}>{villa.indirizzo}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBackground,
    // Shadow per iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Shadow per Android
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.badgeBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(10px)', // Effetto blur (non supportato ovunque)
  },
  badgeText: {
    color: COLORS.badgeText,
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    gap: 4,
  },
  villaName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  villaAddress: {
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
  },
});

export default CasaCard;