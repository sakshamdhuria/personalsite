function stripBasePath(pathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length);
  }
  return pathname;
}

export function getRouteId() {
  return stripBasePath(window.location.pathname).replace(/^\/|\/$/g, "") || null;
}
