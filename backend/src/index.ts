import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_BASE_URL = process.env.NASA_API_BASE_URL;
const NASA_API_KEY = process.env.NASA_API_KEY;
const APOD_ENDPOINT = process.env.APOD_ENDPOINT;
const MARS_ROVER_ENDPOINT = process.env.MARS_ROVER_ENDPOINT;

app.use(cors());

// Route to fetch the Astronomy Picture of the Day
app.get('/nasa/apod', async (req: Request, res: Response) => {
  try {
    if (!APOD_ENDPOINT || !NASA_API_BASE_URL || !NASA_API_KEY) {
      throw new Error('Missing necessary environment variables for APOD endpoint');
    }

    const response = await axios.get(`${NASA_API_BASE_URL}${APOD_ENDPOINT}?api_key=${NASA_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from NASA API:', error);
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

// Route to fetch Mars Rover photos
app.get('/nasa/mars-photos', async (req: Request, res: Response) => {
  try {
    if (!MARS_ROVER_ENDPOINT || !NASA_API_BASE_URL || !NASA_API_KEY) {
      throw new Error('Missing necessary environment variables for Mars Rover endpoint');
    }

    const sol = req.query.sol || 1000; // Default sol (Martian day) if not provided
    const rover = req.query.rover || 'curiosity'; // Default to 'curiosity' if not provided
    const page = parseInt(req.query.page as string) || 1; // Default page number
    const limit = parseInt(req.query.limit as string) || 25; // Default limit per page
    const endpoint = MARS_ROVER_ENDPOINT.replace('{rover}', rover as string);

    const response = await axios.get(`${NASA_API_BASE_URL}${endpoint}?sol=${sol}&api_key=${NASA_API_KEY}`);
    const photos = response.data.photos;

    // Paginate results manually (as NASA API may return too many results)
    const startIndex = (page - 1) * limit;
    const paginatedPhotos = photos.slice(startIndex, startIndex + limit);

    res.json({ photos: paginatedPhotos, page, limit, total: photos.length });
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Space Exploration API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
