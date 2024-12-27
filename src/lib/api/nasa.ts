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
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
        const data = await response.json();

        const bodies = data.bodies.filter((body: SolarSystemBody) =>
            body.isPlanet || body.englishName === 'Sun'
        );

        return bodies;
    } catch (error) {
        console.error('Error fetching solar system data:', error);
        throw error;
    }
}
