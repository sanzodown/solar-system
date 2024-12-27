'use client';

import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import {
    CelestialBody,
    getSizeMultiplier,
    ORBIT_SEGMENTS,
    getCurrentOrbitalPosition,
    getPlanetHighlight,
    getOrbitPoints
} from '@/lib/solar-system-data';

interface PlanetProps {
    body: CelestialBody;
    onFocus: (position: [number, number, number], bodyName: string) => void;
}

export default function Planet({ body, onFocus }: PlanetProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const radius = getSizeMultiplier(body);
    const highlight = getPlanetHighlight(body);

    useFrame((state, delta) => {
        if (meshRef.current && body.orbitalPeriod > 0) {
            const position = getCurrentOrbitalPosition(body);
            meshRef.current.position.set(position.x, position.y, position.z);
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    const initialPos = getCurrentOrbitalPosition(body);
    const initialPosition: [number, number, number] = [initialPos.x, initialPos.y, initialPos.z];
    const orbitPoints = body.showOrbit ? getOrbitPoints(body) : [];

    const handleClick = (e: any) => {
        e.stopPropagation();
        onFocus(initialPosition, body.name);
    };

    return (
        <>
            {/* Orbital path */}
            {body.showOrbit && (
                <line>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={orbitPoints.length}
                            array={new Float32Array(orbitPoints.flatMap(p => [p.x, p.y, p.z]))}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={body.color} opacity={0.3} transparent linewidth={1} />
                </line>
            )}

            {/* Planet */}
            <mesh
                ref={meshRef}
                position={initialPosition}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <sphereGeometry args={[radius, 32, 32]} />
                <meshPhysicalMaterial
                    color={body.color}
                    emissive={highlight.emissive}
                    emissiveIntensity={hovered ? highlight.emissiveIntensity * 2 : highlight.emissiveIntensity}
                    metalness={0.4}
                    roughness={0.7}
                    clearcoat={0.5}
                    clearcoatRoughness={0.3}
                />

                {/* Permanent label */}
                <Billboard
                    follow={true}
                    lockX={false}
                    lockY={false}
                    lockZ={false}
                >
                    <Html
                        position={[0, radius * 2.5, 0]}
                        center
                        style={{
                            color: body.color,
                            background: 'rgba(0,0,0,0.8)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'auto',
                            userSelect: 'none',
                            cursor: 'pointer',
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.2s'
                        }}
                        onClick={handleClick}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            setHovered(true);
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation();
                            setHovered(false);
                        }}
                    >
                        <div
                            onClick={handleClick}
                            style={{ padding: '2px 4px' }}
                        >
                            {body.name}
                        </div>
                    </Html>
                </Billboard>

                {/* Hover information */}
                {hovered && (
                    <Html
                        position={[0, radius * 4, 0]}
                        center
                        style={{
                            pointerEvents: 'none',
                        }}
                    >
                        <div className="px-2 py-1 bg-black/80 text-white rounded text-sm whitespace-nowrap">
                            <div className="text-xs space-y-1">
                                <div>Distance: {body.distanceFromSun.toLocaleString()} km</div>
                                <div>Diameter: {body.diameter.toLocaleString()} km</div>
                                <div>Orbital Period: {body.orbitalPeriod.toLocaleString()} days</div>
                                {body.inclination !== undefined &&
                                    <div>Orbital Inclination: {body.inclination.toFixed(1)}°</div>}
                                {body.eccentricity !== undefined &&
                                    <div>Eccentricity: {body.eccentricity.toFixed(3)}</div>}
                            </div>
                        </div>
                    </Html>
                )}
            </mesh>
        </>
    );
}
