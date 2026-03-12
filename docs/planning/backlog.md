# Backlog

## Epics

- [EPIC] Predictive Hallucination - Predictions are restricted to Logic-Based Forecasts tied to historical patterns, not speculative storytelling.
- [EPIC] Signal-to-Noise Ratio - Users set "Interest Thresholds." If news doesn't meet a specific impact score for your county/interests, it remains hidden.
- [EPIC] Data Latency - Use Nowcasting AI to fill the 6-hour gaps between major meteorological model updates.

## New Epics (Mapped from README.md)

- [EPIC] Temporal Intelligence Engine - Implementation of the 3D-mapped timeline traversing 2h-48h past to predictive future modeling.
- [EPIC] "Ground Truth" Protocol - Integration with ECMWF, GFS, NOAA SWPC, and CAMS for primary-source environmental data.
  - [ ] TASK: fetch-ecmwf-data | Target: lib/data/ecmwf-client.ts | I/O: REST -> JSON | Assert: 0 err, >95% cov | LOC: ~40
  - [ ] TASK: fetch-noaa-swpc-data | Target: lib/data/noaa-client.ts | I/O: REST -> JSON | Assert: 0 err, >95% cov | LOC: ~40
- [EPIC] Geopolitical & News Sourcing - Integration with The GDELT Project and Reuters/AP for fact-anchor data logic.
- [EPIC] Kinetic Atlas UI/UX - Development of a Minimalist Vector Map using Mapbox GL JS/WebGL with 3 zoom logic levels and chromodynamic minimalist style.
- [EPIC] Extractive Synthesis - AI-driven logic to analyze 20+ sources for single events to produce 30-word factual briefs.
- [EPIC] Safety Sentinel - Logic for real-time safety injection warnings for environmental hazards (e.g. heatwaves, storms).
- [EPIC] Probability Cones - Development of Ghost Cards displaying percentage-based likelihoods for predictive modeling.
- [HIGH-RISK][EPIC] Edge-Computed PWA Backend - Implementation of the Progressive Web App backend with edge-computed data caching logic.
- [HIGH-RISK][EPIC] Gemini 1.5 Flash Integration - Implementation of the high-speed intelligence logic layer for summarization.
