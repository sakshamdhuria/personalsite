function MobileSectionLinks({ sections, onSectionClick }) {
  return (
    <section className="mobile-sections" aria-label="Personal site sections">
      {sections.map((section) => (
        <button
          className="mobile-card"
          key={section.id}
          type="button"
          onClick={() => onSectionClick(section.id)}
        >
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </button>
      ))}
    </section>
  );
}

export default MobileSectionLinks;
