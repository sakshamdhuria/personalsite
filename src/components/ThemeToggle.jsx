function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className={`theme-toggle ${theme === "light" ? "is-light" : ""}`}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={onToggle}
    >
      <span className="theme-toggle__icon" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
