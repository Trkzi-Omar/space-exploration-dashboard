import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface MarsPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
        full_name: string;
    };
    rover: {
        name: string;
    };
}

const MarsRoverGallery: React.FC = () => {
    const [photo, setPhoto] = useState<MarsPhoto | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPhoto = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/nasa/mars-photos`, {
                    params: { sol: 1000, page },
                });
                if (response.status === 200 && response.data && response.data.photo) {
                    setPhoto(response.data.photo);
                    setTotal(response.data.total || 0);
                } else {
                    setPhoto(null);
                }
            } catch (error) {
                console.error('Error fetching Mars Rover photo:', error);
                setPhoto(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
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
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {loading ? (
                <CircularProgress />
            ) : photo ? (
                <div>
                    <img src={photo.img_src} alt={`Mars Rover: ${photo.rover.name}`} style={{ maxWidth: '100%', maxHeight: '500px' }} />
                    <Typography variant="h6" gutterBottom>
                        {photo.camera.full_name} - {photo.earth_date}
                    </Typography>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1} style={{ marginRight: '10px' }}>
                            Previous
                        </Button>
                        <Button variant="contained" onClick={handleNextPage} disabled={page >= total}>
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <Typography variant="body1">No photo available</Typography>
            )}
        </div>
    );
};

export default MarsRoverGallery;
