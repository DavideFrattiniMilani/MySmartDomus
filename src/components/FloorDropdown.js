import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const FloorDropdown = ({ floors, selectedFloor, onSelectFloor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (floor) => {
    onSelectFloor(floor);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>Seleziona il piano della tua casa</Text>

      {/* Dropdown button */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>{selectedFloor}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.white}
        />
      </TouchableOpacity>

      {/* Modal con lista piani */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={floors}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item === selectedFloor && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item === selectedFloor && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {item === selectedFloor && (
                    <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selectedText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  optionSelected: {
    backgroundColor: 'rgba(255, 159, 90, 0.1)',
  },
  optionText: {
    fontSize: 15,
    color: COLORS.white,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default FloorDropdown;