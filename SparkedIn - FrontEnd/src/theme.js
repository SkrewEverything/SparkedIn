'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a78f0', // Replace with the primary color from the image
    },
    secondary: {
      main: '#f0c43a', // Replace with the secondary color from the image
    },
    background: {
      default: '#f5f6fa', // Background color
      paper: '#ffffff', // Card/Paper background color
    },
    text: {
      primary: '#000000', // Primary text color
      secondary: '#6b7280', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    // Add more shadow styles as needed
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Card border radius
          // boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Card shadow
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Paper background color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Button text transformation
          fontWeight: 700, // Button font weight
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disable ripple globally
      },
    },
  },
});

export default theme;
