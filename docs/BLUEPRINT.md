# Apex RP Queue Portal — Experience Blueprint

This document captures the direction for the Apex RP web queue, ensuring consistent player onboarding and brand expression across the FiveM community.

## Vision

Deliver an always-on destination where new and returning citizens can:

1. Check live queue health and status.
2. Join the line with clear expectations on wait times and priority rules.
3. Learn about the city beat, SOP refreshers, and staff touchpoints before their session begins.

## Audience

- **Staff & Dispatch** – Monitor queue levels, remove inactive players, and surface service metrics.
- **First Responders / Departments** – Understand how close they are to deployment and coordinate shift rotations.
- **Civilians & Newcomers** – Get guidance on connecting, Discord requirements, and queue etiquette.

## Core Features

- Cinematic landing hero with Apex RP messaging, call-to-action, and queue snapshot.
- Queue metrics: live count, processed players, average wait, longest hold.
- Priority breakdown (staff, supporter, standard, guest) with explanatory blurbs.
- Live table of queued players with wait estimates based on tier and arrival time.
- Submission panel that posts to `/api/queue` and accepts JSON or form-encoded payloads.
- Dispatch history log for the four most recent transitions out of queue.

## Queue Mechanics

- In-memory dispatcher with deterministic ordering by priority score then join timestamp.
- Priority tiers map to numerical weights and ETA speedups:
  - **Staff**: highest priority, 10 minute ETA reduction.
  - **Supporter**: boosted priority, 6 minute reduction.
  - **Standard**: default tier.
  - **Guest**: entry-level visitors.
- Removals flagged as `served` increase the "processed" metric; `removed` keeps stats intact for players who disconnect.
- History maintains the 25 most recent transitions for dashboards or audit needs.

## API Surface

- `GET /api/queue` → full snapshot with metrics, active entries, and recent history.
- `POST /api/queue` → add a new entry; flexible content-type parsing with validation on `playerName`.
- `DELETE /api/queue/:id?status=served|removed` → remove an entry and update history.
- `lib/queue.js` exposes helpers (`joinQueue`, `leaveQueue`, `getQueueSnapshot`, `resetQueue`) for integrating with bots or admin tools.

## Design Language

- Dark, neon-infused palette inspired by Los Santos nightlife.
- Rounded glassmorphism cards with subtle glows to match Apex RP overlays.
- Typography stack: Inter / Segoe UI for modern readability.
- Responsive grid layout with single-column fallbacks under 900px.

## Roadmap Ideas

1. **Discord OAuth tie-in** – authenticate players before they can submit entries.
2. **WebSocket updates** – push queue changes to connected dashboards in real-time.
3. **Staff controls** – protected dashboard with manual priority adjustments and notes.
4. **Analytics** – daily/weekly queue stats, drop-off rates, and average response times.
5. **Theme customization** – dynamic assets for seasonal events or department takeovers.

Use this blueprint to guide enhancements while keeping the queue portal aligned with Apex RP's roleplay-first culture.
