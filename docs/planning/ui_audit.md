# UI/UX Audit & Component Breakdown

## Overview
Aetheris requires a high-performance, minimalist UI driven by a 3D-mapped timeline (The "Pulse" Time-Axis) and a vector map (The Kinetic Atlas). Currently, the project consists entirely of backend logic, schemas, and a master controller script (`run.sh`). No frontend architecture (React, Mapbox GL JS, WebGL, bundlers) is present.

## Core UI Components Missing

### 1. The Kinetic Atlas (Vector Map)
The UI rejects a traditional "List View" for a minimalist vector map powered by WebGL/Mapbox GL JS.
- **Component 1:** WebGL/Mapbox Canvas Initialization.
- **Component 2:** Zoom Level 1 Logic (Global: Orbital view, solar storms, trade routes).
- **Component 3:** Zoom Level 2 Logic (National: Legislative shifts, weather fronts).
- **Component 4:** Zoom Level 3 Logic (County/Local: Hyper-local alerts, heat domes, roadworks).
- **Component 5:** Chromodynamic Styling Engine (Atmospheric background shifts, e.g., purple glow for Aurora).

### 2. The "Pulse" Time-Axis (3D-Mapped Timeline)
Users do not scroll; they traverse time.
- **Component 1:** 3D Map Container (housing the timeline traversal logic).
- **Component 2:** Timeline Overlay (UI controls for Past, History, Present, Horizon).
- **Component 3:** Traversal Event Binding (Mapping user interaction to the `lib/timeline/traversal.js` logic).

### 3. AI Reasoning UI Overlays
- **Component 1:** 30-word Factual Brief Modals (Extractive Synthesis output).
- **Component 2:** Safety Sentinel Injections (High-priority overlay alerts for imminent hazards).
- **Component 3:** Ghost Cards (Semi-transparent cards displaying probability cones for predictions).

## Execution Blockers
Because the repository lacks a `package.json`, frontend framework (React), bundler (Webpack/Vite), and external dependencies (Mapbox GL JS), all frontend tasks mapped from this audit must be marked as `[BLOCKED]` in the backlog until the environment is bootstrapped for UI development.
