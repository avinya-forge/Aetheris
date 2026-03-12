# System Design

## Core Architecture: The "Pulse" Time-Axis
Users do not scroll; they **traverse** a 3D-mapped timeline.

| Tier | Focus | AI Action |
| :--- | :--- | :--- |
| **Past (2h - 48h)** | Rapid Response | Deduplication and "No-Fluff" bullet-point extraction. |
| **History (1w - 1m)** | Trend Analysis | Identifying "Macro-Clusters" and long-term geopolitical shifts. |
| **Present** | Real-Time Flash | Live $K_p$ Index (Aurora), Heatwave alerts, and breaking wires. |
| **The Horizon** | Predictive Modeling | Logic-based forecasting (Probability Cones) of what happens next. |

## Data Sourcing (The "Ground Truth" Protocol)
To ensure technical accuracy and avoid "flawed" secondary data, Aetheris pulls from primary providers:

### A. Environmental (Raw Physics)
* **Global Weather:** Raw **ECMWF** and **GFS (NOAA)** models (the sources weather apps use).
* **Space Weather:** Direct telemetry from **NOAA SWPC** (Solar wind/Aurora visibility).
* **Climate & Heat:** **Copernicus Atmosphere (CAMS)** for real-time wet-bulb and heat-stress metrics.

### B. Geopolitical & News
* **The GDELT Project:** Real-time monitoring of global human society in 100+ languages.
* **Fact-Anchor:** High-integrity wires (**Reuters/AP**) used as the "Truth Logic" to verify events.

## UI/UX: The Kinetic Atlas
Aetheris rejects the "List View" in favor of a **Minimalist Vector Map**.

* **Zoom Logic:** * **Level 1 (Global):** Orbital view of solar storms, trade routes, and conflict zones.
    * **Level 2 (National):** Legislative shifts and nationwide weather fronts.
    * **Level 3 (County/Local):** Hyper-local alerts (fire, roadworks, localized heat domes).
* **Visual Style:** **Chromodynamic Minimalist.** No stock photos. We use vector glyphs and atmospheric background shifts (e.g., UI glows purple during high Aurora probability).

## AI Reasoning & Summarization
* **Extractive Synthesis:** AI analyzes 20+ sources for a single event, removes the fluff, and provides a **30-word factual brief**.
* **Safety Sentinel:** If a heatwave or storm is detected, the AI injects a "Rational Warning" (e.g., *"It is 40°C. Your internal cooling is failing. Seek shade now."*).
* **Probability Cones:** Predictions are never "certain." They are displayed as semi-transparent "Ghost Cards" with percentage-based likelihoods.

## Technical Stack (2026 Ready)
* **Frontend:** Mapbox GL JS / WebGL (For high-performance 3D vector rendering).
* **Intelligence:** Gemini 1.5 Flash (For high-speed, low-latency summarization).
* **Backend:** PWA (Progressive Web App) with Edge-computed data caching.
