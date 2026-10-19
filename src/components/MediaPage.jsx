import { useMemo, useState } from "react";
import { mediaEntries } from "../data/media.js";
import "./media.css";

const categories = ["All", "Movies", "Anime", "TV Shows", "Dramas"];
const dramaTypes = ["All dramas", "K-drama", "C-drama", "J-drama", "Taiwanese"];
const matchesDramaType = (entry, type) => type === "All dramas" || (type === "Unassigned" ? !entry.dramaTypes?.length : entry.dramaTypes?.includes(type));
const dateLabel = (value) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));

export default function MediaPage({ onBack }) {
  const [category, setCategory] = useState("All");
  const [dramaType, setDramaType] = useState("All dramas");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [year, setYear] = useState("All years");
  const years = [...new Set(mediaEntries.map((entry) => entry.date.slice(0, 4)))].sort().reverse();
  const visible = useMemo(() => mediaEntries.filter((entry) =>
    (category === "All" || entry.category === category) &&
    (category !== "Dramas" || matchesDramaType(entry, dramaType)) &&
    (year === "All years" || entry.date.startsWith(year)) &&
    entry.title.toLowerCase().includes(query.trim().toLowerCase()),
  ).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)), [category, dramaType, query, sort, year]);
  const reset = () => { setCategory("All"); setDramaType("All dramas"); setQuery(""); setYear("All years"); setSort("recent"); };

  return <section className="media-page" aria-labelledby="media-title">
    <header className="media-nav"><button onClick={onBack} type="button">← Back to desk</button><span>SAKSHAM DHURIA <i>/</i> MEDIA</span></header>
    <div className="media-intro">
      <p className="media-eyebrow"><span /> MEDIA</p>
      <h1 id="media-title">Movies, anime & TV</h1>
      <div className="media-totals"><div><strong>{mediaEntries.length}</strong><span>titles in the collection</span></div></div>
    </div>
    <div className="media-library">
      <div className="media-library-heading"><h2>The collection</h2><p>Collected since December 2025</p></div>
      <div className="media-filters" aria-label="Filter by media category">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} className={category === item ? "is-selected" : ""} onClick={() => { setCategory(item); setDramaType("All dramas"); }}>{item}<span>{item === "All" ? mediaEntries.length : mediaEntries.filter((entry) => entry.category === item).length}</span></button>)}</div>
      {category === "Dramas" && <div className="media-filters media-drama-filters" aria-label="Filter dramas by country">{dramaTypes.map((type) => <button key={type} data-drama-type={type} type="button" aria-pressed={dramaType === type} className={dramaType === type ? "is-selected" : ""} onClick={() => setDramaType(type)}>{type}<span>{mediaEntries.filter((entry) => entry.category === "Dramas" && matchesDramaType(entry, type)).length}</span></button>)}</div>}
      <div className="media-tools"><label className="media-search"><span aria-hidden="true">⌕</span><span className="media-sr">Search titles</span><input type="search" placeholder="Find a title…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label><span className="media-sr">Filter by log year</span><select value={year} onChange={(event) => setYear(event.target.value)}><option>All years</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label><label><span className="media-sr">Sort collection</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Recently logged</option><option value="oldest">Oldest logged</option><option value="title">Title A–Z</option></select></label></div>
      <p className="media-results" role="status">{visible.length} {visible.length === 1 ? "title" : "titles"}{category !== "All" ? ` · ${category}${category === "Dramas" && dramaType !== "All dramas" ? ` · ${dramaType}` : ""}` : " · All media"}</p>
      <div className="media-grid">{visible.map((entry) => <article className="media-entry" data-category={entry.category} data-drama-type={entry.dramaTypes?.[0]} key={entry.id}><div className="media-entry-top"><span className="media-category">{entry.category === "Dramas" && entry.dramaTypes?.length ? entry.dramaTypes.join(" / ") : entry.category}</span></div><h3>{entry.title}</h3><div className="media-entry-bottom"><p>Logged <time dateTime={entry.date}>{dateLabel(entry.date)}</time></p></div></article>)}</div>
      {visible.length === 0 && <div className="media-empty"><h3>No titles found.</h3><p>Try another title or clear your filters.</p><button type="button" onClick={reset}>Reset filters</button></div>}
      <footer className="media-footer"><p>Updated October 19, 2026<br />Dates show when I logged each entry. A log entry doesn’t imply a completed series.</p></footer>
    </div>
  </section>;
}
