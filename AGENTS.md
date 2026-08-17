# CyberThreat AI — Agent Guide

## Purpose
CyberThreat AI is a professional threat-intelligence frontend. Phase 1 is a complete, responsive UI prototype for analyzing security targets with typed mock data.

## Stack
React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, Recharts, and Framer Motion.

## Phase 1 boundaries
- Frontend only: no backend, database, authentication, payments, or real accounts.
- No real APIs, API keys, VirusTotal, AbuseIPDB, n8n, ML, or LLM integrations.
- Use typed mock data and API-shaped services only.
- Keep an API-ready architecture and do not break existing functionality.

## Design and theme
- Enterprise cybersecurity SaaS: restrained navy/blue accents, clear hierarchy, practical tables and charts.
- No cyberpunk styling, robots, glowing effects, or copied third-party product UI.
- Use CSS theme variables and token classes; do not scatter literal colors through components.
- Support light, dark, and system themes; light is the default.

## Structure
`src/components` contains reusable UI and feature components; `src/layouts` owns page shells; `src/pages` owns routes; `src/data` owns mock fixtures; `src/types` owns contracts; `src/services` provides future API seams; `src/hooks` owns reusable state.

## Coding rules
- TypeScript only. Prefer small, typed, accessible components.
- Keep mock content out of visual components where practical.
- Use React Router links and routes for every navigable UI item.
- Use `aria-label`, semantic landmarks, keyboard focus states, and good contrast.

## Responsive rules
- Mobile first. No horizontal page scrolling.
- Tables must have a responsive alternative or horizontal internal scroll.
- The app sidebar must collapse on tablet and slide in on mobile.

## Testing
- Run `npm run typecheck`, `npm run build`, and `npm run lint` when available.
- Start the Vite server and visually verify landing, scanner flow, app navigation, themes, desktop, tablet, and mobile.
