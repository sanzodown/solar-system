# Solar System Explorer

An interactive 3D visualization of our solar system built with Next.js, Three.js, and React Three Fiber. This project aims to help users understand the scale and vastness of space through a simple yet engaging interface.

## Features

- Real-scale representation of planets and distances (scaled for visualization)
- Interactive 3D controls for exploration
- Orbital motion simulation
- Responsive design
- Simple and intuitive interface

## Technologies Used

- Next.js 14
- TypeScript
- Three.js
- React Three Fiber
- React Three Drei
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Controls

- Left click + drag: Rotate the view
- Right click + drag: Pan the view
- Scroll: Zoom in/out
- Touch controls supported on mobile devices

## Project Structure

- `src/components/solar-system/` - Solar system related components
- `src/lib/solar-system-data.ts` - Planet data and scale factors
- `src/app/` - Next.js app router pages

## Data Sources

The planetary data used in this simulation is based on real astronomical measurements, including:
- Planet diameters
- Distances from the Sun
- Orbital periods

Note: The visualization uses scale factors to make the solar system explorable while maintaining relative proportions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
