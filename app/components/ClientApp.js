'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { STOREFRONT_ITEMS } from '../../lib/storefront.js';

const styles = `
  :root {
    color-scheme: dark;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    background: #05070f;
    color: #f4f6ff;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: radial-gradient(circle at top left, rgba(83, 109, 254, 0.2), transparent 45%),
      radial-gradient(circle at bottom right, rgba(255, 90, 145, 0.2), transparent 40%),
      #05070f;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    padding-bottom: 6rem;
  }

  .nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(5, 7, 15, 0.82);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(148, 159, 255, 0.18);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem clamp(1.5rem, 4vw, 4rem);
    gap: 1.5rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9fa8ff;
  }

  .brand__logo {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, #536dff, #ff5991);
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    color: #05070f;
    font-weight: 800;
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .nav__link {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.95rem;
    color: rgba(244, 246, 255, 0.82);
    border: 1px solid transparent;
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .nav__link:hover {
    color: #ffffff;
    border-color: rgba(148, 159, 255, 0.4);
    transform: translateY(-1px);
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    padding: 0 clamp(1.5rem, 5vw, 5rem);
  }

  section {
    display: grid;
    gap: 2rem;
  }

  .hero {
    padding-top: 5rem;
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: start;
  }

  .hero__content {
    display: grid;
    gap: 1.75rem;
  }

  .hero__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: rgba(83, 109, 254, 0.15);
    color: #9fa8ff;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    width: fit-content;
    border: 1px solid rgba(83, 109, 254, 0.3);
  }

  .hero__title {
    margin: 0;
    font-size: clamp(2.5rem, 4vw, 4rem);
    line-height: 1.1;
  }

  .hero__subtitle {
    margin: 0;
    font-size: 1.1rem;
    color: rgba(239, 243, 255, 0.78);
    max-width: 60ch;
  }

  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.85rem 1.6rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1px solid transparent;
    background: rgba(83, 109, 254, 0.18);
    color: #ffffff;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    box-shadow: 0 15px 35px rgba(83, 109, 254, 0.22);
  }

  .button--primary {
    background: linear-gradient(135deg, #536dff, #ff5991);
    box-shadow: 0 20px 40px rgba(83, 109, 254, 0.28);
  }

  .button--ghost {
    background: transparent;
    border-color: rgba(148, 159, 255, 0.24);
    box-shadow: none;
    color: rgba(244, 246, 255, 0.85);
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 46px rgba(255, 89, 145, 0.3);
  }

  .status-grid {
    display: grid;
    gap: 1rem;
  }

  .status-card {
    background: rgba(8, 11, 24, 0.68);
    border: 1px solid rgba(148, 159, 255, 0.2);
    padding: 1.4rem;
    border-radius: 1.2rem;
    display: grid;
    gap: 0.6rem;
  }

  .status-card h3 {
    margin: 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(148, 159, 255, 0.68);
  }

  .status-card strong {
    font-size: 1.6rem;
  }

  .status-card__meta {
    font-size: 0.85rem;
    color: rgba(228, 232, 255, 0.72);
  }

  .queue-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .queue-card {
    background: rgba(8, 11, 24, 0.6);
    border: 1px solid rgba(148, 159, 255, 0.18);
    border-radius: 1.1rem;
    padding: 1.5rem;
    display: grid;
    gap: 1rem;
  }

  .queue-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .queue-card__meta {
    font-size: 0.85rem;
    color: rgba(228, 232, 255, 0.7);
  }

  .queue-alert {
    border-radius: 0.85rem;
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
    line-height: 1.4;
    border: 1px solid rgba(148, 159, 255, 0.2);
    background: rgba(83, 109, 254, 0.18);
  }

  .queue-alert--warning {
    background: rgba(255, 89, 145, 0.18);
    border-color: rgba(255, 89, 145, 0.35);
    color: rgba(255, 210, 220, 0.95);
  }

  .queue-form {
    display: grid;
    gap: 0.75rem;
  }

  .queue-table-wrapper {
    max-height: 320px;
    overflow: auto;
    border-radius: 0.9rem;
  }

  .queue-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 340px;
  }

  .queue-table th,
  .queue-table td {
    text-align: left;
    padding: 0.6rem 0.4rem;
    border-bottom: 1px solid rgba(148, 159, 255, 0.12);
    font-size: 0.85rem;
  }

  .queue-table th {
    position: sticky;
    top: 0;
    background: rgba(5, 7, 15, 0.9);
    z-index: 1;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .queue-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
    background: rgba(83, 109, 254, 0.18);
    border: 1px solid rgba(83, 109, 254, 0.36);
  }

  .queue-pill--staff {
    background: rgba(83, 109, 254, 0.32);
    border-color: rgba(83, 109, 254, 0.5);
  }

  .queue-pill--supporter {
    background: rgba(255, 153, 102, 0.25);
    border-color: rgba(255, 153, 102, 0.55);
  }

  .queue-pill--guest {
    background: rgba(148, 159, 255, 0.12);
    border-color: rgba(148, 159, 255, 0.2);
  }

  .queue-pill--active {
    background: rgba(83, 109, 254, 0.4);
    border-color: rgba(83, 109, 254, 0.7);
    color: #05070f;
    font-weight: 600;
  }

  .queue-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .queue-history {
    font-size: 0.85rem;
    color: rgba(228, 232, 255, 0.7);
  }

  .queue-empty {
    font-size: 0.9rem;
    color: rgba(228, 232, 255, 0.65);
  }

  .guide {
    background: rgba(8, 11, 24, 0.55);
    border: 1px solid rgba(148, 159, 255, 0.16);
    border-radius: 1.2rem;
    padding: 1.8rem;
    display: grid;
    gap: 1.2rem;
  }

  .guide ol {
    margin: 0;
    padding-left: 1.2rem;
    display: grid;
    gap: 0.7rem;
    color: rgba(228, 232, 255, 0.82);
  }

  .section-heading {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .section-heading h2 {
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
  }

  .section-heading p {
    margin: 0;
    color: rgba(228, 232, 255, 0.78);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: rgba(8, 11, 24, 0.6);
    border: 1px solid rgba(148, 159, 255, 0.18);
    padding: 1.5rem;
    border-radius: 1.1rem;
    display: grid;
    gap: 0.8rem;
  }

  .card h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .card p {
    margin: 0;
    color: rgba(228, 232, 255, 0.75);
    line-height: 1.5;
  }

  .rules-grid {
    display: grid;
    gap: 1.5rem;
  }

  .rules-group {
    display: grid;
    gap: 1rem;
    background: rgba(8, 11, 24, 0.55);
    border: 1px solid rgba(148, 159, 255, 0.18);
    padding: 1.6rem;
    border-radius: 1.1rem;
  }

  .rules-group h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .rules-list {
    display: grid;
    gap: 0.9rem;
  }

  .rules-list li {
    padding: 0.8rem 1rem;
    background: rgba(12, 16, 31, 0.6);
    border-radius: 0.9rem;
    border: 1px solid rgba(148, 159, 255, 0.12);
  }

  .rules-list li strong {
    display: block;
    margin-bottom: 0.35rem;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .news-item {
    display: grid;
    gap: 0.8rem;
    background: rgba(8, 11, 24, 0.6);
    border-radius: 1rem;
    border: 1px solid rgba(148, 159, 255, 0.18);
    padding: 1.4rem;
  }

  .news-item time {
    font-size: 0.85rem;
    color: rgba(148, 159, 255, 0.65);
    letter-spacing: 0.05em;
  }

  .jobs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.4rem;
  }

  .job-card {
    display: grid;
    gap: 0.7rem;
    padding: 1.4rem;
    border-radius: 1.05rem;
    border: 1px solid rgba(148, 159, 255, 0.18);
    background: rgba(8, 11, 24, 0.55);
  }

  .job-card span {
    font-size: 2rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    min-height: 200px;
    background: rgba(8, 11, 24, 0.7);
    border: 1px solid rgba(148, 159, 255, 0.22);
  }

  .gallery-item img,
  .gallery-item iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border: none;
  }

  .gallery-item__caption {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(5, 7, 15, 0.88), transparent 65%);
    padding: 1rem;
    font-weight: 600;
  }

  .application-roles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }

  .form-card {
    display: grid;
    gap: 1rem;
    padding: 1.6rem;
    border-radius: 1.1rem;
    border: 1px solid rgba(148, 159, 255, 0.2);
    background: rgba(8, 11, 24, 0.58);
  }

  form {
    display: grid;
    gap: 1rem;
  }

  label {
    display: grid;
    gap: 0.45rem;
    font-size: 0.9rem;
    color: rgba(228, 232, 255, 0.8);
  }

  input,
  textarea,
  select {
    padding: 0.7rem 0.9rem;
    border-radius: 0.6rem;
    border: 1px solid rgba(148, 159, 255, 0.32);
    background: rgba(5, 7, 15, 0.7);
    color: #f4f6ff;
    font: inherit;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .discord-card {
    display: grid;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 1.1rem;
    border: 1px solid rgba(148, 159, 255, 0.2);
    background: rgba(8, 11, 24, 0.58);
  }

  .tebex-form {
    gap: 0.75rem;
  }

  .tebex-form label {
    font-size: 0.85rem;
  }

  .tebex-form input {
    width: 100%;
  }

  .tebex-form button {
    width: 100%;
    justify-content: center;
  }

  .purchase-feedback {
    margin-top: 0.8rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.9rem;
  }

  .purchase-feedback--success {
    background: rgba(83, 109, 254, 0.18);
    border: 1px solid rgba(83, 109, 254, 0.32);
    color: rgba(228, 232, 255, 0.95);
  }

  .purchase-feedback--error {
    background: rgba(255, 89, 145, 0.18);
    border: 1px solid rgba(255, 89, 145, 0.32);
    color: rgba(255, 210, 220, 0.95);
  }

  .discord-embed {
    border-radius: 0.9rem;
    overflow: hidden;
    border: 1px solid rgba(148, 159, 255, 0.24);
    min-height: 310px;
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .support-card {
    display: grid;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 1.1rem;
    border: 1px solid rgba(148, 159, 255, 0.18);
    background: rgba(8, 11, 24, 0.6);
  }

  .admin {
    display: grid;
    gap: 2.5rem;
    padding-bottom: 4rem;
  }

  .admin-login {
    max-width: 420px;
    background: rgba(8, 11, 24, 0.6);
    border-radius: 1.2rem;
    border: 1px solid rgba(148, 159, 255, 0.18);
    padding: 2rem;
  }

  .admin-grid {
    display: grid;
    gap: 1.7rem;
  }

  .admin-grid__two {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  table thead th {
    text-align: left;
    font-weight: 600;
    padding: 0.8rem;
    background: rgba(12, 16, 31, 0.72);
  }

  table tbody tr:nth-child(even) {
    background: rgba(8, 11, 24, 0.42);
  }

  table td {
    padding: 0.8rem;
    border-bottom: 1px solid rgba(148, 159, 255, 0.12);
    vertical-align: top;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid transparent;
  }

  .status-pill--pending {
    background: rgba(255, 187, 92, 0.2);
    border-color: rgba(255, 187, 92, 0.3);
    color: #ffbb5c;
  }

  .status-pill--approved {
    background: rgba(123, 255, 191, 0.18);
    border-color: rgba(123, 255, 191, 0.28);
    color: #8fffbc;
  }

  .status-pill--denied,
  .status-pill--resolved {
    background: rgba(255, 115, 153, 0.18);
    border-color: rgba(255, 115, 153, 0.28);
    color: #ff7399;
  }

  .status-pill--open {
    background: rgba(83, 109, 254, 0.2);
    border-color: rgba(83, 109, 254, 0.28);
    color: #a4adff;
  }

  .admin-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .admin-actions button,
  .admin-actions a {
    padding: 0.55rem 1rem;
    border-radius: 0.7rem;
    border: 1px solid rgba(148, 159, 255, 0.25);
    background: rgba(12, 16, 31, 0.7);
    color: rgba(244, 246, 255, 0.9);
    font-size: 0.85rem;
    cursor: pointer;
  }

  .admin-actions button:hover,
  .admin-actions a:hover {
    border-color: rgba(255, 89, 145, 0.4);
    color: #ffffff;
  }

  footer {
    padding: 3rem clamp(1.5rem, 5vw, 5rem);
    border-top: 1px solid rgba(148, 159, 255, 0.18);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background: rgba(5, 7, 15, 0.8);
  }

  footer small {
    color: rgba(189, 195, 231, 0.7);
  }

  .feedback {
    padding: 0.8rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(123, 255, 191, 0.35);
    background: rgba(123, 255, 191, 0.1);
    color: #9fffd0;
    font-size: 0.9rem;
  }

  .error {
    padding: 0.75rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 115, 153, 0.3);
    background: rgba(255, 115, 153, 0.12);
    color: #ff99b7;
    font-size: 0.9rem;
  }

  @media (max-width: 720px) {
    .nav__inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .nav__links {
      width: 100%;
      justify-content: space-between;
    }

    .hero {
      padding-top: 3rem;
    }

    .quick-actions {
      width: 100%;
    }

    .button {
      flex: 1 1 calc(50% - 0.75rem);
      justify-content: center;
    }

    .discord-embed {
      min-height: 260px;
    }
  }
`;

