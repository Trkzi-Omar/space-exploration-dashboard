import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, IconButton, Snackbar, Typography, useTheme} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { scaleIn, fadeIn } from '../animations';
import LoadingSkeleton from './LoadingSkeleton.tsx';

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
                const response = await axios.get(`${backendUrl}/api/nasa/mars-photos?sol=1000&page=1`);
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
            id={'mars'}
            sx={{
                width: '100%',
                py: { xs: 8, sm: 10, md: 12 },
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h3" sx={{
                    paddingTop: theme.spacing(3),
                    fontWeight: theme.typography.fontWeightBold,
                    marginBottom: theme.spacing(4),
                    color: theme.palette.text.secondary
                }}>
                    Mars Rover Photo Gallery
                </Typography>

                {loading ? (
                    <LoadingSkeleton />
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
                                adaptiveHeight={true}
                                lazyLoad="progressive"
                                beforeChange={() => setLoading(true)}
                                afterChange={() => setLoading(false)}
                            >
                                {photos.map((photo) => (
                                    <Box key={photo.id} sx={{
                                        display: "flex !important",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: theme.spacing(2),
                                        width: '100%'
                                    }}>
                                        <motion.img
                                            {...scaleIn}
                                            loading="lazy"
                                            src={photo.img_src}
                                            alt={`Mars Rover - ${photo.rover.name}`}
                                            style={{
                                                width: '100%',
                                                maxWidth: '600px',
                                                display: "block",
                                                borderRadius: theme.shape.borderRadius,
                                                marginBottom: theme.spacing(2),
                                                boxShadow: theme.shadows[1],
                                            }}
                                        />
                                        <motion.div
                                            {...fadeIn}
                                        >
                                            <Typography variant="body1" sx={{color: theme.palette.text.secondary}}>
                                                Rover: {photo.rover.name} | Earth Date: {photo.earth_date}
                                            </Typography>
                                        </motion.div>
                                    </Box>
                                ))}
                            </Slider>
                        ) : (
                            <Typography variant="body1">
                                No photos available.
                            </Typography>
                        )}
                    </>
                )}
            </motion.div>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseError}
                message={error}
                action={
                    <IconButton 
                        size="small" 
                        aria-label="close" 
                        color="inherit" 
                        onClick={handleCloseError}
                        sx={{ padding: '8px' }}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
                sx={{ 
                    bottom: { xs: 90, sm: 24 },
                    backgroundColor: theme.palette.error.main
                }}
            />
        </Box>
    );
};

export default MarsRoverGallery;
