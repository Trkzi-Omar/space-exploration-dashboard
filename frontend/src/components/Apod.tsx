import {Box, Typography} from "@mui/material";
import Loading from "./Loading.tsx";
import {useEffect, useState} from "react";

interface ApodData {
    title: string;
    explanation: string;
    url: string;
    date: string;
}

const Apod = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/api/nasa/apod`)
            .then((response) => response.json())
            .then((data) => setApodData(data))
            .catch((error) => console.error('Error fetching APOD data:', error));
    }, [backendUrl]);

    const [apodData, setApodData] = useState<ApodData | null>(null);
    return <Box
        id={"apod"}
        sx={{
            width: '100%',
            py: { xs: 8, sm: 10, md: 12 },
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
        <Box
            sx={{
                zIndex: 2,
                padding: {xs: '1rem', sm: '2rem', md: '4rem'},
                maxWidth: '900px',
            }}
        >
            {apodData ? (
                <>
                    <Typography variant="h1" sx={{fontSize: {xs: '1.5rem', md: '2.5rem'}, fontWeight: 700}}>
                        {apodData.title}
                    </Typography>
                    <Typography variant="body1" sx={{marginTop: '1rem', fontSize: '1rem', color: '#fff', textAlign: 'justify'}}>
                        {apodData.explanation}
                    </Typography>
                </>
            ) : (
                <Loading/>
            )}
        </Box>
    </Box>
}
export default Apod;
