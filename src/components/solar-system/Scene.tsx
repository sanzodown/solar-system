'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { CelestialBody } from '@/lib/solar-system-data';
import Planet from './Planet';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Vector3 } from 'three';

const INITIAL_CAMERA_POSITION = [200000, 100000, 200000] as const;

export default function Scene({ celestialBodies }: { celestialBodies: CelestialBody[] }) {
    const controlsRef = useRef<OrbitControlsImpl>(null);

    const handleResetView = () => {
        if (controlsRef.current) {
            const controls = controlsRef.current;
            controls.target.set(0, 0, 0);
            controls.object.position.set(...INITIAL_CAMERA_POSITION);
            controls.minDistance = 1;
            controls.maxDistance = 10000000;
            controls.update();
        }
    };

    const handlePlanetFocus = (position: [number, number, number]) => {
        if (controlsRef.current) {
            const controls = controlsRef.current;
            controls.target.set(...position);

            const distanceFromSun = Math.sqrt(position[0] ** 2 + position[1] ** 2 + position[2] ** 2);
            const offset = new Vector3(
                distanceFromSun * 0.01,
                distanceFromSun * 0.005,
                distanceFromSun * 0.01
            );
            const newPosition = new Vector3(...position).add(offset);
            controls.object.position.copy(newPosition);

            controls.minDistance = distanceFromSun * 0.001;
            controls.maxDistance = distanceFromSun * 0.1;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.update();
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg max-w-md space-y-2 z-10">
                <h1 className="text-xl font-bold">Pewpewlazer's Solar System at Scale</h1>
                <div className="text-sm space-y-1">
                    <p>🖱️ <span className="font-medium">Mouse Controls:</span></p>
                    <ul className="pl-4">
                        <li>• Left click + drag to rotate</li>
                        <li>• Right click + drag to pan</li>
                        <li>• Scroll to zoom in/out</li>
                    </ul>
                    <p>🎯 <span className="font-medium">Navigation:</span></p>
                    <ul className="pl-4">
                        <li>• Click on planet names to focus</li>
                        <li>• All distances and sizes are to scale</li>
                    </ul>
                </div>
                <button
                    onClick={handleResetView}
                    className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors w-full"
                >
                    🏠 Reset View
                </button>
            </div>

            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    position={INITIAL_CAMERA_POSITION}
                    fov={45}
                    near={0.001}
                    far={100000000}
                />
                <OrbitControls
                    ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={1}
                    maxDistance={10000000}
                    enableDamping={true}
                    dampingFactor={0.05}
                />

                <ambientLight intensity={0.3} />
                <pointLight position={[0, 0, 0]} intensity={2} />

                <Stars
                    radius={1000000}
                    depth={500000}
                    count={10000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                {celestialBodies.map((body) => (
                    <Planet
                        key={body.name}
                        body={body}
                        onFocus={handlePlanetFocus}
                    />
                ))}
            </Canvas>
        </div>
    );
}
