// Light is the original site; dark is the Iskandar design system.
// The visitor's choice is remembered in localStorage.

const STORAGE_KEY = 'theme';

function apply(theme) {
  if (theme === 'dark') document.documentElement.dataset.theme = 'iskandar';
  else delete document.documentElement.dataset.theme;
}

export function getTheme() {
  return document.documentElement.dataset.theme === 'iskandar' ? 'dark' : 'light';
}

export function setTheme(theme) {
  apply(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked — the choice just won't survive a reload.
  }
}

export function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked — fall back to light.
  }
  // Older saves from the ?theme=iskandar preview count as dark.
  apply(saved === 'dark' || saved === 'iskandar' ? 'dark' : 'light');
}
