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
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';

const AssistenzaScreen = ({ navigation, route }) => {
  const { villa } = route.params || {};

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistenza</Text>
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
        <Text style={styles.infoText}>
          Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor. 
          Vulputate vulputate senectus consequat. Risus lobortis semper placerat 
          congue convallis fermentum mi sit dui. Egestas phasellus consectetur 
          ornare vitae ornare viverra.
        </Text>

        {/* Opzione FAQ */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={handleFAQ}
          activeOpacity={0.7}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Consulta le FAQ</Text>
            <Text style={styles.optionDescription}>
              Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {/* Opzione Messaggio */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={handleSendMessage}
          activeOpacity={0.7}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Invia un messaggio</Text>
            <Text style={styles.optionDescription}>
              Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
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
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
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
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default AssistenzaScreen;