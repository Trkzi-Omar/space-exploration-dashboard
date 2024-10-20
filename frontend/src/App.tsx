import React from 'react';
import {Box, ThemeProvider, Typography} from '@mui/material';
import MarsRoverGallery from './components/MarsRoverGallery';
import Loading from "./components/Loading.tsx";
import theme from "./theme.ts";

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
            <Box sx={{width: '100vw', color: '#fff'}}>
                {/* Background with Picture of the Day */}
                <Box
                    sx={{
                        height: '80vh',
                        backgroundImage: apodData ? `url(${apodData.url})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        color: '#fff',
                    }}
                >
                    {apodData ? (
                        <Box sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '1rem',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }}>
                            <Typography variant="h4">{apodData.title}</Typography>
                            <Typography variant="body1" sx={{marginY: '1rem'}}>
                                {apodData.explanation}
                            </Typography>
                            <Typography variant="caption">{apodData.date}</Typography>
                        </Box>
                    ) : (
                        <Loading text="Loading Picture of the Day..."/>
                    )}
                </Box>

                {/* Mars Rover Gallery Component */}
                <Box sx={{padding: '2rem', width: '100%'}}>
                    <MarsRoverGallery/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
