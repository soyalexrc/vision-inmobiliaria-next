import { alpha } from '@mui/material/styles';
import { PaletteColorOptions, PaletteOptions } from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';

// ----------------------------------------------------------------------

function createGradient(color1: string | undefined, color2: string | undefined) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
export const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

export const PRIMARY = {
  light: '#DDCBD1',
  main: '#610321',
  dark: '#440224',
  contrastText: '#fff',
};
export const SECONDARY = {
  light: '#7E92AD',
  main: '#580361',
  dark: '#3e0244',
  contrastText: '#fff',
};
export const INFO = {
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  contrastText: '#fff',
};
export const SUCCESS = {
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  contrastText: GREY[800],
};
export const WARNING = {
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  contrastText: GREY[800],
};
export const ERROR = {
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  contrastText: '#fff',
};

export const palette: PaletteOptions = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  background: {
    default: '#fff',
  },
  mode: 'light',
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
};
