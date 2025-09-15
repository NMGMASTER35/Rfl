# RouteFlow London

This repository contains an early scaffold for **RouteFlow London**, a community‑friendly transit app for London's buses.

The aim of this scaffold is to provide:

- Minimal Next.js‑style file structure (`app/` directory) with placeholder pages.
- A simple TfL API client with in‑memory caching for stop searches, arrivals, and route data.
- Prisma schema describing core domain tables.
- Node built‑in test verifying the caching logic.

> Full project vision, roadmap, and feature breakdown can be found in the `docs/` folder.

## Scripts

- `npm test` – run the node test suite.

## Environment

The project intentionally avoids external npm dependencies so it can run in restricted environments. API routes and pages are illustrative and rely only on the Node.js runtime.

Set `TFL_APP_ID` and `TFL_APP_KEY` in your environment to authenticate requests against the TfL API.

### Available API routes

- `GET /api/stops/search?q=` – search stops by name.
- `GET /api/stops/:id/arrivals` – live arrivals for a stop.
- `GET /api/routes` – list all bus routes.
- `GET /api/routes/:id` – details for a route.
- `GET /api/routes/:id/disruptions` – disruptions affecting a route.