const ADMIN_CREDENTIALS = {
  username: 'command',
  password: 'apex-admin'
};

const initialBanner = {
  title: 'Apex Roleplay Network',
  tagline: 'Professional FiveM storytelling with a committed staff team and thriving community.',
  callout: 'Now recruiting dedicated emergency services and gang leadership roles.',
  bannerUrl:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
};

const initialNews = [
  {
    id: 'news-1',
    title: '1.7 City Update deployed',
    excerpt: 'Drug laboratories, new MDT for LEO, and rebuilt hospital interior are now live.',
    body:
      'Our latest patch introduces modular drug labs, an expanded MDT for the LSPD, and an EMS trauma overhaul. Read the changelog for bug fixes and developer notes.',
    publishedAt: '2024-05-22T18:00:00Z',
    author: 'Development Team'
  },
  {
    id: 'news-2',
    title: 'Summer whitelist drive',
    excerpt: 'Applications for story-driven civilians are open with fast-tracked review windows.',
    body:
      'We are searching for storytellers who enjoy collaborative RP. Submit your whitelist dossier and attend an orientation session hosted twice per week.',
    publishedAt: '2024-06-10T21:30:00Z',
    author: 'Staff Command'
  },
  {
    id: 'news-3',
    title: 'Faction shake-ups & recruitment',
    excerpt: 'Mechanic unions, nightlife ownership, and new gang opportunities are on the horizon.',
    body:
      'Business proposals and gang pitches are now reviewed in the staff portal. Bring a unique angle—economy-focused, community-driven RP receives priority consideration.',
    publishedAt: '2024-06-28T16:15:00Z',
    author: 'Community Management'
  }
];

const initialRules = {
  roleplay: [
    {
      id: 'rp-1',
      title: 'Stay in character',
      description:
        'Your character should make believable decisions. Avoid breaking immersion or referencing out-of-character knowledge during scenes.'
    },
    {
      id: 'rp-2',
      title: 'Escalate with intent',
      description:
        'Conflict must be story-driven. Provide opportunities for retaliation or negotiation before violence, and respect value-of-life expectations.'
    },
    {
      id: 'rp-3',
      title: 'Respect scene control',
      description:
        'Follow directions from scene leads such as command staff or event runners. Use /ooc for quick clarifications only when necessary.'
    }
  ],
  community: [
    {
      id: 'com-1',
      title: 'Zero tolerance harassment',
      description:
        'Discrimination, hate speech, and targeted harassment are instant bans. Treat every player and staff member with respect on all platforms.'
    },
    {
      id: 'com-2',
      title: 'Discord professionalism',
      description:
        'Use proper channels for questions, reports, and suggestions. Follow ticket templates so staff can resolve issues quickly.'
    },
    {
      id: 'com-3',
      title: 'Content policy',
      description:
        'Streaming or sharing content from Apex RP requires appropriate tags and compliance with Twitch/YouTube community guidelines.'
    }
  ]
};

const initialJobs = [
  {
    id: 'job-police',
    name: 'Los Santos Police Department',
    description:
      'Structured patrols, investigations, and tactical responses with full MDT, evidence, and courtroom support.',
    focus: 'Patrol | Investigations | Command ladder',
    icon: '🚓'
  },
  {
    id: 'job-ems',
    name: 'Los Santos Medical Services',
    description:
      'Advanced trauma response, field triage, and hospital roleplay with a custom patient care system.',
    focus: 'Rescue | Healing | Training',
    icon: '🚑'
  },
  {
    id: 'job-mechanic',
    name: 'Mechanics & Tuners',
    description:
      'Own a shop, manage stock, and provide roadside rescue. Includes custom tuning UI and tow fleet.',
    focus: 'Business | Economy | Crafting',
    icon: '🛠️'
  },
  {
    id: 'job-gang',
    name: 'Gangs & Crime',
    description:
      'Organise sophisticated operations, maintain turf, and negotiate with crews across the city under staff oversight.',
    focus: 'Strategy | Storytelling | Territory',
    icon: '🦈'
  },
  {
    id: 'job-civ',
    name: 'Civilians & Entrepreneurs',
    description:
      'Launch nightclubs, run media crews, or deliver experiences like extreme sports events.',
    focus: 'Creativity | Events | Social',
    icon: '🎭'
  }
];

