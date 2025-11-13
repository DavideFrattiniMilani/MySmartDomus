// src/constants/typography.js
// Typography secondo le linee guida MySmartDomus - Font Manrope

export const FONTS = {
  regular: 'Manrope-Regular',
  medium: 'Manrope-Medium',
  semiBold: 'Manrope-SemiBold',
  bold: 'Manrope-Bold',
};

// Typography Styles secondo le linee guida
export const TYPOGRAPHY = {
  // ===== HEADINGS =====
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    lineHeight: 43,
    letterSpacing: 0,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  // ===== BODY TEXT =====
  text20: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  text16: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  text14: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  // ===== UTILITY =====
  button: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
};