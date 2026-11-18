import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Small key/value store for settings and secrets.
 * Native: encrypted SecureStore. Web (preview only): localStorage.
 */
export const storage = {
  async get(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return globalThis.localStorage?.getItem(key) ?? null;
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async set(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        globalThis.localStorage?.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Settings fall back to defaults if storage is unavailable.
    }
  },
  async remove(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        globalThis.localStorage?.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      // ignore
    }
  },
};

export const keys = {
  language: 'settings.language',
  lockEnabled: 'lock.enabled',
  lockMethod: 'lock.method',
  lockAfterMs: 'lock.afterMs',
  pinHash: 'lock.pinHash',
  pinSalt: 'lock.pinSalt',
} as const;