const initialGallery = [
  {
    id: 'gallery-1',
    title: 'City skyline patrol',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gallery-2',
    title: 'Hospital grand re-opening',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gallery-3',
    title: 'Community street festival',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gallery-4',
    title: 'Emergency services training day',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  }
];

const initialApplications = [
  {
    id: 'app-1',
    role: 'whitelist',
    characterName: 'Nova Ridge',
    discord: 'NovaRidge#2244',
    experience: 'Serious RP for 3 years, civilian and EMS lines.',
    availability: 'EU evenings',
    motivation: 'Looking to build business RP and coordinate community events.',
    status: 'pending',
    submittedAt: '2024-06-25T18:30:00Z'
  },
  {
    id: 'app-2',
    role: 'police',
    characterName: 'Jordan Voss',
    discord: 'Voss#1881',
    experience: 'Former Sgt. in DOJRP, familiar with penal code and report writing.',
    availability: 'US afternoons & weekends',
    motivation: 'Excited to mentor cadets and help stand up detective bureau.',
    status: 'pending',
    submittedAt: '2024-06-22T02:00:00Z'
  },
  {
    id: 'app-3',
    role: 'ems',
    characterName: 'Skyler Dune',
    discord: 'SkyDune#1020',
    experience: 'Registered EMT, played EMS on multiple FiveM servers.',
    availability: 'US late nights',
    motivation: 'Wants to expand trauma scenarios and create medical storylines.',
    status: 'approved',
    submittedAt: '2024-06-10T20:10:00Z'
  }
];

const initialSupportTickets = [
  {
    id: 'ticket-1',
    subject: 'Whitelist interview scheduling',
    user: 'Lyric',
    channel: 'Discord',
    status: 'open',
    createdAt: '2024-06-26T14:45:00Z'
  },
  {
    id: 'ticket-2',
    subject: 'Refund request - vehicle duplication',
    user: 'Catalina',
    channel: 'Web',
    status: 'pending',
    createdAt: '2024-06-24T19:10:00Z'
  },
  {
    id: 'ticket-3',
    subject: 'Gang strike appeal',
    user: 'Trace',
    channel: 'Discord',
    status: 'resolved',
    createdAt: '2024-06-15T23:00:00Z'
  }
];

const initialComments = [
  {
    id: 'comment-1',
    user: 'Trace',
    message: 'Huge props to the EMS team, training day was incredible.',
    status: 'published',
    submittedAt: '2024-06-18T12:15:00Z'
  },
  {
    id: 'comment-2',
    user: 'Aria',
    message: 'Please review the tuner shop exploit, cars are disappearing.',
    status: 'flagged',
    submittedAt: '2024-06-20T21:45:00Z'
  }
];

const joinSteps = [
  'Join our Discord and link your Steam account in #server-identity.',
  'Read the community handbook and watch the onboarding video.',
  'Submit the appropriate application form below and schedule your interview.',
  'Install FiveM, add the Apex RP server to your favourites, and prepare your character dossier.'
];

const DEFAULT_QUEUE_STATS = {
  activeCount: 0,
  processedCount: 0,
  averageWait: 0,
  longestWait: 0,
  priorityBreakdown: {},
  lastServed: null
};

const PRIORITY_LABELS = {
  staff: 'Staff',
  supporter: 'Supporter',
  standard: 'Standard',
  guest: 'Guest'
};

function toSafeDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normaliseQueueSnapshot(snapshot) {
  if (!snapshot) {
    return {
      active: [],
      stats: { ...DEFAULT_QUEUE_STATS },
      history: [],
      updatedAt: new Date()
    };
  }

  const active = Array.isArray(snapshot.active)
    ? snapshot.active.map((entry, index) => ({
        ...entry,
        position: entry.position ?? index + 1,
        joinedAt: toSafeDate(entry.joinedAt) ?? new Date(),
        waitedMinutes: typeof entry.waitedMinutes === 'number' ? entry.waitedMinutes : 0,
        etaMinutes: typeof entry.etaMinutes === 'number' ? entry.etaMinutes : 0
      }))
    : [];

  const history = Array.isArray(snapshot.history)
    ? snapshot.history.map((entry) => ({
        ...entry,
        joinedAt: toSafeDate(entry.joinedAt),
        leftAt: toSafeDate(entry.leftAt)
      }))
    : [];

  const lastServed = snapshot.stats?.lastServed
    ? {
        ...snapshot.stats.lastServed,
        joinedAt: toSafeDate(snapshot.stats.lastServed.joinedAt),
        leftAt: toSafeDate(snapshot.stats.lastServed.leftAt)
      }
    : null;

  return {
    active,
    stats: {
      ...DEFAULT_QUEUE_STATS,
      ...snapshot.stats,
      priorityBreakdown: {
        ...DEFAULT_QUEUE_STATS.priorityBreakdown,
        ...(snapshot.stats?.priorityBreakdown ?? {})
      },
      lastServed
    },
    history,
    updatedAt: toSafeDate(snapshot.updatedAt) ?? new Date()
  };
}

function formatMinutes(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return 'Less than a minute';
  }
  if (minutes === 1) {
    return '1 minute';
  }
  return `${minutes} minutes`;
}

function getPriorityLabel(priority) {
  if (!priority) return 'Standard';
  return PRIORITY_LABELS[priority] ?? `${priority.slice(0, 1).toUpperCase()}${priority.slice(1)}`;
}

