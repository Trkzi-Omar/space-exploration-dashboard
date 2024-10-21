import React from 'react';
import {Box, CssBaseline, ThemeProvider, Typography} from '@mui/material';
import Loading from "./components/Loading.tsx";
import theme from "./theme.ts";
import TechnologyOverview from "./components/TechnologyOverview.tsx";
import {Helmet} from 'react-helmet';
import WhoAmI from "./components/WhoAmI.tsx";
import MarsRoverGallery from "./components/MarsRoverGallery.tsx";
import Navbar from "./components/NavBar.tsx";

interface ApodData {
    title: string;
    explanation: string;
    url: string;
    date: string;
}

function App() {
    const [apodData, setApodData] = React.useState<ApodData | null>(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    React.useEffect(() => {
        fetch(`${backendUrl}/nasa/apod`)
            .then((response) => response.json())
            .then((data) => setApodData(data))
            .catch((error) => console.error('Error fetching APOD data:', error));
    }, [backendUrl]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Helmet>
                <title>Space Exploration Dashboard</title>
                <meta name="description"
                      content="Explore Mars rover photos and NASA's Astronomy Picture of the Day with this interactive dashboard."/>
            </Helmet>

            <Navbar/>
            
            <WhoAmI/>

            <Box sx={{width: '100vw', color: '#fff'}}>

                <Box
                    sx={{
                        height: '80vh',
                        backgroundImage: apodData ? `url(${apodData.url})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '2rem',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Content on top of the image */}
                    <Box
                        sx={{
                            zIndex: 2, // Ensure text appears above overlay
                            padding: {xs: '1rem', sm: '2rem', md: '4rem'}, // Responsive padding
                            maxWidth: '900px',
                        }}
                    >
                        {/* Check if data is available */}
                        {apodData ? (
                            <>
                                <Typography variant="h1" sx={{fontSize: {xs: '1.5rem', md: '2.5rem'}, fontWeight: 700}}>
                                    {apodData.title}
                                </Typography>
                                <Typography variant="body1" sx={{marginTop: '1rem', fontSize: '1rem', color: '#fff'}}>
                                    {apodData.explanation}
                                </Typography>
                            </>
                        ) : (
                            <Loading/> // Show loading component if data isn't available yet
                        )}
                    </Box>
                </Box>
                <MarsRoverGallery/>
                <TechnologyOverview/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
