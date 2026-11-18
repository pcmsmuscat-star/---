import * as Crypto from 'expo-crypto';
import { keys, storage } from '@/lib/storage';
import { isValidPin } from './logic';

async function hash(pin: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${pin}`);
}

/** Stores only a salted hash of the PIN in secure storage. */
export async function savePin(pin: string): Promise<void> {
  if (!isValidPin(pin)) throw new Error('PIN must be 4–6 digits');
  const salt = Crypto.randomUUID();
  await storage.set(keys.pinSalt, salt);
  await storage.set(keys.pinHash, await hash(pin, salt));
}

export async function verifyPin(pin: string): Promise<boolean> {
  const [salt, stored] = await Promise.all([storage.get(keys.pinSalt), storage.get(keys.pinHash)]);
  if (!salt || !stored) return false;
  return (await hash(pin, salt)) === stored;
}

export async function hasPin(): Promise<boolean> {
  return (await storage.get(keys.pinHash)) !== null;
}
