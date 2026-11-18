import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { keys, storage } from '@/lib/storage';
import { DEFAULT_LOCK_AFTER_MS, shouldLock } from './logic';

export type LockMethod = 'biometric' | 'pin';

type LockContextValue = {
  enabled: boolean;
  method: LockMethod;
  locked: boolean;
  unlock: () => void;
  configure: (opts: { enabled: boolean; method?: LockMethod; lockAfterMs?: number }) => Promise<void>;
};

const LockContext = createContext<LockContextValue>({
  enabled: false,
  method: 'biometric',
  locked: false,
  unlock: () => {},
  configure: async () => {},
});

/**
 * App lock shell. When enabled, the app locks on cold start and when it comes
 * back to the foreground after `lockAfterMs` (default 1 minute).
 * Setting a PIN / enabling the lock happens in onboarding step 1.4 (phase 2).
 */
export function LockProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [method, setMethod] = useState<LockMethod>('biometric');
  const [lockAfterMs, setLockAfterMs] = useState(DEFAULT_LOCK_AFTER_MS);
  const [locked, setLocked] = useState(false);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    Promise.all([storage.get(keys.lockEnabled), storage.get(keys.lockMethod), storage.get(keys.lockAfterMs)]).then(
      ([e, m, after]) => {
        const isOn = e === 'true';
        setEnabled(isOn);
        if (m === 'pin' || m === 'biometric') setMethod(m);
        if (after && !Number.isNaN(Number(after))) setLockAfterMs(Number(after));
        if (isOn) setLocked(true);
      },
    );
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (next === 'background' || next === 'inactive') {
        backgroundedAt.current ??= Date.now();
      } else if (next === 'active') {
        if (shouldLock({ enabled, backgroundedAt: backgroundedAt.current, now: Date.now(), lockAfterMs })) {
          setLocked(true);
        }
        backgroundedAt.current = null;
      }
    });
    return () => sub.remove();
  }, [enabled, lockAfterMs]);

  const unlock = useCallback(() => setLocked(false), []);

  const configure = useCallback<LockContextValue['configure']>(async (opts) => {
    setEnabled(opts.enabled);
    await storage.set(keys.lockEnabled, String(opts.enabled));
    if (opts.method) {
      setMethod(opts.method);
      await storage.set(keys.lockMethod, opts.method);
    }
    if (opts.lockAfterMs !== undefined) {
      setLockAfterMs(opts.lockAfterMs);
      await storage.set(keys.lockAfterMs, String(opts.lockAfterMs));
    }
  }, []);

  const value = useMemo(
    () => ({ enabled, method, locked, unlock, configure }),
    [enabled, method, locked, unlock, configure],
  );
  return <LockContext.Provider value={value}>{children}</LockContext.Provider>;
}

export function useLock() {
  return useContext(LockContext);
}
