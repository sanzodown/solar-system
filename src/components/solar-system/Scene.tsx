'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { celestialBodies } from '@/lib/solar-system-data';
import Planet from './Planet';

export function Scene() {
    return (
        <div className="w-full h-screen">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera
                        makeDefault
                        position={[100, 50, 100]}
                        fov={50}
                        near={0.1}
                        far={10000}
                    />

                    {/* Lighting */}
                    <ambientLight intensity={0.3} />
                    <pointLight position={[0, 0, 0]} intensity={1.5} distance={1000} decay={1.5} />

                    {/* Background stars */}
                    <Stars
                        radius={1000}
                        depth={500}
                        count={10000}
                        factor={4}
                        fade
                        speed={1}
                    />

                    {/* Planets */}
                    {celestialBodies.map((body) => (
                        <Planet key={body.name} body={body} />
                    ))}

                    {/* Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={10}
                        maxDistance={1000}
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                        zoomSpeed={1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
