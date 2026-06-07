import { useState } from "react";

function getExperienceClass(company) {
  if (company.includes("OpenAI")) return "is-openai";
  if (company.includes("Databricks")) return "is-databricks";
  if (company.includes("NVIDIA")) return "is-nvidia";
  if (company.includes("Capital One")) return "is-capital-one";
  if (company.includes("Cadence")) return "is-cadence";
  return "is-gsoc";
}

function ExperienceList({ entries }) {
  return (
    <div className="experience-strip" aria-label="Experience entries">
      {entries.map((entry) => (
        <article
          className={`experience-card ${getExperienceClass(entry.company)}`}
          key={entry.company}
        >
          <div className="experience-card__topline">
            <h2>{entry.company}</h2>
            <p>{entry.date}</p>
          </div>

          <div className="experience-card__meta">
            <p>{entry.role}</p>
            <p>{entry.location}</p>
          </div>

          <p className="experience-card__summary">{entry.details}</p>
        </article>
      ))}
    </div>
  );
}

const educationTabLabels = {
  courses: "Courses",
  favoriteCourseTiers: "Favorite Courses",
};

const EDUCATION_TAB_STORAGE_KEY = "personal-site-education-tab";

function getCourseSubjectClass(course) {
  return course.includes("MATH") || course.includes("Numerical Methods")
    ? "is-math"
    : "is-cs";
}

function getStoredEducationTab() {
  const storedTab = localStorage.getItem(EDUCATION_TAB_STORAGE_KEY);
  return Object.keys(educationTabLabels).includes(storedTab) ? storedTab : "courses";
}

function EducationTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(getStoredEducationTab);

  const selectTab = (tabId) => {
    localStorage.setItem(EDUCATION_TAB_STORAGE_KEY, tabId);
    setActiveTab(tabId);
  };

  return (
    <div className="education-tabs">
      <div className="education-summary">
        <span>GPA</span>
        <strong>{tabs.gpa}</strong>
      </div>

      <div className="education-tabs__list" role="tablist" aria-label="Education details">
        {Object.keys(educationTabLabels).map((tabId) => (
          <button
            className={`education-tabs__tab ${activeTab === tabId ? "is-active" : ""}`}
            key={tabId}
            type="button"
            role="tab"
            aria-selected={activeTab === tabId}
            onClick={() => selectTab(tabId)}
          >
            {educationTabLabels[tabId]}
          </button>
        ))}
      </div>

      <div className="education-tabs__panel" role="tabpanel">
        {activeTab === "courses" && (
          <div className="course-timeline">
            {tabs.courses.map((semester) => (
              <section className="course-term" key={semester.term}>
                <h2>{semester.term}</h2>
                <ul>
                  {semester.classes.map((course) => (
                    <li className={getCourseSubjectClass(course)} key={course}>
                      {course}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {activeTab === "favoriteCourseTiers" && (
          <div className="tier-list">
            {tabs.favoriteCourseTiers.map((tierGroup) => (
              <div className="tier-row" key={tierGroup.tier}>
                <strong>{tierGroup.tier}</strong>
                <div className="tier-row__courses">
                  {tierGroup.courses.map((course) => (
                    <span className={getCourseSubjectClass(course)} key={course}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function ContactIcon({ type }) {
  const paths = {
    email: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    discord: (
      <>
        <path d="M7.5 8.5c3-1.2 6-1.2 9 0l1 7c-2.4 1.7-4.3 2-5.5 2s-3.1-.3-5.5-2z" />
        <path d="M9.5 14h.01M14.5 14h.01" />
        <path d="M9 11.5c2-.7 4-.7 6 0" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6.5 10v8" />
        <path d="M6.5 7v.01" />
        <path d="M10.5 18v-8" />
        <path d="M10.5 13.5c0-2 1.2-3.5 3.2-3.5 1.9 0 3 1.3 3 3.5V18" />
      </>
    ),
    github: (
      <>
        <path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-1-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.3.8.1-.6.3-1 .5-1.2-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.9-2.2-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.8a8 8 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1.2.2 2 .1 2.2.6.6.9 1.3.9 2.2 0 3-1.8 3.7-3.6 3.9.3.3.6.8.6 1.6v2.3c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5z" />
      </>
    ),
    instagram: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.2 7.8h.01" />
      </>
    ),
    spotify: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M8.5 10.1c2.8-.8 5.5-.5 7.7.7" />
        <path d="M9 12.7c2.2-.6 4.3-.4 6 .5" />
        <path d="M9.5 15c1.6-.4 3-.3 4.4.4" />
      </>
    ),
  };

  return (
    <svg
      className="contact-action__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function ContactActions({ contactLinks }) {
  const [copyState, setCopyState] = useState("idle");

  const copyToClipboard = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopyState(type);
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  return (
    <div className="contact-actions">
      <button
        className="contact-action"
        type="button"
        onClick={() => copyToClipboard(contactLinks.email, "email")}
      >
        <ContactIcon type="email" />
        <span className="contact-action__text">
          <span>Email</span>
          <strong>{contactLinks.email}</strong>
        </span>
      </button>

      <a
        className="contact-action"
        href={contactLinks.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <ContactIcon type="linkedin" />
        <span className="contact-action__text">
          <span>LinkedIn</span>
          <strong>linkedin.com/in/sakshamdhuria</strong>
        </span>
      </a>

      <a
        className="contact-action"
        href={contactLinks.github}
        target="_blank"
        rel="noreferrer"
      >
        <ContactIcon type="github" />
        <span className="contact-action__text">
          <span>GitHub</span>
          <strong>github.com/sakshamdhuria</strong>
        </span>
      </a>

      <a
        className="contact-action"
        href={contactLinks.spotify}
        target="_blank"
        rel="noreferrer"
      >
        <ContactIcon type="spotify" />
        <span className="contact-action__text">
          <span>Spotify</span>
          <strong>open.spotify.com/user/shrey</strong>
        </span>
      </a>

      <button
        className="contact-action"
        type="button"
        onClick={() => copyToClipboard(contactLinks.discord, "discord")}
      >
        <ContactIcon type="discord" />
        <span className="contact-action__text">
          <span>Discord</span>
          <strong>{contactLinks.discord}</strong>
        </span>
      </button>

      <a
        className="contact-action"
        href={contactLinks.instagram}
        target="_blank"
        rel="noreferrer"
      >
        <ContactIcon type="instagram" />
        <span className="contact-action__text">
          <span>Instagram</span>
          <strong>instagram.com/saki.dhuria</strong>
        </span>
      </a>

      <p className={`copy-toast ${copyState !== "idle" ? "is-visible" : ""}`}>
        Copied {copyState} to clipboard
      </p>
    </div>
  );
}

function HobbyIcon({ type }) {
  const paths = {
    ball: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M6.5 10.5c3 1.4 7.8 1.4 11 0" />
        <path d="M9.4 5.2c2.1 3.6 2.1 9.9 0 13.6" />
      </>
    ),
    run: (
      <>
        <circle cx="14.5" cy="5.5" r="1.7" />
        <path d="m13 9-3.2 3.5 3.4 1.9 2.8 4.1" />
        <path d="m13.8 9.2 3.7 2" />
        <path d="m9.8 12.5-3.3 5" />
      </>
    ),
    sports: (
      <>
        <path d="M5 17c4-5 10-8 14-10" />
        <path d="M7 7c2 1.4 3.4 3.5 4 6" />
        <path d="M14 11c1.3 1 2.2 2.4 2.7 4.1" />
      </>
    ),
    film: (
      <>
        <rect x="5" y="6" width="14" height="12" rx="2" />
        <path d="M8 6v12M16 6v12M5 10h14M5 14h14" />
      </>
    ),
    tv: (
      <>
        <rect x="5" y="7" width="14" height="10" rx="2" />
        <path d="m9 20 3-3 3 3" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V6l9-2v12" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="16" cy="16" r="2" />
      </>
    ),
    streak: (
      <>
        <path d="M12 20c3.4-1.6 5-4 5-6.6 0-2.1-1.1-3.8-2.9-5.2.1 2-1 3.1-2.1 3.8.3-2.7-1.1-5-3.6-7C8.8 8 7 9.9 7 13.3 7 16 8.6 18.4 12 20z" />
      </>
    ),
    grid: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9.7 5v14M14.3 5v14M5 9.7h14M5 14.3h14" />
      </>
    ),
    cards: (
      <>
        <rect x="7" y="6" width="9" height="12" rx="1.5" />
        <path d="M10 9h.01M13 15h.01" />
        <path d="M11 6.5 16.5 5 19 15.5l-3 .8" />
      </>
    ),
    cube: (
      <>
        <path d="m12 4 7 4v8l-7 4-7-4V8z" />
        <path d="M12 12 5 8M12 12l7-4M12 12v8" />
      </>
    ),
    puzzle: (
      <>
        <path d="M8 4h4v3a2 2 0 1 0 4 0V4h3v5h-3a2 2 0 1 0 0 4h3v7h-5v-3a2 2 0 1 0-4 0v3H5v-5h3a2 2 0 1 0 0-4H5V4z" />
      </>
    ),
  };

  return (
    <svg className="hobby-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function getHobbyCategoryClass(category) {
  return `is-${category}`;
}

function OffClockList({ entries }) {
  return (
    <div className="off-clock-grid">
      <article className="off-clock-card">
        <div className="hobby-labels">
          {entries.map((item) => {
            const className = `hobby-label ${getHobbyCategoryClass(item.category)} ${
              item.href ? "off-clock-link" : ""
            }`;
            const labelContent = (
              <>
                <HobbyIcon type={item.icon} />
                {item.label}
              </>
            );

            return item.href ? (
              <a className={className} href={item.href} key={item.label} target="_blank" rel="noreferrer">
                {labelContent}
              </a>
            ) : (
              <span className={className} key={item.label}>
                {labelContent}
              </span>
            );
          })}
        </div>
      </article>
    </div>
  );
}

function LifeList({ entries, favoritePhotos }) {
  const [activeTab, setActiveTab] = useState("blog");

  return (
    <div className="life-list">
      <div className="life-tabs" role="tablist" aria-label="Random life things">
        <button
          className={`life-tabs__tab ${activeTab === "blog" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "blog"}
          onClick={() => setActiveTab("blog")}
        >
          Blog-ish
        </button>
        <button
          className={`life-tabs__tab ${activeTab === "photos" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "photos"}
          onClick={() => setActiveTab("photos")}
        >
          Favorite photos
        </button>
      </div>

      <div
        className={`life-panel ${activeTab === "photos" ? "life-panel--scrollable" : ""}`}
        role="tabpanel"
      >
        {activeTab === "blog" ? (
          entries.map((entry) => (
            <article className="life-card" key={entry.title}>
              <div className="life-card__header">
                <p>{entry.date}</p>
                <h2>{entry.title}</h2>
              </div>

              <p className="life-card__description">{entry.description}</p>

              <div className="life-photo-grid">
                {entry.photos.map((photo) => (
                  <img src={photo.src} alt={photo.alt} key={photo.src} loading="lazy" />
                ))}
              </div>
            </article>
          ))
        ) : (
          <article className="life-card">
            <div className="life-card__header">
              <p>Photo roll</p>
              <h2>Favorite photos</h2>
            </div>

            <div className="life-photo-grid">
              {favoritePhotos.map((photo) => (
                <img src={photo.src} alt={photo.alt} key={photo.src} loading="lazy" />
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

function ProjectsList({ entries }) {
  return (
    <div className="project-strip" aria-label="Project entries">
      {entries.map((entry) => (
        <article className={`project-card ${entry.accent}`} key={entry.name}>
          <h2>{entry.name}</h2>
          <p className="project-card__summary">{entry.description}</p>

          <div className="project-card__links">
            {entry.links.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function GenericSectionContent({ section }) {
  return (
    <>
      <ul className="detail-list">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button className="detail-link" type="button">
        {section.cta}
      </button>
    </>
  );
}

function DetailPage({
  section,
  experienceEntries,
  educationTabs,
  favoritePhotos,
  lifeEntries,
  projectEntries,
  offClockEntries,
  contactLinks,
  onBack,
}) {
  return (
    <section className="detail-page" aria-labelledby="page-title">
      <button className="back-link" type="button" onClick={onBack}>
        Back to desk
      </button>

      <article className="detail-card">
        <p className="eyebrow">{section.eyebrow}</p>
        <h1 id="page-title">{section.title}</h1>
        <p className="detail-copy">{section.body}</p>

        {section.id === "experience" ? (
          <ExperienceList entries={experienceEntries} />
        ) : section.id === "contact" ? (
          <ContactActions contactLinks={contactLinks} />
        ) : section.id === "education" ? (
          <EducationTabs tabs={educationTabs} />
        ) : section.id === "life" ? (
          <LifeList entries={lifeEntries} favoritePhotos={favoritePhotos} />
        ) : section.id === "projects" ? (
          <ProjectsList entries={projectEntries} />
        ) : section.id === "off-clock" ? (
          <OffClockList entries={offClockEntries} />
        ) : (
          <GenericSectionContent section={section} />
        )}
      </article>
    </section>
  );
}

export default DetailPage;
