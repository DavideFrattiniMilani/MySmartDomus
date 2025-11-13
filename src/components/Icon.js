// src/components/Icon.js
import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// ICON_MAP generato automaticamente da selection.json
// Totale icone: 121
const ICON_MAP = {
  'u_airplay1': '\ue978',
  'u_angle-down1': '\ue977',
  'u_angle-left': '\ue900',
  'u_angle-right': '\ue901',
  'u_angle-up': '\ue902',
  'u_apps': '\ue903',
  'u_arrow-down': '\ue904',
  'u_arrow-left': '\ue905',
  'u_arrow-right': '\ue906',
  'u_arrow-up': '\ue907',
  'u_bag-alt': '\ue908',
  'u_ban': '\ue909',
  'u_bars': '\ue90a',
  'u_basement': '\ue90b',
  'u_bath': '\ue90c',
  'u_battery-empty': '\ue90d',
  'u_bed': '\ue90e',
  'u_bed-double': '\ue90f',
  'u_bell': '\ue910',
  'u_blinds': '\ue911',
  'u_bolt': '\ue912',
  'u_book': '\ue913',
  'u_book-open': '\ue915',
  'u_bookmark': '\ue914',
  'u_brightness-low': '\ue916',
  'u_calender': '\ue917',
  'u_car': '\ue918',
  'u_cdeumidif': '\ue919',
  'u_changingroom': '\ue91a',
  'u_chart': '\ue91b',
  'u_check-circle': '\ue91c',
  'u_coffee': '\ue91d',
  'u_comment-alt-question': '\ue91e',
  'u_comment-exclamation': '\ue91f',
  'u_create-dashboard': '\ue920',
  'u_dumbbell': '\ue921',
  'u_envelope-alt': '\ue922',
  'u_envelope-exclamation': '\ue923',
  'u_euro': '\ue924',
  'u_exclamation-circle': '\ue925',
  'u_exclamation-octagon': '\ue926',
  'u_exclamation-triangle': '\ue927',
  'u_export': '\ue928',
  'u_extract': '\ue929',
  'u_eye': '\ue92a',
  'u_eye-slash': '\ue92b',
  'u_fancoil': '\ue92c',
  'u_filter': '\ue92d',
  'u_flooding': '\ue92e',
  'u_flooding-1': '\ue92f',
  'u_floor': '\ue930',
  'u_glass-martini': '\ue931',
  'u_glass-martini-alt': '\ue932',
  'u_graduation-cap': '\ue933',
  'u_graph-bar': '\ue934',
  'u_headphones': '\ue935',
  'u_home-alt': '\ue936',
  'u_import': '\ue937',
  'u_info-circle': '\ue938',
  'u_keyhole-circle': '\ue939',
  'u_laptop': '\ue93a',
  'u_lightbulb': '\ue93b',
  'u_link-h': '\ue93c',
  'u_location-point': '\ue93d',
  'u_lock-alt': '\ue93e',
  'u_lock-open-alt': '\ue93f',
  'u_medal': '\ue940',
  'u_megaphone': '\ue941',
  'u_microphone': '\ue942',
  'u_minus': '\ue943',
  'u_moon': '\ue944',
  'u_mountains': '\ue945',
  'u_multimeter': '\ue946',
  'u_multiply': '\ue947',
  'u_music': '\ue948',
  'u_pen': '\ue949',
  'u_phone-alt': '\ue94a',
  'u_phone-volume': '\ue94b',
  'u_play': '\ue94c',
  'u_plus': '\ue94d',
  'u_power': '\ue94e',
  'u_pricetag-alt': '\ue94f',
  'u_question-circle': '\ue950',
  'u_raindrops-alt': '\ue951',
  'u_redo': '\ue952',
  'u_sauna': '\ue953',
  'u_search-alt': '\ue954',
  'u_setting': '\ue955',
  'u_share-alt': '\ue956',
  'u_shield': '\ue957',
  'u_shield-check': '\ue958',
  'u_shield-exclamation': '\ue959',
  'u_shield-question': '\ue95a',
  'u_shield-slash': '\ue95b',
  'u_signin': '\ue95c',
  'u_ski': '\ue95d',
  'u_sliders-v-alt': '\ue95e',
  'u_sofa': '\ue95f',
  'u_star': '\ue960',
  'u_sync': '\ue961',
  'u_temperature-three-quarter': '\ue962',
  'u_termic': '\ue963',
  'u_terrace': '\ue964',
  'u_times': '\ue965',
  'u_trash': '\ue966',
  'u_trees': '\ue967',
  'u_trophy': '\ue968',
  'u_umbrella': '\ue969',
  'u_user': '\ue96a',
  'u_users-alt': '\ue96b',
  'u_utensils': '\ue96c',
  'u_vmc': '\ue96d',
  'u_volume': '\ue96e',
  'u_volume-mute': '\ue96f',
  'u_volume-off': '\ue970',
  'u_washmashine': '\ue971',
  'u_water': '\ue972',
  'u_water-glass': '\ue973',
  'u_webcam': '\ue974',
  'u_wifi': '\ue975',
  'u_wrench': '\ue976',
};

/**
 * Componente Icon per visualizzare icone custom dal font icomoon
 * 
 * @param {string} name - Nome dell'icona (es. 'u_webcam', 'u_bath', ecc.)
 * @param {number} size - Dimensione dell'icona in pixel (default: 24)
 * @param {string} color - Colore dell'icona (default: '#FFFFFF')
 * @param {object} style - Stili aggiuntivi opzionali
 * 
 * @example
 * <Icon name="u_webcam" size={16} color={COLORS.white} />
 * <Icon name="u_bath" size={24} color="#FF9F5A" />
 */
const Icon = ({ name, size = 24, color = '#FFFFFF', style, ...props }) => {
  // Carica il font custom
  const [fontsLoaded] = useFonts({
    'icomoon': require('../../assets/fonts/icomoon.ttf'),
  });

  // Se il font non è caricato, non mostrare nulla
  if (!fontsLoaded) {
    return null;
  }

  // Se l'icona non esiste nella mappa, mostra un warning
  if (!ICON_MAP[name]) {
    if (__DEV__) {
      console.warn(`Icon "${name}" not found in ICON_MAP. Available icons: ${Object.keys(ICON_MAP).join(', ')}`);
    }
    return null;
  }

  return (
    <Text
      style={[
        {
          fontFamily: 'icomoon',
          fontSize: size,
          color: color,
          lineHeight: size,
          height: size, 
          includeFontPadding: false, 
        },
        style,
      ]}
      {...props}
    >
      {ICON_MAP[name]}
    </Text>
  );
};

export default Icon;

// Esporta anche la lista delle icone disponibili per riferimento
export const AVAILABLE_ICONS = Object.keys(ICON_MAP).sort();