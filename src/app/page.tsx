import { Scene } from '@/components/solar-system/Scene';

export default function Home() {
    return (
        <main className="relative w-full h-screen bg-black">
            <Scene />

            {/* Info Panel */}
            <div className="absolute top-4 left-4 p-4 bg-black/50 text-white rounded-lg backdrop-blur-sm max-w-sm">
                <h1 className="text-2xl font-bold mb-2">Solar System Explorer</h1>
                <p className="text-sm mb-4 opacity-80">
                    An interactive 3D visualization of our solar system with real astronomical data.
                    Hover over planets to see details.
                </p>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Controls</h2>
                    <ul className="text-sm opacity-80 space-y-1">
                        <li>• Left click + drag to rotate</li>
                        <li>• Right click + drag to pan</li>
                        <li>• Scroll to zoom in/out</li>
                        <li>• Hover over planets for information</li>
                    </ul>
                </div>
            </div>

            {/* Attribution */}
            <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                Data source: NASA Planetary Fact Sheet
            </div>
        </main>
    );
}
