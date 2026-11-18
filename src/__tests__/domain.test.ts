import { formatInr, isValidInr, isValidTarget, statusForInr } from '@/domain/inr';
import { isValidPin, shouldLock } from '@/lock/logic';

describe('statusForInr', () => {
  it('classifies against the default 2.0–3.0 target', () => {
    expect(statusForInr(1.8)).toBe('low');
    expect(statusForInr(2.5)).toBe('inRange');
    expect(statusForInr(3.4)).toBe('high');
  });

  it('treats the target edges as in range', () => {
    expect(statusForInr(2.0)).toBe('inRange');
    expect(statusForInr(3.0)).toBe('inRange');
  });

  it('uses a custom target range', () => {
    expect(statusForInr(3.2, { low: 2.5, high: 3.5 })).toBe('inRange');
    expect(statusForInr(2.4, { low: 2.5, high: 3.5 })).toBe('low');
  });
});

describe('INR validation', () => {
  it('accepts one-decimal values between 0.8 and 10.0', () => {
    expect(isValidInr(0.8)).toBe(true);
    expect(isValidInr(1.1)).toBe(true);
    expect(isValidInr(10)).toBe(true);
  });

  it('rejects out-of-range or over-precise values', () => {
    expect(isValidInr(0.7)).toBe(false);
    expect(isValidInr(10.1)).toBe(false);
    expect(isValidInr(2.55)).toBe(false);
    expect(isValidInr(Number.NaN)).toBe(false);
  });

  it('formats with Western digits and one decimal', () => {
    expect(formatInr(2)).toBe('2.0');
    expect(formatInr(3.4)).toBe('3.4');
  });

  it('requires low below high for a target', () => {
    expect(isValidTarget({ low: 2, high: 3 })).toBe(true);
    expect(isValidTarget({ low: 3, high: 3 })).toBe(false);
  });
});

describe('app lock', () => {
  const minute = 60_000;

  it('does not lock when disabled or never backgrounded', () => {
    expect(shouldLock({ enabled: false, backgroundedAt: 0, now: 10 * minute, lockAfterMs: minute })).toBe(false);
    expect(shouldLock({ enabled: true, backgroundedAt: null, now: 10 * minute, lockAfterMs: minute })).toBe(false);
  });

  it('locks after the timeout and not before', () => {
    expect(shouldLock({ enabled: true, backgroundedAt: 0, now: 59_999, lockAfterMs: minute })).toBe(false);
    expect(shouldLock({ enabled: true, backgroundedAt: 0, now: minute, lockAfterMs: minute })).toBe(true);
  });

  it('accepts 4–6 digit PINs only', () => {
    expect(isValidPin('1234')).toBe(true);
    expect(isValidPin('123456')).toBe(true);
    expect(isValidPin('123')).toBe(false);
    expect(isValidPin('1234567')).toBe(false);
    expect(isValidPin('12a4')).toBe(false);
  });
});
