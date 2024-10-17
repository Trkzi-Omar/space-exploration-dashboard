import React from 'react';
import { Box } from '@mui/material';
import MarsRoverGallery from './components/MarsRoverGallery';

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
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      {/* Background with Picture of the Day */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: apodData ? `url(${apodData.url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5, // Reduced opacity for the background image
          zIndex: -1, // Ensure it stays behind the content
        }}
      />
      {/* Text indicating Picture of the Day */}
      {apodData ? (
        <Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '1rem', borderRadius: '5px' }}>
            <h4>{apodData.title}</h4>
            <p>{apodData.explanation}</p>
            <small>{apodData.date}</small>
          </Box>
        </Box>
      ) : (
        <h4>Loading Picture of the Day...</h4>
      )}

      {/* Mars Rover Gallery Component */}
      <Box sx={{ marginTop: '2rem', width: '100%' }}>
        <MarsRoverGallery />
      </Box>
    </Box>
  );
}

export default App;
