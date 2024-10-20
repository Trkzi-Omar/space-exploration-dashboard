// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // A space-like blue color
    },
    secondary: {
      main: '#f50057', // Accent color
    },
    background: {
      default: '#1a1a2e', // Dark theme for space effect
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
