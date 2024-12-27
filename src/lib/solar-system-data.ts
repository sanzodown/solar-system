export interface CelestialBody {
    name: string;
    diameter: number; // km
    distanceFromSun: number; // million km
    color: string;
    orbitalPeriod: number; // Earth days
    showOrbit?: boolean;
}

export const celestialBodies: CelestialBody[] = [
    {
        name: "Sun",
        diameter: 1392700,
        distanceFromSun: 0,
        color: "#FDB813",
        orbitalPeriod: 0,
        showOrbit: false,
    },
    {
        name: "Mercury",
        diameter: 4879,
        distanceFromSun: 57.9,
        color: "#A0522D",
        orbitalPeriod: 88,
        showOrbit: true,
    },
    {
        name: "Venus",
        diameter: 12104,
        distanceFromSun: 108.2,
        color: "#DEB887",
        orbitalPeriod: 225,
        showOrbit: true,
    },
    {
        name: "Earth",
        diameter: 12742,
        distanceFromSun: 149.6,
        color: "#4B6EAF",
        orbitalPeriod: 365,
        showOrbit: true,
    },
    {
        name: "Mars",
        diameter: 6779,
        distanceFromSun: 227.9,
        color: "#CD5C5C",
        orbitalPeriod: 687,
        showOrbit: true,
    },
    {
        name: "Jupiter",
        diameter: 139820,
        distanceFromSun: 778.5,
        color: "#DAA06D",
        orbitalPeriod: 4333,
        showOrbit: true,
    },
    {
        name: "Saturn",
        diameter: 116460,
        distanceFromSun: 1434.0,
        color: "#F4C542",
        orbitalPeriod: 10759,
        showOrbit: true,
    },
    {
        name: "Uranus",
        diameter: 50724,
        distanceFromSun: 2871.0,
        color: "#B2E2E2",
        orbitalPeriod: 30687,
        showOrbit: true,
    },
    {
        name: "Neptune",
        diameter: 49244,
        distanceFromSun: 4495.0,
        color: "#5B5DDF",
        orbitalPeriod: 60190,
        showOrbit: true,
    },
];

// Scale factors for visualization
export const DISTANCE_SCALE = 0.0001; // Increased for better visibility
export const SIZE_SCALE = 0.0003; // Increased for better visibility
export const ORBIT_SEGMENTS = 128; // Number of segments in orbital paths
