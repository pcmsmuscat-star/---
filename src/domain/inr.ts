export type InrStatus = 'low' | 'inRange' | 'high';

export type TargetRange = { low: number; high: number };

export const DEFAULT_TARGET: TargetRange = { low: 2.0, high: 3.0 };

/** Allowed INR entry range from the spec (4.2). */
export const INR_MIN = 0.8;
export const INR_MAX = 10.0;

/** Values on the target edges count as in range. */
export function statusForInr(value: number, target: TargetRange = DEFAULT_TARGET): InrStatus {
  if (value < target.low) return 'low';
  if (value > target.high) return 'high';
  return 'inRange';
}

export function isValidInr(value: number): boolean {
  const tenths = value * 10;
  return Number.isFinite(value) && value >= INR_MIN && value <= INR_MAX && Math.abs(Math.round(tenths) - tenths) < 1e-9;
}

export function isValidTarget(target: TargetRange): boolean {
  return target.low < target.high;
}

/** Western-digit formatting with one decimal, e.g. 2.5 (medical values never use Arabic-Indic digits by default). */
export function formatInr(value: number): string {
  return value.toFixed(1);
}
