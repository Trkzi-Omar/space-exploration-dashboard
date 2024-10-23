import express, {Request, Response} from 'express';
import {Pool} from 'pg';
import cors from 'cors';
import axios, {AxiosError} from 'axios';
import dotenv from 'dotenv';
import * as dns from "dns";
import path from 'path';

dotenv.config();
dns.setDefaultResultOrder('ipv4first')

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);
const NASA_API_BASE_URL: string = process.env.NASA_API_BASE_URL || '';
const NASA_API_KEY: string = process.env.NASA_API_KEY || '';
const MARS_ROVER_ENDPOINT: string = process.env.MARS_ROVER_ENDPOINT || '';
const APOD_ENDPOINT = process.env.APOD_ENDPOINT || '';

//@ts-ignore
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// In-memory cache object
interface CacheData {
    data: any;
    timestamp: number;
}

const cache: { [key: string]: CacheData } = {};
const CACHE_DURATION: number = 60 * 60 * 1000; // Cache for 1 hour

app.use(cors());

// Function to check if data is cached and still valid
function isCacheValid(key: string): boolean {
    return cache[key] !== undefined && Date.now() - cache[key].timestamp < CACHE_DURATION;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
});

// Define the type for the photo object
interface Photo {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
        name: string;
    };
}

// Function to store data in Postgres
const storePhotoInDB = async (photo: Photo): Promise<void> => {
    const {id, img_src, earth_date, rover} = photo;
    const sqlQuery = `INSERT INTO mars_photos (id, img_src, earth_date, rover_name) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING;`;
    try {
        await pool.query(sqlQuery, [id, img_src, earth_date, rover.name]);
    } catch (error) {
        console.error('Error storing photo in database:', error);
    }
};

export class MarsRoverService {
    static async fetchMarsRoverPhotos(sol: number, page: number, camera: string, rover: string = 'curiosity'): Promise<Photo[] | null> {
        const cacheKey: string = `mars-photos-${sol}-${page}`;

        // Check if the data is cached
        if (isCacheValid(cacheKey)) {
            console.log('Returning cached data');
            return cache[cacheKey].data.photos;
        }

        if (!MARS_ROVER_ENDPOINT || !NASA_API_BASE_URL || !NASA_API_KEY) {
            console.error('Missing necessary environment variables for Mars Rover endpoint');
            return null;
        }

        const endpoint: string = MARS_ROVER_ENDPOINT.replace('{rover}', rover);

        try {
            // Fetch data from NASA API
            const response = await axios.get(`${NASA_API_BASE_URL}${endpoint}?sol=${sol}&camera=${camera}&page=${page}&api_key=${NASA_API_KEY}`, {
                timeout: 60000,
            });

            const photos: Photo[] = response.data.photos;

            if (photos && photos.length > 0) {
                // Store photos in database
                for (const photo of photos) {
                    await storePhotoInDB(photo);
                }
                // Cache the response
                cache[cacheKey] = {data: {photos}, timestamp: Date.now()};
                return photos;
            } else {
                console.warn('No photos found for this query');
                return null;
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axios.isAxiosError(axiosError)) {
                if (axiosError.response && axiosError.response.status === 429) {
                    console.error('Rate limit exceeded. Please try again later.');
                } else if (axiosError.code === 'ETIMEDOUT') {
                    console.error('Connection timed out. Please try again later.');
                } else {
                    console.error('Error fetching Mars Rover photos:', axiosError);
                }
            } else {
                console.error('Unexpected error:', error);
            }
            return null;
        }
    }
}

app.get('/api/nasa/mars-photos', async (req: Request | any, res: Response | any,): Promise<void> => {
    try {
        const sol: number = parseInt(req.query.sol as string, 10) || 1000;
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const rover: string = (req.query.rover as string) || 'curiosity';
        const camera: string = (req.query.camera as string) || 'mast';

        const photos = await MarsRoverService.fetchMarsRoverPhotos(sol, page, camera, rover);

        if (photos && photos.length > 0) {
            res.status(200).json({photos});
        } else {
            res.status(404).json({error: 'No photos found for this query'});
        }
    } catch (error) {
        console.error('Error handling /nasa/mars-photos request:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


interface ApodResponse {
    copyright?: string;
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

// Endpoint to fetch Astronomy Picture of the Day (APOD)
app.get('/api/nasa/apod', async (req: Request | any, res: Response | any,) => {
    try {
        console.log(`QUERYING :-<<<<>>>>>>>>\n\n${NASA_API_BASE_URL}${APOD_ENDPOINT}?api_key=${NASA_API_KEY}\n\n`)

        const response = await axios.get<ApodResponse>(
            `${NASA_API_BASE_URL}${APOD_ENDPOINT}?api_key=${NASA_API_KEY}`,
            {
                timeout: 60000,
            }
        );
        //const response = await fetch(`${NASA_API_BASE_URL}${APOD_ENDPOINT}?api_key=${NASA_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching APOD:', error);
            res.status(500).json({error: 'Failed to fetch APOD'});
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({error: 'An unexpected error occurred'});
        }
    }
});


// Endpoint to get Mars Rover manifest
app.get('/api/nasa/rover-manifest', async (req: Request | any, res: Response | any,): Promise<void> => {
    try {
        const rover: string = (req.query.rover as string) || 'curiosity';

        // Fetch manifest from NASA API
        const manifestResponse = await axios.get(`${NASA_API_BASE_URL}/${rover}/manifests`, {
            params: {
                api_key: NASA_API_KEY,
            },
        });

        const manifest = manifestResponse.data.photo_manifest;
        res.status(200).json({total_photos: manifest.total_photos});
    } catch (error) {
        console.error('Error handling /nasa/rover-manifest request:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/** Uncomment when deploying as a monorepo*/
/*app.get('*', (req: Request | any, res: Response | any,) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});*/


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
