'use client';

import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CelestialBody, DISTANCE_SCALE, SIZE_SCALE, ORBIT_SEGMENTS } from '@/lib/solar-system-data';

interface PlanetProps {
    body: CelestialBody;
}

export default function Planet({ body }: PlanetProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const radius = body.diameter * SIZE_SCALE / 2;
    const orbitRadius = body.distanceFromSun * DISTANCE_SCALE;
    const position = body.name === 'Sun' ? [0, 0, 0] : [orbitRadius, 0, 0];

    useFrame((state, delta) => {
        if (meshRef.current && body.orbitalPeriod > 0) {
            // Calculate orbital speed based on orbital period
            const speed = (2 * Math.PI) / (body.orbitalPeriod * 60);
            const angle = state.clock.getElapsedTime() * speed;

            // Update position based on orbital motion
            meshRef.current.position.x = Math.cos(angle) * orbitRadius;
            meshRef.current.position.z = Math.sin(angle) * orbitRadius;

            // Rotate the planet
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    // Create points for orbital path
    const orbitPoints = [];
    if (body.showOrbit) {
        for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
            const angle = (i / ORBIT_SEGMENTS) * Math.PI * 2;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            orbitPoints.push(new Vector3(x, 0, z));
        }
    }

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
                    <lineBasicMaterial color={body.color} opacity={0.3} transparent />
                </line>
            )}

            {/* Planet */}
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial
                    color={body.color}
                    emissive={body.name === 'Sun' ? body.color : undefined}
                    emissiveIntensity={body.name === 'Sun' ? 0.5 : 0}
                />

                {/* Label */}
                {hovered && (
                    <Html>
                        <div className="px-2 py-1 bg-black/75 text-white rounded text-sm whitespace-nowrap">
                            {body.name}
                            <div className="text-xs opacity-75">
                                Distance: {body.distanceFromSun.toLocaleString()} million km
                            </div>
                        </div>
                    </Html>
                )}
            </mesh>
        </>
    );
}
