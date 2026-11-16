import { useSyncExternalStore } from 'react';
import { sound } from './tactile/sound';
import { prefersReducedMotion } from './tactile/pointer';

// Two skies: night (the default) and day. The visitor's choice is remembered.
const STORAGE_KEY = 'sky';
const listeners = new Set();

function apply(theme) {
  document.documentElement.dataset.theme = theme;
}

export function getTheme() {
  return document.documentElement.dataset.theme === 'day' ? 'day' : 'night';
}

export function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked: fall back to night.
  }
  apply(saved === 'day' ? 'day' : 'night');
}

// Switches sky. Where the browser supports it, the new sky opens as a circle
// from wherever the visitor clicked (`origin` is {x, y} in viewport pixels).
export function toggleTheme(origin) {
  const next = getTheme() === 'day' ? 'night' : 'day';
  const commit = () => {
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice just won't survive a reload.
    }
    listeners.forEach((listener) => listener());
  };

  sound.theme(next === 'day');

  if (!document.startViewTransition || prefersReducedMotion()) {
    commit();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;
  root.classList.add('sky-changing');
  const transition = document.startViewTransition(commit);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    })
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove('sky-changing'));
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'night');
}
