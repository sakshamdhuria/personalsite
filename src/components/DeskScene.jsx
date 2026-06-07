function DeskScene({
  background,
  deskView,
  hotspots,
  onHotspotClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) {
  return (
    <section className="hero" aria-label="Interactive personal desk">
      <div
        className="desk-canvas"
        style={{
          transform: `translate3d(${deskView.x}px, ${deskView.y}px, 0) scale(${deskView.scale})`,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div className="scene-card">
          <img
            className="desk-image"
            src={background}
            alt="A desk with a laptop, camera, notebook, graduation cap, books, and personal objects."
          />

          <div className="hotspot-layer" aria-label="Interactive desk sections">
            {hotspots.map((hotspot) => (
              <button
                className="hotspot"
                key={hotspot.id}
                type="button"
                style={{
                  "--x": `${hotspot.x}%`,
                  "--y": `${hotspot.y}%`,
                  "--w": `${hotspot.w}%`,
                  "--h": `${hotspot.h}%`,
                }}
                onClick={() => onHotspotClick(hotspot.id)}
              >
                <span>{hotspot.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeskScene;
