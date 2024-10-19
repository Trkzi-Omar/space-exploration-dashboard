import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import {Box, Button, Card, CardContent, CardMedia, Container, Typography} from '@mui/material';
import Loading from "./Loading.tsx";

interface MarsPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
        name: string;
    };
    camera: {
        full_name: string;
    };
}

const MarsRoverGallery: React.FC = () => {
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [page, setPage] = useState(1);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const limit = 1; // Limit number of photos per page

    useEffect(() => {
        setLoading(true);
        setError('');

        fetch(`${backendUrl}/nasa/mars-photos?sol=1000&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error)
                    setError(data.error)
                setPhotos(data.photos)
            })
            .catch((error) => console.error('Error fetching Mars Rover photos:', error));
    }, [backendUrl, page]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <Container sx={{padding: '2rem'}}>
            <Typography variant="h4" gutterBottom>
                Mars Rover Photos
            </Typography>
            {photos && photos.length > 0 ? (
                <>
                    <Carousel animation="slide">
                        {photos?.map((photo) => (
                            <Card key={photo.id}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={photo.img_src}
                                    alt={`Photo by ${photo.rover.name}`}
                                />
                                <CardContent>
                                    <Typography variant="h6">{photo.rover.name} Rover</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Camera: {photo.camera.full_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Earth Date: {photo.earth_date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
                            Previous
                        </Button>
                        <Typography variant="body1">Page {page}</Typography>
                        <Button variant="contained" onClick={handleNextPage}>
                            Next
                        </Button>
                    </Box>
                </>
            ) : (
                <Loading text="Loading Photos..."/>
            )}
        </Container>
    );
};

export default MarsRoverGallery;
