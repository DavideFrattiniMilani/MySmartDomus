import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import Icon from '../components/Icon';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

const AssistenzaScreen = ({ navigation, route }) => {
  const { villa } = route.params || {};
  const { isDark } = useTheme();  
  const COLORS = getColors(isDark);

  const handleCallAssistance = () => {
    Linking.openURL('tel:+391234567890');
  };

  const handleFAQ = () => {
    alert('Apertura FAQ');
  };

  const handleSendMessage = () => {
    alert('Invia un messaggio');
  };

return (
  <View style={[styles.container, { backgroundColor: COLORS.background }]}>
    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.iconButton}
        >
          <Icon name="u_arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Assistenza</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Bottone Chiama */}
        <CustomButton 
          title="Chiama l'assistenza"
          onPress={handleCallAssistance}
          style={styles.callButton}
        />

        {/* Testo informativo */}
        <Text style={[styles.infoText, { color: COLORS.textSecondary }]}>
          Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor. 
          Vulputate vulputate senectus consequat. Risus lobortis semper placerat 
          congue convallis fermentum mi sit dui. Egestas phasellus consectetur 
          ornare vitae ornare viverra.
        </Text>

        {/* Opzione FAQ */}
          <TouchableOpacity 
            style={[styles.optionCard, {
              backgroundColor: COLORS.cardBackground,
              borderColor: COLORS.inputBorder
            }]}
            onPress={handleFAQ}
            activeOpacity={0.7}
          >
          <View style={styles.optionContent}>
            <Text style={[styles.optionTitle, { color: COLORS.textPrimary }]}>Consulta le FAQ</Text>
            <Text style={[styles.optionDescription, { color: COLORS.textSecondary }]}>
              Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.
            </Text>
          </View>
          <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {/* Opzione Messaggio */}
          <TouchableOpacity 
            style={[styles.optionCard, {
              backgroundColor: COLORS.cardBackground,
              borderColor: COLORS.inputBorder
            }]}
            onPress={handleSendMessage}
            activeOpacity={0.7}
          >
          <View style={styles.optionContent}>
            <Text style={[styles.optionTitle, { color: COLORS.textPrimary }]}>Invia un messaggio</Text>
            <Text style={[styles.optionDescription, { color: COLORS.textSecondary }]}>
              Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.
            </Text>
          </View>
          <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  callButton: {
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default AssistenzaScreen;