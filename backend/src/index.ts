import express, {Request, Response} from 'express';
import {Pool} from 'pg';
import cors from 'cors';
import axios, {AxiosError} from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);
const NASA_API_BASE_URL: string = process.env.NASA_API_BASE_URL || '';
const NASA_API_KEY: string = process.env.NASA_API_KEY || '';
const MARS_ROVER_ENDPOINT: string = process.env.MARS_ROVER_ENDPOINT || '';

// In-memory cache object
interface CacheData {
    data: any;
    timestamp: number;
}

const cache: { [key: string]: CacheData } = {};
const CACHE_DURATION: number = 60 * 60 * 1000; // Cache for 1 hour

const allowedOrigins = [
    "http://localhsot:5173", 'https://space-exploration-frontend.vercel.app'
]
app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) callback(null, true)
            else callback(new Error("Not allowed by CORS"))
        }
    }
));

// Function to check if data is cached and still valid
function isCacheValid(key: string): boolean {
    return cache[key] !== undefined && Date.now() - cache[key].timestamp < CACHE_DURATION;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Disable strict SSL validation (useful for development)
    },
});

// Define the type for the photo object
interface Photo {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
        name: string;
    };
    sol: number;
}

// Function to store data in Postgres
const storePhotoInDB = async (photo: Photo): Promise<void> => {
    const {id, img_src, earth_date, rover, sol} = photo;
    const sqlQuery = `INSERT INTO mars_photos (id, img_src, earth_date, rover_name, sol) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING;`;
    try {
        await pool.query(sqlQuery, [id, img_src, earth_date, rover.name, sol]);
    } catch (error) {
        console.error('Error storing photo in database:', error);
    }
};

export class MarsRoverService {
    static async fetchMarsRoverPhotos(sol: number, page: number, rover: string = 'curiosity'): Promise<Photo | null> {
        const cacheKey: string = `mars-photos-${sol}-${page}`;

        // Check if the data is cached
        if (isCacheValid(cacheKey)) {
            console.log('Returning cached data');
            return cache[cacheKey].data.photo;
        }

        // Step 1: Check in the database first
        try {
            const dbQuery = 'SELECT * FROM mars_photos WHERE sol = $1 LIMIT 1 OFFSET $2';
            const dbResult = await pool.query(dbQuery, [sol, page - 1]);

            if (dbResult.rows.length > 0) {
                console.log('Returning data from database');
                return dbResult.rows[0];
            }
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }

        // Step 2: If not in database, fetch from NASA API
        if (!MARS_ROVER_ENDPOINT || !NASA_API_BASE_URL || !NASA_API_KEY) {
            console.error('Missing necessary environment variables for Mars Rover endpoint');
            return null;
        }

        const endpoint: string = MARS_ROVER_ENDPOINT.replace('{rover}', rover);

        try {
            // Fetch data from NASA API
            const response = await axios.get(`${NASA_API_BASE_URL}${endpoint}?sol=${sol}&api_key=${NASA_API_KEY}`, {
                timeout: 10000, // 10 seconds timeout
            });

            const photos: Photo[] = response.data.photos;
            const photo: Photo | undefined = photos[page - 1];

            if (photo) {
                // Store photo in database
                await storePhotoInDB({...photo, sol});
                // Cache the response
                cache[cacheKey] = {data: {photo, page, total: photos.length}, timestamp: Date.now()};
                return photo;
            } else {
                console.warn('No photo found for this index');
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

app.get('/nasa/mars-photos', async (req: Request, res: Response): Promise<void> => {
    try {
        const sol: number = parseInt(req.query.sol as string, 10) || 1000;
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const rover: string = (req.query.rover as string) || 'curiosity';

        const photo = await MarsRoverService.fetchMarsRoverPhotos(sol, page, rover);

        if (photo) {
            res.status(200).json({photo, page});
        } else {
            res.status(404).json({error: 'No photo found for this index'});
        }
    } catch (error) {
        console.error('Error handling /nasa/mars-photos request:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
