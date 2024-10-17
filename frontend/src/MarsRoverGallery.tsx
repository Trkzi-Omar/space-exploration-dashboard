import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Button, Card, CardMedia, CardContent, Typography, CircularProgress, Container } from '@mui/material';

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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const limit = 10; // Limit number of photos per page

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/nasa/mars-photos?sol=1000&page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.photos);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Mars Rover photos:', error);
        setLoading(false);
      });
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
    <Container sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Mars Rover Photos
      </Typography>
      <Typography variant="subtitle1">
        Page {page} / {Math.ceil(total / limit)} ({total} images in total)
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Carousel animation="slide" autoPlay={false} indicators={false} navButtonsAlwaysVisible>
            {photos.map((photo) => (
              <Card key={photo.id} sx={{ filter: loading ? 'blur(10px)' : 'none', transition: 'filter 0.5s ease-in-out' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={photo.img_src}
                  alt={`Photo by ${photo.rover.name}`}
                  onLoad={() => setLoading(false)} // Remove blur once the image is fully loaded
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </Button>
            <Typography variant="body1">Page {page}</Typography>
            <Button variant="contained" onClick={handleNextPage} disabled={page * limit >= total}>
              Next
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default MarsRoverGallery;
