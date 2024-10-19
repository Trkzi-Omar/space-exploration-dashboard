import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardMedia, CardContent, Typography, CircularProgress, Container } from '@mui/material';
import Loading from "./components/Loading.tsx";

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
  const [photo, setPhoto] = useState<MarsPhoto | null>(null);
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
      <Container sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Mars Rover Photos
        </Typography>
        <Typography variant="subtitle1">
          Photo {page} of {total}
        </Typography>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Loading text="Loading ..."/>
            </Box>
        ) : photo ? (
            <Card>
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
        ) : (
            <Typography variant="body1">No photo available</Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <Typography variant="body1">Photo {page}</Typography>
          <Button variant="contained" onClick={handleNextPage} disabled={page >= total}>
            Next
          </Button>
        </Box>
      </Container>
  );
};

export default MarsRoverGallery;
