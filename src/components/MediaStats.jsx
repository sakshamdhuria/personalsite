import MediaStatsExtras from "./MediaStatsExtras.jsx";
import { useState } from "react";
import entries from "../data/media.json";
import { getRoutePath } from "../utils/routing.js";
import "./media.css";

const groups = ["Movies", "Anime", "TV Shows", "Dramas"].map((name) => ({
  name,
  titles: entries.filter((entry) => entry.category === name),
}));

function countGenres(titles) {
  const counts = new Map();
  for (const entry of titles) {
    for (const tag of new Set(entry.genres ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

const ranking = [...countGenres(entries)].sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
const breakdown = groups.map(({ titles }) => countGenres(titles));
const percent = (count, total) => total ? Math.round(count / total * 100) : 0;

export default function MediaStats() {
  const [sortBy, setSortBy] = useState("overall");
  const selectedGroup = groups.findIndex(({ name }) => name === sortBy);
  const tableRanking = selectedGroup === -1 ? ranking : [...ranking].sort(
    ([a], [b]) => (breakdown[selectedGroup].get(b) ?? 0) - (breakdown[selectedGroup].get(a) ?? 0) || a.localeCompare(b),
  );
  const top = ranking[0];
  return (
    <section className="media-page media-stats" aria-labelledby="media-stats-title">
      <header className="media-nav">
        <a href={getRoutePath(["media"])}>← Back to collection</a>
      </header>
      <div className="stats-heading">
        <h1 id="media-stats-title">Media stats</h1>
        <p>{entries.length} titles <span aria-hidden="true">/</span> {ranking.length} genres</p>
      </div>

      <dl className="stats-formats">
        {groups.map(({ name, titles }, i) => (
          <div className={`stats-format stats-tone-${i}`} key={name}>
            <dt>{name}</dt><dd>{titles.length}</dd>
          </div>
        ))}
      </dl>

      <section className="stats-overview" aria-labelledby="stats-overall">
        <div className="stats-leader">
          <h2 id="stats-overall">Top genre</h2>
          {top && <>
            <p className="stats-leader-name">{top[0]}</p>
            <p><strong>{percent(top[1], entries.length)}%</strong> of the collection</p>
            <p>{top[1]} of {entries.length} titles</p>
          </>}
        </div>
        <div className="stats-chart">
          <h2>Most watched genres</h2>
          <ol>
            {ranking.slice(0, 8).map(([genre, count]) => (
              <li key={genre}>
                <span>{genre}</span>
                <div className="stats-bar" aria-hidden="true"><i style={{ width: `${count / top[1] * 100}%` }} /></div>
                <strong>{count}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MediaStatsExtras entries={entries} groups={groups} ranking={ranking} />

      <section className="stats-breakdown" aria-labelledby="stats-types">
        <div className="stats-breakdown-heading">
          <h2 id="stats-types">Genres by media type</h2>
          <label>
            Sort by
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="overall">All media</option>
              {groups.map(({ name }) => <option key={name}>{name}</option>)}
            </select>
          </label>
        </div>
        <p id="stats-scale">Counts show how many titles have each tag. Stronger color indicates a larger share of that media type.</p>
        <div className="stats-table-wrap" tabIndex={0} role="region" aria-labelledby="stats-types">
          <table aria-describedby="stats-scale">
            <thead><tr><th scope="col">Genre</th>{groups.map(({ name }, i) => <th scope="col" className={`stats-tone-${i}`} key={name}>{name}</th>)}</tr></thead>
            <tbody>{tableRanking.map(([genre]) => (
              <tr key={genre}>
                <th scope="row">{genre}</th>
                {groups.map(({ name, titles }, i) => {
                  const count = breakdown[i].get(genre) ?? 0;
                  const share = percent(count, titles.length);
                  return <td key={name} className={`stats-tone-${i}`} style={{ "--heat": `${share * .55}%` }} title={`${count} of ${titles.length} titles (${share}%)`}>
                    {count || <><span aria-hidden="true">—</span><span className="media-sr">0</span></>}
                  </td>;
                })}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p>A title can count toward more than one genre.</p>
      </section>
    </section>
  );
}
