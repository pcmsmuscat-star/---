/** Default from the spec: lock when returning after 1 minute. */
export const DEFAULT_LOCK_AFTER_MS = 60_000;

export const PIN_MIN_LENGTH = 4;
export const PIN_MAX_LENGTH = 6;

/**
 * Decide whether to show the lock screen when the app becomes active again.
 * A null `backgroundedAt` means the app never left the foreground.
 */
export function shouldLock(params: {
  enabled: boolean;
  backgroundedAt: number | null;
  now: number;
  lockAfterMs: number;
}): boolean {
  const { enabled, backgroundedAt, now, lockAfterMs } = params;
  if (!enabled || backgroundedAt === null) return false;
  return now - backgroundedAt >= lockAfterMs;
}

export function isValidPin(pin: string): boolean {
  return /^\d+$/.test(pin) && pin.length >= PIN_MIN_LENGTH && pin.length <= PIN_MAX_LENGTH;
}
