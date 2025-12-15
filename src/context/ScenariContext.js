// src/context/ScenariContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVillaData } from '../data';

const ScenariContext = createContext();
const STORAGE_KEY = '@scenari_by_villa';

export const ScenariProvider = ({ children }) => {
  const [scenariByVilla, setScenariByVilla] = useState({});
  const [loading, setLoading] = useState(true);

  // CARICA scenari da AsyncStorage al mount
  useEffect(() => {
    loadScenari();
  }, []);

  // SALVA scenari su AsyncStorage ogni volta che cambiano
  useEffect(() => {
    if (!loading) {
      saveScenari();
    }
  }, [scenariByVilla, loading]);

  // Carica scenari salvati
  const loadScenari = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (saved) {
        // Usa scenari salvati
        const parsed = JSON.parse(saved);
        setScenariByVilla(parsed);
      } else {
        // Prima volta: inizializza con scenari di default dalle ville
        const initial = {};
        for (let i = 1; i <= 3; i++) {
          const villa = getVillaData(i);
          if (villa && villa.scenari) {
            initial[i] = villa.scenari.map(s => ({
              ...s,
              giorni: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
              oraInizio: '08:00',
              oraFine: '18:00',
              dispositivi: [],
            }));
          }
        }
        setScenariByVilla(initial);
      }
    } catch (error) {
      console.error('Errore caricamento scenari:', error);
      // Fallback: usa scenari di default
      const initial = {};
      for (let i = 1; i <= 3; i++) {
        const villa = getVillaData(i);
        if (villa && villa.scenari) {
          initial[i] = villa.scenari.map(s => ({
            ...s,
            giorni: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
            oraInizio: '08:00',
            oraFine: '18:00',
            dispositivi: [],
          }));
        }
      }
      setScenariByVilla(initial);
    } finally {
      setLoading(false);
    }
  };

  // Salva scenari su AsyncStorage
  const saveScenari = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(scenariByVilla));
    } catch (error) {
      console.error('Errore salvataggio scenari:', error);
    }
  };

  // Recupera gli scenari di una villa
  const getScenari = (villaId) => {
    return scenariByVilla[villaId] || [];
  };

  // Aggiungi un nuovo scenario
  const addScenario = (villaId, newScenario) => {
    setScenariByVilla(prev => {
      const villaScenari = prev[villaId] || [];
      const maxId = villaScenari.length > 0 
        ? Math.max(...villaScenari.map(s => s.id)) 
        : 0;
      
      const scenario = {
        id: maxId + 1,
        nome: newScenario.nome,
        tipo: newScenario.tipo,
        icon: newScenario.icon,
        attivo: false,
        giorni: newScenario.giorni || [],
        oraInizio: newScenario.oraInizio || '08:00',
        oraFine: newScenario.oraFine || '18:00',
        soloInizio: newScenario.soloInizio || false,
        dispositivi: newScenario.dispositivi || [],
      };
      
      return {
        ...prev,
        [villaId]: [...villaScenari, scenario],
      };
    });
  };

  // Aggiorna uno scenario esistente
  const updateScenario = (villaId, scenarioId, updates) => {
    setScenariByVilla(prev => {
      const villaScenari = prev[villaId] || [];
      return {
        ...prev,
        [villaId]: villaScenari.map(scenario =>
          scenario.id === scenarioId
            ? { ...scenario, ...updates }
            : scenario
        ),
      };
    });
  };

  // Attiva/Disattiva uno scenario
  const toggleScenario = (villaId, scenarioId) => {
    setScenariByVilla(prev => {
      const villaScenari = prev[villaId] || [];
      return {
        ...prev,
        [villaId]: villaScenari.map(scenario =>
          scenario.id === scenarioId
            ? { ...scenario, attivo: !scenario.attivo }
            : scenario
        ),
      };
    });
  };

  // Elimina uno scenario
  const deleteScenario = (villaId, scenarioId) => {
    setScenariByVilla(prev => {
      const villaScenari = prev[villaId] || [];
      return {
        ...prev,
        [villaId]: villaScenari.filter(s => s.id !== scenarioId),
      };
    });
  };

  // Recupera uno scenario specifico
  const getScenarioById = (villaId, scenarioId) => {
    const scenari = getScenari(villaId);
    return scenari.find(s => s.id === scenarioId);
  };

  const value = {
    getScenari,
    addScenario,
    updateScenario,
    toggleScenario,
    deleteScenario,
    getScenarioById,
    loading,
  };

  return (
    <ScenariContext.Provider value={value}>
      {children}
    </ScenariContext.Provider>
  );
};

export const useScenari = () => {
  const context = useContext(ScenariContext);
  if (!context) {
    throw new Error('useScenari must be used within a ScenariProvider');
  }
  return context;
};