# RouteFlow London – Product & Technical Blueprint

This document summarises the long‑term vision for RouteFlow London, a modern transit app focused on London buses.

It covers:

1. **Vision & Goals** – fast live data, delightful UI, deep route & fleet information.
2. **Personas** – commuters, enthusiasts, visitors.
3. **Feature Set** – live tracking, journey planning, disruptions, fleet list, current & withdrawn routes, gamification, accounts, dashboard.
4. **Tech Stack** – Next.js frontend, Node.js API, PostgreSQL via Prisma, Redis cache, Auth.js, SSE/WebSockets.
5. **Data Sources** – TfL APIs, curated datasets, community fleet data with caching & background jobs.
6. **Domain Model** – detailed schema for users, favourites, routes, stops, fleet, gamification.
7. **API Design** – REST endpoints for stops, routes, journeys, fleet, gamification, accounts.
8. **Frontend IA** – dashboard, search, stop detail, route detail, journey planner, fleet explorer, withdrawn routes archive, profile, leaderboard.
9. **Gamification Mechanics** – XP formula, levels, streaks, anti‑abuse measures.
10. **Security & Privacy** – minimal PII, Argon2 hashing, rate limiting, consent prompts.
11. **Performance & Reliability** – caching, backpressure, graceful degradation.
12. **Admin & Moderation** – dashboard, audit log.
13. **Roadmap & Milestones** – phased delivery from foundations to journey planner & map.
14. **Initial Tasks** – DB schema, TfL client, stop search & arrivals routes, route sync job, disruptions fetcher, auth, favourites, gamification skeleton, admin scaffold.

Additional sections outline future expansions (knowledge hub, profile notes, Discord integration, etc.). See the project discussion for full details.
