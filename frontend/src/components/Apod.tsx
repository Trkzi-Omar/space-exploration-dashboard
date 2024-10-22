import {Box, Typography} from "@mui/material";
import Loading from "./Loading.tsx";
import React from "react";

const Apod = () => {
    const [apodData, setApodData] = React.useState<ApodData | null>(null);
    return <Box
        id={"apod"}
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
                <Loading/>
            )}
        </Box>
    </Box>
}
export default Apod;
