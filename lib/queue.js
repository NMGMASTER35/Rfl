const PRIORITY_SCORES = {
  staff: 4,
  supporter: 3,
  standard: 2,
  guest: 1
};

const PRIORITY_SPEEDUP_MINUTES = {
  staff: 10,
  supporter: 6,
  standard: 0,
  guest: 0
};

const queueState = {
  active: [],
  history: [],
  processed: 0
};

let idCounter = 1;

function normalisePriority(priority) {
  if (priority === undefined || priority === null) {
    return 'standard';
  }

  if (typeof priority === 'number' && Number.isFinite(priority)) {
    if (priority >= 4) return 'staff';
    if (priority >= 3) return 'supporter';
    if (priority >= 2) return 'standard';
    return 'guest';
  }

  const normalized = String(priority).trim().toLowerCase();
  if (PRIORITY_SCORES[normalized]) {
    return normalized;
  }

  switch (normalized) {
    case 'admin':
    case 'owner':
      return 'staff';
    case 'vip':
    case 'booster':
      return 'supporter';
    case 'whitelist':
      return 'standard';
    default:
      return 'standard';
  }
}

function toDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === 'number') return new Date(value);
  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date();
}

function sortQueue() {
  queueState.active.sort((a, b) => {
    const priorityDelta = PRIORITY_SCORES[b.priority] - PRIORITY_SCORES[a.priority];
    if (priorityDelta !== 0) return priorityDelta;
    return a.joinedAt.getTime() - b.joinedAt.getTime();
  });
}

function minutesBetween(a, b) {
  return Math.max(1, Math.round((a - b) / 60000));
}

function calculateEta(index, entry, now) {
  const base = (index + 1) * 5; // five minutes per slot
  const waited = minutesBetween(now, entry.joinedAt.getTime());
  const speedup = PRIORITY_SPEEDUP_MINUTES[entry.priority] ?? 0;
  return Math.max(waited, Math.max(3, base - speedup));
}

function updateHistory(entry, status) {
  const snapshot = {
    ...entry,
    status,
    leftAt: new Date()
  };
  queueState.history.unshift(snapshot);
  if (queueState.history.length > 25) {
    queueState.history.length = 25;
  }
}

export function joinQueue({
  playerName,
  steamId,
  role,
  priority,
  notes,
  joinedAt
}) {
  if (!playerName || !String(playerName).trim()) {
    throw new Error('playerName is required');
  }

  const entry = {
    id: String(idCounter++),
    playerName: String(playerName).trim(),
    steamId: steamId ? String(steamId).trim() : null,
    role: role ? String(role).trim() : 'Civilian',
    priority: normalisePriority(priority),
    notes: notes ? String(notes).trim() : '',
    joinedAt: toDate(joinedAt ?? Date.now())
  };

  queueState.active.push(entry);
  sortQueue();

  return entry;
}

export function leaveQueue(id, { status = 'served' } = {}) {
  const index = queueState.active.findIndex((entry) => entry.id === String(id));
  if (index === -1) {
    return null;
  }

  const [entry] = queueState.active.splice(index, 1);
  if (status === 'served') {
    queueState.processed += 1;
  }
  updateHistory(entry, status);
  return entry;
}

export function getQueueSnapshot() {
  const now = Date.now();
  const active = queueState.active.map((entry, index) => {
    const waitedMinutes = minutesBetween(now, entry.joinedAt.getTime());
    return {
      id: entry.id,
      playerName: entry.playerName,
      steamId: entry.steamId,
      role: entry.role,
      priority: entry.priority,
      notes: entry.notes,
      joinedAt: entry.joinedAt,
      position: index + 1,
      waitedMinutes,
      etaMinutes: calculateEta(index, entry, now)
    };
  });

  const totalWait = active.reduce((acc, entry) => acc + entry.waitedMinutes, 0);
  const priorityBreakdown = active.reduce((acc, entry) => {
    acc[entry.priority] = (acc[entry.priority] ?? 0) + 1;
    return acc;
  }, {});

  return {
    updatedAt: new Date(now),
    active,
    stats: {
      activeCount: active.length,
      processedCount: queueState.processed,
      averageWait: active.length ? Math.round(totalWait / active.length) : 0,
      longestWait: active.reduce(
        (max, entry) => Math.max(max, entry.waitedMinutes),
        0
      ),
      priorityBreakdown,
      lastServed: queueState.history[0] ?? null
    },
    history: queueState.history.slice()
  };
}

export function resetQueue({ seed = false } = {}) {
  queueState.active = [];
  queueState.history = [];
  queueState.processed = 0;
  idCounter = 1;
  if (seed) {
    seedQueueInternal();
  }
}

function seedQueueInternal() {
  const now = Date.now();
  const seeds = [
    {
      playerName: 'NovaRift',
      steamId: 'steam:11000010c0ffee',
      role: 'LSPD Sergeant',
      priority: 'staff',
      notes: 'Coordinating tonight\'s patrol.',
      joinedAt: new Date(now - 12 * 60000)
    },
    {
      playerName: 'Lyric',
      steamId: 'steam:1100001088beef',
      role: 'EMS Chief',
      priority: 'supporter',
      notes: 'On duty, trauma team ready.',
      joinedAt: new Date(now - 9 * 60000)
    },
    {
      playerName: 'Catalina',
      steamId: 'steam:1100001099abcd',
      role: 'Civilian Entrepreneur',
      priority: 'standard',
      notes: 'Hosting a Vespucci Beach market.',
      joinedAt: new Date(now - 7 * 60000)
    },
    {
      playerName: 'Trace',
      steamId: 'steam:11000010fff1234',
      role: 'Street Racer',
      priority: 'guest',
      notes: 'Fresh from whitelist orientation.',
      joinedAt: new Date(now - 4 * 60000)
    }
  ];

  seeds.forEach((seed) => joinQueue(seed));
  queueState.processed = 48;
}

seedQueueInternal();

export function seedQueue() {
  resetQueue({ seed: true });
}
