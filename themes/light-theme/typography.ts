import { grey } from '@mui/material/colors';
import { TypographyOptions } from '@mui/material/styles/createTypography';

// ----------------------------------------------------------------------

function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const typography: TypographyOptions = {
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    color: grey[800],
    // textTransform: "uppercase",
    lineHeight: 80 / 64,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 28, md: 32, lg: 34 }),
  },
  h2: {
    color: grey[800],
    // textTransform: "uppercase",
    lineHeight: 64 / 48,
    fontSize: pxToRem(25),
    ...responsiveFontSizes({ sm: 27, md: 31, lg: 33 }),
  },
  h3: {
    color: grey[800],
    // textTransform: "uppercase",
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    color: grey[800],
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    color: grey[800],
    // textTransform: "uppercase",
    // letterSpacing: "0.8px",
    lineHeight: 28 / 18,
    fontWeight: 500,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    color: grey[800],
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: pxToRem(14),
  },
  subtitle2: {
    color: grey[800],
    lineHeight: 22 / 14,
    fontWeight: 500,
    fontSize: pxToRem(16),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(16),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 200,
    fontSize: pxToRem(16),
    textTransform: 'capitalize',
  },
};

export default typography;
