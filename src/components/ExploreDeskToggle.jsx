function ExploreDeskToggle({ isActive, onToggle }) {
  return (
    <button
      className={`explore-toggle ${isActive ? "is-active" : ""}`}
      type="button"
      aria-pressed={isActive}
      aria-label={
        isActive ? "Hide clickable areas on the desk" : "Show clickable areas on the desk"
      }
      onClick={onToggle}
    >
      {isActive ? "Hide hints" : "Explore desk"}
    </button>
  );
}

export default ExploreDeskToggle;
