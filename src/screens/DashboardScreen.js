// src/screens/DashboardScreen.js

import React, { useState, useMemo } from 'react';
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
  const [selectedType, setSelectedType] = useState('elettricita'); // 'acqua' o 'elettricita'
  const [selectedPeriod, setSelectedPeriod] = useState('giorno'); // giorno, settimana, mese, anno
  const [currentDate, setCurrentDate] = useState(new Date());

  // Configurazione tipi
  const typeConfig = {
    acqua: {
      label: 'Acqua',
      icon: 'water',
      color: '#3B82F6', // Blu
      unit: 'm³', // ← CORRETTO: metri cubi, non kWh!
    },
    elettricita: {
      label: 'Elettricità',
      icon: 'flash',
      color: COLORS.primary, // Arancione
      unit: 'kWh',
    },
  };

  const config = typeConfig[selectedType];

  const periods = [
    { id: 'giorno', label: 'GIORNO' },
    { id: 'settimana', label: 'SETTIMANA' },
    { id: 'mese', label: 'MESE' },
    { id: 'anno', label: 'ANNO' },
  ];

  // 🔥 GENERA DATI REALISTICI in base al periodo
  const generateChartData = () => {
    const baseValues = {
      elettricita: {
        giorno: Array.from({ length: 24 }, (_, i) => {
          // Picco mattina (6-9) e sera (18-21)
          if (i >= 6 && i <= 9) return Math.random() * 80 + 120; // 120-200
          if (i >= 18 && i <= 21) return Math.random() * 100 + 150; // 150-250
          if (i >= 0 && i <= 5) return Math.random() * 30 + 20; // 20-50 (notte)
          return Math.random() * 60 + 80; // 80-140 (giorno)
        }),
        settimana: Array.from({ length: 7 }, () => Math.random() * 1000 + 2000), // 2000-3000 kWh/giorno
        mese: Array.from({ length: 30 }, () => Math.random() * 1000 + 2000),
        anno: Array.from({ length: 12 }, () => Math.random() * 20000 + 50000), // 50000-70000 kWh/mese
      },
      acqua: {
        giorno: Array.from({ length: 24 }, (_, i) => {
          if (i >= 7 && i <= 9) return Math.random() * 0.3 + 0.4; // Mattina: 0.4-0.7 m³
          if (i >= 19 && i <= 21) return Math.random() * 0.4 + 0.5; // Sera: 0.5-0.9 m³
          if (i >= 0 && i <= 6) return Math.random() * 0.05 + 0.02; // Notte: 0.02-0.07 m³
          return Math.random() * 0.2 + 0.15; // Giorno: 0.15-0.35 m³
        }),
        settimana: Array.from({ length: 7 }, () => Math.random() * 2 + 8), // 8-10 m³/giorno
        mese: Array.from({ length: 30 }, () => Math.random() * 2 + 8),
        anno: Array.from({ length: 12 }, () => Math.random() * 50 + 200), // 200-250 m³/mese
      },
    };

    return baseValues[selectedType][selectedPeriod];
  };

  const chartData = useMemo(() => generateChartData(), [selectedType, selectedPeriod]);
  const maxValue = Math.max(...chartData);

  // 🔥 FORMATO DATA dinamico
  const getFormattedDate = () => {
    const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    
    switch (selectedPeriod) {
      case 'giorno':
        return `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      
      case 'settimana':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.getDate()} ${months[weekStart.getMonth()]} - ${weekEnd.getDate()} ${months[weekEnd.getMonth()]}`;
      
      case 'mese':
        return `${months[currentDate.getMonth()].charAt(0).toUpperCase() + months[currentDate.getMonth()].slice(1)} ${currentDate.getFullYear()}`;
      
      case 'anno':
        return `${currentDate.getFullYear()}`;
      
      default:
        return '';
    }
  };

  // 🔥 LABEL ASSE X dinamiche
  const getXAxisLabels = () => {
    switch (selectedPeriod) {
      case 'giorno':
        return ['00:00', '06:00', '12:00', '18:00', '23:00'];
      case 'settimana':
        return ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
      case 'mese':
        return ['1', '8', '15', '22', '30'];
      case 'anno':
        return ['Gen', 'Mar', 'Mag', 'Lug', 'Set', 'Nov'];
      default:
        return [];
    }
  };

  // 🔥 NAVIGAZIONE DATE
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case 'giorno':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'settimana':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'mese':
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
      case 'anno':
        newDate.setFullYear(currentDate.getFullYear() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    const today = new Date();
    
    switch (selectedPeriod) {
      case 'giorno':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'settimana':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'mese':
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'anno':
        newDate.setFullYear(currentDate.getFullYear() + 1);
        break;
    }
    
    // Non permettere di andare nel futuro
    if (newDate <= today) {
      setCurrentDate(newDate);
    }
  };

  // 🔥 CALCOLA STATISTICHE REALISTICHE
  const calculateStats = () => {
    const currentConsumption = chartData.reduce((sum, val) => sum + val, 0);
    const previousConsumption = currentConsumption * (0.85 + Math.random() * 0.3); // ±15%
    const average = previousConsumption;
    
    const todayChange = ((currentConsumption - previousConsumption) / previousConsumption) * 100;
    const avgChange = ((currentConsumption - average) / average) * 100;

    return {
      current: currentConsumption.toFixed(2),
      average: average.toFixed(2),
      todayChange: todayChange.toFixed(2),
      avgChange: avgChange.toFixed(2),
    };
  };

  const stats = calculateStats();

  // 🔥 PERIODO DI RIFERIMENTO per "Media dei consumi"
  const getAveragePeriodLabel = () => {
    switch (selectedPeriod) {
      case 'giorno':
        return 'Ult. 7 giorni';
      case 'settimana':
        return 'Ult. 4 settimane';
      case 'mese':
        return 'Ult. 12 mesi';
      case 'anno':
        return 'Ult. 5 anni';
      default:
        return '';
    }
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
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
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
                  selectedPeriod === period.id && {
                    backgroundColor: COLORS.primary,  
                  },
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
              <Text
                style={[
                  styles.periodTabText,
                  { color: COLORS.textSecondary },
                  selectedPeriod === period.id && { color: '#000000' },
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Container */}
        <View style={[styles.chartContainer, {
          backgroundColor: COLORS.cardBackground,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }]}>
          {/* Date Navigation */}
          <View style={styles.dateNavigation}>
            <TouchableOpacity style={styles.dateArrow} onPress={handlePrevious}>
              <Icon name="u_angle-left" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.dateText, { color: COLORS.textPrimary }]}>
              {getFormattedDate()}
            </Text>
            <TouchableOpacity 
              style={styles.dateArrow} 
              onPress={handleNext}
              disabled={currentDate >= new Date()}
            >
              <Icon 
                name="u_angle-right" 
                size={20} 
                color={currentDate >= new Date() ? COLORS.textSecondary : COLORS.textPrimary} 
              />
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <View style={styles.chart}>
            {/* Peak Value */}
            <View style={styles.peakValue}>
              <Text style={[styles.peakValueText, { 
                color: config.color,
                backgroundColor: `${config.color}20`
              }]}>
                {maxValue.toFixed(selectedType === 'acqua' ? 2 : 0)} {config.unit}
              </Text>
            </View>

            {/* Bars */}
            <View style={styles.barsContainer}>
              {chartData.map((value, index) => {
                const heightPercentage = (value / maxValue) * 100;
                const isHighlight = index === Math.floor(chartData.length / 2);

                return (
                  <View key={index} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${heightPercentage}%`,
                          backgroundColor: isHighlight 
                            ? config.color 
                            : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            {/* Y-axis labels */}
            <View style={styles.yAxisLabels}>
              <Text style={[styles.yAxisLabel, { color: COLORS.textSecondary }]}>
                {maxValue.toFixed(selectedType === 'acqua' ? 1 : 0)}
              </Text>
              <Text style={[styles.yAxisLabel, { color: COLORS.textSecondary }]}>0</Text>
            </View>

            {/* X-axis labels */}
            <View style={styles.xAxisLabels}>
              {getXAxisLabels().map((label, index) => (
                <Text key={index} style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>
                  {label}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Consumo corrente */}
          <View style={[styles.statCard, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
              Consumo {selectedPeriod === 'giorno' ? 'di oggi' : `del periodo`}
            </Text>
            <Text style={[styles.statValue, { color: COLORS.textPrimary }]}>
              {stats.current} {config.unit}
            </Text>
            <View style={styles.statChange}>
              {/* 🔥 COLORI INVERTITI: Verde se consumi MENO, Rosso se consumi PIÙ */}
              <Ionicons 
                name={parseFloat(stats.todayChange) > 0 ? "trending-up" : "trending-down"} 
                size={14} 
                color={parseFloat(stats.todayChange) > 0 ? "#FF3B30" : "#34C759"} 
              />
              <Text style={[styles.statChangeText, { 
                color: parseFloat(stats.todayChange) > 0 ? "#FF3B30" : "#34C759" 
              }]}>
                {stats.todayChange > 0 ? '+' : ''}{stats.todayChange}%
              </Text>
            </View>
          </View>

          {/* Media dei consumi */}
          <View style={[styles.statCard, {
            backgroundColor: COLORS.cardBackground,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }]}>
            <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
              Media dei consumi
            </Text>
            <Text style={[styles.statPeriod, { color: COLORS.textSecondary }]}>
              {getAveragePeriodLabel()}
            </Text>
            <Text style={[styles.statValue, { color: COLORS.textPrimary }]}>
              {stats.average} {config.unit}
            </Text>
            <View style={styles.statChange}>
              {/* 🔥 COLORI INVERTITI */}
              <Ionicons 
                name={parseFloat(stats.avgChange) > 0 ? "trending-up" : "trending-down"} 
                size={14} 
                color={parseFloat(stats.avgChange) > 0 ? "#FF3B30" : "#34C759"} 
              />
              <Text style={[styles.statChangeText, { 
                color: parseFloat(stats.avgChange) > 0 ? "#FF3B30" : "#34C759" 
              }]}>
                {stats.avgChange > 0 ? '+' : ''}{stats.avgChange}%
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
  periodTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
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
    marginBottom: 4,
  },
  statPeriod: {
    fontSize: 11,
    fontStyle: 'italic',
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