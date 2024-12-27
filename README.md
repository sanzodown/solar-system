# Pewpewlazer's Solar System at Scale

A true-to-scale 3D visualization of our solar system built with Next.js, Three.js, and React Three Fiber.

## About

This project aims to provide an accurate representation of our solar system, maintaining true proportions for:
- Planet sizes
- Distances from the Sun
- Orbital paths
- Orbital periods

All measurements are based on real astronomical data from the Solar System OpenData API.

## Features

- 🌍 Accurate planet sizes and distances
- 🛸 Interactive 3D navigation
- 🎯 Click-to-focus on planets
- 🌠 Dynamic star field background
- 📏 True scale visualization

## Controls

- Left click + drag to rotate
- Right click + drag to pan
- Scroll to zoom in/out
- Click on planet names to focus
- Use the Reset View button to return to the overview

## Tech Stack

- Next.js 14 (App Router)
- Three.js / React Three Fiber
- TypeScript
- Tailwind CSS
- Solar System OpenData API

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Visit [http://localhost:3000](http://localhost:3000) to see the visualization.

## Credits

- Solar system data provided by [The Solar System OpenData](https://api.le-systeme-solaire.net/)
