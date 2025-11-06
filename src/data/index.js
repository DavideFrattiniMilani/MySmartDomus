import { villaMann } from './ville/villaMann';
import { aptVialeMajno } from './ville/aptVialeMajno';
import { villaPlanGorret } from './ville/villaPlanGorret';

// Helper per recuperare dati villa
export const getVillaData = (villaId) => {
  const ville = {
    1: aptVialeMajno,
    2: villaMann,
    3: villaPlanGorret,
  };
  
  return ville[villaId] || null;
};

// Helper per recuperare solo ambienti
export const getAmbienti = (villaId) => {
  const villa = getVillaData(villaId);
  return villa ? villa.ambienti : [];
};

// Helper per recuperare ambienti per piano
export const getAmbientiPerPiano = (villaId, piano) => {
  const ambienti = getAmbienti(villaId);
  return ambienti.filter(ambiente => ambiente.piano === piano);
};

// Helper per recuperare piani disponibili
export const getPiani = (villaId) => {
  const villa = getVillaData(villaId);
  return villa ? villa.piani : [];
};

// Helper per recuperare scenari
export const getScenari = (villaId) => {
  const villa = getVillaData(villaId);
  return villa ? villa.scenari : [];
};

// Helper per recuperare videocamere
export const getVideocamere = (villaId) => {
  const villa = getVillaData(villaId);
  return villa ? villa.videocamere : [];
};

// Helper per recuperare antintrusione
export const getAntintrusione = (villaId) => {
  const villa = getVillaData(villaId);
  return villa ? villa.antintrusione : null;
};

// Export singole ville per compatibilità
export { villaMann, aptVialeMajno, villaPlanGorret };