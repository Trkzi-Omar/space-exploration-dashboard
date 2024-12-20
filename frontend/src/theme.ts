// src/theme.ts
import {createTheme, ThemeOptions} from '@mui/material/styles';

// Mars color palette
const marsColors = {
    primary: {
        main: '#5c1010', // Dark red
        light: '#853b3b', // Lighter red
        dark: '#472424', // Darkest red
    },
    secondary: {
        main: '#6d2d2d', // Medium red
        light: '#ccbfbf', // Light grey
        dark: '#3d1919', // Very dark red
    },
    background: {
        default: '#1a1a1a', // Dark background
        paper: '#2d2d2d', // Slightly lighter background
    },
    text: {
        primary: '#ffffff', // White text
        secondary: '#ccbfbf', // Light grey text (from Mars palette)
    },
    error: {
        main: '#853b3b', // Using the lighter red for errors
    },
    warning: {
        main: '#6d2d2d', // Using medium red for warnings
    },
    info: {
        main: '#ccbfbf', // Using light grey for info
    },
    success: {
        main: '#472424', // Using dark red for success
    }
};

const themeOptions: ThemeOptions | any = {
    palette: marsColors,
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        fontWeightBold:700,
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            color: marsColors.text.primary,
        },
        h3: {
            fontSize: '2rem',
            color: marsColors.text.secondary,
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
            color: marsColors.text.secondary,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: marsColors.text.secondary,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: marsColors.primary.light,
                        filter: 'brightness(1.1)',
                    },
                },
                contained: {
                    backgroundColor: marsColors.primary.main,
                    color: marsColors.text.primary,
                    '&:hover': {
                        backgroundColor: marsColors.primary.light,
                    },
                },
                outlined: {
                    borderColor: marsColors.primary.main,
                    color: marsColors.primary.main,
                    '&:hover': {
                        borderColor: marsColors.primary.light,
                        color: marsColors.primary.light,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: marsColors.background.paper,
                    borderRadius: 12,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: marsColors.background.paper,
                    color: marsColors.text.primary,
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '1200px',
                    padding: '0 24px', // Consistent horizontal padding
                    margin: '0 auto',
                    '@media (min-width: 600px)': {
                        padding: '0 32px',
                    },
                    '@media (min-width: 960px)': {
                        padding: '0 48px',
                    },
                },
            },
        },
    },
    spacing: 8, // Base spacing unit
    shape: {
        borderRadius: 4, // Default border radius
    },
    shadows: Array(25).fill('none').map((_, index) => {
        // Provide specific shadows for some elements and 'none' for others
        if (index === 1) return '0px 4px 8px rgba(92, 16, 16, 0.1)'; // For cards
        if (index === 2) return '0px 2px 4px rgba(92, 16, 16, 0.15)'; // For buttons
        if (index === 3) return '0px 1px 4px rgba(92, 16, 16, 0.2)'; // For navigation bar
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
