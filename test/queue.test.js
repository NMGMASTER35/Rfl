import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getQueueSnapshot,
  joinQueue,
  leaveQueue,
  resetQueue
} from '../lib/queue.js';

test('joinQueue orders by priority and join time', () => {
  resetQueue();

  joinQueue({
    playerName: 'Alpha',
    priority: 'standard',
    joinedAt: new Date('2024-04-01T10:00:00Z')
  });

  joinQueue({
    playerName: 'Bravo',
    priority: 'staff',
    joinedAt: new Date('2024-04-01T09:50:00Z')
  });

  joinQueue({
    playerName: 'Charlie',
    priority: 'standard',
    joinedAt: new Date('2024-04-01T09:45:00Z')
  });

  const order = getQueueSnapshot().active.map((entry) => entry.playerName);
  assert.deepEqual(order, ['Bravo', 'Charlie', 'Alpha']);
});

test('joinQueue enforces a player name', () => {
  resetQueue();
  assert.throws(() => joinQueue({ priority: 'staff' }), /playerName is required/);
});

test('leaveQueue tracks processed counts and history', () => {
  resetQueue();

  const entry = joinQueue({ playerName: 'Delta', priority: 'supporter' });
  const served = leaveQueue(entry.id, { status: 'served' });

  assert.equal(served.playerName, 'Delta');

  const snapshot = getQueueSnapshot();
  assert.equal(snapshot.stats.processedCount, 1);
  assert.ok(snapshot.history[0], 'history entry should exist');
  assert.equal(snapshot.history[0].status, 'served');
  assert.equal(snapshot.history[0].playerName, 'Delta');
});

test('leaveQueue marked as removed does not increment processed count', () => {
  resetQueue();
  const entry = joinQueue({ playerName: 'Echo', priority: 'guest' });
  leaveQueue(entry.id, { status: 'removed' });
  const snapshot = getQueueSnapshot();
  assert.equal(snapshot.stats.processedCount, 0);
  assert.equal(snapshot.history[0].status, 'removed');
});

test('resetQueue with seed restores sample data', () => {
  resetQueue({ seed: true });
  const snapshot = getQueueSnapshot();

  assert.equal(snapshot.active.length, 4);
  assert.equal(snapshot.stats.processedCount, 48);
  const names = snapshot.active.map((entry) => entry.playerName);
  assert.deepEqual(names, ['NovaRift', 'Lyric', 'Catalina', 'Trace']);
});

test('priority breakdown counts tiers accurately', () => {
  resetQueue();
  joinQueue({ playerName: 'Foxtrot', priority: 'staff' });
  joinQueue({ playerName: 'Golf', priority: 'supporter' });
  joinQueue({ playerName: 'Hotel', priority: 'guest' });
  joinQueue({ playerName: 'India', priority: 'guest' });

  const snapshot = getQueueSnapshot();
  assert.equal(snapshot.stats.priorityBreakdown.staff, 1);
  assert.equal(snapshot.stats.priorityBreakdown.supporter, 1);
  assert.equal(snapshot.stats.priorityBreakdown.guest, 2);
});
