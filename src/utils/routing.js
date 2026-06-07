export function getRouteId() {
  return window.location.pathname.replace(/^\/|\/$/g, "") || null;
}
