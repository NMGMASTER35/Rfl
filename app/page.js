import { getQueueSnapshot } from '../lib/queue.js';

const styles = `
  :root {
    color-scheme: dark;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    background: #05060d;
    color: #f7f8ff;
  }

  body {
    margin: 0;
    background: radial-gradient(circle at top left, rgba(80, 98, 255, 0.18), transparent 45%),
      radial-gradient(circle at bottom right, rgba(255, 89, 145, 0.18), transparent 40%),
      #05060d;
  }

  a {
    color: inherit;
  }

  .page {
    min-height: 100vh;
    padding: 4rem clamp(2rem, 6vw, 6rem);
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .hero {
    display: grid;
    gap: 1.5rem;
    text-align: left;
  }

  .hero__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(83, 109, 254, 0.15);
    color: #9ea7ff;
    border: 1px solid rgba(83, 109, 254, 0.35);
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    font-weight: 600;
    width: fit-content;
  }

  .hero__title {
    font-size: clamp(2.5rem, 4vw, 3.75rem);
    line-height: 1.1;
    margin: 0;
  }

  .hero__subtitle {
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    color: rgba(240, 245, 255, 0.78);
    max-width: 56ch;
    margin: 0;
  }

  .hero__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background: linear-gradient(135deg, #536dff, #ff5991);
    border-radius: 999px;
    padding: 0.85rem 1.75rem;
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    width: fit-content;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 18px 40px rgba(83, 109, 255, 0.25);
  }

  .hero__cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 44px rgba(255, 89, 145, 0.28);
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .metric-card {
    background: rgba(7, 9, 20, 0.65);
    border: 1px solid rgba(158, 167, 255, 0.12);
    padding: 1.4rem;
    border-radius: 1.1rem;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    display: grid;
    gap: 0.6rem;
  }

  .metric-card h3 {
    margin: 0;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(158, 167, 255, 0.65);
  }

  .metric-card strong {
    font-size: 1.85rem;
    font-weight: 700;
  }

  .queue-section {
    display: grid;
    gap: 2rem;
  }

  .queue-layout {
    display: grid;
    grid-template-columns: minmax(0, 2.3fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(7, 9, 20, 0.72);
    border: 1px solid rgba(158, 167, 255, 0.1);
    border-radius: 1.1rem;
    overflow: hidden;
  }

  thead {
    background: rgba(83, 109, 255, 0.1);
  }

  th,
  td {
    padding: 0.95rem 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(158, 167, 255, 0.08);
  }

  tbody tr:last-of-type td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: rgba(83, 109, 255, 0.07);
  }

  th {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(158, 167, 255, 0.75);
  }

  .player-cell {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .player-name {
    font-weight: 600;
  }

  .player-role {
    font-size: 0.85rem;
    color: rgba(240, 245, 255, 0.6);
  }

  .priority-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
    font-weight: 600;
  }

  .priority--staff {
    background: rgba(255, 115, 168, 0.16);
    color: #ff7aa8;
  }

  .priority--supporter {
    background: rgba(83, 109, 255, 0.18);
    color: #96a6ff;
  }

  .priority--standard {
    background: rgba(123, 255, 196, 0.16);
    color: #7fffd4;
  }

  .priority--guest {
    background: rgba(255, 187, 120, 0.16);
    color: #ffc489;
  }

  .queue-panel {
    background: linear-gradient(145deg, rgba(7, 9, 20, 0.82), rgba(7, 12, 34, 0.95));
    border: 1px solid rgba(158, 167, 255, 0.12);
    border-radius: 1.2rem;
    padding: 1.75rem;
    display: grid;
    gap: 1.2rem;
    box-shadow: 0 12px 36px rgba(5, 7, 19, 0.35);
  }

  .queue-panel h2 {
    margin: 0;
    font-size: 1.3rem;
  }

  .queue-panel p {
    margin: 0;
    color: rgba(240, 245, 255, 0.72);
    line-height: 1.5;
  }

  .queue-panel ul {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.4rem;
  }

  .queue-panel form {
    display: grid;
    gap: 0.8rem;
  }

  .queue-panel label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: rgba(158, 167, 255, 0.75);
  }

  .queue-panel input,
  .queue-panel select,
  .queue-panel textarea {
    background: rgba(5, 8, 22, 0.85);
    border: 1px solid rgba(158, 167, 255, 0.2);
    border-radius: 0.75rem;
    padding: 0.75rem;
    color: inherit;
    font: inherit;
    resize: vertical;
  }

  .queue-panel button {
    margin-top: 0.4rem;
    padding: 0.9rem 1.1rem;
    border-radius: 0.85rem;
    border: none;
    font-weight: 600;
    background: linear-gradient(135deg, #536dff, #ff5991);
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 18px 36px rgba(83, 109, 255, 0.24);
  }

  .queue-panel button:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 44px rgba(255, 89, 145, 0.28);
  }

  .queue-panel small {
    color: rgba(158, 167, 255, 0.65);
    font-size: 0.8rem;
  }

  .history-section {
    display: grid;
    gap: 1.2rem;
  }

  .history-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.85rem;
  }

  .history-item {
    background: rgba(7, 9, 20, 0.62);
    border: 1px solid rgba(158, 167, 255, 0.1);
    border-radius: 1rem;
    padding: 0.9rem 1.1rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .history-item strong {
    font-weight: 600;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .info-card {
    background: rgba(7, 9, 20, 0.65);
    border: 1px solid rgba(158, 167, 255, 0.12);
    padding: 1.4rem;
    border-radius: 1.1rem;
    display: grid;
    gap: 0.6rem;
  }

  .info-card h3 {
    margin: 0;
    font-size: 1.05rem;
  }

  footer {
    border-top: 1px solid rgba(158, 167, 255, 0.15);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    color: rgba(158, 167, 255, 0.75);
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    .queue-layout {
      grid-template-columns: 1fr;
    }
  }
`;

