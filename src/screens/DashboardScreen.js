// src/screens/DashboardScreen

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import Icon from '../components/Icon';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation, route }) => {
  const { villa } = route.params || {};

  const { isDark } = useTheme();        
  const COLORS = getColors(isDark);    
  // Stati
  const [selectedType, setSelectedType] = useState('acqua'); // 'acqua' o 'elettricita'
  const [selectedPeriod, setSelectedPeriod] = useState('giorno'); // giorno, settimana, mese, anno

  // Dati mock grafico
  const chartData = [
    120, 150, 180, 160, 200, 170, 190, 160, 140, 180, 200, 170,
    160, 180, 150, 190, 160, 140, 180, 200, 170, 160, 140, 100
  ];

  const maxValue = Math.max(...chartData);

  const periods = [
    { id: 'giorno', label: 'GIORNO' },
    { id: 'settimana', label: 'SETTIMANA' },
    { id: 'mese', label: 'MESE' },
    { id: 'anno', label: 'ANNO' },
  ];

  const typeConfig = {
    acqua: {
      label: 'Acqua',
      icon: 'water',
      color: '#3B82F6', 
      unit: 'L',
    },
    elettricita: {
      label: 'Elettricità',
      icon: 'flash',
      color: COLORS.primary, 
      unit: 'kWh',
    },
  };

  const config = typeConfig[selectedType];

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
        <Text style={[styles.headerTitle, { color: COLORS.textPrimary }]}>Dashboard</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Selector Tipo */}
        <View style={styles.typeSelector}>
        <Ionicons name={config.icon} size={24} color={COLORS.textPrimary} />
        <Text style={[styles.typeLabel, { color: COLORS.textPrimary }]}>{config.label}</Text>
          
        <TouchableOpacity 
          style={[styles.dropdown, {
            backgroundColor: COLORS.cardBackground,
            borderColor: COLORS.inputBorder
          }]}
          onPress={() => {
            setSelectedType(selectedType === 'acqua' ? 'elettricita' : 'acqua');
          }}
        >
          <Text style={[styles.dropdownText, { color: COLORS.textPrimary }]}>{config.label}</Text>
          <Icon name="u_angle-down1" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        </View>

        {/* Period Tabs */}
        <View style={styles.periodTabs}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodTab,
                selectedPeriod === period.id && styles.periodTabActive,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
            <Text
              style={[
                styles.periodTabText,
                { color: COLORS.textSecondary },
                selectedPeriod === period.id && { color: COLORS.textPrimary },
              ]}
            >
              {period.label}
            </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Container */}
        <View style={[styles.chartContainer, { backgroundColor: COLORS.cardBackground }]}>
          {/* Date Navigation */}
          <View style={styles.dateNavigation}>
            <TouchableOpacity style={styles.dateArrow}>
              <Icon name="u_angle-left" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.dateText, { color: COLORS.textPrimary }]}>13 dicembre 2025</Text>
            <TouchableOpacity style={styles.dateArrow}>
              <Icon name="u_angle-right" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <View style={styles.chart}>
            {/* Peak Value */}
            <View style={styles.peakValue}>
              <Text style={[styles.peakValueText, { color: config.color }]}>
                239 {config.unit}
              </Text>
            </View>

            {/* Bars */}
            <View style={styles.barsContainer}>
              {chartData.map((value, index) => {
                const heightPercentage = (value / maxValue) * 100;
                const isHighlight = index === 4; // Barra evidenziata

                return (
                  <View key={index} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${heightPercentage}%`,
                          backgroundColor: isHighlight ? config.color : COLORS.inputBorder,
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            {/* Y-axis labels */}
            <View style={styles.yAxisLabels}>
            <Text style={[styles.yAxisLabel, { color: COLORS.textSecondary }]}>200</Text>
            <Text style={[styles.yAxisLabel, { color: COLORS.textSecondary }]}>0</Text>
            </View>

            {/* X-axis labels */}
            <View style={styles.xAxisLabels}>
              <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>00.00</Text>
              <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>06.00</Text>
              <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>12.00</Text>
              <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>18.00</Text>
              <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>23.00</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Consumo di oggi */}
          <View style={[styles.statCard, {
            backgroundColor: COLORS.cardBackground,
            borderColor: COLORS.inputBorder
          }]}>
            <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>Consumo di oggi</Text>
            <Text style={[styles.statValue, { color: COLORS.textPrimary }]}>309.45 kWh</Text>
            <View style={styles.statChange}>
              <Ionicons name="trending-up" size={14} color="#34C759" />
              <Text style={[styles.statChangeText, { color: '#34C759' }]}>
                +7.45%
              </Text>
            </View>
          </View>

          {/* Media dei consumi */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Media dei consumi</Text>
            <Text style={styles.statValue}>230.12 kWh</Text>
            <View style={styles.statChange}>
              <Ionicons name="trending-down" size={14} color="#FF3B30" />
              <Text style={[styles.statChangeText, { color: '#FF3B30' }]}>
                -3.35%
              </Text>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  typeLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 8,
  },
  periodTabs: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodTabActive: {
    backgroundColor: '#FFA74F',
  },
  periodTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateArrow: {
    padding: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chart: {
    position: 'relative',
  },
  peakValue: {
    position: 'absolute',
    top: 10,
    left: '30%',
    zIndex: 10,
  },
  peakValueText: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 4,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 180,
    marginBottom: 12,
    paddingTop: 30,
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 2,
  },
  bar: {
    width: '100%',
    borderRadius: 2,
    minHeight: 4,
  },
  yAxisLabels: {
    position: 'absolute',
    right: 0,
    top: 30,
    bottom: 12,
    justifyContent: 'space-between',
  },
  yAxisLabel: {
    fontSize: 10,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DashboardScreen;