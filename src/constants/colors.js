// src/constants/colors.js
// Colori aggiornati secondo le linee guida MySmartDomus con supporto tema chiaro/scuro

// ===== TEMA SCURO (ATTUALE - LINEE GUIDA MYSMARTDOMUS) =====
export const DARK_COLORS = {
  // ===== PRIMARY COLORS =====
  primary: '#FFA74F',        // Orange (dalle linee guida)
  primaryDark: '#E88A45',    // Orange più scuro (per pressed state)
  
  // ===== BACKGROUNDS =====
  background: '#000000',     // Black (dalle linee guida)
  backgroundLight: '#2A2A2A', // Grigio leggermente più chiaro
  cardBackground: '#2D2D2D',  // Sfondo card
  
  // ===== TEXTS =====
  white: '#FFFFFF',          // White
  textPrimary: '#FFFFFF',    // Bianco per testi principali
  textSecondary: '#B0B0B0',  // Grigio per testi secondari
  textOrange: '#FFA74F',     // Orange per testi speciali
  
  // ===== INPUT =====
  inputBackground: '#3A3A3A', // Sfondo input
  inputBorder: '#4A4A4A',     // Bordo input
  inputPlaceholder: '#808080', // Testo placeholder
  
  // ===== MESSAGES - Error =====
  error600: '#F34141',       // Error principale
  error700: '#CD3636',       // Error scuro
  
  // ===== MESSAGES - Warning =====
  warning600: '#E9A23B',     // Warning principale
  warning700: '#C8811A',     // Warning scuro
  
  // ===== MESSAGES - Success =====
  success600: '#53B483',     // Success principale
  success700: '#2F9461',     // Success scuro
  
  // ===== UTILITY =====
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay scuro
  
  // ===== BADGE =====
  badgeBackground: 'rgba(255, 255, 255, 0.2)',
  badgeText: '#FFFFFF',
};

// ===== TEMA CHIARO (NUOVO) =====
export const LIGHT_COLORS = {
  // ===== PRIMARY COLORS (UGUALE) =====
  primary: '#FFA74F',        // Orange (rimane uguale)
  primaryDark: '#E88A45',    // Orange più scuro (rimane uguale)
  
  // ===== BACKGROUNDS =====
  background: '#FFFFFF',     // Bianco puro
  backgroundLight: '#F5F5F5', // Grigio chiarissimo
  cardBackground: '#F8F8F8',  // Sfondo card chiaro
  
  // ===== TEXTS =====
  white: '#FFFFFF',          // White (rimane)
  textPrimary: '#000000',    // Nero per testi principali
  textSecondary: '#666666',  // Grigio scuro per testi secondari
  textOrange: '#FFA74F',     // Orange per testi speciali (rimane)
  
  // ===== INPUT =====
  inputBackground: '#F0F0F0', // Sfondo input chiaro
  inputBorder: '#D0D0D0',     // Bordo input chiaro
  inputPlaceholder: '#999999', // Testo placeholder
  
  // ===== MESSAGES - Error (UGUALE) =====
  error600: '#F34141',       // Error principale
  error700: '#CD3636',       // Error scuro
  
  // ===== MESSAGES - Warning (UGUALE) =====
  warning600: '#E9A23B',     // Warning principale
  warning700: '#C8811A',     // Warning scuro
  
  // ===== MESSAGES - Success (UGUALE) =====
  success600: '#53B483',     // Success principale
  success700: '#2F9461',     // Success scuro
  
  // ===== UTILITY =====
  black: '#000000',          // Nero (rimane)
  transparent: 'transparent', // Trasparente (rimane)
  overlay: 'rgba(0, 0, 0, 0.3)', // Overlay più leggero per tema chiaro
  
  // ===== BADGE =====
  badgeBackground: 'rgba(0, 0, 0, 0.08)', // Badge chiaro
  badgeText: '#000000',      // Testo badge nero
};

// Funzione che restituisce i colori in base al tema
export const getColors = (isDark = true) => {
  return isDark ? DARK_COLORS : LIGHT_COLORS;
};

// Export di default per retrocompatibilità (tema scuro con linee guida MySmartDomus)
export const COLORS = DARK_COLORS;