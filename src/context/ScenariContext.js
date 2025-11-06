import React, { createContext, useContext, useState } from 'react';
import { getVillaData } from '../data';

const ScenariContext = createContext();

export const ScenariProvider = ({ children }) => {
  // Stato per gli scenari di tutte le ville
  // Inizializzato con i dati delle ville
  const [scenariByVilla, setScenariByVilla] = useState(() => {
    const initial = {};
    // Inizializza con gli scenari di ogni villa
    for (let i = 1; i <= 3; i++) {
      const villa = getVillaData(i);
      if (villa && villa.scenari) {
        initial[i] = villa.scenari.map(s => ({
          ...s,
          // Aggiungi campi aggiuntivi per ogni scenario
          giorni: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
          oraInizio: '08:00',
          oraFine: '18:00',
          dispositivi: [], // Lista di dispositivi da controllare
        }));
      }
    }
    return initial;
  });

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
        dispositivi: newScenario.dispositivi || [], // Array di {ambiente, dispositivi}
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