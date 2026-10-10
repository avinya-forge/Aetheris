# Aetheris Design System (MASTER)

## 1. Domain Match
- **Industry:** Emerging Tech, Intelligence Dashboard, AI-Native
- **Mood:** Stealth, Cyber, High-Precision, Minimalist
- **Core Pattern:** Full-screen immersive map with floating glassmorphism widgets.

## 2. Typography
- **Primary Font:** `Inter`, `SF Pro`, or standard system-ui.
- **Fluid Scale:**
  - Base: `clamp(1rem, 0.95rem + 0.25vw, 1.25rem)`
  - Sm: `clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)`
  - Xs: `clamp(0.6rem, 0.55rem + 0.15vw, 0.7rem)`
- **Line Heights:**
  - Tight (Headings): `1.1` (with `text-wrap: balance`)
  - Normal (Body): `1.5` (with `text-wrap: pretty`)

## 3. Color Palette
- **Background:** `#1a1a1a` (Space/Atmosphere dynamic coloring).
- **Text:** `#ffffff` (Primary), `#cccccc` (Secondary), `rgba(255,255,255,0.4)` (Tertiary).
- **Accents:**
  - `#00d2ff` (Information / Normal Status)
  - `#ffb400` (Warning / Medium Impact)
  - `#ff4b2b` (Critical / High Impact)

## 4. Glassmorphism & Elevation
- **Glass Panel (Dark):**
  - Background: `rgba(10, 10, 12, 0.85)`
  - Blur: `16px`
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3)`
- **Glass Panel (Light/Hover):**
  - Background: `rgba(255, 255, 255, 0.05)`
  - Blur: `12px`
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
  - Shadow: `0 4px 24px -4px rgba(0, 0, 0, 0.5)`

## 5. Spacing & Structure
- **Grid System:** 4px/8px modular scale.
- **Border Radius:** `6px` for small components, `45px` for large sweeping pill shapes (Timeline).

## 6. Animations
- **Motion:** Spring-based, hardware-accelerated transforms (translate, scale).
- **Easing:** `cubic-bezier(0.175, 0.885, 0.32, 1.275)` for playful overshoots on interactive elements.
