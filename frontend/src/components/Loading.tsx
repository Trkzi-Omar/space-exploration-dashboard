import React from 'react';
import { CircularProgress, Box, Typography, useTheme } from '@mui/material';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ textAlign: 'center', backgroundColor: theme.palette.background.paper }}
        >
            <CircularProgress size={60} thickness={4} color="secondary" />
            <Typography variant="h6" sx={{ marginTop: theme.spacing(2), color: theme.palette.text.primary }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
