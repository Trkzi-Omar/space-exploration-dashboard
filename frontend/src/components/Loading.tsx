// src/components/Loading.tsx

import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ textAlign: 'center' }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