function formatMinutes(minutes) {
  if (minutes <= 1) return '1 minute';
  return `${minutes} minutes`;
}

function formatTime(date) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return formatter.format(date);
}

const PRIORITY_LABELS = {
  staff: 'Staff',
  supporter: 'Supporter',
  standard: 'Standard',
  guest: 'Guest'
};

const PRIORITY_BLURBS = {
  staff: 'Operations, staff and leadership queue slots.',
  supporter: 'Boosters and donators supporting Apex RP.',
  standard: 'Whitelisted citizens ready to roleplay.',
  guest: 'New arrivals and visitors exploring the city.'
};

export default function Page() {
  const queue = getQueueSnapshot();
  const { active, stats, history } = queue;

  const priorityBreakdown = Object.entries(PRIORITY_LABELS).map(([key, label]) => ({
    key,
    label,
    count: stats.priorityBreakdown[key] ?? 0,
    blurb: PRIORITY_BLURBS[key]
  }));

  const recentHistory = history.slice(0, 4);

  return (
    <main className="page">
      <style>{styles}</style>
      <section className="hero">
        <span className="hero__badge">Apex RP • FiveM</span>
        <h1 className="hero__title">Elevate your Los Santos story with Apex RP</h1>
        <p className="hero__subtitle">
          Monitor the live connection queue, learn how to secure a slot, and stay updated on the
          pulse of our serious roleplay community. Jump into patrols, emergency response, or civilian
          life prepared and in sync with the server cadence.
        </p>
        <a className="hero__cta" href="#queue">Join the queue</a>
      </section>

      <section className="metrics">
        <article className="metric-card">
          <h3>Players Waiting</h3>
          <strong>{stats.activeCount}</strong>
          <span>Live queue awaiting dispatch.</span>
        </article>
        <article className="metric-card">
          <h3>Served Today</h3>
          <strong>{stats.processedCount}</strong>
          <span>Citizens processed into Apex RP.</span>
        </article>
        <article className="metric-card">
          <h3>Average Wait</h3>
          <strong>{formatMinutes(stats.averageWait || 0)}</strong>
          <span>Typical time from queue to city life.</span>
        </article>
        <article className="metric-card">
          <h3>Longest Wait</h3>
          <strong>{formatMinutes(stats.longestWait || 0)}</strong>
          <span>Dedicated roleplayers holding for entry.</span>
        </article>
      </section>

      <section id="queue" className="queue-section">
        <div className="queue-layout">
          <div>
            <h2>Live queue overview</h2>
            <p>Track who is next in line and how priorities impact dispatch timing.</p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Priority</th>
                  <th>Waited</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {active.length === 0 ? (
                  <tr>
                    <td colSpan="5">Queue is clear. City access is immediate.</td>
                  </tr>
                ) : (
                  active.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.position}</td>
                      <td>
                        <div className="player-cell">
                          <span className="player-name">{entry.playerName}</span>
                          <span className="player-role">{entry.role}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`priority-badge priority--${entry.priority}`}>
                          {PRIORITY_LABELS[entry.priority] ?? entry.priority}
                        </span>
                      </td>
                      <td>{formatMinutes(entry.waitedMinutes)}</td>
                      <td>{formatMinutes(entry.etaMinutes)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <aside className="queue-panel">
            <h2>Queue up for Apex RP</h2>
            <p>
              Submit your details and our dispatcher bot will secure your slot. Priority is calculated
              automatically based on your role and community support status.
            </p>
            <ul>
              <li>Ensure your Discord and Steam are linked in the Apex RP hub.</li>
              <li>Keep the launcher open—queue skips if you miss your turn.</li>
              <li>Read the latest SOPs and city guidelines before joining.</li>
            </ul>
            <form method="post" action="/api/queue">
              <label>
                Character or Callsign
                <input name="playerName" placeholder="NovaRift" required />
              </label>
              <label>
                Role on Duty
                <input name="role" placeholder="LSPD Sergeant" />
              </label>
              <label>
                Priority Level
                <select name="priority" defaultValue="standard">
                  <option value="staff">Staff</option>
                  <option value="supporter">Supporter</option>
                  <option value="standard">Standard</option>
                  <option value="guest">Guest</option>
                </select>
              </label>
              <label>
                Steam Hex (optional)
                <input name="steamId" placeholder="steam:11000010c0ffee" />
              </label>
              <label>
                Notes for Dispatch (optional)
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="On-duty EMS response team, need priority slot."
                />
              </label>
              <button type="submit">Lock in your queue slot</button>
              <small>
                Submissions post to <code>/api/queue</code> and update the live board instantly.
              </small>
            </form>
          </aside>
        </div>
      </section>

      <section className="history-section">
        <h2>Recently dispatched</h2>
        <p>Latest roleplayers who transitioned from queue into the city.</p>
        <ul className="history-list">
          {recentHistory.length === 0 ? (
            <li className="history-item">No dispatch events recorded yet.</li>
          ) : (
            recentHistory.map((entry) => (
              <li key={`${entry.id}-${entry.leftAt}`} className="history-item">
                <span>
                  <strong>{entry.playerName}</strong> · {PRIORITY_LABELS[entry.priority] ?? entry.priority}
                </span>
                <span>
                  {entry.status === 'served' ? 'Entered city' : 'Removed'} at {formatTime(new Date(entry.leftAt))}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="info-grid">
        {priorityBreakdown.map((item) => (
          <article key={item.key} className="info-card">
            <h3>{item.label} queue</h3>
            <strong>{item.count} queued</strong>
            <p>{item.blurb}</p>
          </article>
        ))}
        <article className="info-card">
          <h3>Server cadence</h3>
          <p>
            Apex RP resets soft queues at every tsunami (server restart). Arrive early, refresh your
            details, and monitor Discord announcements for pop-up events and operations.
          </p>
        </article>
        <article className="info-card">
          <h3>Need assistance?</h3>
          <p>
            Ping <strong>@Queue Support</strong> in Discord for help with stalled entries or to update
            your priority tier. Our staff are online during peak patrol windows.
          </p>
        </article>
      </section>

      <footer>
        <span>Apex RP © {new Date().getFullYear()} · Built for immersive FiveM storytelling.</span>
        <span>Discord: discord.gg/apexrp · Twitch: /apexrp</span>
      </footer>
    </main>
  );
}