function queuePillClass(priority, isActive = false) {
  const classes = ['queue-pill'];
  if (priority && PRIORITY_LABELS[priority]) {
    classes.push(`queue-pill--${priority}`);
  }
  if (isActive) {
    classes.push('queue-pill--active');
  }
  return classes.join(' ');
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function statusClass(status) {
  switch (status) {
    case 'approved':
    case 'resolved':
      return 'status-pill status-pill--approved';
    case 'denied':
      return 'status-pill status-pill--denied';
    case 'pending':
      return 'status-pill status-pill--pending';
    case 'open':
      return 'status-pill status-pill--open';
    default:
      return 'status-pill';
  }
}

export default function ClientApp({ queueSnapshot }) {
  const [queueState, setQueueState] = useState(() => normaliseQueueSnapshot(queueSnapshot));
  const [queueForm, setQueueForm] = useState({
    playerName: '',
    steamId: '',
    role: 'Civilian',
    priority: 'standard',
    notes: ''
  });
  const [queueSubmitting, setQueueSubmitting] = useState(false);
  const [queueJoinStatus, setQueueJoinStatus] = useState({ type: null, message: '' });
  const [queueSyncError, setQueueSyncError] = useState('');
  const [trackedEntryId, setTrackedEntryId] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem('apexQueueEntryId');
    } catch (error) {
      return null;
    }
  });

  const [banner, setBanner] = useState(initialBanner);
  const [news, setNews] = useState(initialNews);
  const [rules, setRules] = useState(initialRules);
  const [gallery, setGallery] = useState(initialGallery);
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplicationRole, setSelectedApplicationRole] = useState('all');
  const [storeItems, setStoreItems] = useState(() => STOREFRONT_ITEMS.map((item) => ({ ...item })));
  const [supportTickets, setSupportTickets] = useState(initialSupportTickets);
  const [comments, setComments] = useState(initialComments);
  const [adminUser, setAdminUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [discordSettings, setDiscordSettings] = useState({
    guildId: '112233445566778899',
    channelId: '998877665544332211'
  });
  const [applicationForm, setApplicationForm] = useState({
    role: 'whitelist',
    characterName: '',
    discord: '',
    experience: '',
    availability: '',
    motivation: ''
  });
  const [applicationFeedback, setApplicationFeedback] = useState('');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    contact: '',
    channel: 'Discord',
    message: ''
  });
  const [supportConfirmation, setSupportConfirmation] = useState('');
  const [purchaseState, setPurchaseState] = useState({});
  const [newNews, setNewNews] = useState({ title: '', excerpt: '', body: '' });
  const [newGallery, setNewGallery] = useState({ title: '', url: '', type: 'image' });
  const [serverStatus, setServerStatus] = useState({
    state: 'Online',
    playersOnline: 182,
    maxPlayers: 350,
    queueLength: queueState.active.length,
    uptime: '18h 42m',
    lastRestart: 'Today 09:00 UTC',
    address: 'fivem://apexroleplay'
  });

  const newsIdRef = useRef(initialNews.length + 1);
  const applicationIdRef = useRef(initialApplications.length + 1);
  const galleryIdRef = useRef(initialGallery.length + 1);
  const ticketIdRef = useRef(initialSupportTickets.length + 1);
  const hasLaunchedRef = useRef(false);

  const queueStats = queueState.stats ?? DEFAULT_QUEUE_STATS;
  const queueBreakdown = queueStats.priorityBreakdown ?? {};
  const priorityPackages = useMemo(
    () =>
      storeItems.filter((item) => {
        if (!item.active || item.platform !== 'Tebex') return false;
        const name = item.name?.toLowerCase?.() ?? '';
        const category = item.category?.toLowerCase?.() ?? '';
        return category.includes('support') || category.includes('priority') || name.includes('priority');
      }),
    [storeItems]
  );

  const myQueueEntry = useMemo(() => {
    if (!trackedEntryId) return null;
    const activeMatch = queueState.active.find((entry) => entry.id === trackedEntryId);
    if (activeMatch) {
      return { ...activeMatch, state: 'active' };
    }
    const historyMatch = queueState.history.find((entry) => entry.id === trackedEntryId);
    if (historyMatch) {
      return { ...historyMatch, state: historyMatch.status ?? 'history' };
    }
    return null;
  }, [queueState.active, queueState.history, trackedEntryId]);

  const queueActivePreview = useMemo(() => queueState.active.slice(0, 12), [queueState.active]);
  const queueUpdatedAt = queueState.updatedAt;

  const fetchQueueSnapshot = useCallback(async () => {
    const response = await fetch('/api/queue', { cache: 'no-store' });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data) {
      throw new Error(data?.error || 'Unable to refresh queue.');
    }
    return normaliseQueueSnapshot(data);
  }, []);

  const handleQueueRefresh = useCallback(async () => {
    try {
      const snapshot = await fetchQueueSnapshot();
      setQueueState(snapshot);
      setQueueSyncError('');
    } catch (error) {
      setQueueSyncError(error.message || 'Unable to refresh queue.');
    }
  }, [fetchQueueSnapshot]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const snapshot = await fetchQueueSnapshot();
        if (ignore) return;
        setQueueState(snapshot);
        setQueueSyncError('');
      } catch (error) {
        if (!ignore) {
          setQueueSyncError(error.message || 'Unable to refresh queue.');
        }
      }
    };

    const interval = setInterval(load, 5000);
    load();

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [fetchQueueSnapshot]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (trackedEntryId) {
        window.localStorage.setItem('apexQueueEntryId', trackedEntryId);
      } else {
        window.localStorage.removeItem('apexQueueEntryId');
      }
    } catch (error) {
      // ignore storage issues
    }
  }, [trackedEntryId]);

  useEffect(() => {
    setServerStatus((prev) => {
      if (prev.queueLength === queueState.active.length) {
        return prev;
      }
      return { ...prev, queueLength: queueState.active.length };
    });
  }, [queueState.active.length]);

  useEffect(() => {
    if (!myQueueEntry || typeof window === 'undefined') {
      return;
    }

    if (myQueueEntry.state === 'active') {
      if (myQueueEntry.position === 1 && !hasLaunchedRef.current) {
        const launchUrl = serverStatus.address || 'fivem://connect/apexroleplay';
        hasLaunchedRef.current = true;
        try {
          window.open(launchUrl, '_self');
        } catch (error) {
          window.location.href = launchUrl;
        }
        setQueueJoinStatus({
          type: 'success',
          message:
            'It\'s your turn to connect! We\'ve attempted to launch FiveM automatically. Use the join button below if it did not open.'
        });
      } else if (myQueueEntry.position > 1) {
        hasLaunchedRef.current = false;
      }
    } else {
      hasLaunchedRef.current = false;
    }
  }, [myQueueEntry, serverStatus.address]);

  useEffect(() => {
    hasLaunchedRef.current = false;
  }, [trackedEntryId]);

  const clearTrackedEntry = () => {
    setTrackedEntryId(null);
    setQueueJoinStatus({ type: null, message: '' });
  };

  const handleQueueSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = queueForm.playerName.trim();
    if (!trimmedName) {
      setQueueJoinStatus({
        type: 'error',
        message: 'Add your in-city name so staff can identify you in the queue.'
      });
      return;
    }

    setQueueSubmitting(true);
    setQueueJoinStatus({ type: null, message: '' });

    try {
      const payload = {
        playerName: trimmedName,
        priority: queueForm.priority,
        role: queueForm.role.trim() || undefined,
        steamId: queueForm.steamId.trim() || undefined,
        notes: queueForm.notes.trim() || undefined
      };

      const response = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.entry) {
        throw new Error(data?.error || 'Unable to join queue.');
      }

      const nextSnapshot = data.snapshot
        ? normaliseQueueSnapshot(data.snapshot)
        : await fetchQueueSnapshot();

      setQueueState(nextSnapshot);
      setTrackedEntryId(data.entry.id);
      setQueueJoinStatus({
        type: 'success',
        message: `You joined the queue as ${data.entry.playerName}. Keep this page open for automatic updates.`
      });
      setQueueSyncError('');
      setQueueForm((prev) => ({
        ...prev,
        playerName: '',
        steamId: '',
        notes: ''
      }));
    } catch (error) {
      setQueueJoinStatus({
        type: 'error',
        message: error.message || 'Unable to join queue.'
      });
    } finally {
      setQueueSubmitting(false);
    }
  };

  const applicationStats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((app) => app.status === 'pending').length;
    const approved = applications.filter((app) => app.status === 'approved').length;
    const denied = applications.filter((app) => app.status === 'denied').length;
    return { total, pending, approved, denied };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    if (selectedApplicationRole === 'all') return applications;
    return applications.filter((app) => app.role === selectedApplicationRole);
  }, [applications, selectedApplicationRole]);

  const ticketStats = useMemo(() => {
    const open = supportTickets.filter((ticket) => ticket.status === 'open').length;
    const pending = supportTickets.filter((ticket) => ticket.status === 'pending').length;
    const resolved = supportTickets.filter((ticket) => ticket.status === 'resolved').length;
    return { open, pending, resolved, total: supportTickets.length };
  }, [supportTickets]);

  const handleTebexPurchase = async (event, item) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') || '').trim();
    const emailValue = formData.get('email');
    const email = emailValue ? String(emailValue).trim() : '';
    const quantityValue = formData.get('quantity');
    const quantity = quantityValue ? Number(quantityValue) : 1;

    if (!username) {
      setPurchaseState((prev) => ({
        ...prev,
        [item.id]: { status: 'error', message: 'Character name is required to start a checkout.' }
      }));
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setPurchaseState((prev) => ({
        ...prev,
        [item.id]: {
          status: 'error',
          message: 'Quantity must be a whole number greater than zero.'
        }
      }));
      return;
    }

    setPurchaseState((prev) => ({ ...prev, [item.id]: { status: 'loading' } }));

    try {
      const response = await fetch('/api/tebex/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: item.packageId,
          username,
          email: email || undefined,
          quantity,
          returnUrl: typeof window !== 'undefined' ? window.location.origin : undefined
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        const message = data?.error || 'Unable to create checkout session.';
        throw new Error(message);
      }

      const redirectUrl = data.checkout?.redirectUrl || '';

      setPurchaseState((prev) => ({
        ...prev,
        [item.id]: {
          status: 'success',
          message: 'Checkout created. Complete your purchase in the new tab.',
          redirectUrl
        }
      }));

      event.currentTarget.reset();

      if (redirectUrl && typeof window !== 'undefined') {
        window.open(redirectUrl, '_blank', 'noopener');
      }
    } catch (error) {
      setPurchaseState((prev) => ({
        ...prev,
        [item.id]: {
          status: 'error',
          message: error.message || 'Unable to create checkout session.'
        }
      }));
    }
  };
  const handleApplicationSubmit = (event) => {
    event.preventDefault();
    const trimmedName = applicationForm.characterName.trim();
    const trimmedDiscord = applicationForm.discord.trim();
    if (!trimmedName || !trimmedDiscord) {
      setApplicationFeedback('Please provide both a character name and Discord handle.');
      return;
    }

    const newEntry = {
      id: `app-${applicationIdRef.current++}`,
      role: applicationForm.role,
      characterName: trimmedName,
      discord: trimmedDiscord,
      experience: applicationForm.experience.trim(),
      availability: applicationForm.availability.trim(),
      motivation: applicationForm.motivation.trim(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setApplications((prev) => [newEntry, ...prev]);
    setApplicationFeedback(
      'Application received. A staff member will reach out on Discord once it has been reviewed.'
    );
    setApplicationForm({
      role: 'whitelist',
      characterName: '',
      discord: '',
      experience: '',
      availability: '',
      motivation: ''
    });
  };

  const handleSupportSubmit = (event) => {
    event.preventDefault();
    if (!supportForm.subject.trim()) {
      setSupportConfirmation('Please add a subject so the team knows how to help.');
      return;
    }

    const newTicket = {
      id: `ticket-${ticketIdRef.current++}`,
      subject: supportForm.subject.trim(),
      user: supportForm.contact.trim() || 'Anonymous',
      channel: supportForm.channel,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    setSupportTickets((prev) => [newTicket, ...prev]);
    setSupportConfirmation('Support ticket created. Track updates in your Discord DMs or email.');
    setSupportForm({ subject: '', contact: '', channel: 'Discord', message: '' });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      loginForm.username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      setAdminUser({ username: loginForm.username.trim() });
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Contact lead staff if you need access.');
    }
  };

  const handleLogout = () => {
    setAdminUser(null);
    setLoginForm({ username: '', password: '' });
  };

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  const updateTicketStatus = (id, status) => {
    setSupportTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
    );
  };

  const addNewsPost = (event) => {
    event.preventDefault();
    if (!newNews.title.trim()) {
      return;
    }

    const post = {
      id: `news-${newsIdRef.current++}`,
      title: newNews.title.trim(),
      excerpt: newNews.excerpt.trim() || newNews.title.trim(),
      body: newNews.body.trim(),
      publishedAt: new Date().toISOString(),
      author: adminUser?.username ? `${adminUser.username} (Staff)` : 'Staff Team'
    };

    setNews((prev) => [post, ...prev]);
    setNewNews({ title: '', excerpt: '', body: '' });
  };

  const updateNewsField = (id, field, value) => {
    setNews((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };
  const updateRuleField = (group, id, field, value) => {
    setRules((prev) => ({
      ...prev,
      [group]: prev[group].map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const addRule = (group) => {
    const id = `${group}-${Date.now()}`;
    setRules((prev) => ({
      ...prev,
      [group]: [
        ...prev[group],
        {
          id,
          title: 'New rule',
          description: 'Describe the guideline here.'
        }
      ]
    }));
  };

  const addGalleryItem = (event) => {
    event.preventDefault();
    if (!newGallery.url.trim()) {
      return;
    }

    const entry = {
      id: `gallery-${galleryIdRef.current++}`,
      title: newGallery.title.trim() || 'New media asset',
      type: newGallery.type,
      url: newGallery.url.trim()
    };

    setGallery((prev) => [entry, ...prev]);
    setNewGallery({ title: '', url: '', type: 'image' });
  };

  const moderateComment = (id, status) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === id ? { ...comment, status } : comment))
    );
  };

  const toggleStoreItem = (id) => {
    setStoreItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const updateBanner = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBanner({
      title: formData.get('title') || banner.title,
      tagline: formData.get('tagline') || banner.tagline,
      callout: formData.get('callout') || banner.callout,
      bannerUrl: formData.get('bannerUrl') || banner.bannerUrl
    });
  };

  const updateServerStatus = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setServerStatus({
      state: formData.get('state') || serverStatus.state,
      playersOnline: Number(formData.get('playersOnline')) || serverStatus.playersOnline,
      maxPlayers: Number(formData.get('maxPlayers')) || serverStatus.maxPlayers,
      queueLength: Number(formData.get('queueLength')) || serverStatus.queueLength,
      uptime: formData.get('uptime') || serverStatus.uptime,
      lastRestart: formData.get('lastRestart') || serverStatus.lastRestart,
      address: formData.get('address') || serverStatus.address
    });
  };

  const updateDiscordSettings = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setDiscordSettings({
      guildId: formData.get('guildId') || discordSettings.guildId,
      channelId: formData.get('channelId') || discordSettings.channelId
    });
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="page">
        <nav className="nav">
          <div className="nav__inner">
            <a className="brand" href="#home">
              <span className="brand__logo">AR</span>
              <span>Apex RP</span>
            </a>
            <div className="nav__links">
              <a className="nav__link" href="#home">
                Home
              </a>
              <a className="nav__link" href="#rules">
                Rules
              </a>
              <a className="nav__link" href="#join">
                Join
              </a>
              <a className="nav__link" href="#apply">
                Apply
              </a>
              <a className="nav__link" href="#donate">
                Donate
              </a>
              <a className="nav__link" href="#discord">
                Discord
              </a>
              <a className="nav__link" href="#admin">
                Admin
              </a>
            </div>
          </div>
        </nav>

        <main>
          <section id="home" className="hero">
            <div className="hero__content">
              <span className="hero__badge">Apex Roleplay Network</span>
              <h1 className="hero__title">{banner.title}</h1>
              <p className="hero__subtitle">{banner.tagline}</p>
              <p className="hero__subtitle">{banner.callout}</p>
              <div className="quick-actions">
                <a className="button button--primary" href="fivem://connect/apexroleplay">
                  Join the server
                </a>
                <a className="button" href="#discord">
                  Discord
                </a>
                <a className="button" href="#rules">
                  Rules
                </a>
                <a className="button" href="#apply">
                  Applications
                </a>
                <a className="button button--ghost" href="#donate">
                  Donate
                </a>
              </div>
            </div>

            <div className="status-grid">
              <article className="status-card">
                <h3>Server status</h3>
                <strong>{serverStatus.state}</strong>
                <span className="status-card__meta">
                  {serverStatus.playersOnline}/{serverStatus.maxPlayers} online · Queue {serverStatus.queueLength}
                </span>
                <span className="status-card__meta">Uptime {serverStatus.uptime}</span>
                <span className="status-card__meta">Last restart {serverStatus.lastRestart}</span>
                <span className="status-card__meta">Connect: {serverStatus.address}</span>
              </article>

              <article className="status-card">
                <h3>Queue metrics</h3>
                <strong>{queueStats.activeCount} players waiting</strong>
                <span className="status-card__meta">Avg wait {formatMinutes(queueStats.averageWait)} · Served {queueStats.processedCount}</span>
                <span className="status-card__meta">
                  Priority mix: staff {queueBreakdown.staff ?? 0} · supporter {queueBreakdown.supporter ?? 0} · standard {queueBreakdown.standard ?? 0} · guest {queueBreakdown.guest ?? 0}
                </span>
              </article>

              <article className="guide">
                <h3>How to join Apex RP</h3>
                <ol>
                  {joinSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </article>
            </div>
          </section>
          <section id="queue">
            <div className="section-heading">
              <h2>Live queue</h2>
              <p>Monitor your place in line, city population, and priority options in real time.</p>
            </div>
            <div className="queue-grid">
              <article className="queue-card">
                <div className="queue-card__header">
                  <h3>Server pulse</h3>
                  <span className="queue-card__meta">
                    Updated {queueUpdatedAt ? queueUpdatedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'just now'}
                  </span>
                </div>
                <div className="queue-alert">
                  {serverStatus.playersOnline}/{serverStatus.maxPlayers} in city · {queueStats.activeCount} waiting · Served {queueStats.processedCount}
                </div>
                <div className="queue-card__meta">
                  Average wait {formatMinutes(queueStats.averageWait)} · Longest wait {formatMinutes(queueStats.longestWait)}
                </div>
                <div className="queue-card__meta">
                  Priority mix: staff {queueBreakdown.staff ?? 0} · supporter {queueBreakdown.supporter ?? 0} · standard {queueBreakdown.standard ?? 0} · guest {queueBreakdown.guest ?? 0}
                </div>
                {queueSyncError ? (
                  <div className="queue-alert queue-alert--warning">{queueSyncError}</div>
                ) : (
                  <div className="queue-card__meta">Auto-refreshes every 5 seconds.</div>
                )}
                <div className="queue-actions">
                  <button type="button" className="button" onClick={handleQueueRefresh} disabled={queueSubmitting}>
                    Refresh now
                  </button>
                  <a className="button button--ghost" href="#donate">
                    View priority packages
                  </a>
                </div>
              </article>

              <article className="queue-card">
                <h3>Your place</h3>
                {trackedEntryId ? (
                  <>
                    {myQueueEntry && myQueueEntry.state === 'active' ? (
                      <>
                        <div className="queue-alert">
                          You are #{myQueueEntry.position} in queue — {formatMinutes(myQueueEntry.etaMinutes)} remaining.
                        </div>
                        <p className="queue-card__meta">
                          Joined {myQueueEntry.joinedAt ? myQueueEntry.joinedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'recently'} · Priority {getPriorityLabel(myQueueEntry.priority)}
                        </p>
                        <div className="queue-actions">
                          <a className="button button--primary" href={serverStatus.address || 'fivem://connect/apexroleplay'}>
                            Launch FiveM
                          </a>
                          <button type="button" className="button button--ghost" onClick={clearTrackedEntry}>
                            Stop tracking
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`queue-alert${myQueueEntry?.status === 'served' ? '' : ' queue-alert--warning'}`}>
                          {myQueueEntry?.status === 'served'
                            ? 'You have been cleared to join. Launch FiveM when ready.'
                            : 'We could not find your queue entry. You may have been removed or already connected.'}
                        </div>
                        <div className="queue-actions">
                          <a className="button button--primary" href={serverStatus.address || 'fivem://connect/apexroleplay'}>
                            Launch FiveM
                          </a>
                          <button type="button" className="button button--ghost" onClick={clearTrackedEntry}>
                            Join again
                          </button>
                        </div>
                      </>
                    )}
                    <p className="queue-card__meta">Tracking ID: {trackedEntryId}</p>
                  </>
                ) : (
                  <>
                    <p className="queue-card__meta">
                      Reserve your slot below. Keep this tab open and we will launch FiveM automatically once it is your turn.
                    </p>
                    <form className="queue-form" onSubmit={handleQueueSubmit}>
                      <label>
                        Character / IGN
                        <input
                          value={queueForm.playerName}
                          onChange={(event) => setQueueForm((prev) => ({ ...prev, playerName: event.target.value }))}
                          placeholder="Nova Ridge"
                          required
                        />
                      </label>
                      <label>
                        Steam hex (optional)
                        <input
                          value={queueForm.steamId}
                          onChange={(event) => setQueueForm((prev) => ({ ...prev, steamId: event.target.value }))}
                          placeholder="steam:11000010..."
                        />
                      </label>
                      <label>
                        Role (optional)
                        <input
                          value={queueForm.role}
                          onChange={(event) => setQueueForm((prev) => ({ ...prev, role: event.target.value }))}
                          placeholder="Civilian"
                        />
                      </label>
                      <label>
                        Priority tier
                        <select
                          value={queueForm.priority}
                          onChange={(event) => setQueueForm((prev) => ({ ...prev, priority: event.target.value }))}
                        >
                          <option value="staff">Staff</option>
                          <option value="supporter">Supporter</option>
                          <option value="standard">Standard</option>
                          <option value="guest">Guest</option>
                        </select>
                      </label>
                      <label>
                        Notes for staff (optional)
                        <textarea
                          value={queueForm.notes}
                          onChange={(event) => setQueueForm((prev) => ({ ...prev, notes: event.target.value }))}
                          placeholder="Duty status, planned event, etc."
                        />
                      </label>
                      <button className="button button--primary" type="submit" disabled={queueSubmitting}>
                        {queueSubmitting ? 'Joining queue…' : 'Join the queue'}
                      </button>
                    </form>
                  </>
                )}
                {queueJoinStatus.message && (
                  <div className={`queue-alert${queueJoinStatus.type === 'error' ? ' queue-alert--warning' : ''}`}>
                    {queueJoinStatus.message}
                  </div>
                )}
                {priorityPackages.length > 0 && (
                  <div className="queue-card__meta">
                    Boost your access with {priorityPackages[0].name}
                    {priorityPackages.length > 1 ? ' and more priority options' : ''} in the donations section.
                  </div>
                )}
              </article>

              <article className="queue-card">
                <h3>Queue overview</h3>
                {queueActivePreview.length ? (
                  <div className="queue-table-wrapper">
                    <table className="queue-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Player</th>
                          <th>Priority</th>
                          <th>Wait</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queueActivePreview.map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.position}</td>
                            <td>
                              <strong>{entry.playerName}</strong>
                              <div className="queue-card__meta">{entry.role}</div>
                            </td>
                            <td>
                              <span className={queuePillClass(entry.priority, trackedEntryId === entry.id)}>
                                {getPriorityLabel(entry.priority)}
                              </span>
                            </td>
                            <td>
                              {formatMinutes(entry.waitedMinutes)}
                              <div className="queue-card__meta">ETA {formatMinutes(entry.etaMinutes)}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="queue-empty">Queue is currently clear. You can join instantly.</p>
                )}
                {queueStats.lastServed && (
                  <div className="queue-history">
                    Last served: {queueStats.lastServed.playerName}
                    {queueStats.lastServed.leftAt
                      ? ` at ${queueStats.lastServed.leftAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                      : ''}
                    {queueStats.lastServed.priority ? ` · ${getPriorityLabel(queueStats.lastServed.priority)} priority` : ''}
                  </div>
                )}
              </article>
            </div>
          </section>
          <section id="rules">
            <div className="section-heading">
              <h2>Rules &amp; Handbook</h2>
              <p>Keep the city professional, immersive, and respectful. These guidelines are non-negotiable.</p>
            </div>
            <div className="rules-grid">
              <div className="rules-group">
                <h3>Roleplay Standards</h3>
                <ul className="rules-list">
                  {rules.roleplay.map((rule) => (
                    <li key={rule.id}>
                      <strong>{rule.title}</strong>
                      <span>{rule.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rules-group">
                <h3>Community Conduct</h3>
                <ul className="rules-list">
                  {rules.community.map((rule) => (
                    <li key={rule.id}>
                      <strong>{rule.title}</strong>
                      <span>{rule.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="news">
            <div className="section-heading">
              <h2>Announcements &amp; Changelogs</h2>
              <p>Stay current with new scripts, rule updates, and city events.</p>
            </div>
            <div className="news-grid">
              {news.map((item) => (
                <article key={item.id} className="news-item">
                  <time>{formatDate(item.publishedAt)}</time>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  {item.body && <p>{item.body}</p>}
                  <small>Posted by {item.author}</small>
                </article>
              ))}
            </div>
          </section>

          <section id="showcase">
            <div className="section-heading">
              <h2>City Life &amp; Career Paths</h2>
              <p>Discover the jobs and activities that define Apex RP. Every path has mentors ready to help.</p>
            </div>
            <div className="jobs-grid">
              {initialJobs.map((job) => (
                <article key={job.id} className="job-card">
                  <span>{job.icon}</span>
                  <h3>{job.name}</h3>
                  <p>{job.description}</p>
                  <small>{job.focus}</small>
                </article>
              ))}
            </div>
          </section>

          <section id="gallery">
            <div className="section-heading">
              <h2>Media Gallery</h2>
              <p>Highlights from patrols, community events, and cinematic trailers.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item) => (
                <div key={item.id} className="gallery-item">
                  {item.type === 'video' ? (
                    <iframe
                      title={item.title}
                      src={item.url}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img src={item.url} alt={item.title} />
                  )}
                  <span className="gallery-item__caption">{item.title}</span>
                </div>
              ))}
            </div>
          </section>
          <section id="join">
            <div className="section-heading">
              <h2>Ready to Join?</h2>
              <p>Follow the onboarding checklist and submit your whitelist dossier.</p>
            </div>
            <div className="card-grid">
              <article className="card">
                <h3>Server quick facts</h3>
                <ul>
                  <li>Voice: In-game + Discord radio relays</li>
                  <li>Framework: Custom QBCore blend</li>
                  <li>Peak population: {serverStatus.maxPlayers}</li>
                  <li>Region: EU/NA mixed scheduling</li>
                  <li>Interviews hosted weekly</li>
                </ul>
              </article>
              <article className="card">
                <h3>Whitelist expectations</h3>
                <p>
                  We seek storytellers who communicate, respect boundaries, and collaborate. Provide detailed answers in your
                  application to help staff learn your style and past experience.
                </p>
              </article>
              <article className="card">
                <h3>Need assistance?</h3>
                <p>
                  Hop into #support-tickets or complete the support form below. Staff handle onboarding daily with regionally
                  staggered coverage.
                </p>
              </article>
            </div>
          </section>

          <section id="apply">
            <div className="section-heading">
              <h2>Applications</h2>
              <p>Select the path that suits you. All submissions appear instantly in the staff portal for review.</p>
            </div>

            <div className="application-roles">
              <article className="card">
                <h3>Whitelist</h3>
                <p>Baseline access to the city. Required before any other applications.</p>
              </article>
              <article className="card">
                <h3>Police</h3>
                <p>Structured academy, SOP exams, and mentorship with command staff.</p>
              </article>
              <article className="card">
                <h3>EMS</h3>
                <p>Comprehensive medical training, hospital RP, and rescue operations.</p>
              </article>
              <article className="card">
                <h3>Mechanic</h3>
                <p>Manage shop inventory, tuning upgrades, and roadside assistance.</p>
              </article>
              <article className="card">
                <h3>Staff</h3>
                <p>Moderation, event curation, and application reviews for trusted members.</p>
              </article>
            </div>

            <article className="form-card">
              <h3>Submit your application</h3>
              <form onSubmit={handleApplicationSubmit}>
                <label>
                  Role applying for
                  <select
                    value={applicationForm.role}
                    onChange={(event) => setApplicationForm((prev) => ({ ...prev, role: event.target.value }))}
                    required
                  >
                    <option value="whitelist">Whitelist</option>
                    <option value="police">Police</option>
                    <option value="ems">EMS</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="gang">Gang / Org</option>
                    <option value="staff">Staff</option>
                  </select>
                </label>
                <label>
                  Character name / callsign
                  <input
                    value={applicationForm.characterName}
                    onChange={(event) =>
                      setApplicationForm((prev) => ({ ...prev, characterName: event.target.value }))
                    }
                    placeholder="Jordan Voss"
                    required
                  />
                </label>
                <label>
                  Discord handle
                  <input
                    value={applicationForm.discord}
                    onChange={(event) => setApplicationForm((prev) => ({ ...prev, discord: event.target.value }))}
                    placeholder="username#0001"
                    required
                  />
                </label>
                <label>
                  Experience
                  <textarea
                    value={applicationForm.experience}
                    onChange={(event) => setApplicationForm((prev) => ({ ...prev, experience: event.target.value }))}
                    placeholder="Previous RP communities, certifications, or relevant background"
                  />
                </label>
                <label>
                  Availability
                  <input
                    value={applicationForm.availability}
                    onChange={(event) => setApplicationForm((prev) => ({ ...prev, availability: event.target.value }))}
                    placeholder="Weeknights, EU evenings, etc."
                  />
                </label>
                <label>
                  Why should we pick you?
                  <textarea
                    value={applicationForm.motivation}
                    onChange={(event) => setApplicationForm((prev) => ({ ...prev, motivation: event.target.value }))}
                    placeholder="Share your plans for Apex RP"
                  />
                </label>
                <button className="button button--primary" type="submit">
                  Submit application
                </button>
              </form>
              {applicationFeedback && <div className="feedback">{applicationFeedback}</div>}
            </article>
          </section>
          <section id="donate">
            <div className="section-heading">
              <h2>Donations &amp; Store</h2>
              <p>Support Apex RP through Tebex or PayPal. Every contribution funds servers, scripts, and events.</p>
            </div>
            <div className="card-grid">
              {storeItems.map((item) => (
                <article key={item.id} className="card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{item.price}</strong>
                  {item.packageId && <span>Package #{item.packageId}</span>}
                  <span>Platform: {item.platform}</span>
                  <span>Status: {item.active ? 'Available' : 'Hidden'}</span>
                  {item.platform === 'Tebex' && item.active ? (
                    <>
                      <form className="tebex-form" onSubmit={(event) => handleTebexPurchase(event, item)}>
                        <label>
                          Character / IGN
                          <input name="username" placeholder="Nova Ridge" required />
                        </label>
                        <label>
                          Contact email (optional)
                          <input name="email" type="email" placeholder="you@example.com" />
                        </label>
                        <label>
                          Quantity
                          <input name="quantity" type="number" min="1" max="10" defaultValue="1" />
                        </label>
                        <button
                          className="button button--primary"
                          type="submit"
                          disabled={purchaseState[item.id]?.status === 'loading'}
                        >
                          {purchaseState[item.id]?.status === 'loading' ? 'Creating checkout…' : 'Purchase via Tebex'}
                        </button>
                      </form>
                      {purchaseState[item.id]?.status === 'success' && (
                        <div className="purchase-feedback purchase-feedback--success">
                          Checkout created.{' '}
                          {purchaseState[item.id]?.redirectUrl ? (
                            <a href={purchaseState[item.id].redirectUrl} target="_blank" rel="noreferrer">
                              Complete your purchase
                            </a>
                          ) : (
                            'Complete your purchase in the Tebex tab.'
                          )}
                        </div>
                      )}
                      {purchaseState[item.id]?.status === 'error' && (
                        <div className="purchase-feedback purchase-feedback--error">
                          {purchaseState[item.id]?.message}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="admin-actions">
                      <a
                        href={item.donateUrl || 'https://store.apexrp.example'}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open store
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="discord">
            <div className="section-heading">
              <h2>Discord &amp; Community</h2>
              <p>Live widget updates automatically once your account is linked.</p>
            </div>
            <article className="discord-card">
              <p>Join over 8,000 members for alerts, development sneak peeks, and direct staff support.</p>
              <a className="button button--primary" href="https://discord.gg/apexrp" target="_blank" rel="noreferrer">
                Join Discord
              </a>
              <div className="discord-embed">
                <iframe
                  title="Apex RP Discord"
                  src={`https://discord.com/widget?id=${discordSettings.guildId}&theme=dark`}
                  width="100%"
                  height="100%"
                  allowTransparency="true"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            </article>
          </section>
          <section id="support">
            <div className="section-heading">
              <h2>Support &amp; Tickets</h2>
              <p>Need help? Submit a ticket or reach out via Discord for the fastest response.</p>
            </div>
            <div className="support-grid">
              <article className="support-card">
                <h3>Open a ticket</h3>
                <form onSubmit={handleSupportSubmit}>
                  <label>
                    Subject
                    <input
                      value={supportForm.subject}
                      onChange={(event) => setSupportForm((prev) => ({ ...prev, subject: event.target.value }))}
                      placeholder="Describe your issue"
                      required
                    />
                  </label>
                  <label>
                    Preferred contact
                    <input
                      value={supportForm.contact}
                      onChange={(event) => setSupportForm((prev) => ({ ...prev, contact: event.target.value }))}
                      placeholder="Discord tag or email"
                    />
                  </label>
                  <label>
                    Channel
                    <select
                      value={supportForm.channel}
                      onChange={(event) => setSupportForm((prev) => ({ ...prev, channel: event.target.value }))}
                    >
                      <option>Discord</option>
                      <option>Web</option>
                      <option>Email</option>
                    </select>
                  </label>
                  <label>
                    Details
                    <textarea
                      value={supportForm.message}
                      onChange={(event) => setSupportForm((prev) => ({ ...prev, message: event.target.value }))}
                      placeholder="Provide as much context as possible"
                    />
                  </label>
                  <button className="button button--primary" type="submit">
                    Submit ticket
                  </button>
                </form>
                {supportConfirmation && <div className="feedback">{supportConfirmation}</div>}
              </article>
              <article className="support-card">
                <h3>Ticket stats</h3>
                <p>Open: {ticketStats.open}</p>
                <p>Pending: {ticketStats.pending}</p>
                <p>Resolved: {ticketStats.resolved}</p>
                <p>Total: {ticketStats.total}</p>
                <p>Staff monitor tickets 24/7 with global coverage.</p>
              </article>
              <article className="support-card">
                <h3>Contact</h3>
                <p>Email: support@apexrp.example</p>
                <p>Discord: #support-tickets</p>
                <p>In-game: /report command</p>
                <p>Response target: &lt; 6 hours</p>
              </article>
            </div>
          </section>
          <section id="admin" className="admin">
            <div className="section-heading">
              <h2>Admin Portal</h2>
              <p>Secure tools for staff to manage content, applications, and live operations.</p>
            </div>

            {!adminUser ? (
              <div className="admin-login">
                <h3>Staff sign-in</h3>
                <form onSubmit={handleLogin}>
                  <label>
                    Username
                    <input
                      value={loginForm.username}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, username: event.target.value }))}
                      placeholder="command"
                      required
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="••••••••"
                      required
                    />
                  </label>
                  <button className="button button--primary" type="submit">
                    Log in
                  </button>
                </form>
                {loginError && <div className="error">{loginError}</div>}
                <small>Tip: credentials are seeded for demo access — user <code>command</code>, pass <code>apex-admin</code>.</small>
              </div>
            ) : (
              <div className="admin-grid">
                <div className="admin-actions" style={{ justifyContent: 'space-between' }}>
                  <span>Welcome back, {adminUser.username}. Manage the city below.</span>
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
                <div className="admin-grid__two">
                  <article className="card">
                    <h3>Operational overview</h3>
                    <p>Total applications: {applicationStats.total}</p>
                    <p>Pending: {applicationStats.pending}</p>
                    <p>Approved: {applicationStats.approved}</p>
                    <p>Denied: {applicationStats.denied}</p>
                    <p>Tickets open: {ticketStats.open}</p>
                    <p>Comments flagged: {comments.filter((item) => item.status === 'flagged').length}</p>
                  </article>

                  <article className="card">
                    <h3>Server status controls</h3>
                    <form onSubmit={updateServerStatus}>
                      <label>
                        State
                        <input name="state" defaultValue={serverStatus.state} />
                      </label>
                      <label>
                        Players online
                        <input name="playersOnline" type="number" min="0" defaultValue={serverStatus.playersOnline} />
                      </label>
                      <label>
                        Max players
                        <input name="maxPlayers" type="number" min="1" defaultValue={serverStatus.maxPlayers} />
                      </label>
                      <label>
                        Queue length
                        <input name="queueLength" type="number" min="0" defaultValue={serverStatus.queueLength} />
                      </label>
                      <label>
                        Uptime
                        <input name="uptime" defaultValue={serverStatus.uptime} />
                      </label>
                      <label>
                        Last restart
                        <input name="lastRestart" defaultValue={serverStatus.lastRestart} />
                      </label>
                      <label>
                        Connect address
                        <input name="address" defaultValue={serverStatus.address} />
                      </label>
                      <button className="button button--primary" type="submit">
                        Update status
                      </button>
                    </form>
                  </article>
                </div>

                <div className="admin-grid__two">
                  <article className="card">
                    <h3>Homepage banner</h3>
                    <form onSubmit={updateBanner}>
                      <label>
                        Title
                        <input name="title" defaultValue={banner.title} />
                      </label>
                      <label>
                        Tagline
                        <input name="tagline" defaultValue={banner.tagline} />
                      </label>
                      <label>
                        Callout
                        <textarea name="callout" defaultValue={banner.callout} />
                      </label>
                      <label>
                        Banner image URL
                        <input name="bannerUrl" defaultValue={banner.bannerUrl} />
                      </label>
                      <button className="button button--primary" type="submit">
                        Save banner
                      </button>
                    </form>
                  </article>

                  <article className="card">
                    <h3>Discord widget</h3>
                    <form onSubmit={updateDiscordSettings}>
                      <label>
                        Guild ID
                        <input name="guildId" defaultValue={discordSettings.guildId} />
                      </label>
                      <label>
                        Channel ID
                        <input name="channelId" defaultValue={discordSettings.channelId} />
                      </label>
                      <button className="button button--primary" type="submit">
                        Update Discord embed
                      </button>
                    </form>
                    <h4>Store availability</h4>
                    {storeItems.map((item) => (
                      <div key={item.id} className="admin-actions">
                        <span>
                          {item.name} — {item.active ? 'Active' : 'Hidden'}
                        </span>
                        <button type="button" onClick={() => toggleStoreItem(item.id)}>
                          Toggle
                        </button>
                      </div>
                    ))}
                  </article>
                </div>
                <article className="card">
                  <h3>Announcements management</h3>
                  <form onSubmit={addNewsPost}>
                    <label>
                      Title
                      <input
                        value={newNews.title}
                        onChange={(event) => setNewNews((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="Patch 1.8 deployment"
                        required
                      />
                    </label>
                    <label>
                      Summary
                      <input
                        value={newNews.excerpt}
                        onChange={(event) => setNewNews((prev) => ({ ...prev, excerpt: event.target.value }))}
                        placeholder="Key takeaways"
                      />
                    </label>
                    <label>
                      Details
                      <textarea
                        value={newNews.body}
                        onChange={(event) => setNewNews((prev) => ({ ...prev, body: event.target.value }))}
                        placeholder="Full announcement body"
                      />
                    </label>
                    <button className="button button--primary" type="submit">
                      Publish update
                    </button>
                  </form>
                  <div className="news-grid" style={{ marginTop: '1.5rem' }}>
                    {news.map((item) => (
                      <div key={item.id} className="news-item">
                        <label>
                          Headline
                          <input value={item.title} onChange={(event) => updateNewsField(item.id, 'title', event.target.value)} />
                        </label>
                        <label>
                          Summary
                          <input value={item.excerpt} onChange={(event) => updateNewsField(item.id, 'excerpt', event.target.value)} />
                        </label>
                        <label>
                          Body
                          <textarea value={item.body} onChange={(event) => updateNewsField(item.id, 'body', event.target.value)} />
                        </label>
                        <small>Published {formatDate(item.publishedAt)} · {item.author}</small>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="card">
                  <h3>Rules editor</h3>
                  <div className="admin-grid__two">
                    <div className="card" style={{ background: 'rgba(12,16,31,0.6)' }}>
                      <h4>Roleplay standards</h4>
                      {rules.roleplay.map((rule) => (
                        <div key={rule.id} className="admin-actions" style={{ alignItems: 'stretch', flexDirection: 'column' }}>
                          <label>
                            Title
                            <input value={rule.title} onChange={(event) => updateRuleField('roleplay', rule.id, 'title', event.target.value)} />
                          </label>
                          <label>
                            Description
                            <textarea value={rule.description} onChange={(event) => updateRuleField('roleplay', rule.id, 'description', event.target.value)} />
                          </label>
                        </div>
                      ))}
                      <button type="button" className="button button--ghost" onClick={() => addRule('roleplay')}>
                        Add RP rule
                      </button>
                    </div>
                    <div className="card" style={{ background: 'rgba(12,16,31,0.6)' }}>
                      <h4>Community conduct</h4>
                      {rules.community.map((rule) => (
                        <div key={rule.id} className="admin-actions" style={{ alignItems: 'stretch', flexDirection: 'column' }}>
                          <label>
                            Title
                            <input value={rule.title} onChange={(event) => updateRuleField('community', rule.id, 'title', event.target.value)} />
                          </label>
                          <label>
                            Description
                            <textarea value={rule.description} onChange={(event) => updateRuleField('community', rule.id, 'description', event.target.value)} />
                          </label>
                        </div>
                      ))}
                      <button type="button" className="button button--ghost" onClick={() => addRule('community')}>
                        Add community rule
                      </button>
                    </div>
                  </div>
                </article>
                <article className="card">
                  <h3>Gallery assets</h3>
                  <form onSubmit={addGalleryItem}>
                    <label>
                      Title
                      <input
                        value={newGallery.title}
                        onChange={(event) => setNewGallery((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="Community night"
                      />
                    </label>
                    <label>
                      Media URL
                      <input
                        value={newGallery.url}
                        onChange={(event) => setNewGallery((prev) => ({ ...prev, url: event.target.value }))}
                        placeholder="https://..."
                        required
                      />
                    </label>
                    <label>
                      Type
                      <select
                        value={newGallery.type}
                        onChange={(event) => setNewGallery((prev) => ({ ...prev, type: event.target.value }))}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video (YouTube embed URL)</option>
                      </select>
                    </label>
                    <button className="button button--primary" type="submit">
                      Add to gallery
                    </button>
                  </form>
                  <div className="gallery-grid" style={{ marginTop: '1.5rem' }}>
                    {gallery.map((item) => (
                      <div key={item.id} className="gallery-item">
                        <span className="gallery-item__caption">{item.title}</span>
                        <small style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(5,7,15,0.65)', padding: '0.2rem 0.5rem', borderRadius: '0.6rem' }}>{item.type}</small>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="card">
                  <h3>Applications queue</h3>
                  <div className="admin-actions" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <label>
                      Filter by role
                      <select
                        value={selectedApplicationRole}
                        onChange={(event) => setSelectedApplicationRole(event.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="whitelist">Whitelist</option>
                        <option value="police">Police</option>
                        <option value="ems">EMS</option>
                        <option value="mechanic">Mechanic</option>
                        <option value="gang">Gang</option>
                        <option value="staff">Staff</option>
                      </select>
                    </label>
                    <span>{filteredApplications.length} results</span>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Character</th>
                          <th>Discord</th>
                          <th>Submitted</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.role}</td>
                            <td>
                              <strong>{app.characterName}</strong>
                              <div>{app.motivation || app.experience}</div>
                            </td>
                            <td>{app.discord}</td>
                            <td>{formatDate(app.submittedAt)}</td>
                            <td>
                              <span className={statusClass(app.status)}>{app.status}</span>
                            </td>
                            <td>
                              <div className="admin-actions">
                                <button type="button" onClick={() => updateApplicationStatus(app.id, 'approved')}>
                                  Approve
                                </button>
                                <button type="button" onClick={() => updateApplicationStatus(app.id, 'denied')}>
                                  Deny
                                </button>
                                <button type="button" onClick={() => updateApplicationStatus(app.id, 'pending')}>
                                  Reset
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
                <article className="card">
                  <h3>Support tickets</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Subject</th>
                          <th>User</th>
                          <th>Channel</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supportTickets.map((ticket) => (
                          <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.user}</td>
                            <td>{ticket.channel}</td>
                            <td>{formatDate(ticket.createdAt)}</td>
                            <td>
                              <span className={statusClass(ticket.status)}>{ticket.status}</span>
                            </td>
                            <td>
                              <div className="admin-actions">
                                <button type="button" onClick={() => updateTicketStatus(ticket.id, 'open')}>
                                  Mark open
                                </button>
                                <button type="button" onClick={() => updateTicketStatus(ticket.id, 'pending')}>
                                  Pending
                                </button>
                                <button type="button" onClick={() => updateTicketStatus(ticket.id, 'resolved')}>
                                  Resolve
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="card">
                  <h3>Community moderation</h3>
                  {comments.map((comment) => (
                    <div key={comment.id} className="admin-actions" style={{ alignItems: 'stretch', flexDirection: 'column' }}>
                      <strong>{comment.user}</strong>
                      <span>{comment.message}</span>
                      <small>Submitted {formatDate(comment.submittedAt)}</small>
                      <div className="admin-actions">
                        <span className={statusClass(comment.status)}>{comment.status}</span>
                        <button type="button" onClick={() => moderateComment(comment.id, 'published')}>
                          Publish
                        </button>
                        <button type="button" onClick={() => moderateComment(comment.id, 'flagged')}>
                          Flag
                        </button>
                        <button type="button" onClick={() => moderateComment(comment.id, 'resolved')}>
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </article>
              </div>
            )}
          </section>
        </main>

        <footer>
          <strong>Apex RP · Professional FiveM roleplay</strong>
          <small>Server IP: {serverStatus.address} · Discord: discord.gg/apexrp · Tebex: store.apexrp.example</small>
          <small>Admin portal updates sync instantly with live pages. For issues email leadership@apexrp.example.</small>
        </footer>
      </div>
    </>
  );
}
