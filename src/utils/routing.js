function stripBasePath(pathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length);
  }
  return pathname;
}

const sectionPaths = {
  life: "sidequests",
};

export function getSectionPath(sectionId) {
  return sectionPaths[sectionId] ?? sectionId;
}

export function getRoutePath(pathSegments) {
  return `${import.meta.env.BASE_URL}${pathSegments.filter(Boolean).join("/")}`;
}

export function getRoute() {
  const segments = stripBasePath(window.location.pathname)
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);
  const [sectionPath] = segments;
  const routeId =
    Object.entries(sectionPaths).find(([, path]) => path === sectionPath)?.[0] ??
    sectionPath ??
    null;

  return {
    routeId,
    segments,
  };
}

export function getRouteId() {
  return getRoute().routeId;
}
