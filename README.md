# Apex RP Queue Portal

This repository delivers a lightweight web experience for the **Apex RP** FiveM server. It combines a cinematic landing page with a live queue board and simple API so staff can manage connections outside of the game client.

## Highlights

- **Hero landing page** with Apex RP branding, queue metrics, and community messaging.
- **Live queue table** driven by an in-memory dispatcher, complete with priority tiers, wait estimates, and recent history.
- **Queue submission form** that posts to `/api/queue` using either JSON or HTML form encoding.
- **Management endpoints** for clearing players from the queue and retrieving snapshots for custom dashboards.
- Zero third-party dependencies – everything runs on the standard Node.js runtime.

## Getting started

```bash
npm test
```

The project uses the Node.js test runner to verify queue ordering and state transitions. No additional build tooling is required.

## API reference

### `GET /api/queue`
Returns the current queue snapshot including live metrics, active players, and recent history entries.

### `POST /api/queue`
Join the queue. Accepts `application/json`, `application/x-www-form-urlencoded`, or `multipart/form-data`.

| Field        | Type   | Required | Notes                                      |
| ------------ | ------ | -------- | ------------------------------------------ |
| playerName   | string | Yes      | Character, callsign, or Discord handle.    |
| role         | string | No       | How you intend to roleplay on entry.       |
| priority     | string | No       | `staff`, `supporter`, `standard`, `guest`. |
| steamId      | string | No       | Optional Steam hex / identifier.           |
| notes        | string | No       | Extra context for dispatch.                |

Returns the created entry plus a refreshed snapshot.

### `DELETE /api/queue/:id`
Remove a player from the queue. Optional `status` query parameter (`served` or `removed`) controls whether the removal counts toward the processed metric.

## Development notes

- Queue state is maintained in memory (`lib/queue.js`) and seeded with sample data for the landing page.
- A helper `resetQueue({ seed: boolean })` is exported for tests or external scripts that need a clean state.
- Styling is inline within `app/page.js` to keep the site self-contained and dependency-free.

Feel free to adapt the copy, imagery, and queue seeding data to match your exact Apex RP branding.
