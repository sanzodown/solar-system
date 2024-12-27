import { SolarSystemBody } from './api/nasa';
import { Vector3 } from 'three';

export interface CelestialBody {
    name: string;
    diameter: number;         // in km
    distanceFromSun: number; // in km
    color: string;
    orbitalPeriod: number;   // Earth days
    showOrbit?: boolean;
    // Additional real data
    gravity?: number;
    temperature?: number;
    mass?: string;
    density?: number;
    axialTilt?: number;
    perihelion?: number;     // in km
    aphelion?: number;       // in km
    eccentricity?: number;   // ratio (no units)
    inclination?: number;    // degrees
}

const ORBITAL_INCLINATIONS = {
    Mercury: 7.0,
    Venus: 3.4,
    Earth: 0.0,
    Mars: 1.9,
    Jupiter: 1.3,
    Saturn: 2.5,
    Uranus: 0.8,
    Neptune: 1.8
};

const SUN_DATA = {
    diameter: 1392700, // km
    mass: "1.989e30", // kg
    temperature: 5778, // K
    density: 1.408, // g/cm³
};

const PLANET_COLORS = {
    Sun: "#FDB813",
    Mercury: "#A0522D",
    Venus: "#DEB887",
    Earth: "#4B6EAF",
    Mars: "#CD5C5C",
    Jupiter: "#DAA06D",
    Saturn: "#F4C542",
    Uranus: "#B2E2E2",
    Neptune: "#5B5DDF",
};

// Visualization constants
const GLOBAL_SCALE = 0.0001;   // Scale factor for distances
const SIZE_SCALE = 1;          // Keep true proportions between sizes and distances
export const ORBIT_SEGMENTS = 128;

// Convert API data to our format with correct measurements
export function convertApiDataToCelestialBody(apiBody: SolarSystemBody): CelestialBody {
    const name = apiBody.englishName;

    if (name === "Sun") {
        return {
            name,
            diameter: SUN_DATA.diameter,
            distanceFromSun: 0,
            color: PLANET_COLORS.Sun,
            orbitalPeriod: 0,
            showOrbit: false,
            temperature: SUN_DATA.temperature,
            mass: SUN_DATA.mass,
            density: SUN_DATA.density,
        };
    }

    const perihelion = apiBody.perihelion;
    const aphelion = apiBody.aphelion;
    const semiMajorAxis = apiBody.semimajorAxis;
    const diameter = apiBody.meanRadius * 2;       // Convert radius to diameter

    return {
        name,
        diameter,
        distanceFromSun: semiMajorAxis,
        color: PLANET_COLORS[name as keyof typeof PLANET_COLORS] || "#FFFFFF",
        orbitalPeriod: apiBody.sideralOrbit || 0,
        showOrbit: true,
        gravity: apiBody.gravity,
        temperature: apiBody.avgTemp,
        mass: apiBody.mass ? `${apiBody.mass.massValue}e${apiBody.mass.massExponent}` : undefined,
        density: apiBody.density,
        axialTilt: apiBody.axialTilt,
        perihelion,
        aphelion,
        eccentricity: apiBody.eccentricity,
        inclination: ORBITAL_INCLINATIONS[name as keyof typeof ORBITAL_INCLINATIONS] || 0
    };
}

export const getSizeMultiplier = (body: CelestialBody) => {
    // All bodies use the same scale to maintain true proportions
    return body.diameter * GLOBAL_SCALE * SIZE_SCALE;
};

export const getEllipticalPosition = (body: CelestialBody, meanAnomaly: number) => {
    if (body.name === "Sun") return { x: 0, y: 0, z: 0 };

    // Convert mean anomaly to radians
    const M = (meanAnomaly * Math.PI) / 180;
    const e = body.eccentricity || 0;

    // Solve Kepler's equation iteratively (E = M + e * sin(E))
    let E = M;
    for (let i = 0; i < 10; i++) {
        E = M + e * Math.sin(E);
    }

    // Calculate true anomaly
    const v = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));

    // Calculate distance from focus (Sun) in km
    const a = body.distanceFromSun;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(v));

    // Scale the distance for visualization
    const scaledR = r * GLOBAL_SCALE;

    // Calculate position in orbital plane
    const x = scaledR * Math.cos(v);
    const z = scaledR * Math.sin(v);

    // Apply orbital inclination
    const inclination = (body.inclination || 0) * Math.PI / 180;
    const y = z * Math.sin(inclination);
    const z_final = z * Math.cos(inclination);

    return { x, y, z: z_final };
};

// Calculate current orbital position
export const getCurrentOrbitalPosition = (body: CelestialBody) => {
    if (body.name === "Sun") return { x: 0, y: 0, z: 0 };

    // Get current time in days since J2000
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const now = new Date();
    const daysSinceJ2000 = (now.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);

    // Calculate mean anomaly
    const meanMotion = 360 / body.orbitalPeriod;
    const meanAnomaly = (meanMotion * daysSinceJ2000) % 360;

    return getEllipticalPosition(body, meanAnomaly);
};

export const getOrbitPoints = (body: CelestialBody) => {
    const points = [];
    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
        const meanAnomaly = (i / ORBIT_SEGMENTS) * 360;
        const pos = getEllipticalPosition(body, meanAnomaly);
        points.push(new Vector3(pos.x, pos.y, pos.z));
    }
    return points;
};

export const getPlanetHighlight = (body: CelestialBody): { emissive: string, emissiveIntensity: number } => {
    switch (body.name) {
        case "Sun":
            return { emissive: body.color, emissiveIntensity: 1.5 };
        case "Mercury":
        case "Venus":
        case "Earth":
        case "Mars":
            return { emissive: body.color, emissiveIntensity: 0.5 };
        case "Jupiter":
        case "Saturn":
        case "Uranus":
        case "Neptune":
            return { emissive: body.color, emissiveIntensity: 0.3 };
        default:
            return { emissive: body.color, emissiveIntensity: 0.2 };
    }
};
