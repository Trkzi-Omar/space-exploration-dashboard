// src/theme.ts
import {createTheme, ThemeOptions} from '@mui/material/styles';

// Extend the default palette to include custom colors like "accent" and "space"
declare module '@mui/material/styles' {
    interface Palette {
        accent: Palette['primary'];
        space: Palette['primary'];
    }

    interface PaletteOptions {
        accent?: PaletteOptions['primary'];
        space?: PaletteOptions['primary'];
    }
}

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#B53C28', // Mars Red, main color to represent the Martian landscape
        },
        secondary: {
            main: '#E07A5F', // Dusty Orange, for accents
        },
        background: {
            default: '#F0E3D2', // Light sand, for cards and containers
            paper: '#F4A26181', // Desert Sand, for backgrounds
        },
            text: {
            primary: '#FFFFFF', // White, for text on darker backgrounds
            secondary: '#333333', // Dark grey, for text on lighter backgrounds
        },
        accent: {
            main: '#A8DADC', // Pale Sky Blue, for accents
        },
        space: {
            main: '#264653', // Midnight Blue, representing space
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#FFFFFF', // White, for headers
        },
        h4: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#333333', // Dark grey for regular text
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
        },
    },
    spacing: 8, // Base spacing unit
    shape: {
        borderRadius: 8, // Default border radius
    },
    shadows: Array(25).fill('none').map((_, index) => {
        // Provide specific shadows for some elements and 'none' for others
        if (index === 1) return '0px 4px 8px rgba(0, 0, 0, 0.1)'; // For cards
        if (index === 2) return '0px 2px 4px rgba(0, 0, 0, 0.15)'; // For buttons
        if (index === 3) return '0px 1px 4px rgba(0, 0, 0, 0.2)'; // For navigation bar
        return 'none'; // Default shadow
    }),
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;
