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

    const handlePlanetFocus = (position: [number, number, number], bodyName: string) => {
        if (controlsRef.current) {
            const controls = controlsRef.current;
            controls.target.set(...position);

            if (bodyName === "Sun") {
                // For the Sun, position camera at a fixed distance
                controls.object.position.set(1000, 500, 1000);
                controls.minDistance = 100;
                controls.maxDistance = 10000;
            } else {
                // For planets, calculate distance based on their position
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
            }

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
                <a
                    href="https://github.com/sanzodown/solar-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm"
                    title="View on GitHub"
                >
                    <span>View on GitHub</span>
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        className="fill-current"
                    >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
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
