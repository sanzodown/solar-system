// NASA API endpoints
const NASA_API_KEY = 'DEMO_KEY'; // You should replace this with your API key from https://api.nasa.gov
const BASE_URL = 'https://api.nasa.gov/planetary';

export interface SolarSystemBody {
    id: string;
    name: string;
    englishName: string;
    isPlanet: boolean;
    gravity: number;
    meanRadius: number;
    sideralOrbit: number;
    sideralRotation: number;
    axialTilt: number;
    avgTemp: number;
    mainAnomaly: number;
    vol: {
        volValue: number;
        volExponent: number;
    };
    density: number;
    mass: {
        massValue: number;
        massExponent: number;
    };
    discoveryDate?: string;
    discoveredBy?: string;
}

export async function fetchSolarSystemData(): Promise<SolarSystemBody[]> {
    try {
        // We'll use the Solar System OpenData API as it's more reliable and doesn't require a key
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
        const data = await response.json();

        // Filter to get only planets and the Sun
        const bodies = data.bodies.filter((body: SolarSystemBody) =>
            body.isPlanet || body.englishName === 'Sun'
        );

        return bodies;
    } catch (error) {
        console.error('Error fetching solar system data:', error);
        throw error;
    }
}

// Additional NASA APOD (Astronomy Picture of the Day) API for potential future use
export async function fetchAstronomyPictureOfDay() {
    try {
        const response = await fetch(
            `${BASE_URL}/apod?api_key=${NASA_API_KEY}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching APOD:', error);
        throw error;
    }
}
