const monthLabel = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const share = (n, total) => total ? n / total : 0;
const pct = (n, total) => Math.round(100 * share(n, total));
const tags = (entry) => [...new Set(entry.genres ?? [])].sort();
const countTag = (entries, tag) => entries.filter((entry) => tags(entry).includes(tag)).length;

export default function MediaStatsExtras({ entries, groups, ranking }) {
  const pairs = new Map();
  const months = new Map();
  for (const entry of entries) {
    const month = entry.date.slice(0, 7);
    if (!months.has(month)) months.set(month, groups.map(() => 0));
    const group = groups.findIndex(({ name }) => name === entry.category);
    if (group >= 0) months.get(month)[group]++;
    const genres = tags(entry);
    genres.forEach((a, i) => genres.slice(i + 1).forEach((b) => {
      const name = `${a} + ${b}`;
      pairs.set(name, (pairs.get(name) ?? 0) + 1);
    }));
  }
  const pairRanking = [...pairs].sort(([a, x], [b, y]) => y - x || a.localeCompare(b)).slice(0, 5);
  const timeline = [...months].sort(([a], [b]) => a.localeCompare(b));
  const peak = Math.max(1, ...timeline.map(([, counts]) => counts.reduce((a, b) => a + b, 0)));
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const recent = sorted.slice(0, 15);
  const earlier = sorted.slice(15);
  const shifts = ranking.map(([tag]) => {
    const now = countTag(recent, tag);
    const before = countTag(earlier, tag);
    return { tag, now, before, delta: share(now, recent.length) - share(before, earlier.length) };
  }).filter(({ delta }) => delta !== 0).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 4);
  return (
    <div className="stats-extras">
      <section>
        <h2>Genre pairings</h2>
        <p>Tags that appear together most often.</p>
        <ol className="stats-extra-list">{pairRanking.map(([pair, count]) => <li key={pair}><span>{pair}</span><strong>{count}</strong></li>)}</ol>
      </section>
      <section>
        <h2>Titles logged by month</h2>
        <p className="stats-legend">{groups.map(({ name }, i) => <span className={`stats-tone-${i}`} key={name}>{name}</span>)}</p>
        <ol className="stats-extra-list stats-timeline">{timeline.map(([month, counts]) => {
          const label = monthLabel.format(new Date(`${month}-01T00:00:00Z`));
          const total = counts.reduce((a, b) => a + b, 0);
          return <li key={month}>
            <span>{label}</span>
            <div className="stats-month-bar" aria-hidden="true">{counts.map((count, i) => <i key={groups[i].name} className={`stats-tone-${i}`} style={{ width: `${count / peak * 100}%` }} />)}</div>
            <strong>{total}</strong>
            <span className="media-sr">{counts.map((count, i) => `${groups[i].name}: ${count}`).join(", ")}</span>
          </li>;
        })}</ol>
      </section>
      <section>
        <h2>Standout genre by format</h2>
        <p>The genre with the biggest lift over its share of the full collection.</p>
        <ul className="stats-extra-list">{groups.map(({ name, titles }) => {
          const best = ranking.map(([tag, overall]) => {
            const count = countTag(titles, tag);
            return { tag, count, overall, lift: share(count, titles.length) - share(overall, entries.length) };
          }).filter(({ count, lift }) => count >= 2 && lift > 0).sort((a, b) => b.lift - a.lift)[0];
          return <li key={name}><span>{name}{best && <small>{best.tag}: {best.count} of {titles.length} · {pct(best.overall, entries.length)}% overall</small>}</span><strong>{best ? `${pct(best.count, titles.length)}%` : "—"}</strong></li>;
        })}</ul>
      </section>
      <section>
        <h2>Recent taste shift</h2>
        <p>Latest {recent.length} log entries compared with {earlier.length} earlier entries.</p>
        <ul className="stats-extra-list">{earlier.length > 0 && shifts.map(({ tag, now, before }) => <li key={tag}><span>{tag}</span><strong>{pct(before, earlier.length)}% → {pct(now, recent.length)}%</strong></li>)}</ul>
      </section>
    </div>
  );
}
