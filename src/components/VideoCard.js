import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // 20px padding per lato

const VideoCard = ({ cameras }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Carousel immagini */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.carousel}
      >
        {cameras.map((camera, index) => (
          <ImageBackground
            key={index}
            source={{ uri: camera.immagine }}
            style={styles.imageBackground}
            imageStyle={styles.image}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
              style={styles.gradient}
            >
              {/* Data e ora + badge LIVE */}
              <View style={styles.header}>
                <Text style={styles.datetime}>{camera.datetime}</Text>
                {camera.isLive && (
                  <View style={styles.liveBadge}>
                    <View style={styles.liveIndicator} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                )}
              </View>

              {/* Nome camera + toggle */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[
                    styles.cameraButton,
                    camera.isActive && styles.cameraButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.cameraButtonText,
                      camera.isActive && styles.cameraButtonTextActive,
                    ]}
                  >
                    {camera.nome}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {cameras.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  carousel: {
    marginBottom: 12,
  },
  imageBackground: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: 0,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  datetime: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '500',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  footer: {
    flexDirection: 'row',
  },
  cameraButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraButtonActive: {
    backgroundColor: COLORS.primary,
  },
  cameraButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  cameraButtonTextActive: {
    color: COLORS.white,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.inputBorder,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
});

export default VideoCard;