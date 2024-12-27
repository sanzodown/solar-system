'use client';

import { useState, useEffect } from 'react';
import Scene from '@/components/solar-system/Scene';
import { fetchSolarSystemData } from '@/lib/api/nasa';
import { CelestialBody, convertApiDataToCelestialBody } from '@/lib/solar-system-data';

export default function Home() {
    const [celestialBodies, setCelestialBodies] = useState<CelestialBody[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSolarSystemData() {
            try {
                const apiData = await fetchSolarSystemData();
                const bodies = apiData
                    .map(convertApiDataToCelestialBody)
                    .sort((a, b) => (a.distanceFromSun || 0) - (b.distanceFromSun || 0));
                setCelestialBodies(bodies);
                setLoading(false);
            } catch (err) {
                setError('Failed to load solar system data');
                setLoading(false);
            }
        }

        loadSolarSystemData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black text-white">
                Loading solar system data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black text-white">
                {error}
            </div>
        );
    }

    return <Scene celestialBodies={celestialBodies} />;
}
