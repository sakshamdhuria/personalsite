import { useEffect, useMemo, useRef, useState } from "react";
import deskBackground from "./assets/ui/desk-dark.webp";
import deskLightBackground from "./assets/ui/desk-light.webp";
import DeskScene from "./components/DeskScene.jsx";
import DetailPage from "./components/DetailPage.jsx";
import MobileSectionLinks from "./components/MobileSectionLinks.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { contactLinks } from "./data/contact.js";
import { educationTabs } from "./data/education.js";
import { experienceEntries } from "./data/experience.js";
import { hotspots } from "./data/hotspots.js";
import { favoritePhotos, lifeEntries } from "./data/life.js";
import { offClockEntries } from "./data/offClock.js";
import { projectEntries } from "./data/projects.js";
import { sections } from "./data/sections.js";
import {
  clamp,
  getFittedDeskView,
  getTouchDistance,
  getTouchMidpoint,
  getTouchPoint,
} from "./utils/deskViewport.js";
import { getRouteId } from "./utils/routing.js";

const THEME_STORAGE_KEY = "personal-site-theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
}

function App() {
  const [routeId, setRouteId] = useState(getRouteId);
  const [deskView, setDeskView] = useState({ x: 0, y: 0, scale: 1 });
  const [theme, setTheme] = useState(getStoredTheme);
  const gestureRef = useRef(null);
  const minScaleRef = useRef(1);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => setRouteId(getRouteId());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const syncDeskFit = () => {
      const fittedView = getFittedDeskView();
      minScaleRef.current = fittedView.scale;

      if (!routeId) {
        setDeskView(fittedView);
      }
    };

    syncDeskFit();
    window.addEventListener("resize", syncDeskFit);

    return () => window.removeEventListener("resize", syncDeskFit);
  }, [routeId]);

  const currentSection = useMemo(
    () => sections.find((section) => section.id === routeId),
    [routeId],
  );
  const selectedDeskBackground =
    theme === "light" ? deskLightBackground : deskBackground;

  const goToSection = (id) => {
    window.history.pushState(null, "", `/${id}`);
    setRouteId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    window.history.pushState(null, "", "/");
    setRouteId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeskTouchStart = (event) => {
    if (event.touches.length === 2) {
      gestureRef.current = {
        type: "pinch",
        startDistance: getTouchDistance(event.touches),
        startMidpoint: getTouchMidpoint(event.touches),
        startScale: deskView.scale,
        startX: deskView.x,
        startY: deskView.y,
        moved: false,
      };
      return;
    }

    if (event.touches.length === 1) {
      gestureRef.current = {
        type: "pan",
        startTouch: getTouchPoint(event.touches[0]),
        startX: deskView.x,
        startY: deskView.y,
        moved: false,
      };
    }
  };

  const handleDeskTouchMove = (event) => {
    const gesture = gestureRef.current;

    if (!gesture) {
      return;
    }

    if (gesture.type === "pinch" && event.touches.length === 2) {
      event.preventDefault();

      const currentDistance = getTouchDistance(event.touches);
      const currentMidpoint = getTouchMidpoint(event.touches);
      const nextScale = clamp(
        gesture.startScale * (currentDistance / gesture.startDistance),
        minScaleRef.current,
        4.5,
      );
      const scaleRatio = nextScale / gesture.startScale;

      gesture.moved = true;
      setDeskView({
        scale: nextScale,
        x:
          currentMidpoint.x -
          (gesture.startMidpoint.x - gesture.startX) * scaleRatio,
        y:
          currentMidpoint.y -
          (gesture.startMidpoint.y - gesture.startY) * scaleRatio,
      });
      return;
    }

    if (gesture.type === "pan" && event.touches.length === 1) {
      const currentTouch = getTouchPoint(event.touches[0]);
      const dx = currentTouch.x - gesture.startTouch.x;
      const dy = currentTouch.y - gesture.startTouch.y;

      if (Math.hypot(dx, dy) > 4) {
        event.preventDefault();
        gesture.moved = true;
      }

      setDeskView((currentView) => ({
        ...currentView,
        x: gesture.startX + dx,
        y: gesture.startY + dy,
      }));
    }
  };

  const handleDeskTouchEnd = () => {
    if (gestureRef.current?.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 180);
    }

    gestureRef.current = null;
  };

  const handleHotspotClick = (id) => {
    if (suppressClickRef.current) {
      return;
    }

    goToSection(id);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  if (currentSection) {
    return (
      <main
        className="page-shell"
        data-theme={theme}
        style={{ "--desk-bg": `url(${selectedDeskBackground})` }}
      >
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <DetailPage
          section={currentSection}
          experienceEntries={experienceEntries}
          educationTabs={educationTabs}
          favoritePhotos={favoritePhotos}
          lifeEntries={lifeEntries}
          projectEntries={projectEntries}
          offClockEntries={offClockEntries}
          contactLinks={contactLinks}
          onBack={goHome}
        />
      </main>
    );
  }

  return (
    <main
      className="page-shell"
      data-theme={theme}
      style={{ "--desk-bg": `url(${selectedDeskBackground})` }}
    >
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <DeskScene
        background={selectedDeskBackground}
        deskView={deskView}
        hotspots={hotspots}
        onHotspotClick={handleHotspotClick}
        onTouchStart={handleDeskTouchStart}
        onTouchMove={handleDeskTouchMove}
        onTouchEnd={handleDeskTouchEnd}
      />
      <MobileSectionLinks sections={sections} onSectionClick={goToSection} />
    </main>
  );
}

export default App;
