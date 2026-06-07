const DESK_CANVAS_WIDTH = 920;
const DESK_CANVAS_HEIGHT = DESK_CANVAS_WIDTH * (545 / 819);
const MOBILE_BREAKPOINT = "(max-width: 620px)";
const MOBILE_VIEW_PADDING = 16;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getTouchPoint(touch) {
  return { x: touch.clientX, y: touch.clientY };
}

export function getTouchDistance(touches) {
  const first = getTouchPoint(touches[0]);
  const second = getTouchPoint(touches[1]);
  return Math.hypot(second.x - first.x, second.y - first.y);
}

export function getTouchMidpoint(touches) {
  const first = getTouchPoint(touches[0]);
  const second = getTouchPoint(touches[1]);

  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

export function getFittedDeskView() {
  if (!window.matchMedia(MOBILE_BREAKPOINT).matches) {
    return { x: 0, y: 0, scale: 1 };
  }

  const availableWidth = window.innerWidth - MOBILE_VIEW_PADDING * 2;
  const availableHeight = window.innerHeight - MOBILE_VIEW_PADDING * 2;
  const scale = Math.min(
    availableWidth / DESK_CANVAS_WIDTH,
    availableHeight / DESK_CANVAS_HEIGHT,
  );

  return {
    scale,
    x: (window.innerWidth - DESK_CANVAS_WIDTH * scale) / 2,
    y: (window.innerHeight - DESK_CANVAS_HEIGHT * scale) / 2,
  };
}
