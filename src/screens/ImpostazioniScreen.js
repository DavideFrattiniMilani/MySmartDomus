import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from '../components/Icon';
import { COLORS } from '../constants/colors';

const ImpostazioniScreen = ({ navigation }) => {
  const options = [
    {
      id: 1,
      title: 'Gestisci la mia casa',
      description: 'Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.',
      onPress: () => alert('Gestisci casa'),
    },
    {
      id: 2,
      title: 'Notifiche',
      description: 'Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.',
      onPress: () => alert('Notifiche'),
    },
    {
      id: 3,
      title: 'Tema',
      description: 'Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.',
      onPress: () => alert('Tema'),
    },
    {
      id: 4,
      title: 'Account',
      description: 'Lorem ipsum dolor sit amet consectetur. Mattis neque a ut nec dolor.',
      onPress: () => alert('Account'),
    },
  ];

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
        <Text style={styles.headerTitle}>Impostazioni</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Icon name="u_angle-right" size={20} color={COLORS.white} />
          </TouchableOpacity>
        ))}
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
    paddingTop: 8,
    paddingBottom: 40,
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

export default ImpostazioniScreen;