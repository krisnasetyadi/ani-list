export const COLORS = {
  primary: '#1f5dfb', //blue
  primaryLight: '#5886fb', // light blue
  primaryDisabled: '#82a4fb',
  secondary: '#612657',
  success: '#18BF29',
  danger: '#F43F5E',
  dangerRed: '#ff0000',
  warning: '#ffb02c',
  orangeWarning: '#d25e0b',
  dark: '#D8D8D8',
  light: '#E6E6E6',
  info: '#2B39B9',
  white: '#fff',
  text: '#6A6A6A',
  title: '#000000',
  label: '#4B5563',
  input: '#F9F9F9',
  borderColor: '#E3E3E3',
  backgroundColor: '#fff',
  black: '#333333',
  mediumGray: '#6A6A6A',
  transparent: 'transparent',
};

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 10,

  // radius
  radius_sm: 8,
  radius: 12,
  radius_md: 18,

  // space
  padding: 15,
  margin: 15,

  // Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
};

export const FONTS = {
  fontLg: {
    fontSize: SIZES.fontLg,
    color: COLORS.title,
    fontFamily: 'Roboto',
  },
  font: {
    fontSize: SIZES.font,
    color: COLORS.title,
    fontFamily: 'Roboto',
  },
  fontSm: {
    fontSize: SIZES.fontSm,
    color: COLORS.white,
    letterSpacing: '0.5px',
    fontFamily: 'Roboto',
  },
  fontXs: {
    fontSize: SIZES.fontXs,
    color: COLORS.white,
    fontFamily: 'Roboto',
  },
  h1: { fontSize: SIZES.h1, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h2: { fontSize: SIZES.h2, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h3: { fontSize: SIZES.h3, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h4: { fontSize: SIZES.h4, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h5: { fontSize: SIZES.h5, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h6: { fontSize: SIZES.h6, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  fontBold: { fontFamily: 'OpenSans-SemiBold' },
  fontMedium: { fontFamily: 'Roboto' },
  fontSatoshiLight: { fontFamily: 'Satoshi-Light' },
  fontSatoshiBold: { fontFamily: 'Satoshi-Bold' },
  fontSatoshiRegular: { fontFamily: 'Satoshi-Regular' },
};
const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
