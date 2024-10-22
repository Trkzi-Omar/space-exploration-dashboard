import {Box, CircularProgress, Typography, useTheme} from '@mui/material';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({message = "Loading..."}) => {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{textAlign: 'center',}}
        >
            <CircularProgress size={60} thickness={4} color="secondary"/>
            <Typography variant="h6" sx={{marginTop: theme.spacing(2), color: theme.palette.text.secondary}}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
