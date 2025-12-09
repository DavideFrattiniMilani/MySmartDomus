import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

const DrawerMenu = ({ navigation, visible, onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    if (visible) {
      // Apri drawer
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Chiudi drawer
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleMenuItemPress = (action) => {
    onClose();
    setTimeout(() => {
      action();
    }, 300); // Aspetta che il drawer si chiuda
  };

  const menuItems = [
    {
      id: 1,
      title: 'Impostazioni',
      icon: 'settings-outline',
      action: () => {
        if (navigation && navigation.navigate) {
          navigation.navigate('Account');
        }
      },
    },
    {
      id: 2,
      title: 'Storico allarmi',
      icon: 'mail-outline',
      action: () => {
        alert('Storico allarmi - Coming soon');
      },
    },
    {
      id: 3,
      title: 'Logout',
      icon: 'log-out-outline',
      action: () => {
        if (navigation && navigation.reset) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      },
    },
    {
      id: 4,
      title: 'Esci',
      icon: 'close-circle-outline',
      action: () => {
        // Semplicemente chiude il drawer
      },
    },
  ];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Overlay scuro */}
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Drawer animato */}
        <Animated.View
          style={[
            styles.drawerContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item.action)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name={item.icon} size={24} color={COLORS.white} />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: COLORS.cardBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default DrawerMenu;