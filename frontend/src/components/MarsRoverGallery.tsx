import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Typography, Box, Snackbar, IconButton, useTheme} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from "./Loading.tsx";

interface MarsPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
        name: string;
    };
}

const MarsRoverGallery: React.FC = () => {
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/nasa/mars-photos?sol=1000&page=1`);
                setPhotos(response.data.photos || []);
            } catch (error) {
                console.error('Error fetching Mars Rover photos:', error);
                setError('Failed to load Mars Rover photos. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchPhotos();
    }, [backendUrl]);

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: theme.spacing(4),
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                maxWidth: '1000px',
                margin: 'auto',
                boxShadow: theme.shadows[3],
                color: theme.palette.text.primary,
            }}
        >
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(4), color: theme.palette.text.primary }}>
                Mars Rover Photo Gallery
            </Typography>

            {loading ? (
                <Loading message="Fetching Mars Rover photos..." />
            ) : (
                <>
                    {photos.length > 0 ? (
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            autoplay={true}
                            autoplaySpeed={3000}
                            adaptiveHeight={true}>
                            {photos.map((photo) => (
                                <Box key={photo.id} sx={{ padding: theme.spacing(2) }}>
                                    <img
                                        src={photo.img_src}
                                        alt={`Mars Rover - ${photo.rover.name}`}
                                        style={{
                                            width: '100%',
                                            maxWidth: '600px',
                                            borderRadius: theme.shape.borderRadius,
                                            marginBottom: theme.spacing(2),
                                            boxShadow: theme.shadows[1], // Added to enhance image visibility
                                        }}
                                    />
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                        Rover: {photo.rover.name} | Earth Date: {photo.earth_date}
                                    </Typography>
                                </Box>
                            ))}
                        </Slider>
                    ) : (
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                            No photos available.
                        </Typography>
                    )}
                </>
            )}

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseError}
                message={error}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseError}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                sx={{ backgroundColor: theme.palette.error.main }}
            />

            <Box sx={{ marginTop: theme.spacing(5) }}>
                <StackOverview />
                <TechnologyOverview />
            </Box>
        </Box>
    );
};

export default MarsRoverGallery;
