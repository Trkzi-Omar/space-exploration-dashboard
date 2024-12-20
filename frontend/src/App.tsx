import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import theme from "./theme.ts";
import { Helmet } from 'react-helmet';
import Navbar from "./components/NavBar.tsx";
import './App.css'
import { Suspense, lazy } from 'react';
import LoadingFallback from "./components/LoadingFallback.tsx";
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';

// Lazy load components
const WhoAmI = lazy(() => import("./components/WhoAmI.tsx"));
const Apod = lazy(() => import("./components/Apod.tsx"));
const MarsRoverGallery = lazy(() => import("./components/MarsRoverGallery.tsx"));
const TechnologyOverview = lazy(() => import("./components/TechnologyOverview.tsx"));

function App() {
    return (
        <ThemeProvider theme={theme}>
            {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
            <CssBaseline />
            <Helmet>
                <title>Space Exploration Dashboard</title>
                <meta name="description"
                    content="Explore Mars rover photos and NASA's Astronomy Picture of the Day with this interactive dashboard." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://api.nasa.gov" />
            </Helmet>

            <Navbar />
            <ErrorBoundary>
                <Container 
                    component="main"
                    sx={{
                        pt: { xs: 8, sm: 10, md: 12 }, // Consistent top padding
                        pb: { xs: 8, sm: 10, md: 12 }, // Consistent bottom padding
                    }}
                >
                    <Suspense fallback={<LoadingFallback />}>
                        <WhoAmI />
                        <Apod />
                        <MarsRoverGallery />
                        <TechnologyOverview />
                    </Suspense>
                </Container>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
