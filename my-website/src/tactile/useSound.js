import { useSyncExternalStore } from 'react';
import { isSoundEnabled, subscribeSound } from './sound';

export function useSoundEnabled() {
  return useSyncExternalStore(subscribeSound, isSoundEnabled, () => true);
}
