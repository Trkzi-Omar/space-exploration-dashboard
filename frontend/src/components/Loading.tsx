import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';

interface LoadingProps {
    text: string;
}

const Loading: React.FC<LoadingProps> = ({text}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
                animation: 'fade-in 0.5s ease-in-out',
            }}
        >
            <CircularProgress size={50} sx={{color: '#1976d2', marginBottom: '1rem'}}/>
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default Loading;
