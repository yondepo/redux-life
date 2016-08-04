export function calculateFPS(ticks, startedAt, now) {
  return startedAt && ticks >= 2 && now
    ? Math.ceil(ticks / ((now - startedAt) / 1000))
    : 0;
}

export function isFrame(frame, slowdown) {
  if (!frame) return 1;
  return +(frame % slowdown == 0);
}
