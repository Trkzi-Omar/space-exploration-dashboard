import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface Photo {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
        name: string;
    };
}

const MarsRoverGallery: React.FC = () => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        setLoading(true);
        fetch(`${backendUrl}/nasa/mars-photos?sol=1000&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.photo) {
                    setPhoto(data.photo);
                    setTotal(data.total || 0);
                } else {
                    setPhoto(null); // No photo found
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Mars Rover photo:', error);
                setLoading(false);
            });
    }, [backendUrl, page]);

    const handleNextPage = () => {
        if (page < total) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <Box sx={{ width: '100%', py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Mars Rover Photo Gallery
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            ) : photo ? (
                <>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={false}
                        style={{ maxWidth: '800px', margin: 'auto' }}
                    >
                        <SwiperSlide>
                            <Box
                                component="img"
                                src={photo.img_src}
                                alt={`Mars Rover ${photo.rover.name}`}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                                {photo.earth_date} - {photo.rover.name}
                            </Typography>
                        </SwiperSlide>
                    </Swiper>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                        <Button variant="contained" onClick={handlePrevPage} disabled={page <= 1} sx={{ mx: 1 }}>
                            Previous
                        </Button>
                        <Typography variant="body1">
                            Page {page} of {total}
                        </Typography>
                        <Button variant="contained" onClick={handleNextPage} disabled={page >= total} sx={{ mx: 1 }}>
                            Next
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" align="center" color="error">
                    No photo found for this page.
                </Typography>
            )}
        </Box>
    );
};

export default MarsRoverGallery;
